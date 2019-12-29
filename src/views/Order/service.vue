<template>
  <div>
    <el-table :data="data" border>
      <el-table-column prop="id" label="订单编号" />
      <el-table-column prop="created" label="创建时间">
        <template slot-scope="scope">
          {{ format(scope.row.created) }}
        </template>
      </el-table-column>
      <el-table-column prop="reasons" label="申请理由">
        <template slot-scope="scope">
          <el-tag v-for="r in scope.row.reasons" :key="r" style="margin-right: 8px">{{r}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="申请状态" />
    </el-table>
    <div class="table-action">
      <div>
        <router-link to="/order/service/return">
          <el-button style="margin-right: 16px">退货申请</el-button>
        </router-link>
        <router-link to="/order/service/exchange">
          <el-button>换货申请</el-button>
        </router-link>
      </div>
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
import { format } from 'date-fns'

const mock = () => ({
  id: (Math.random() * 1000000).toFixed(0),
  created: Date.now(),
  reasons: ['尺码问题', '商品发错', '质量问题'],
  state: _.sample(['退款', '换货'])
})

export default {
  data() {
    return {
      data: Array.from({length: 9}).map(mock),
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
  },
  methods: {
    format(date) {
      return format(date, 'yyyy.MM.dd HH:mm:ss')
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
