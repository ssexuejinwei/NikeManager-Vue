<template>
  <div v-loading="isLoading">
    <el-table :data="users">
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="score" label="积分" width="80" />
      <el-table-column prop="level" label="会员等级" width="80">
        <template slot-scope="scope">
          <span>Lv {{scope.row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"  width="200" />
    </el-table>
    <footer>
      <el-pagination :current-page.sync="cur_page" :total="total" layout="prev, pager, next"></el-pagination>
    </footer>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data() {
    return {
      users: [],
      isLoading: false,
      cur_page: 1,
      total: 0
    }
  },

  created() {
    this.getUser()
  },

  watch: {
    cur_page() {
      this.getUser()
    }
  },

  methods: {
    async getUser() {
      this.isLoading = true
      try {
        const { data } = await Axios.get('/sellerctr/getParents', {
          params: { cur_page: this.cur_page }
        })
        this.users = data.data.data;
        this.total = data.data.total
      } catch (error) {
        console.error(error)
        this.$message.error('获取用户列表失败')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>