<template>
  <div id = "student" >
    <h1>Team学员信息</h1>
  <el-container>
    <el-aside style="width: 6.25rem;">
      </el-aside>

    <el-aside style="width: 13.5rem;">
        <el-menu
        :default-active="activeIndexAge"
        @select="handleSelectAge"
        active-text-color="#ffffff"
        align="center"
        :class='leftMenu'
        style="height:10.4375rem;">
        <el-menu-item index="1" class="borderBottom">
          <template slot="title">3-4岁</template>
        </el-menu-item>
          <el-menu-item class="borderBottom" index="2" >
          <template slot="title">4-5岁</template>
        </el-menu-item>
          <el-menu-item  index="3">
          <template slot="title">5-6岁</template>
        </el-menu-item>
          </el-menu>
      <br>
        <el-menu active-text-color="#ffffff"
        :class='leftMenu'
        :default-active="activeIndexType"
        @select="handleSelectType"
        style="height:7rem;">
        <el-menu-item index="1" :class="borderBottom">
          <template slot="title">篮球</template>
        </el-menu-item>
          <el-menu-item index="2">
          <template slot="title">足球</template>
        </el-menu-item>
          </el-menu>
      </el-aside>
    <el-aside width="200px" style="height: 37.5rem; border:solid #000000;">
      <el-menu active-text-color="#ffffff"
      :default-active="activeIndexTeam"
      @select="handleSelectTeam"
      align="center"
      style="height: 10.4375rem; border-bottom:solid #000000;">
        <el-menu-item index="1" :class = "borderBottom">
          <template slot="title">Team-01</template>
        </el-menu-item>
        <el-menu-item index="2" :class = "borderBottom">
          <template slot="title">Team-02</template>
        </el-menu-item>
        <el-menu-item index="3" >
          <template slot="title">Team-03</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 37.5rem; border: solid #000000;border-left: 0;">

      <el-main style="padding: 0; !important;" width="80%">
        <el-table :data="tableData"
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
          <el-button class ="addTemporaryButton" @click = "tempVisible = true" >添加临时学员</el-button>
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
      <el-form-item label="积分" prop="points" :label-width="formLabelWidth">
        <el-input v-model="studentForm.points" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="家长微信open ID" prop="wechat" :label-width="formLabelWidth">
        <el-input v-model="studentForm.wechat" autocomplete="off"></el-input>
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
      <el-button class ="addTemporaryButton" @click="innerVisible = true;outerVisible= false " >下一步</el-button>
    </div>

  </el-dialog>
  <el-dialog title="添加临时成员" :visible.sync = "tempVisible">
	<el-table :data="tableData">
	    <el-table-column property="student" label="学生" width="150"></el-table-column>
	    <el-table-column  label="添加" width="200">
			<template slot-scope="scope">
			   <el-button
				size="medium "
				:disabled ="tableData[scope.$index]['add']"
				@click="handleAddTemp(scope.$index,scope.row)">添加</el-button>
			   <el-button
				size="medium "
				type="danger"
				:disabled ="!tableData[scope.$index]['add']"
				@click="handleDelTemp(scope.$index, scope.row)">删除</el-button>
			 </template>
	   </el-table-column>
	</el-table>
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
          physicalTrainingRadio:0,
          ballTrainingRadio: 0,
          ballChoiceRadio: 0,
          inputTeammateName:'',
          activeIndexAge:'1',
          activeIndexType:'1',
          activeIndexTeam:'1',
          outerVisible : false,
          innerVisible : false,
          tempVisible: false,
          studentForm: {
            name: '徐厚',
            sex: 0,
            birth: '',
            height: '134',
            weight: '34',
            tel : '18714234876',
            points: '123',   //积分
            wechat: 'www11'   //家长微信openID
          },
          formLabelWidth: '140px',
          menuAge:{
          '1':'3-4岁',
          '2':'4-5岁',
          '3':'5-6岁'
          },
          tableData:[
            {
            "student":"林一",
            "add" : false
            },
            {
            "student":"林二",
            "add": false
            },
            {
            "student":"李别",
            "add": false
            },
            {
            "student":"王小利",
            "add": false
            },
            {
            "student":"时小某",
            "add" : false
            },
            {
            "student":"李别",
            "add" : false
            },
            {
            "student":"王小利",
            "add" : false
          }],
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
            birth:[
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            height: [
              { required: true, message: '请填写身高', trigger: 'blur' },
              { type: 'number', message: '身高必须为数字值'}
            ],
            weight: [
              { required: true, message: '请填写体重', trigger: 'blur' },
              { type: 'number', message: '体重必须为数字值'}
            ],
            tel: [
              { required: true, message: '请填写联系方式', trigger: 'blur' },
              { validator: checkPhone, trigger: 'blur' }
            ],
            points: [
              { required: true, message: '请填写积分', trigger: 'blur' },
              { type: 'number', message: '积分必须为数字值'}
            ],
            wechat: [
              { required: true, message: '请填写微信', trigger: 'blur' }
            ],
            
          }
         }
        },
      methods: {
        handleAddTemp(index, row){
          console.log(this.tableData[index]['student'],row)
          this.$alert('添加成功', {
                    confirmButtonText: '确定',
                })
          this.tableData[index]['add'] = true
        },
        handleDelTemp(index,row){
          this.$alert('删除成功', {
                    confirmButtonText: '确定',
                })
          this.tableData[index]['add'] = false
        },
        
        finish(){
          this.innerVisible = false
          this.outerVisible = false
          var student = this.studentForm
          var data = {
            name : student.name,
            sex : student.sex == "男"?0:1,
            birthday : student.birth,
            height : parseInt(student.height),
            weight : parseInt(student.weight),
            tel : student.contact,
            score : parseInt(student.points),
            physical_trainin : this.ballTrainingRadio,
            ball_training : this.ballChoiceRadio,
            choose_sports : this.ballChoiceRadio,
            mateName : this.inputTeammateName
          }
          console.log(data)
          // this.$axios.post()
          // /sellerctr/getTeam
          // this.$axios.get('/sellerctr/getTeam').then(response =>{
          //   console.log(response)
          // })
          let token ="a1f6lJiUatGyCOU1hIWdlRBpH9uyuLQgPvHKCLy2"
          var loginInfo = {
                                user_name:'test123',
                                psw:'test123',
                              }
          // this.$axios.post('http://124.251.4.221/course/public/index.php/index/sellerctr/login',
          //  qs.stringify(loginInfo), {
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //   }
          // }).then((response) => {
          //   console.log(response)
          // })
          // this.$axios.post('http://124.251.4.221/course/public/index.php/index/sellerctr/addStudent',
          //  qs.stringify(data), {
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //     'token' :'a5abOIgimFcFOHSyV/69/hj0MA8O1+TrvkubCwNY'
          //   }
          // }).then((response) => {
          //   console.log(response)
          // })
          
          
          this.$alert('<div class="teamSuccess"><h1 class="teamSuccessHead">分配成功 </h1><p class="teamSuccessContent">王某某小朋友</p><p>被分配至Team-02</p>', '', {
                    dangerouslyUseHTMLString: true
                  });
        },
        addTemporaryStudent(){
          alert("add fail")
        },
        handleSelectAge(key) {
         this.activeIndexAge = key;
        },
        handleSelectType(key) {
         this.activeIndexType = key;
        },
        handleSelectTeam(key) {
         this.activeIndexTeam = key;
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
