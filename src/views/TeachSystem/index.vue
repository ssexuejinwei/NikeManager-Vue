<template>
  <div>
    <header class='teachHeader'>
      <h1>教务系统</h1>
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
      <el-aside style="width: 14rem;">
        <br/><br/><br/><br/>
          <el-menu
          class= 'chooseMenu'
          :default-active="activeChoose"
          @select="handleSelect"
          active-text-color="#ffffff"
          align="center"
          style="height:10.5rem;">
          <template v-for="(teach,index) in teachChoose">
            <el-menu-item :index="index.toString()" :key="teach">
                {{teach}}
            </el-menu-item>
          </template>
            </el-menu>
      </el-aside>
      <el-main>
        <p-student v-if="showIndex ==0"></p-student>
        <p-schedule v-if="showIndex ==2"></p-schedule>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PSchedule from './components/schedule';
import PStudent from './components/student';
export default {
  components: { PSchedule, PStudent },
  data() {
    return {
      showIndex : 0,
      activeChoose :'0',
      teachChoose:['学员档案','教练管理','排课信息'],
      search: '',
      tabPosition: 'left'
    }
  },
  methods: {
    handleSelect(index) {
      this.showIndex = index
    }
  },
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