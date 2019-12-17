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
        <el-tabs :tab-position="tabPosition" border style="width:30%: absolute;left:40%;">
            <el-tab-pane v-for="item in teams" :label="item">
              <el-table
                :data="tableDataStudent"
                :show-header = "false"
                border
                :row-class-name="tableRowClassName"
                highlight-current-row
                style="width: 100%;">
                <el-table-column
                  prop="student"
                  align="left">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default{
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'student-title'
      } else {
        return ''
      }
    },
    tableRowClassNameForTypeAge({row, rowIndex}){
      return 'tablerow-age-type'
    }
  },
  data () {
    return {
      tabPosition: 'left',
      teams: ['Team-01', 'Team-02', 'Team-03'],
      tableDataStudent: [{
        student: '学员名单'
      },
      {
        student: '林一'
      },
      {
        student: '林二'
      },
      {
        student: '李别'
      },
      {
        student: '王小利'
      },
      {
        student: '时小某'
      },
      {
        student: '李别'
      },
      {
        student: '王小利'
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
</style>
