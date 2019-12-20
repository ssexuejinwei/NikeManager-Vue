<template>
  <div>
  <el-header>Team学员信息</el-header>
  <el-row>
    <el-col :span="4" offset="8">
        <!-- 左上边部分 -->
      <el-table
        :data="tableDataAge"
        fixed
        :row-class-name="tableRowClassNameForTypeAge"
        show-header = "false"
        highlight-current-row = "true"
        >
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
     >
        <el-table-column
          prop="type"
          align="center">
        </el-table-column>
    </el-table>

    </el-col>

        <!-- 右边部分 -->

       <el-col :span="6" :offset="-3">
       <el-table
         :data="tableDataTeam"
         fixed
         show-header = "false"
         highlight-current-row = "true"
         style="width: 57%;">
         <el-table-column
            prop="team"
           align="center">
         </el-table-column>
       </el-table>
       </el-col>
    <el-col :span="2">
       <el-table
         :data="tableDataStudent"
         :show-header = "false"
         border
         :row-class-name="tableRowClassName"
         highlight-current-row = "true"
         >
         <el-table-column
           prop="student"
           align="left">
         </el-table-column>
       </el-table>
     </el-col>
  </el-row>
  </div>
</template>
<script>
export default {
  name: 'Container',
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
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
  color: #FFFFFF;
  background-color: #FE8083;
  width:130px;
  height: 42px;
}
.addTemporaryButton{
  border-radius: 0px;
  color: #FFFFFF;
  background-color: #989999;
  width:130px;
  height: 42px;
}

</style>
