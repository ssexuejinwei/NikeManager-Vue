<template>
  <div>
    <header>
      <h1>积分管理</h1>
    </header>
    <div class="content">
      <el-menu class="menu" router :default-active="$route.path">
        <el-menu-item index="/score/overview">积分总览</el-menu-item>
        <el-menu-item index="/score/recharge-record">充值记录</el-menu-item>
        <el-menu-item index="/score/topup-record">消费记录</el-menu-item>
        <el-menu-item index="/score/return-record">返还记录</el-menu-item>
      </el-menu>
      <router-view />
    </div>

  </div>
</template>

<style lang="scss" scoped>
header {
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background: #f18636;
  h1 {
    font-size: 1rem;
    margin: 0;
  }
}

.content {
  display: flex;
}

.menu {
  width: 120px;
  margin-right: 16px;;
}
</style>