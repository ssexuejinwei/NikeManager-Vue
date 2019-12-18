<template id ="Student">
  <div>
    <h1>学员信息</h1>
  <el-container >

    <el-aside>
      </el-aside>

    <el-aside style="width: 7.5rem;">
        <el-menu
        :default-active="activeIndexAge"
        @select="handleSelectAge"
        active-text-color="#ffffff"
        align="center"
        :class='leftMenu'
        style="height:10.4375rem;">
        <el-menu-item index="1" class="borderBottom">
          <template slot="title">3-4岁</template>
        </el-menu-item>
          <el-menu-item class="borderBottom" index="2" >
          <template slot="title">4-5岁</template>
        </el-menu-item>
          <el-menu-item  index="3">
          <template slot="title">5-6岁</template>
        </el-menu-item>
          </el-menu>
      <br>
        <el-menu active-text-color="#ffffff"
        :class='leftMenu'
        :default-active="activeIndexType"
        @select="handleSelectType"
        style="height:7rem;">
        <el-menu-item index="1" :class="borderBottom">
          <template slot="title">篮球</template>
        </el-menu-item>
          <el-menu-item index="2">
          <template slot="title">足球</template>
        </el-menu-item>
          </el-menu>
      </el-aside>
    <el-aside width="200px" style="height: 37.5rem; border:solid #000000;">
      <el-menu active-text-color="#ffffff"
      :default-active="activeIndexTeam"
      @select="handleSelectTeam"
      align="center"
      style="height: 10.4375rem; border-bottom:solid #000000;">
        <el-menu-item index="1" :class = "borderBottom">
          <template slot="title">Team-01</template>
        </el-menu-item>
        <el-menu-item index="2" :class = "borderBottom">
          <template slot="title">Team-02</template>
        </el-menu-item>
        <el-menu-item index="3" >
          <template slot="title">Team-03</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 37.5rem; border: solid #000000;border-left: 0;">

      <el-main style="padding: 0; !important;" width="100%">
        <el-table :data="tableData"
          :border="true">
          <el-table-column prop="student"
          label="学生名单"
          :class="borderBottom"
          style="width: 100%; border-bottom: solid !important;">
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="4" :offset="10" >
          <el-button class ="addButton">添加新学员</el-button>
          </el-col>
          </el-row>
          <el-row style = "margin-top: 0.125rem;">
            <el-col :span="4" :offset="10" >
          <el-button class ="addTemporaryButton" >添加临时学员</el-button>
          </el-col>
          </el-row>
      </el-main>

    </el-container>
  </el-container>
  </div>
</template>

<script>
  export default {
    name:"StudentEntry",
      data() {
        return {
          activeIndexAge:'1',
          activeIndexType:'1',
          activeIndexTeam:'1',
          menuAge:{
            '1':'3-4岁',
            '2':'4-5岁',
            '3':'5-6岁'
          },
          tableData:[
          {
            student:"林一"
          },
          {
            student:"林二"
          },
          {
            student:"李别"
          },
          {
            student:"王小利"
          },
          {
            student:"时小某"
          },
          {
            student:"李别"
          },
          {
            student:"王小利"
          }],
          borderBottom : 'borderBottom',
          leftMenu : 'leftMenu'
        }
      },
      methods: {
        handleSelectAge(key) {
         this.activeIndexAge = key;
        },
        handleSelectType(key) {
         this.activeIndexType = key;
        },
        handleSelectTeam(key) {
         this.activeIndexTeam = key;
        }
      }
    }
</script>

<style>
  .el-table td{
    border-bottom: solid black !important;
  }
  .el-table .border{
    border: solid 100px !important;
  }
  .el-menu-item.is-active {
    background-color: #FE8083 !important;
    border-bottom:solid 0.125rem !important;
    font-size: large !important;
    border: 1px solid !important;
  }
  .el-table_2_column_2  {
    border-bottom:solid;
  }
  .el-table__header-wrapper, th{
    background-color:  #FE8083;
      color: Black;
      font-size: large;
  }
  .leftMenu{
    width:5.875rem;
    border:solid;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .borderBottom{
    border-bottom:solid ;
     /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
  }
  .el-row{
    margin-top: 3.5rem;
    margin-bottom:1px;
  }
  .el-table .el-table-column{
    margin-top: 0rem;
  }
#Student{
    font-size: 6.25rem;
  }
 .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    /* color: #333; */
  }
  .el-icon-arrow-down:before{
    display: none;
  }
  .addButton{
    font-size: larger;
    text-align: center;
    border-radius: 0px;
    color: #FFFFFF;
    background-color: #FE8083;
    width:10rem;
    height: 3.125rem;
  }
  .addTemporaryButton{
    text-align: center;
    font-size: larger;
    border-radius: 0px;
    color: #FFFFFF;
    background-color: #989999;
    width:10rem;
    height: 3.125rem;
  }
</style>
