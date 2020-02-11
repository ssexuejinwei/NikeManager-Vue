<template>
  <div>
    
  <div class = "student"  v-if="!isEdit">
  <el-container>
   <el-header>
     <el-col :span='4' style="margin-bottom: 3rem;">
        <el-radio-group fill='#52bcf0' text-color='#fffff' v-model="activeIndexAge" @change='handleSelect'>
             <el-radio-button  v-for="(data,index) in menuAge" :label="data" :value='index' :key='index' ></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6">
        <el-radio-group fill='#52bcf0' text-color='#fffff' v-model="activeIndexType" @change='handleSelect'>
             <el-radio-button  v-for="(data,index) in menuType" :label="data" :value='index' :key='index' ></el-radio-button>
        </el-radio-group>
         </el-col>
    </el-header> 
      <br/>
    <el-container>
      <el-aside width="200px" >
        <el-menu 
        :default-active="activeIndexTeam"
        class = 'teamMenu'
        @select="handleSelect"
        text-color="#000000"
        active-text-color="#52bcf0"
        align="center"
        style="height: 33.5625rem;">
        <template v-for="teamData in menuTeam">
          <el-menu-item :index="teamData" :key="teamData" :class="teamClass(teamData)">
              {{teamData}}
          </el-menu-item>
        </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main >
          <el-table 
            :data="tableData"
            :border="true"> 
            <el-table-column prop="name" label="姓名"  align='center'> </el-table-column>
            <el-table-column prop="sex" label="性别"  align='center'> </el-table-column>
            <el-table-column prop="birth" label="生日"  align='center'> </el-table-column>
            <el-table-column prop="height" label="身高"  align='center'> </el-table-column>
            <el-table-column prop="weight" label="体重"  align='center'> </el-table-column>
            <el-table-column prop="tel" label="联系方式"  align='center'> </el-table-column>
            <el-table-column prop="do" label="操作"  align='center'> 
              <template slot-scope="scope">
                <el-button
                size="medium"	
                @click="handleEdit(scope.$index,scope.row)">
                详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
         
        </el-main>
      </el-container>
     
      
    </el-container>
    <el-footer>
      <el-row style="margin-top: 0.25rem; margin-left: 2rem;">
        <el-col :span="2" :offset="3" >
        <el-button  @click = "outerVisible = true">添加新学员</el-button>
        </el-col>
          <el-col :span="2"  >
        <el-button @click = "addTemporaryStudent"  class='tempButton'>添加临时学员</el-button>
        </el-col>
        <el-col :span="13" :offset='4'>
          <el-pagination
           v-if = "activeIndexTeam=='全部学员'"
          @current-change="handleStudentPageChange"
            :page-size="pageSizeForStudent"
            layout="prev, pager, next"
            :total="pageSizeForStudent * pagesForStudent">
          </el-pagination>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>

  <!-- Form -->
  <el-dialog title="基本信息" :visible.sync="outerVisible ">
    <el-form :model="studentForm" :rules="rules" >
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="studentForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-radio-group v-model="studentForm.sex" >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="生日" prop="birth" :label-width="formLabelWidth">
          <el-col :span="11">
               <el-date-picker type="date" 
               placeholder="选择日期"
                v-model="studentForm.birth" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width: 100%;"></el-date-picker>
             </el-col>
       </el-form-item>
      <el-form-item label="身高(cm)" prop="height" :label-width="formLabelWidth">
        <el-input v-model="studentForm.height" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="体重(kg)" prop="weight" :label-width="formLabelWidth">
        <el-input v-model="studentForm.weight" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel" :label-width="formLabelWidth">
        <el-input v-model="studentForm.tel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="支付方式"  prop="pay" :label-width="formLabelWidth">
          <el-radio-group v-model="studentForm.pay" >
            <el-radio label="微信" value='0'></el-radio>
            <el-radio label="支付宝" value='1'></el-radio>
            <el-radio label="信用卡" value='2'></el-radio>
            <el-radio label="现金" value='3'></el-radio>
          </el-radio-group>
       </el-form-item>
    </el-form>
  
    <el-dialog
          width="30%"
          :visible.sync="innerVisible"
          append-to-body>
           <el-row class ="formRow">
             <el-col :span="10">体能训练</el-col>
             <el-col :span="14">
               <el-radio-group size="medium" v-model="physicalTrainingRadio">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">一年以上</el-radio>
                </el-radio-group>
             </el-col>
           </el-row>
           <el-row class ="formRow">
               <el-col :span="10">球类训练</el-col>
               <el-col :span="12">
                 <el-radio-group size="medium" v-model="ballTrainingRadio">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
               </el-col>
            </el-row>
            <el-row class ="formRow">
                <el-col :span="10">希望选择的运动项目</el-col>
                <el-col  :span="12">
                  <el-radio-group size="medium" v-model="ballChoiceRadio">
                     <el-radio :label="0">篮球</el-radio>
                     <el-radio :label="1">足球</el-radio>
                   </el-radio-group>
                </el-col>
             </el-row>
             <el-row class ="formRow">
               <el-col :span="10">
                 我的队友
               </el-col>
               <el-col :span="12">
                 <el-input v-model="inputTeammateName" placeholder="输入队友姓名"></el-input>
               </el-col>
             </el-row>
          <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button class ="addTemporaryButton" @click="finish" >Team分配</el-button>
          </div>
        </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button class ="addTemporaryButton" @click="innerVisible = true;outerVisible= false" >下一步</el-button>
    </div>

  </el-dialog>
  <el-dialog title="添加临时成员" :visible.sync = "tempVisible">
  <el-table :data="tempTableData">
      <el-table-column property="student_name" label="学生" width="150"></el-table-column>
      <el-table-column  label="添加" width="200">
      <template slot-scope="scope">
         <el-button
        size="medium "
        :disabled ="tempTableData[scope.$index]['add']"
        @click="handleAddTemp(scope.$index,scope.row)">添加</el-button>
       </template>
     </el-table-column>
  </el-table>
  <el-pagination
      @current-change="handleCurrentChange"
      :page-size="page_size"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </el-dialog>
  </div>
    
    <div>
      <PEdit :student='student' v-if='isEdit' @back='handlePEdit' @update='handleEditSave'/>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import PEdit from './components/studentEdit'
  export default {
    name:"StudentEntry",
    components: {
      PEdit
    },
      data() {
        //电话号码验证规则
        var checkPhone = (rule, value, callback) => {
            const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
            if (!value) {
              return callback(new Error('电话号码不能为空'))
            }
            setTimeout(() => {
              // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
              // 所以在前面加了一个+实现隐式转换
         
              if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'))
              } else {
                if (phoneReg.test(value)) {
                  callback()
                } else {
                  callback(new Error('电话号码格式不正确'))
                }
              }
            }, 100)
          }
        return {
          isEdit :false, //是否点击了操作按钮
          student:0, // 编辑的学生
          curPageForStudent:1,
          pageSizeForStudent:7,
          pagesForStudent:10,
          cur_page :1,
          page_size:10,
          current_teamId : 0,
          infoArray : [], //为每一个学生相关的数据对象
          loading : true,
          physicalTrainingRadio:0,
          ballTrainingRadio: 0,
          ballChoiceRadio: 0,
          inputTeammateName:'',
          activeIndexAge:'3-4岁',
          activeIndexType:'篮球',
          activeIndexTeam:'team-01',
          outerVisible : false,
          innerVisible : false,
          tempVisible: false,
          studentForm: {
            name: '',
            sex: '',
            birth: '',
            height:'',
            weight: '',
            tel : '18314785647',
            pay:''
          },
          formLabelWidth: '140px',
          menuAge:['3-4岁','4-5岁','5-6岁'],
          ageClass:['','',''],
          menuType:['篮球','足球'],
          menuTeam:['team-01','team-02','team-03'],
          tableData:[],
          tempTableData:[],
          leftMenu : 'leftMenu',
          rules : {
            name:[
              {required:true, message:'请输入姓名', trigger:'blur'},
              { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            sex:[
              { required: true, message: '请填写身高', trigger: 'blur' }
            ],
            height: [
              { required: true, message: '请填写身高', trigger: 'blur' }
              // { type: 'number', message: '身高必须为数字值'}
            ],
            birth:[
               {required: true, message: '请选择日期', trigger: 'change' }
            ],
            weight: [
              { required: true, message: '请填写体重', trigger: 'blur' }
              // { type: 'number', message: '体重必须为数字值'}
            ],
            pay: [
              { required: true, message: '请选择支付方式', trigger: 'blur' }
              // { type: 'number', message: '体重必须为数字值'}
            ],
            tel: [
              { required: true, message: '请填写联系方式', trigger: 'blur' },
              { validator: checkPhone, trigger: 'blur' }
            ],
            points: [
              { required: true, message: '请填写积分', trigger: 'blur' },
              { type: 'number', message: '积分必须为数字值'}
            ]
          }
         }
        },
      created() {
        console.log('hello')
        this.update('getStudent')
      },
      watch: {
        activeIndexTeam(newValue) {
          if(newValue == '全部学员'){
            this.getAllStudent()
            return
          }
          let isHave = false
          for(let info of this.infoArray){
            if( info['ageKey']== this.activeIndexAge && info['type'] == this.activeIndexType && info['teamName'] == this.activeIndexTeam){
                this.tableData = info['tableData']
                isHave = true
            }
          }
          if(!isHave){
            this.tableData=[]
          }
          for(let info of this.infoArray){
            if(info['teamName'] == this.activeIndexTeam){
              this.current_teamId = info['teamID']
              break
            }
          }
        }
      },
      methods: {
        handleEditSave(data){
          if(data){
            this.getAllStudent()
          }
        },
        handlePEdit(data){
          this.isEdit = data
        },
        handleStudentPageChange(val){
          this.curPageForStudent = val;
          this.getAllStudent()
        },
        handleCurrentChange(val){
          this.cur_page = val;
          this.getTempStudent(this.current_teamId)
        },
        getAllStudent(){
          let api = '/sellerctr/getStudents'
          this.$axios.get(api,{
            params:{
              age_min:parseInt(this.activeIndexAge.split('-')[0]),
              age_max:parseInt(this.activeIndexAge.split('-')[1].split('岁')[0]),
              choose_sports : this.activeIndexType=='篮球'?0:1,
              cur_page : this.curPageForStudent,
              page_size : this.pageSizeForStudent
            }
          }).then((response)=>{
            let list = response['data']['data']['data']
            this.pagesForStudent = response['data']['data']['total_page']
            // console.log(this.pagesForStudent)
            this.tableData=[]
            for( let student of list){
              let obj ={
                id : student['id'],
                teamID : student['team_id'],
                name : student['name'],
                sex : student['sex']==0?'男':'女',
                birth : student['birthday'],
                height :student['height']+'cm',
                weight : student['weight'] +'kg',
                tel : student['tel'],
                physicalExperience:student['physical_experience']==null?'无':student['physical_experience'],
                ballExperience:student['ball_experience']==null?'无':student['ball_experience'],
                points:student['score'],
                friendName:student['friend_name']==null?'无':student['friend_name'],
                wechat:student['open_id'],
                do :'',
                avatar:student['avatar'],
                teamName:student['team_name']
              }
              this.tableData.push(obj)
            }
          })
        },
        getTempStudent(teamId){
          let api = '/sellerctr/getChangeTemaStudent'
          let cur_page = this.cur_page
          let page_size = this.page_size
          this.tempTableData = []
          this.$axios.get(api,{
            params:{
              cur_page :cur_page,
              page_size : page_size,
              team_id : teamId
            }
          }).then((response)=>{
            let list = response['data']['data']
            for( let student of list){
              let student_id = student['id']
              let name = student['name']
              let obj ={
                student_id : student_id,
                student_name : name,
                add : false
              }
              this.tempTableData.push(obj)
            }
          })
        },
        update(type){
          switch (type){
            case'readStudent':
              this.menuTeam =[] // 初始化team数组
              for(let info of this.infoArray){
                if( info['ageKey'] == this.activeIndexAge && info['type'] == this.activeIndexType ){
                  this.menuTeam.push(info['teamName'])
                  if(info['teamName'] == this.menuTeam[0]){
                    this.tableData = info['tableData']
                  }
                }
              }
              this.menuTeam = this.menuTeam.sort()
              this.menuTeam.splice(0,0,'全部学员')
              this.activeIndexTeam = '全部学员'
              break;
            case 'getStudent':{
              this.infoArray = []
              let api_1 = 'sellerctr/getTeam'
              this.menuTeam =[] // 初始化team数组
              this.$axios.get(api_1).then((response) => {
                let dataArray = response['data']['data']
                // let teamObj = {'3-4岁':[],'4-5岁':[],'5-6岁':[]}
                //遍历team数组
                // let i = 0
                for (let data of dataArray){
                  let id = data['id']
                  let age_min = data['age_min']
                  let age_max = data['age_max']
                  let name = data['name']
                  let choose_sports = data['choose_sports'] =='0'?'篮球':'足球'
                  let ageKey = age_min+'-'+age_max+'岁'
                  //初始化team 数组
                  if( ageKey== this.activeIndexAge && choose_sports == this.activeIndexType){
                    this.menuTeam.push(name)
                  }
                  this.activeIndexTeam = this.menuTeam[0]
                  if(this.menuTeam.length == 1){
                    this.current_teamId = id
                  }
                  //get 具体成员
                  let api_2 = '/sellerctr/getStudentsByTeamId?id=' + id
                  this.$axios.get(api_2).then((response) => {
                      // i++
                      let studentArray = response['data']['data']
                      let tableData = []
                      for(let student of studentArray){
                        let stuObj = {
                          id : student['id'],
                          name : student['name'],
                          sex : student['sex']==0?'男':'女',
                          birth : student['birthday'],
                          height :student['height']+'cm',
                          weight : student['weight'] +'kg',
                          tel : student['tel'],
                          do :'',
                          avatar:student['avatar'],
                          }
                        tableData.push(stuObj)
                      }
                      //封装相同岁数相同类型的数据
                      let obj ={
                        teamID : id,
                        ageKey : ageKey,
                        teamName : name,
                        type : choose_sports,
                        tableData : tableData,
                      }
                      if( obj['ageKey'] == this.activeIndexAge && obj['type'] == this.activeIndexType &&obj['teamName'] == this.activeIndexTeam){
                        this.tableData = obj['tableData']
                      }
                      this.infoArray.push(obj)
                    })//api-2请求完成
                }
                this.menuTeam = this.menuTeam.sort()
                this.menuTeam.splice(0,0,'全部学员')
                this.activeIndexTeam = '全部学员'
               })
               break;
            }
            case 'addStudent': {
              // let url = 'http://124.251.4.221/course/public/index.php/index'
              let api = '/sellerctr/addStudent'
              let student = this.studentForm
              let teamName = ''
              var data = {
                name : student.name,
                sex : student.sex == "男"?0:1,
                birthday : student.birth,
                height : parseInt(student.height),
                weight : parseInt(student.weight),
                tel : student.tel,
                physical_training : this.ballTrainingRadio,
                ball_training : this.ballChoiceRadio,
                choose_sports : this.ballChoiceRadio,
                mateName : this.inputTeammateName
              }
              
              this.$axios.post(api, qs.stringify(data)
              ).then((response) => {
                teamName = response['data']['data']['team_name']
                // console.log(teamName)
                this.$alert('<div><h1 class="teamSuccessHead">分配成功 </h1><p class="teamSuccessContent">'+student.name+'小朋友</p><p>被分配至'+teamName+'</p>', '', {
                          dangerouslyUseHTMLString: true
                        });
              }).catch((error)=>{
                let status = error.response.status
                if(status == 200){
                  this.$alert('没有查找到家长账号,请小程序先注册')
                }
                else{
                  this.$alert('表单填写错误,添加失败')
                }
              })
              break;
            }
            default:
              break;
          }
          
        },
        handleAddTemp(index){
          let api = '/sellerctr/changeTeam'
          let team_id= this.current_teamId
          let data = {
            team_id : team_id,
            student_id : this.tempTableData[index]['student_id']
          }
          this.$axios.post(api, qs.stringify(data)).then( (response)=>{
            let code = response['data']['code']
            let name = ''
            if( code == 0){
              let response_teamid = response['data']['data']['team_id']
              for (let info of this.infoArray){
                if(info['teamID'] == response_teamid){
                  name = info['teamName']
                }
              }
              this.$alert('成功添加至'+name, {
                        confirmButtonText: '确定',
                    })
              this.tempTableData[index]['add'] = true
              this.update('getStudent')
            }
            else{
              this.$alert('添加失败', {
                        confirmButtonText: '确定',
                    })
            }
          })
        },
        
        handleEdit(index){
          this.student = this.tableData[index]
          this.isEdit = true
        },
        
        finish(){
          this.innerVisible = false
          this.outerVisible = false
          this.update('addStudent')
          this.update('getStudent')
        },
        addTemporaryStudent(){
          this.tempVisible = true
          let teamId= this.current_teamId
          this.tempTableData = []
          this.getTempStudent(teamId)
        },
        
        handleSelect(key){
          if(key.indexOf('team')!=-1){
            this.activeIndexTeam = key
          }
          else if(key.indexOf('岁')!=-1){
            this.activeIndexAge = key
            this.update('readStudent')
          }
          else if(key.indexOf('全部')!=-1){
            this.activeIndexTeam = '全部学员'
          }
          else{
            this.activeIndexType = key
            this.update('readStudent')
          }
          console.log('i am here')
        },
        teamClass(index){
          if(index == this.menuTeam[this.menuTeam.length -1]){
            return ''
          }
          else{
            return ''
          }
        }
      }
      
    }
</script>
<style lang="scss">
  $Blue:'#52bcf0';
  .student{
    .el-container{
      .el-header{
      }
      .el-footer{
        .el-button{
          color: #FFFFFF;
          background-color: #fa7959;
        }
        .tempButton{
          color: #fa7959;
          background-color: #FFFFFF;
          border-color:#fa7959 ;
        }
      }
      .el-container{
        .el-container{
          .el-main{
            .el-button{
              color:#52bcf0 ;
              border-color: #52bcf0;
            }
          }
        }
      }
    }
  }

</style>
