<template>
  <div>
    <div class="content">
      <el-menu
        class="menu"
        :default-active="state"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          全部订单
        </el-menu-item>
        <el-menu-item index="2">
          代发货订单
        </el-menu-item>
        <el-menu-item index="3">
          待收货订单
        </el-menu-item>
        <el-menu-item index="4">
          已完成订单
        </el-menu-item>
        <el-menu-item index="5">
          退/换货订单
        </el-menu-item>
        <el-menu-item index="6">
          历史订单
        </el-menu-item>
      </el-menu>
      <div
        v-loading="isLoading"
        class="table"
      >
        <el-table
          :data="data"
          border
        >
          <el-table-column
            prop="order_number"
            label="订单号"
          />
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span>
                <div>{{ scope.row.goods_name }} {{ scope.row.goods_id }}</div>
                <div>尺码 {{ scope.row.size }}</div>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="score"
            label="消耗积分"
          />
          <el-table-column
            prop="address_str"
            label="收货地址"
          />
          <el-table-column
            prop="created"
            label="创建时间"
          >
            <template slot-scope="scope">
              {{ scope.row.create_time }}
            </template>
          </el-table-column>
          <el-table-column label="交易状态">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleOpenDialog(scope.row)"
              >
                <span v-if="scope.row.state === '0'">
                  <el-tag>待发货</el-tag>
                </span>
                <span v-else-if="scope.row.state === '1'">
                  <el-tag>已取消</el-tag>
                </span>
                <span v-else-if="scope.row.state === '2'">
                  <el-tag type="success">已发货</el-tag>
                </span>
                <span v-else-if="scope.row.state === '3'">
                  已完成
                </span>
                <span v-else-if="scope.row.state === '4'">
                  已退货
                </span>
                <span v-else-if="scope.row.state === '5'">
                  <el-tag type="warning">退货中</el-tag>
                </span>
                <span v-else>unknown</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-action">
          <div>
            <el-pagination
              layout="prev, pager, next"
              hide-on-single-page
              :page-count="pages"
              :current-page.sync="current"
            />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      :before-close="handleCloseDialog"
    >
      <div v-if="dialogOrder">
        <el-form
          label-width="150px"
          disabled
        >
          <el-form-item label="创建时间">
            <el-input :value="dialogOrder.create_time" />
          </el-form-item>
          <el-form-item label="订单号">
            <el-input :value="dialogOrder.order_number" />
          </el-form-item>
          <el-form-item label="所消耗积分">
            <el-input :value="dialogOrder.score" />
          </el-form-item>
          <el-form-item label="商品基础信息">
            <el-input :value="[dialogOrder.goods_name, dialogOrder.goods_id, dialogOrder.color, dialogOrder.size].join(' ')" />
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input :value="dialogOrder.num" />
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input :value="dialogOrder.parents_name" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input :value="dialogOrder.address && dialogOrder.address.tel" />
          </el-form-item>
          <el-form-item
            v-if="dialogOrder.express_number && dialogOrder.express_name"
            label="物流单号"
          >
            <el-input :value="[dialogOrder.express_name, dialogOrder.express_number].join(' ')" />
          </el-form-item>
          <el-form-item
            v-if="dialogOrder.message"
            label="原因"
          >
            <el-input :value="dialogOrder.message" />
          </el-form-item>
          <!-- <el-form-item label="是否享有折扣">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否使用抵用券">
            <el-input></el-input>
          </el-form-item> -->
        </el-form>
        <div style="text-align: center">
          <template v-if="dialogOrder.state === '0'">
            <el-button
              type="primary"
              @click="updateExpressNumber"
            >
              发货
            </el-button>
            <el-button
              type="danger"
              @click="cancelOrder"
            >
              取消订单
            </el-button>
          </template>
          <template v-if="dialogOrder.state === '2'">
            <el-button type="primary">
              确认收货
            </el-button>
            <el-button type="danger">
              退/换货
            </el-button>
          </template>
          <el-button @click="() => dialogVisible = false">
            关闭
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 0:已支付，订单处理中，1：订单已取消，2：已发货，3：已完成，4：已退货 5：退货中
import Axios from 'axios'
import _ from 'lodash'
import qs from 'querystring'

export default {
  data () {
    return {
      data: [],
      // 分页
      current: Number(this.$route.query.current) || 1,
      pages: 1,
      // pageSize: 5,
      state: this.$route.query.state || '1',

      isLoading: false,

      // 对话框
      dialogVisible: false,
      dialogOrder: null
    }
  },

  watch: {
    state (v) {
      this.current = 1
      this.$router.replace({
        query: {
          ...this.$route.query,
          state: v
        }
      })
      this.debouncedGetOrder()
    },
    current (v) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          current: v
        }
      })
      this.debouncedGetOrder()
    }
  },
  created () {
    this.debouncedGetOrder = _.debounce(this.getOrders, 100)
    this.debouncedGetOrder()
  },

  methods: {
    async getOrders () {
      this.isLoading = true
      try {
        const { data } = await Axios.get('/sellerctr/getOrder', {
          params: {
            cur_page: this.current,
            state: this.state
          }
        })

        console.log(data)

        data.data.data.forEach(d => {
          d.address = JSON.parse(d.address)
          if (d.address) {
            d.address.address = JSON.parse(d.address.address)
          }
        })

        this.pages = data.data.last_page
        this.data = data.data.data.map(d => ({
          ...d,
          address_str: [d.address?.address?.region?.label, d.address?.name, d.address?.tel].join(' ')
        }))
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    updateOrder (order, data) {
      return Axios.post('/sellerctr/updateOrder', qs.stringify({
        id: order.id,
        state: order.state,
        express_number: order.express_number,
        ...data
      }))
    },

    handleSelect (key) {
      this.state = key
    },

    handleOpenDialog (v) {
      this.dialogVisible = true
      this.dialogOrder = v
    },
    handleCloseDialog (done) {
      this.dialogOrder = null
      done()
    },

    // 发货
    updateExpressNumber () {
      if (!this.dialogOrder) return
      this.$prompt('填写物流单号(格式: 快递公司 快递单号)', '提示', {
        inputPattern: /\S+ \d+/,
        inputErrorMessage: '请填写正确的物流单号'
      }).then(({ value }) => {
        this.updateOrder(this.dialogOrder, {
          express_number: value,
          state: '2'
        }).then(() => {
          this.$message.success('操作成功')
        }).catch(e => {
          console.error(e)
          this.$message.error('操作失败')
        }).then(this.getOrders)
      }).catch(() => {})
    },

    cancelOrder () {
      this.$confirm('是否取消订单', '提示').then(() => {
        Axios.post('/sellerctr/updateOrder', qs.stringify({
          id: this.dialogOrder.id,
          state: '1',
          express_number: this.dialogOrder.express_number
        })).then(() => {
          this.$message.success('取消成功')
        }).catch(e => {
          console.error(e)
          this.$message.error('操作失败')
        })
          .then(this.getOrders)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;

  .menu {
    margin-right: 16px;
  }

  .table {
    flex: 1;
  }
}

.table-action {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
