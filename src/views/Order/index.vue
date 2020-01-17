<template>
  <div>
    <div class="content">
      <el-menu class="menu" :default-active="state" @select="handleSelect">
        <el-menu-item index="1">全部订单</el-menu-item>
        <el-menu-item index="2">代发货订单</el-menu-item>
        <el-menu-item index="3">待收货订单</el-menu-item>
        <el-menu-item index="4">已完成订单</el-menu-item>
        <el-menu-item index="5">退/换货订单</el-menu-item>
        <el-menu-item index="6">历史订单</el-menu-item>
      </el-menu>
      <div class="table" v-loading="isLoading">
        <el-table :data="data" border >
          <el-table-column prop="order_number" label="订单号" />
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span>
                <div>{{scope.row.goods_name}} {{scope.row.goods_id}}</div>
                <div>颜色 {{scope.row.color}}</div>
                <div>尺码 {{scope.row.size}}</div>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="消耗积分" />
          <el-table-column prop="address_str" label="收货地址" />
          <el-table-column prop="created" label="创建时间">
            <template slot-scope="scope">
              {{ format(scope.row.created) }}
            </template>
          </el-table-column>
          <el-table-column label="交易状态">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleOpenDialog(scope.row)">
                <span v-if="scope.row.state === '3'">
                  交易成功
                </span>
                <span v-else-if="scope.row.state === '0'">
                  <el-tag>待发货</el-tag>
                </span>
                <span v-else-if="scope.row.state === '2'">
                  <el-tag type="success">确认收货</el-tag>
                </span>
                <span v-else-if="scope.row.state === '5'">
                  <el-tag type="warning">退换货</el-tag>
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
        <el-form label-width="150px" disabled>
          <el-form-item label="创建时间">
            <el-input :value="format(dialogOrder.created)"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input :value="dialogOrder.order_number"></el-input>
          </el-form-item>
          <el-form-item label="所消耗积分">
            <el-input :value="dialogOrder.score"></el-input>
          </el-form-item>
          <el-form-item label="商品基础信息">
            <el-input :value="[dialogOrder.goods_name, dialogOrder.goods_id, dialogOrder.color, dialogOrder.size].join(' ')"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input :value="dialogOrder.num"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input :value="dialogOrder.parents_name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input :value="dialogOrder.address && dialogOrder.address.tel"></el-input>
          </el-form-item>
          <el-form-item label="物流单号" v-if="dialogOrder.express_number && dialogOrder.express_name">
            <el-input :value="[dialogOrder.express_name, dialogOrder.express_number].join(' ')"></el-input>
          </el-form-item>
          <el-form-item label="原因" v-if="dialogOrder.message">
            <el-input :value="dialogOrder.message"></el-input>
          </el-form-item>
          <!-- <el-form-item label="是否享有折扣">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否使用抵用券">
            <el-input></el-input>
          </el-form-item> -->
        </el-form>
        <div>
          <template v-if="dialogOrder.state === '0'">
            <el-button type="primary" @click="addressDialogVisible = true">发货</el-button>
            <el-button type="danger">取消订单</el-button>
          </template>
          <template v-if="dialogOrder.state === '2'">
            <el-button type="primary">确认收货</el-button>
            <el-button type="danger">退/换货</el-button>
          </template>
        </div>
        <!-- 填写物流单 -->
        <el-dialog
          :visible.sync="addressDialogVisible"
          title="填写物流单号"
          append-to-body
          :before-close="handleCloseAddressDialog"
        >
          <el-input v-model="addressDialogValue"></el-input>
          <div slot="footer">
            <el-button type="primary" @click="handleSubmitAddressDialog" :disabled="!addressDialogValue">确定</el-button>
            <el-button type="danger" @click="handleCloseAddressDialog">取消</el-button>
          </div>
        </el-dialog>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios'
// import _ from 'lodash'
import { format } from 'date-fns'

export default {
  data() {
    return {
      data: [],
      // 分页
      current: 1,
      pages: 1,
      // pageSize: 5,
      state: '1',

      isLoading: false,

      // 对话框
      dialogVisible: false,
      dialogOrder: null,
      addressDialogVisible: false,
      addressDialogValue: ''
    }
  },
  created() {
    this.getOrders()
  },

  watch: {
    state() {
      this.current = 1
      this.getOrders()
    },
    current() {
      this.getOrders()
    }
  },

  methods: {
    format(date, f) {
      return format(date, f ?? 'yyyy.MM.dd HH:mm:ss')
    },

    async getOrders() {
      this.isLoading = true
      try {
        const { data } = await Axios.get('/sellerctr/getOrder', {
          params: {
            cur_page: this.current,
            state: this.state,
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
          created: new Date(d.create_time),
          address_str: [d.address?.address?.region?.label, d.address?.name, d.address?.tel].join(' '),
        }))
      } catch(e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    handleSelect(key) {
      this.state = key
    },

    handleOpenDialog(v) {
      this.dialogVisible = true
      this.dialogOrder = v
    },
    handleCloseDialog(done) {
      this.dialogOrder = null
      done()
    },
    handleOpenAddressDialog() {
      this.addressDialogVisible = true
    },
    handleCloseAddressDialog(done) {
      this.addressDialogValue = ''
      this.addressDialogVisible = false
      if (typeof done === 'function') done()
    },
    handleSubmitAddressDialog() {
      this.handleCloseAddressDialog()
    },
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