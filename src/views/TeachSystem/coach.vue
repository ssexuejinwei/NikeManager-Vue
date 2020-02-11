<template>
  <div>
  <div class ='coachList' v-if='isEdit==false'>
    <el-container>
      <el-header >
        <el-col :span="4" :offset="20" style='text-align: left;'>
        <el-menu
         mode = "horizontal"
         :default-active="activeIndexType"
         class='typeMenu'
         >
         <template v-for="typeData in menuType">
           <el-menu-item :index="typeData" :key="typeData">
               {{typeData}}
           </el-menu-item>
         </template>
           </el-menu>
           </el-col>
      </el-header> 
        <br/>
      <el-main >
        <el-table 
          :data="coachTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          height="540"
          :border="true"> 
         <!-- <el-table-column
              fixed="left"
              align='center'
              width="100">
              <template slot-scope="scope">
                <el-radio v-model="check" :label="scope.$index" size="medium "></el-radio>
              </template>
            </el-table-column> -->
          <el-table-column prop="level" label="级别" class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="name" label="姓名" class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="sex" label="性别" class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="age" label="年龄" class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="experience" label="经验" class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="info" label="教学" class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="edit" label="操作" class="borderBottom" align='center'> 
            <template slot-scope="scope">
              <el-button
              size="medium"	
              @click="handleEdit(scope.$index,scope.row)">
              更多
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      
      <el-footer>
      <el-row style="margin-top:1.5rem; ">
        <el-col :span="3"  >
        <el-button type='primary' @click = "outerVisible = true">添加新教练</el-button>
        </el-col>
          <el-col :span="5" >
        <el-button type='info' @click = "deleteCoach" >删除教练</el-button>
        </el-col>
      </el-row>
    </el-footer>
    </el-container>
  </div>
 <div class ='coachEdit'>
    <PEdit :coach ='editCoach' @back='handleBack' v-if='isEdit==true'/>
  </div>
  <!-- 添加新教练 -->
  <el-dialog title="基本信息" :visible.sync="outerVisible ">
    <el-form :model="coachForm" :rules="rules">
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="coachForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-radio-group v-model="coachForm.sex" >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
         <el-input v-model="coachForm.age" autocomplete="off"></el-input>
       </el-form-item>
      <el-form-item label="工龄(年)" prop="workAge" :label-width="formLabelWidth">
        <el-input v-model="coachForm.workAge" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="微信ID" prop="wechat" :label-width="formLabelWidth">
        <el-input v-model="coachForm.wechat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel" :label-width="formLabelWidth">
        <el-input v-model="coachForm.tel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="教练介绍" prop="info" :label-width="formLabelWidth">
        <el-input v-model="coachForm.info" autocomplete="off"></el-input>
      </el-form-item>
      <el-row style="text-align: center;">
        <el-button type='danger' @click='submit' >确定</el-button>
      </el-row>
      </el-form>
     </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import PEdit from './components/coachEdit'
  
  export default{
    components: {
      PEdit
    },
    data() {
      return {
        chooseID:'',//选中的id
        isChoose:false,
        outerVisible:false,
        isEdit:false,
        editCoach :{},
        activeIndexType:'篮球',
        menuType: ['篮球','足球'],
        coachTable:[],
        coachForm:[],
        formLabelWidth: '140px',
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          workAge: [
            { required: true, message: '请输入工龄', trigger: 'blur' },
          ],
          wechat: [
            { required: true, message: '请输入微信', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          info: [
            { required: true, message: '请选择介绍', trigger: 'blur' }
          ]
          }
      }
    },
    watch: {
    },
    created() {
      this.update()
    },
    methods: {
      update(){
        this.coachTable=[]
        let api ='/sellerctr/getCoach'
        this.$axios.get(api).then((response)=>{
          let list=response['data']['data']
          for(let coach of list){
            let obj={
              id :coach['id'],
              level :'主教练',
              name : coach['user_name'],
              age : coach['age'],
              sex : coach['sex']==0?'男':'女',
              experience : coach['experience']+'年以上',
              info :coach['info'],
              edit :'',
            }
           this.coachTable.push(obj)
          }
        })
      },
      submit(){
        let api ='/sellerctr/addCoach'
        let coach = this.coachForm
        var data = {
         user_name : coach.name,
         sex : coach.sex == "男"?0:1,
         age : coach.age,
         experience : coach.workAge,
         info : coach.info,
         tel : coach.tel,
        }
        this.$axios.post(api, qs.stringify(data)
        ).then(() => {
          this.$alert('添加成功', {
                    confirmButtonText: '确定',
                  }).then(()=>{
                    this.outerVisible = false
                    this.update()
                  });
        }).catch(()=>{
          this.$alert('表单填写错误,添加失败')
        })
      },
      handleCurrentChange(val){
        this.chooseID=val['id']
        this.isChoose = true
      },
      deleteCoach(){
        if(this.isChoose){
          this.$confirm('确认删除该教练?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                  }).then(() => {
                    let api ='/sellerctr/deleteCoach'
                    var data = {
                     id : this.chooseID,
                    }
                    this.$axios.post(api, qs.stringify(data)
                    ).then(() => {
                      this.$alert('删除成功', {
                                confirmButtonText: '确定',
                              }).then(()=>{
                                this.update()
                              });
                    }).catch(()=>{
                      this.$alert('删除失败')
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    });          
                  });
          
        }
        else{
          this.$alert('请先选择教练', {
                    confirmButtonText: '确定',
                  });
        }
      },
      handleBack(data){
        this.isEdit =data
      },
      handleEdit(index) {
        this.editCoach = this.coachTable[index]
        this.isEdit = true
      }
    },
  }
</script>

<style lang="scss">
  .borderBottom{
    border-bottom:solid ;
     /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
  }
  .coachList{
    .el-container{
      .el-main{
        .el-radio__label{
          display: none;
        }
      }
    }
  }
</style>
