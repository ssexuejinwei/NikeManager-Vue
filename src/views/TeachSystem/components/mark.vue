<template>
  <div class="markPage">
    <!-- 课后反馈 -->
    <div
      v-if="markIndex==1"
      class="afterClass"
    >
      <el-table
        v-if="!isClicked"
        :data="tableCourse"
        style="width: 100%;"
        class="courseTable"
      >
        <el-table-column
          prop="course"
          label="课程"
        />
        <el-table-column
          prop="time"
          label="上课时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="tableCourse[scope.$index]['status']=='未评测'"
              size="medium"
              type="success"
              @click="handleMark(scope.$index,scope.row)"
            >
              未评测
            </el-button>
            <el-button
              v-if="tableCourse[scope.$index]['status']=='已评测'"
              size="medium"
              type="info"
              @click="handleCheckMark(scope.$index,scope.row)"
            >
              已评测
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <span class="demonstration" ></span>
          <el-pagination
          @current-change="handleCoursePageChange"
          :page-size="pageSizeForCourse"
          style="text-align: right;"
            layout="prev, pager, next"
            :total="courseTotal">
          </el-pagination> -->

      <!-- 评测页面 -->
      <div
        v-if="isClicked"
        class="courseMark"
      >
        <el-button
          type="info"
          icon="el-icon-back"
          @click="isClicked = false"
        >
          返回
        </el-button>
        <!-- 查看评测页面 -->
        <div
          v-if="mode=='check'"
          class="check"
        >
          <el-table
            :data="tableMark"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              prop="content"
              label="内容"
            />
            <el-table-column
              prop="performance"
              label="表现"
            />
            <el-table-column
              label="评分"
            >
              <template slot-scope="scope">
                <el-rate
                  v-model="tableMark[scope.$index]['value']"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 提交评测页面 -->
        <div
          v-if="mode=='submit'"
          class="check"
        >
          <el-table
            :data="tableMark"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              prop="content"
              label="内容"
            />
            <el-table-column
              prop="performance"
              label="表现"
            />
            <el-table-column
              label="评分"
            >
              <template slot-scope="scope">
                <el-rate
                  v-model="tableMark[scope.$index]['value']"
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-col
            :span="6"
            :offset="9"
            style="margin-top: 1.25rem;"
          >
            <el-button
              type="success"
              style="text-align: center;"
              @click="classSubmit"
            >
              提交
            </el-button>
          </el-col>
        </div>
      </div>
    </div>
    <!-- 阶段性评测 -->
    <div
      v-if="markIndex==2"
      class="phaseMark"
    >
      <el-table
        v-if="!isClicked"
        :data="tablePhase"
        style="width: 100%;"
        class="courseTable"
      >
        <el-table-column
          prop="course"
          label="课程"
        />
        <el-table-column
          prop="time"
          label="上课时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="tablePhase[scope.$index]['status']=='未评测'"
              size="medium"
              type="success"
              @click="handleMark(scope.$index,scope.row)"
            >
              未评测
            </el-button>
            <el-button
              v-if="tablePhase[scope.$index]['status']=='已评测'"
              size="medium"
              type="info"
              @click="handleCheckMark(scope.$index,scope.row)"
            >
              已评测
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 具体评测页面 -->
      <div
        v-if="isClicked"
        class="courseMark"
      >
        <el-button
          type="info"
          icon="el-icon-back"
          @click="isClicked = false"
        >
          返回
        </el-button>
        <!-- 查看评测页面 -->
        <div
          v-if="mode=='check'"
          class="check"
        >
          <el-table
            :data="tableMark"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              prop="content"
              label="内容"
            />
            <el-table-column
              prop="performance"
              label="表现"
            />
            <el-table-column
              label="评分"
            >
              <template slot-scope="scope">
                <el-rate
                  v-model="tableMark[scope.$index]['value']"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-col style="margin-top: 1.25rem;">
            教练评语:<el-input
              v-model="textarea"
              type="textarea"
              placeholder="输入评语"
              style="text-align: center; "
            />
          </el-col>
        </div>
        <!-- 提交评测页面 -->
        <div
          v-if="mode=='submit'"
          class="check"
        >
          <el-table
            :data="tableMark"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              prop="content"
              label="内容"
            />
            <el-table-column
              prop="performance"
              label="表现"
            />
            <el-table-column
              label="评分"
            >
              <template slot-scope="scope">
                <el-rate
                  v-model="tableMark[scope.$index]['value']"
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </template>
            </el-table-column>
          </el-table>
          <br>
          教练评语:
          <el-input
            type="textarea"
            placeholder="输入评语"
            style="text-align: center; "
          />

          <el-col
            :span="6"
            :offset="9"
            style="margin-top: 1.25rem;"
          >
            <el-button
              type="success"
              style="text-align: center;"
              @click="phaseSubmit"
            >
              提交
            </el-button>
          </el-col>
        </div>
      </div>
    </div>
    <!-- 年度体测 -->
    <div
      v-if="markIndex == 3"
      class="yearMark"
    >
      <el-table
        v-if="!isClicked"
        :data="tableYear"
        style="width: 100%;"
        class="courseTable"
      >
        <el-table-column
          prop="course"
          label="课程"
        />
        <el-table-column
          prop="time"
          label="上课时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-if="tableYear[scope.$index]['status']=='未评测'"
              size="medium"
              type="success"
              @click="handleMark(scope.$index,scope.row)"
            >
              未评测
            </el-button>
            <el-button
              v-if="tableYear[scope.$index]['status']=='已评测'"
              size="medium"
              type="info"
              @click="handleCheckMark(scope.$index,scope.row)"
            >
              已评测
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 具体评测页面 -->
      <div
        v-if="isClicked"
        class="yearMark"
      >
        <el-button
          type="info"
          icon="el-icon-back"
          @click="isClicked = false"
        >
          返回
        </el-button>
        <PFigure :id="parseInt(yearMarkId)" />
        <!-- 查看评测页面 -->
        <br>
        <div
          v-if="mode=='check'"
          class="check"
        >
          教练评语:<el-input
            v-model="textarea"
            type="textarea"
            placeholder="输入评语"
            style="text-align: center; "
          />
          针对性建议:<el-input
            v-model="textarea"
            type="textarea"
            placeholder="输入评语"
            style="text-align: center; "
          />
        </div>
        <br>
        <!-- 提交评测页面 -->
        <div
          v-if="mode=='submit'"
          class="check"
        >
          教练评语:<el-input
            v-model="textarea"
            type="textarea"
            placeholder="输入评语"
            style="text-align: center; "
          />
          针对性建议:<el-input
            v-model="textarea"
            type="textarea"
            placeholder="输入评语"
            style="text-align: center; "
          />
          <el-col
            :span="6"
            :offset="9"
            style="margin-top: 1.25rem;"
          >
            <el-button
              type="success"
              style="text-align: center;"
              @click="yearSubmit"
            >
              提交
            </el-button>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PFigure from './figure'
export default {
  components: {
    PFigure
  },
  props: {
    student: Object,
    markIndex: Number
  },
  data () {
    return {
      yearMarkId: 1,
      textarea: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
      mode: '',
      isClicked: false,
      pageSizeForCourse: 4,
      courseTotal: 1,
      curPageForCourse: 1,
      tableCourse: [],
      tablePhase: [],
      tableYear: [],
      tableMark: [{
        content: '教学内容',
        value: 4,
        performance: '团队表现'
      },
      {
        content: '教学内容',
        value: 3,
        performance: '个人表现'
      },
      {
        content: '运动目标',
        value: 2,
        performance: '身体素质'
      },
      {
        content: '运动目标',
        value: 4,
        performance: '技能'
      },
      {
        content: '情感目标',
        value: 3,
        performance: '团队表现'
      },
      {
        content: '情感目标',
        value: 4,
        performance: '个人表现'
      }
      ]
    }
  },
  created () {
    for (let i = 0; i < 3; i++) {
      const iobj = {
        course: '3-4岁初级篮球(team-01)',
        time: '2020-03-08 17:00-16:30(周三)',
        status: i == 0 ? '未评测' : '已评测'
      }
      const jobj = {
        course: '3-4岁初级篮球(team-01)',
        time: '2020-03-08 ————2020-06-08',
        status: i == 0 ? '未评测' : '已评测'
      }
      const kobj = {
        course: '全学年体测评价(team-01)',
        time: '2020-03-08 ————2020-06-08',
        status: i == 0 ? '未评测' : '已评测'
      }
      this.tableCourse.push(iobj)
      this.tablePhase.push(jobj)
      this.tableYear.push(kobj)
    }
    // this.getCourse()
  },
  methods: {
    yearSubmit () {
      this.$alert('提交成功', {
        confirmButtonText: '确定'
      })
    },
    classSubmit () {
      this.$alert('提交成功', {
        confirmButtonText: '确定'
      })
    },
    phaseSubmit () {
      this.$alert('提交成功', {
        confirmButtonText: '确定'
      })
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      console.log(row, column)
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleMark () {
      this.isClicked = true
      this.mode = 'submit'
    },
    handleCheckMark () {
      this.isClicked = true
      this.mode = 'check'
    },
    getCourse () {
      const api = '/sellerctr/getScheduleByTeamId'
      this.$axios.get(api, {
        params: {
          team_id: this.student.teamID,
          cur_page: this.curPageForCourse,
          page_size: this.pageSizeForCourse
        }
      }).then((response) => {
        const list = response.data.data.data
        this.courseTotal = response.data.data.total
        // console.log(this.coursePages)
        this.tableCourse = []
        for (const course of list) {
          const obj = {
            id: course.id,
            name: course.tp_name,
            team_name: course.team_id,
            startTime: course.start_time,
            endTime: course.end_time
          }
          const jobj = {
            course: obj.name + '(' + obj.team_name + ')',
            time: obj.startTime.split(' ')[1] + '-' + obj.endTime.split(' ')[1],
            finish: ''
          }
          this.tableCourse.push(jobj)
        }
      })
    },
    handleCoursePageChange (val) {
      this.curPageForCourse = val
      this.getCourse()
    }

  }
}
</script>

<style>

</style>
