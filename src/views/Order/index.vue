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
      <div class="table">
        <el-table :data="data" border>
          <el-table-column prop="id" label="编号" />
          <el-table-column prop="created" label="创建时间">
            <template slot-scope="scope">
              {{ format(scope.row.created) }}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="消耗积分" />
          <el-table-column prop="address" label="送货地址" />
          <el-table-column prop="express_number" label="物流单号" />
          <el-table-column label="交易状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state === '3'">
                交易成功
              </span>
              <span v-else-if="scope.row.state === '0'">
                <el-tag>待发货</el-tag>
              </span>
              <span v-else-if="scope.row.state === '2'">
                <el-tag type="success">确认收货</el-tag>
              </span>
              <span v-else>null</span>
              <!-- <el-tag style="margin-right: 0.5rem" type="info">待完成订单</el-tag>
              <el-button size="small" :disabled="scope.row.state === 'complete'">完成订单</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="table-action">
          <!-- <router-link to="/order/add">
            <el-button>添加新订单</el-button>
          </router-link>
          <router-link to="/order/service">
            <el-button>售后</el-button>
          </router-link> -->
          <div>
            <el-pagination
              layout="total, prev, next, jumper"
              hide-on-single-page
              :total="total"
              :current-page.sync="current"
            />
          </div>
        </div>
      </div>
    </div>

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
      // pageSize: 5,
      state: '1',

      isLoading: false,
    }
  },
  created() {
    this.getOrders()
  },

  watch: {
    state() {
      this.getOrders()
    }
  },

  computed: {
    total() {
      return this.data.length
    }
  },
  methods: {
    format(date) {
      return format(date, 'yyyy.MM.dd HH:mm:ss')
    },

    async getOrders() {
      this.isLoading = true
      try {
        const { data } = await Axios.get('/sellerctr/getOrder', {
          params: {
            cur_page: this.current,
            // page_size: this.pageSize,
            state: this.state,
          }
        })

        console.log(data)

        data.data.forEach(d => {
          d.address = JSON.parse(d.address)
          if (d.address) {
            d.address.address = JSON.parse(d.address.address)
          }
        })

        this.data = data.data.map(d => ({
          ...d,
          created: new Date(d.create_time),
          address: [d.address?.address?.region?.label, d.address?.name, d.address?.tel].join(' '),
        }))
      } catch(e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    handleSelect(key) {
      this.state = key
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