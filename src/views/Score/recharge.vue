<template>
  <div v-loading="isLoading">
    <el-table :data="data">
      <el-table-column prop="parents_name" label="用户名"></el-table-column>
      <el-table-column prop="total_fee" label="充值积分"></el-table-column>
      <el-table-column prop="_type" label="充值方式"></el-table-column>
      <el-table-column prop="create_time" label="充值时间" width="180"></el-table-column>
      <el-table-column prop="transaction_id" label="微信支付订单号" width="240"></el-table-column>
      <el-table-column prop="out_trade_no" label="商户订单编号" width="180"></el-table-column>
      <el-table-column prop="operator" label="经办人"></el-table-column>
    </el-table>
    <footer>
      <el-pagination hide-on-single-page :current-page.sync="cur_page" :total="total" layout="prev, pager, next"></el-pagination>
    </footer>
  </div>
</template>

<script>
import Axios from 'axios'

const TYPE = {
  0: '小程序',
  1: 'h5',
  2: '人工充值'
}

export default {
  data() {
    return {
      isLoading: false,
      data: [],
      cur_page: 1,
      total: 0
    }
  },

  created() {
    this.getData()
  },

  watch: {
    cur_page() {
      this.getData()
    }
  },

  methods: {
    async getData() {
      this.isLoading = true
      try {
        const { data } = await Axios.get('/sellerctr/getPayRecords', {
          params: { cur_page: this.cur_page }
        })
        this.data = data.data.data.map(d => ({
          ...d,
          _type: TYPE[d.type],
          operator: d.operator || '无'
        }))
        this.total = data.data.total
        console.log(data)
      } catch (error) {
        console.error(error)
        this.$message.error('获取数据失败')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>