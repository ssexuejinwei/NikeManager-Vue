<template>
  <div v-loading="isLoading">
    <el-table :data="data">
      <el-table-column prop="name" label="用户名" width="150" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="reason" label="原因" width="200" />
      <el-table-column prop="return_score" label="返还积分" width="80" />
    </el-table>
    <!-- <footer>
      <el-pagination :current-page.sync="cur_page" :total="total" layout="prev, pager, next"></el-pagination>
    </footer> -->
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data() {
    return {
      data: [],
      isLoading: false,
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
        const { data } = await Axios.get('/sellerctr/getScoreReturn', {
          params: { cur_page: this.cur_page }
        })
        this.data = data.data
        // this.total = data.data.total
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