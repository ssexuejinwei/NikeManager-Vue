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
      <el-pagination
        v-if="!isClicked"
        :page-size="pageSizeForCourse"
        style="text-align: right;"
        layout="prev, pager, next"
        :total="courseTotal"
        @current-change="handleCoursePageChange"
      />
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
      <el-pagination
        v-if="!isClicked"
        :page-size="pageSizeForPhase"
        style="text-align: right;"
        layout="prev, pager, next"
        :total="phaseTotal"
        @current-change="handlePhaseChange"
      />

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
      <el-pagination
        v-if="!isClicked"
        :page-size="pageSizeForYear"
        style="text-align: right;"
        layout="prev, pager, next"
        :total="yearTotal"
        @current-change="handleYearChange"
      />
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
import qs from 'qs'
export default {
  components: {
    PFigure
  },
  props: {
    student: {
      type: Object,
      default: () => {}
    },
    markIndex: {
      type: Number,
      default: 1
    }
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
      pageSizeForPhase: 4,
      phaseTotal: 1,
      curPageForPhase: 1,
      pageSizeForYear: 4,
      yearTotal: 1,
      curPageForYear: 1,
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
      const jobj = {
        course: '3-4岁初级篮球(team-01)',
        time: '2020-03-08 ————2020-06-08',
        status: i === 0 ? '未评测' : '已评测'
      }
      const kobj = {
        course: '全学年体测评价(team-01)',
        time: '2020-03-08 ————2020-06-08',
        status: i === 0 ? '未评测' : '已评测'
      }
      // this.tableCourse.push(iobj)
      this.tablePhase.push(jobj)
      this.tableYear.push(kobj)
    }
    this.getCourse()
  },
  methods: {
    getCourse () {
      const api = '/sellerctr/getMarkingList'
      const data = {
        student_id: this.student.id,
        team_id: this.student.teamID,
        cur_page: this.curPageForCourse
      }
      this.$axios.post(api, qs.stringify(data)).then((response) => {
        this.tablePhase = []
        this.phaseTotal = response.data.data.total
        if (this.phaseTotal === 0) {
          return
        }
        this.pageSizeForPhase = response.data.data.per_page
        const data = response.data.data.data
        for (const phase of data) {
          const obj = {
            id: phase.id,
            tpID: phase.tp_id,
            course: phase.tp_name + '(' + this.student.teamName + ')',
            time: phase.start_time + '-' + phase.end_time.split(' ')[1],
            status: phase.star === 0 ? '未评测' : '已评测',
            data: phase.data
          }
          console.log(phase)
          this.tablePhase.push(obj)
        }
      }).catch(() => {
        this.$alert('获取阶段性评测数据失败')
      })
    },
    getPhase () {
      const api = '/sellerctr/getSessionScore'
      const data = {
        id: this.student.id,
        cur_page: this.curPageForPhase
      }
      this.$axios.post(api, qs.stringify(data)).then((response) => {
        this.tableCourse = []
        this.courseTotal = response.data.data.total
        this.pageSizeForCourse = response.data.data.per_page
        const data = response.data.data.data
        for (const course of data) {
          const obj = {
            id: course.id,
            tpID: course.tp_id,
            course: course.tp_name + '(' + course.team_name.name + ')',
            time: course.start_time + '-' + course.end_time.split(' ')[1],
            status: course.star === 0 ? '未评测' : '已评测'
          }
          console.log(course)
          this.tableCourse.push(obj)
        }
      }).catch(() => {
        this.$alert('获取课后反馈数据失败')
      })
    },
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
    handleCoursePageChange (val) {
      this.curPageForCourse = val
      this.getCourse()
    }

  }
}
</script>

<style>

</style>
