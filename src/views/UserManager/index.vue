<template>
  <div>
    <header class='teachHeader'>
      <h1>用户管理</h1>
      <div>
        <el-input
          size="mini"
          placeholder="输入"
          v-model="search"
          clearable
          prefix-icon="el-icon-search"
        >
        <el-button slot="append" type="text">搜索</el-button>
        </el-input>
      </div>
    </header>
    
    <el-container>
      
    </el-container>
  </div>
</template>

<script>
import Schedule from './components/schedule';
import Student from './components/student';
export default {
  components: { Schedule, Student },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    }
}
</script>

<style lang="scss">
$Green: #69bc38;
$Gray: #cdcdcb;
$Red : #92535e;
$pink : #FE8083;
.teachHeader  {
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background: $pink;
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
  .chooseMenu{
    margin-left: 1.25rem;
    width:12.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .chooseMenu .el-menu-item.is-active {
    background-color: $Green ;
    font-size: x-large !important;
    border: 1px solid !important;
  }
</style>