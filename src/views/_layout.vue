<template>
  <div>
    <header>
      <el-menu
        mode="horizontal"
        router
        :default-active="defaultActive"
      >
        <el-menu-item
          v-for="menu in menus"
          :key="menu.path" :index="menu.path"
        >
          {{menu.name}}
        </el-menu-item>
      </el-menu>
    </header>
    <section class="main">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'

const menus = [
  { name: '首页', path: '/' },
  { name: '活动管理', path: '/activity' },
  { name: '商品管理', path: '/product' },
  { name: '订单管理', path: '/order' },
  { name: '教务系统', path: '/teach/student' },
  { name: '用户管理', path: '/user' },
  { name: '积分管理', path: '/score' },
]

export default {
  data() {
    return {
      menus,
    }
  },

  computed: {
    defaultActive() {
      const path = this.$route.path
      const matches = this.menus.filter(m => path.indexOf(m.path) === 0)
      if (matches.length === 0) return ''

      const match = _.maxBy(matches, o => o.path.length)

      return match.path
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 16px;
}
</style>
