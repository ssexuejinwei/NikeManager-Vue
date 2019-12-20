<template>
  <el-container>
    <el-header>排课系统</el-header>
    <el-main>
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
         slot="dateCell"
         slot-scope="{date, data}"
        >
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
               <el-submenu index="2">
                 <template slot="title">
                   <span :class="data.is-Selected?'is-selected':''">
                   {{data.day.split('-').slice(2).join('')}}
                   </span>
                 </template>
                  <el-menu-item index="2">选项1</el-menu-item>
                  <el-menu-item index="2">选项2</el-menu-item>
                  <el-menu-item index="2">选项3</el-menu-item>
                </el-submenu>
             </el-menu>
        </template>
      </el-calendar>
      <el-row>
        <el-col :span="5" :offset="2" >
        <el-button :type="buttonType1" @click="buttonClick1">&nbsp;排课&nbsp;</el-button>
        </el-col>
          <el-col :span="5" :offset="2" >
        <el-button :type="buttonType2" @click="buttonClick2" >&nbsp;考勤&nbsp;</el-button>
        </el-col>
        <el-col :span="5" :offset="2" >
        <el-button :type="buttonType3" @click="buttonClick3" >&nbsp;编辑&nbsp;</el-button>
        </el-col>
        </el-row>
    </el-main>

  </el-container>
</template>
<script>
export default {
  name: 'Calender',
  data() {
    return {
      buttonType1:'info',
      buttonType2:'info',
      buttonType3:'info',
      activeIndex: '1'
    }
  },
  methods: {
    fun(data, date) {
     console.log(data)
    },
    buttonClick1(){
      return this.buttonType1=(this.buttonType1 == 'info')?'success':'info'
    },
    buttonClick2(){
      return this.buttonType2=(this.buttonType2 == 'info')?'success':'info'
    },
    buttonClick3(){
      return this.buttonType3=(this.buttonType3 == 'info')?'success':'info'
    }
  }
}
</script>
<style>
  .el-row{
    margin-bottom: 5px !important;
  }
 .el-icon-arrow-down:before{

    /* display: none; */
  }
 p .is-selected {
    background-color: #FE8083;
    color: white;
  }
</style>
