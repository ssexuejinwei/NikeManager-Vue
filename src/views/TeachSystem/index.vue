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
    
        <!-- <br/><br/><br/><br/> -->
          <el-menu
          mode="horizontal"
          :default-active="this.$route.path"
          @select="handleSelect"
          router
          >
            <el-menu-item index="/teach/student" :key="teachChoose[0]">
                {{teachChoose[0]}}
            </el-menu-item>
            <el-menu-item index="/teach/coach" :key="teachChoose[1]">
                {{teachChoose[1]}}
            </el-menu-item>
            <el-menu-item index="/teach/course" :key="teachChoose[2]">
                {{teachChoose[2]}}
            </el-menu-item>
            <el-menu-item index="/teach/schedule" :key="teachChoose[3]">
                {{teachChoose[3]}}
            </el-menu-item>
            </el-menu>
            <br/>
 <!--     <el-main>
        <Student v-show="showIndex ==0"></Student>
        <Coach v-show="showIndex ==1"></Coach>
        <Schedule v-show="showIndex ==2"></Schedule>
      </el-main> -->
      <router-view></router-view> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIndex : 0,
      activeChoose :'/teach/student',
      teachChoose:['学员档案','教练管理','课程管理','排课信息'],
      search: '',
      tabPosition: 'left'
    }
  },
  created() {
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