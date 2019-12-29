<template>
  <div>
    <el-table :data="shownData">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="created" label="创建时间" />
      <el-table-column prop="score" label="消耗积分" />
      <el-table-column prop="address" label="送货地址" />
      <el-table-column prop="express_number" label="物流单号" />
      <el-table-column label="交易状态">
        <template slot-scope="scope">
          <el-tag style="margin-right: 0.5rem" type="info">待完成订单</el-tag>
          <el-button size="small" :disabled="scope.row.state === 'complete'">完成订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-action">
      <router-link to="/order/add">
        <el-button>添加新订单</el-button>
      </router-link>
      <div>
        <el-pagination
          layout="total, prev, pager, next, jumper"
          hide-on-single-page
          :total="total"
          :page-size="pageSize"
          :current-page.sync="current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

const mock = () => ({
  id: (Math.random() * 1000000).toFixed(0),
  created: Date.now(),
  score: 3600,
  address: '上海xxxx',
  express_number: '1243432',
  state: _.sample(['complete', 'pending'])
})

export default {
  data() {
    return {
      data: Array.from({ length: 10 }).map(() => mock()),
      // 分页
      current: 1,
      pageSize: 5,
    }
  },
  computed: {
    total() {
      return this.data.length
    },
    shownData() {
      const start = (this.current - 1) * this.pageSize;
      return this.data.slice(start, start + this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-action {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>