<template>
  <div
    v-if="isEdit==false"
    class="courseList"
  >
    <el-container>
      <!-- <el-header >
        <el-col :span="4" :offset="20" style='text-align: right;'>
        <el-menu
         mode = "horizontal"
         :default-active="activeIndexType"
         active-text-color="#ffffff"
         class='typeMenu'
         >
         <template v-for="typeData in menuType">
           <el-menu-item :index="typeData" :key="typeData">
               {{typeData}}
           </el-menu-item>
         </template>
           </el-menu>
           </el-col>
      </el-header> -->
      <br>
      <el-main>
        <el-table
          :data="courseTable"
          highlight-current-row
          height="540"
          :border="true"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            type="selection"
          />
          <el-table-column
            prop="time"
            label="上课时间"
            class="borderBottom"
            align="center"
          />
          <el-table-column
            prop="name"
            label="课程"
            class="borderBottom"
            align="center"
          />
          <el-table-column
            prop="duration"
            label="起止时间"
            class="borderBottom"
            align="center"
          />
          <el-table-column
            prop="edit"
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
            <router-link to="/teach/course/add">
              <el-button>添加课程</el-button>
            </router-link>
          </el-col>
          <el-col :span="5">
            <el-button
              class="delete-button"
              @click="deleteCoach"
            >
              删除课程
            </el-button>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chooseID: '', // 选中的id
      isChoose: false,
      isEdit: false,
      // activeIndexType:'篮球',
      // menuType: ['篮球','足球'],
      courseTable: []
    }
  },
  watch: {
  },
  created () {
    // this.update()
    this.courseTable = []
    const array = [1, 2, 3, 4, 5]
    for (const index of array) {
      const obj = {
        id: index,
        name: '体验课A',
        time: '16-30-17-30',
        duration: '2019.6.6-2019.8.8',
        edit: ''
      }
      this.courseTable.push(obj)
    }
  },
  methods: {
    // update(){
    //   this.coachTable=[]
    //   let api ='/sellerctr/getCoach'
    //   this.$axios.get(api).then((response)=>{
    //     let list=response['data']['data']
    //     for(let coach of list){
    //       let obj={
    //         id :coach['id'],
    //         level :'主教练',
    //         name : coach['user_name'],
    //         age : coach['age'],
    //         sex : coach['sex']==0?'男':'女',
    //         experience : coach['experience']+'年以上',
    //         info :coach['info'],
    //         edit :'',
    //       }
    //      this.coachTable.push(obj)
    //     }
    //   })
    // },
    submit () {
      // let api ='/sellerctr/addCoach'
      // let coach = this.coachForm
      // var data = {
      //  user_name : coach.name,
      //  sex : coach.sex == "男"?0:1,
      //  age : coach.age,
      //  experience : coach.workAge,
      //  info : coach.info,
      //  tel : coach.tel,
      // }
      // this.$axios.post(api, qs.stringify(data)
      // ).then(() => {
      //   this.$alert('添加成功', {
      //             confirmButtonText: '确定',
      //           }).then(()=>{
      //             this.outerVisible = false
      //             this.update()
      //           });
      // }).catch(()=>{
      //   this.$alert('表单填写错误,添加失败')
      // })
    },
    handleCurrentChange (val) {
      this.chooseID = val.id
      this.isChoose = true
    },
    deleteCoach () {
      if (this.isChoose) {
        this.$confirm('确认删除该课程?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '返回',
          type: 'warning'
        }).then(() => {
          this.$alert('删除成功', {
            confirmButtonText: '确定'
          }).then(() => {
            this.update()
          })
        })
      }
      // .then(() => {
      //             let api ='/sellerctr/deleteCoach'
      //             var data = {
      //              id : this.chooseID,
      //             }
      //             this.$axios.post(api, qs.stringify(data)
      //             ).then(() => {
      //               this.$alert('删除成功', {
      //                         confirmButtonText: '确定',
      //                       }).then(()=>{
      //                         this.update()
      //                       });
      //             }).catch(()=>{
      //               this.$alert('删除失败')
      //             })
      //           }).catch(() => {
      //             this.$message({
      //               type: 'info',
      //               message: '已取消删除'
      //             });
      //           });

      // }
      else {
        this.$alert('请先选择课程', {
          confirmButtonText: '确定'
        })
      }
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
