<template>
  <div v-loading="isLoading">
    <el-table :data="data">
      <el-table-column prop="parents_name" label="用户名"></el-table-column>
      <el-table-column prop="cost_score" label="消费积分"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column prop="create_time" label="消费时间" width="180"></el-table-column>
      <el-table-column prop="order_number" label="订单号" width="240"></el-table-column>
    </el-table>
    <footer>
      <el-pagination hide-on-single-page :current-page.sync="cur_page" :total="total" layout="prev, pager, next"></el-pagination>
    </footer>
  </div>
</template>

<script>
import Axios from 'axios'

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
        const { data } = await Axios.get('/sellerctr/getConsumeRecords', {
          params: { cur_page: this.cur_page }
        })
        this.data = data.data.data.map(d => ({
          ...d
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