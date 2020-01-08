<template>
  <div id = "student" >
    <h1>Team学员信息</h1>
  <el-container>
    <el-aside style="width: 6.25rem;">
      </el-aside>

    <el-aside style="width: 13.5rem;">
        <el-menu
        :default-active="activeIndexAge"
        @select="handleSelect"
        active-text-color="#ffffff"
        align="center"
        :class='leftMenu'
        style="height:10.4375rem;">
        <template v-for="ageData in menuAge">
          <el-menu-item :index="ageData" :key="ageData">
              {{ageData}}
          </el-menu-item>
        </template>
        <!-- <el-menu-item index="1" class="borderBottom">
          <template slot="title">3-4岁</template>
        </el-menu-item>
          <el-menu-item class="borderBottom" index="2" >
          <template slot="title">4-5岁</template>
        </el-menu-item>
          <el-menu-item  index="3">
          <template slot="title">5-6岁</template>
        </el-menu-item> -->
          </el-menu>
      <br>
        <el-menu active-text-color="#ffffff"
        :class='leftMenu'
        :default-active="activeIndexType"
        @select="handleSelect"
        style="height:7rem;">
        <template v-for="typeData in menuType">
          <el-menu-item :index="typeData" :key="typeData">
              {{typeData}}
          </el-menu-item>
        </template>
        <!-- <el-menu-item index="1" :class="borderBottom">
          <template slot="title">篮球</template>
        </el-menu-item>
          <el-menu-item index="2">
          <template slot="title">足球</template>
        </el-menu-item> -->
          </el-menu>
      </el-aside>
    <el-aside width="200px" style="height: 37.5rem; border:solid #000000;">
      <el-menu active-text-color="#ffffff"
      :default-active="activeIndexTeam"
      @select="handleSelect"
      align="center"
      style="height: 10.4375rem;">
      <template v-for="teamData in menuTeam">
        <el-menu-item :index="teamData" :key="teamData" :class="teamClass(teamData)">
            {{teamData}}
        </el-menu-item>
      </template>
        <!-- <el-menu-item index="1" :class = "borderBottom">
          <template slot="title">Team-01</template>
        </el-menu-item>
        <el-menu-item index="2" :class = "borderBottom">
          <template slot="title">Team-02</template>
        </el-menu-item>
        <el-menu-item index="3" >
          <template slot="title">Team-03</template>
        </el-menu-item> -->
      </el-menu>
    </el-aside>

    <el-container style="height: 37.5rem; border: solid #000000;border-left: 0;">

      <el-main style="padding: 0;" width="80%">
        <el-table 
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="tableData"
          height="406"
          class="studentTable"
          :border="true">
          <el-table-column prop="student"
          label="学员名单"
          :class="borderBottom"
          >
          </el-table-column>
        </el-table>
        <el-row class ="buttonRow">
          <el-col :span="4" :offset="10" >
          <el-button class ="addButton" @click = "outerVisible = true">添加新学员</el-button>
          </el-col>
          </el-row>
          <el-row class= "buttonRow" style = "margin-top: 0.125rem;">
            <el-col :span="4" :offset="10" >
          <el-button class ="addTemporaryButton" @click = "addTemporaryStudent" >添加临时学员</el-button>
          </el-col>
          </el-row>
      </el-main>

    </el-container>
    <el-aside style="width: 6.5625rem;"></el-aside>
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
<!--      <el-form-item label="积分" prop="points" :label-width="formLabelWidth">
        <el-input v-model="studentForm.points" autocomplete="off"></el-input>
      </el-form-item> -->
<!--      <el-form-item label="家长微信open ID" prop="wechat" :label-width="formLabelWidth">
        <el-input v-model="studentForm.wechat" autocomplete="off"></el-input>
      </el-form-item> -->
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
</template>

<script>
  import qs from 'qs'

  export default {
    name:"StudentEntry",
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
          cur_page :1,
          page_size:10,
          current_teamId : 0,
          infoArray : [], //为每一个学生相关的数据对象
          loading : false,
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
            tel : '18314785647'
          },
          formLabelWidth: '140px',
          menuAge:['3-4岁','4-5岁','5-6岁'],
          menuType:['篮球','足球'],
          menuTeam:['team-01','team-02','team-03'],
          tableData:[],
          tempTableData:[],
          borderBottom : 'borderBottom',
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
        this.update('getStudent')
      },
      watch: {
        activeIndexTeam() {
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
        handleCurrentChange(val){
          this.cur_page = val;
          this.getTempStudent(this.current_teamId)
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
              this.activeIndexTeam = this.menuTeam[0]
              break;
            case 'getStudent':{
              this.infoArray = []
              let api_1 = 'sellerctr/getTeam'
              this.menuTeam =[] // 初始化team数组
              this.$axios.get(api_1).then((response) => {
                // console.log(response)
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
                        let stuObj = {'student' : student['name'],'add':false}
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
              
              this.$axios.post(api, qs.stringify(data)).then((response) => {
                teamName = response['data']['data']['team_name']
                // console.log(teamName)
                this.$alert('<div class="teamSuccess"><h1 class="teamSuccessHead">分配成功 </h1><p class="teamSuccessContent">'+student.name+'小朋友</p><p>被分配至'+teamName+'</p>', '', {
                          dangerouslyUseHTMLString: true
                        });
              }).catch((error)=>{
                this.$alert('表单填写错误，添加失败')
              })
              break;
            }
            default:
              break;
          }
          
        },
        handleAddTemp(index, row){
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
          else{
            this.activeIndexType = key
            this.update('readStudent')
          }
         
          
         
        },
        teamClass(index){
          if(index == this.menuTeam[this.menuTeam.length -1]){
            return 'borderBottom'
          }
          else{
            return ''
          }
        }
      }
      
    }
</script>

<style lang = "scss" >
  #student{
    h1{
      text-align: center;
    }
    .addTempStudentCol{
      border: none !important;
    }
  }
  .el-icon-close:before{
    display: none;
  }
  .el-form-item .label{
    border: solid;
  }
/*  .teamSuccess{
    background-color:#FE8083;
    color:white;
    text-align: center;
  } */
  .teamSuccessContent{
    font-size: larger;
  }
  .teamSuccessHead{
    font-size: large;
  }
   .studentTable th{
    border-bottom: solid black;
    /* border-bottom: solid black !important; */
    background-color: #FE8083;
    color:white;
  }
   .studentTable td{
    border-bottom: solid black ;
    /* border-bottom: solid black !important; */
  }
   .studentTable .border{
   border: solid 100px ;
    /* border: solid 100px !important; */
  }
  .el-menu-item.is-active {
    background-color: #FE8083 !important;
    border-bottom:solid 0.125rem !important;
    font-size: x-large !important;
    border: 1px solid !important;
  }
  .el-table_2_column_2  {
    border-bottom:solid;
  }
  .el-table__header-wrapper, th{
   /* background-color:  #FE8083; */
      color: Black;
      font-size: large;
  }
  .leftMenu{
    width:12.5rem;
    border:solid;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .borderBottom{
    border-bottom:solid ;
     /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
  }
 .buttonRow, .formRow{
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
