<template>
  <div
    v-if="isEdit==false"
    v-loading="isLoading"
    class="courseList"
  >
    <el-container>
      <br>
      <el-main>
        <el-table
          :data="teamTable"
          highlight-current-row
          height="540"
          :border="true"
          @selection-change="handleTableSelect"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            type="selection"
          />
          <el-table-column
            prop="name"
            label="队伍名"
            class="borderBottom"
            align="center"
          />
          <el-table-column
            prop="choose_sports"
            label="类型"
            class="borderBottom"
            align="center"
          >
            <template slot-scope="scope">
              {{ teamTable[scope.$index].choose_sports === '0' ? '篮球' : '足球' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="age_min"
            label="年龄段"
            class="borderBottom"
            align="center"
          >
            <template slot-scope="scope">
              {{ teamTable[scope.$index].age_min + '-' + teamTable[scope.$index].age_max + '岁' }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            class="borderBottom"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="medium"
                @click="handleModify(scope.$index,scope.row)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-footer>
        <el-row style="margin-top:1.5rem; ">
          <el-col :span="3">
            <router-link to="/teach/team/add">
              <el-button>添加队伍</el-button>
            </router-link>
          </el-col>
          <el-col :span="5">
            <el-button
              :disabled="!selectedTeams.length"
              class="delete-button"
              @click="deleteCourses"
            >
              删除队伍
            </el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data () {
    return {
      selectedTeams: [],
      chooseID: '', // 选中的id
      isChoose: false,
      isEdit: false,
      // activeIndexType:'篮球',
      // menuType: ['篮球','足球'],
      teamTable: [],
      isLoading: false
    }
  },
  watch: {
  },
  created () {
    this.update()
  },
  methods: {
    update () {
      this.isLoading = true
      this.courseTable = []
      const api = 'sellerctr/getTeam'
      this.menuTeam = [] // 初始化team数组
      this.$axios.get(api).then((response) => {
        this.teamTable = response.data.data
        this.isLoading = false
      })
    },
    submit () {
    },
    handleCurrentChange (val) {
      this.chooseID = val.id
      this.isChoose = true
    },
    handleTableSelect (val) {
      this.selectedCourses = val
    },
    deleteCourses () {
      this.$confirm('是否删除选中的课程', '提示', { type: 'warning' }).then(() => {
        Promise.all(this.selectedCourses.map(this.deleteCourse))
          .then(() => this.$alert('删除成功', '成功', { type: 'success' }), (e) => {
            console.error(e)
            this.$alert('删除失败', '错误', { type: 'error' })
          })
          .then(this.update())
      })
    },
    deleteCourse (course) {
      const data = {
        id: course.id
      }
      return this.$axios.post('/sellerctr/deleteTeachingPlan', qs.stringify(data))
    },
    handleModify (index, row) {
      this.$router.push({
        path: '/teach/team/change',
        query: {
          team: this.teamTable[index]
        }
      })
    },
    handleBack (data) {
      this.isEdit = data
    },
    handleEdit (index) {
      this.editCoach = this.coachTable[index]
      this.isEdit = true
    }
  }
}
</script>

<style lang="scss">
  .courseList{
    .el-container{
      .el-main{
        .el-radio__label{
          display: none;
        }
        .el-table{
          .el-button{
                color:#52bcf0 ;
                border-color: #52bcf0;
            }
          }
        }
      .el-footer{
        .el-button{
          color: #FFFFFF;
          background-color: #fa7959;
        }
        .delete-button{
          color: #fa7959;
          background-color: #FFFFFF;
          border-color:#fa7959 ;
        }
      }
    }
  }
</style>
