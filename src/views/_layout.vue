<template>
  <el-container style="height: 100vh">
    <el-aside
      class="aside"
      :width="sideWidth"
    >
      <div
        class="logo"
        :class="{ 'is-active': !collapse }"
      >
        NIKE管理系统
      </div>
      <el-menu
        class="menu"
        background-color="#171a2c"
        text-color="#fff"
        active-text-color="#fff"
        router
        :default-active="defaultActive"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <el-menu-item
          v-for="menu in menus"
          :key="menu.path"
          :index="menu.path"
        >
          <i
            v-if="menu.icon"
            :class="menu.icon"
          />
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div
          class="collapse-button"
          :class="{ active: collapse }"
          @click="toggleCollapse"
        >
          <i class="el-icon-s-fold" />
        </div>
        <div
          class="logo-2"
          :class="{ 'is-active': collapse }"
        >
          NIKE管理系统
        </div>
        <div class="right">
          <el-button type="text" @click="logout">
            登出
          </el-button>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import _ from 'lodash'

const menus = [
  // { name: '首页', path: '/' },
  { name: '活动管理', path: '/activity', icon: 'el-icon-present' },
  { name: '商品管理', path: '/product', icon: 'el-icon-goods' },
  { name: '订单管理', path: '/order', icon: 'el-icon-tickets' },
  { name: '教务系统', path: '/teach/student', icon: 'el-icon-date' },
  { name: '用户管理', path: '/user', icon: 'el-icon-user' },
  { name: '积分管理', path: '/score', icon: 'el-icon-coin' }
]

export default {
  data () {
    return {
      menus,
      collapse: false
    }
  },

  computed: {
    defaultActive () {
      const path = this.$route.path
      const matches = this.menus.filter(m => path.indexOf(m.path) === 0)
      if (matches.length === 0) return ''

      const match = _.maxBy(matches, o => o.path.length)

      return match.path
    },

    sideWidth () {
      return this.collapse ? '64px' : '180px'
    }
  },

  methods: {
    toggleCollapse () {
      this.collapse = !this.collapse
    },

    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.replace('/auth')
      })
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

  background: #0f1218;
  color: rgba(255,255,255, 0);
  transition: 200ms color;

  font-weight: bold;
  &.is-active {
    color: rgba(255,255,255, 1);
  }
}

.logo-2 {
  color: rgba(255,255,255, 0);
  transition: 200ms color;
  &.is-active {
    color: rgba(255,255,255, 1);
  }
}

.menu {
  height: calc(100vh - 60px);
  border: none;
}

.header {
  height: 60px;
  line-height: 60px;
  background: #1d2033;
  color: #fff;
  padding-left: 0;

  display: flex;

  .right {
    margin-left: auto;
  }
}

.collapse-button {
  width: 60px;
  height: 60px;
  text-align: center;
  transition: background 100ms;
  cursor: pointer;

  margin-right: 8px;

  &:hover {
    background: rgba(255,255,255,0.1)
  }

  &.active i {
    transform: rotate(180deg)
  }
}

.el-main {
  padding: 0 20px 16px;
}

.el-menu-item {
  position: relative;
  &.is-active {
    background-color: #232639 !important;
    color: #fff !important;
    &::before {
      content: ' ';
      position: absolute;
      width: 3px;
      left: 0;
      top: 0;
      bottom: 0;
      background: #52bcf0;
      // height: 100%;
    }
  }
}
</style>
