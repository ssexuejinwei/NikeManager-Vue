<template>
  <header>
    <h1><router-link to="/order">{{title}}</router-link></h1>
    <div>
      <el-input
        size="mini"
        placeholder="订单编号"
        v-model="search"
        clearable
        prefix-icon="el-icon-search"
      >
      <el-button slot="append" type="text">搜索订单</el-button>
      </el-input>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background: #f18636;
  display: flex;
  justify-content: space-between;

  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    font-size: 1rem;
    margin: 0;
  }
}
</style>