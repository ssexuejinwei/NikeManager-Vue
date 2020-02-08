<template>
  <div v-loading="isLoading">
    <header>
      <el-input placeholder="请输入内容" v-model="search.value" style="width: 500px">
        <el-select v-model="search.key" slot="prepend" placeholder="请选择" style="width: 100px">
          <el-option label="用户名" value="name"></el-option>
          <el-option label="等级" value="level"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
      <el-button style="margin-left: 16px" v-show="search.value" type="text" @click="handleClearSearch">
        清空搜索结果
      </el-button>
    </header>
    <el-table :data="users">
      <el-table-column prop="name" label="用户名" width="150" />
      <el-table-column prop="score" label="积分" width="80" />
      <el-table-column prop="level" label="会员等级" width="80">
        <template slot-scope="scope">
          <span>Lv {{scope.row.level}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="200" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="openScoreDialog(scope.row)">修改积分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <el-pagination
        hide-on-single-page
        :current-page.sync="cur_page"
        :total="total"
        layout="prev, pager, next"
      />
    </footer>

    <el-dialog
      title="修改积分"
      :visible.sync="dialogVisible"
      width="450px"
    >
      <div v-if="dialogUser" v-loading="dialogLoading">
        <p>
          <strong>修改用户：{{ dialogUser.name }}</strong>
        </p>
        <el-input-number
          v-model="dialogScore"
          placeholder="请输入积分"
          :min="0"
          :precision="2"
        >
        </el-input-number>
        <p style="text-align: center">
          <el-button :disabled="!!!dialogScore" type="primary" @click="changeScore('add')">加积分</el-button>
          <el-button :disabled="!!!dialogScore" type="info" @click="changeScore('sub')">减积分</el-button>
          <el-button @click="closeScoreDialog">取消</el-button>
        </p>
      </div>
    </el-dialog>
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
      total: 0,
      
      search: {
        key: 'name',
        value: ''
      },

      dialogVisible: false,
      dialogUser: null,
      dialogScore: 0,
      dialogLoading: false
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
    },

    handleClearSearch() {
      this.search.value = ''
      // @todo
    },

    handleSearch() {
      if (this.search.value) {
        this.$alert('todo')
      }
      // @todo
    },

    openScoreDialog(user) {
      this.dialogVisible = true
      this.dialogUser = user
      this.dialogScore = 0
    },

    closeScoreDialog() {
      this.dialogVisible = false
      this.dialogUser = null
      this.dialogScore = 0
    },

    changeScore(method = 'add') {
      if (method !== 'add' && method !== 'sub') {
        throw new TypeError('error type value')
      }
      if (!this.dialogUser || !this.dialogScore) return

      this.dialogLoading = true

      return Axios.post(`/sellerctr/${method}Score`, {
        parents_id: this.dialogUser.id,
        score: this.dialogScore
      }).then(() => {
        this.$message.success('修改积分成功')
        this.closeScoreDialog()
        // refresh
        this.getUser()
      }).catch(e => {
        console.error(e)
        this.$message.error('修改积分失败')
      }).finally(() => {
        this.dialogLoading = false
      })
    },
  }
}
</script>