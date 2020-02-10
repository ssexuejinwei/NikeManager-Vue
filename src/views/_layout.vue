<template>
  <el-container style="height: 100vh">
    <el-aside class="aside" :width="sideWidth">
      <div class="logo">NIKE管理系统</div>
      <el-menu
        class="menu"
        background-color="#303e58"
        text-color="#fff"
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
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="collapse-button" :class="{ active: collapse }" @click="toggleCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
        <div v-show="collapse">
          NIKE管理系统
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import _ from 'lodash'

const menus = [
  // { name: '首页', path: '/' },
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
      collapse: false
    }
  },

  computed: {
    defaultActive() {
      const path = this.$route.path
      const matches = this.menus.filter(m => path.indexOf(m.path) === 0)
      if (matches.length === 0) return ''

      const match = _.maxBy(matches, o => o.path.length)

      return match.path
    },

    sideWidth() {
      return this.collapse ? '0' : '200px'
    }
  },

  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  transition: width 200ms ease;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;

  background: #222c40;
  color: #fff;

  font-weight: bold;
}

.menu {
  height: calc(100vh - 60px);
  border: none;
}

.header {
  height: 60px;
  line-height: 60px;
  background: #303e58;
  color: #fff;
  padding-left: 0;

  display: flex;
}

.collapse-button {
  width: 60px;
  height: 60px;
  text-align: center;
  transition: background 100ms, transform ease 250ms;
  cursor: pointer;

  margin-right: 8px;
  // background: #303e58;
  &:hover {
    background: rgba(255,255,255,0.1)
  }

  &.active {
    // background: rgba(255,255,255,0.05)
    transform: rotate(180deg)
  }
}

.main {
  margin-top: 16px;
}
</style>
