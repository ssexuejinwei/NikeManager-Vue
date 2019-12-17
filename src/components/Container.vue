<template>
  <el-container>
    <el-header>Team学员信息</el-header>
    <el-container>
      <el-aside width="200px"
      style="position: absolute;left: 10%;">
        <!-- 左上边部分 -->
        <el-table
          :data="tableDataAge"
          fixed
          :row-class-name="tableRowClassNameForTypeAge"
          show-header = "false"
          highlight-current-row = "true"
          style="width: 100%;">
          <el-table-column
            prop="age"
            width="100"
            align="center"
            class="table-column"
           >
          </el-table-column>
        </el-table>

        <!-- 左下边部分 -->
       <el-table
        :data="tableDataType"
        fixed
        :row-class-name="tableRowClassNameForTypeAge"
        show-header = "false"
        highlight-current-row
        style="width: 100%;">
          <el-table-column
            prop="type"
            width="100"
            align="center">
          </el-table-column>
      </el-table>

      </el-aside>

      <el-main>

        <!-- 右边部分 -->

         <el-table
           :data="tableDataTeam"
           fixed
           show-header = "false"
           highlight-current-row = "true"
           style="width: 100%;position: absolute;left: 30%;top: 9.5%;">
           <el-table-column
             prop="team"
             width="100"
             align="center">
           </el-table-column>
         </el-table>

         <el-table
           :data="tableDataStudent"
           :show-header = "show"
           border
           :row-class-name="tableRowClassName"
           highlight-current-row = "true"
           style="width: 100%;position: absolute;left: 43%;top: 12.7%;">
           <el-table-column
             prop="student"
             align="left">
           </el-table-column>

         </el-table>
        <el-button size="large"
          class="addButton">添加新学员</el-button>
          <el-button size="large"
            class="addTemporaryButton">添加临时学员</el-button>
      </el-main>

    </el-container>
  </el-container>
</template>
<script>
export default {
  name: ' Container ',
  methods: {
    tableRowClassName({row, rowIndex}) {
      if( rowIndex === 0){
        return 'student-title'
      }else{
        return ''
      }
    },
    tableRowClassNameForTypeAge({row, rowIndex}){
      return 'tablerow-age-type'
    }
  },
  data () {
    return {
      show : false,
      tableDataAge: [{
        age: ' 3-4岁 '
      },
      {
        age: '4-5岁'
      },
      {
        age: '5-6岁'
      }],
      tableDataType:[{
        type: "篮球",
      },
      {
         type:"足球"
      }],
      tableDataTeam:[{
        team:"Team-01"
      },
      {
        team:"Team-02"
      },
      {
        team:"Team-03"
      }],
      tableDataStudent:[{
        student:"学员名单"
      },
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
      }]
    }
  }
}
</script>
<style>
.el-table .student-title{
   background: #FE8083;
   color: white;
   font-size: 17px;
 }
.el-table .tablerow-age-type{
    border-color: black;
}
.addButton{
  border-radius: 0px;
  position: absolute;
  color: #FFFFFF;
  background-color: #FE8083;
  width:130px;
  height: 42px;
  top: 45%;
  right: 21%;
}
.addTemporaryButton{
  border-radius: 0px;
  position: absolute;
  color: #FFFFFF;
  background-color: #989999;
  width:130px;
  height: 42px;
  top: 49.7%;
  right: 21%;
}

</style>
