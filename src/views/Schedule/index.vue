<template>
  <div id='schedule'>
    <el-container class='container'>
      <el-header>排课系统</el-header>
      <el-main class ='main'>

        <el-calendar>
          <template
            slot="dateCell"
            slot-scope="{date, data}">
            <p :id="getDate(date,data)"
              :class="data.isSelected ?'is-selected':''">
              {{data.day.split('-').slice(2).join('')}}
            </p>
            <!-- 排课菜单 -->
            <el-dialog :title='getTitle(data.day,state)' :visible.sync="(state =='schedule'|| state=='edit')&&scheduleVisible&&data.isSelected">
             <el-cascader-panel :options="options" @change='((data) =>{scheduleChange(data,state)})'></el-cascader-panel>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="cancelDialog(state)">取 消</el-button>
                 <el-button type="primary" @click="submitDialog(state)">确 定</el-button>
               </div>
            </el-dialog>
            
            <!-- 考勤菜单 -->
            <el-dialog :title='getTitle(data.day,state)' :visible.sync="state =='checkAttend'&&checkAttendVisible&&data.isSelected">
             <el-cascader-panel :options="options" @change='((data) =>{scheduleChange(data,state)})'></el-cascader-panel>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="cancelDialog(state)">取 消</el-button>
                 <el-button type="primary" @click="submitDialog(state)">下一步</el-button>
               </div>
            </el-dialog>
            <!-- 考勤名单 -->
            <el-dialog :title="getTitle(data.day,state)" :visible.sync="dialogTableVisible">
               <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="学生名单"
                  prop='student_name'
                  width="180">
                </el-table-column>
                <el-table-column  label="考勤" width="180">
                  <template slot-scope="scope">
                    <el-button
                    size="medium"	
                    type='text'
                    @click="handleAttend(scope.$index,scope.row, $event)">
                    <span :class="tableData[scope.$index]['sign_in']=='attend'?'attend':'normal'">
                      签到
                    </span>
                    </el-button>
                    <el-button
                    size="medium"
                    type='text'
                    @click="handleAbsent(scope.$index, scope.row, $event)">
                    <span :class="tableData[scope.$index]['sign_in']=='absent'?'absent':'normal'" >
                      缺席
                    </span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog(state)">上一步</el-button>
                <el-button type="primary" @click="submitDialog(state)">确定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-calendar>
        <el-row class ="scheduleButton">
          <el-col :span="5" :offset="2" >
          <el-button :type="buttonType['schedule']" @click="buttonClick('schedule')">&nbsp;排课&nbsp;</el-button>
          </el-col>
            <el-col :span="5" :offset="2" >
          <el-button :type="buttonType['checkAttend']" @click="buttonClick('checkAttend')">&nbsp;考勤&nbsp;</el-button>
          </el-col>
          <el-col :span="5" :offset="2" >
          <el-button :type="buttonType['edit']" @click="buttonClick('edit')" >&nbsp;编辑&nbsp;</el-button>
          </el-col>
          </el-row>
      <!--    <el-row v-else>
            <el-col :span="5" :offset="12" >
            <el-button type="success" @click="buttonClick('submit')" >&nbsp;确定&nbsp;</el-button>
            </el-col>
          </el-row> -->
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import qs from 'qs'
export default {
  name: 'Schedule',
  data() {
    return {
      token : '',
      isLoad : false,
      dialogTableVisible : false,
      scheduleVisible:false,
      checkAttendVisible:false,
      scheduleList:{},
      attendSchedule:{
        duration :'',
        schedule_id :'',
        team_id : '',
        team_name:'',
        coach_name:'',
        course_name : ''
      },
      editSchedule:{
        id : '',
        start_time:'',
        end_time:'',
        tp_id:'',
        coach_id:'',
        team_id:''
      },
      schedule:{
        start_time:'',
        end_time:'',
        tp_id:'',
        coach_id:'',
        team_id:''
      },
      teamClick:{},
      courseClick:{},
      coachClick:{},
      date : '', //年-月-日
      coachList : ['杜教练', '赵教练', '熊教练', '林教练', '韩教练' ],
      courseList : ['3-4岁兴趣班', '4-6岁初级足球班', '5-6岁初级篮球班'],
      teamList : ['Team-01', 'Team-02', 'Team-03'],
      typeList : ['Team', '教练', '课程'],
      timeList : ['16:00-17:00', '17:00-18:00', '18:00-19:00'],
      state : 'lookup',
      showMenu : 'none',
      buttonType: {'schedule':'info','checkAttend':'info','edit':'info'},
      activeIndex: '1',
      tableData:[],
      options:[{
          value:'16:00-17:00',
          label:'16:00-17:00',
          children:[]
        },
        {
          value : '17:00-18:00',
          label: '17:00-18:00',
          children:[]
        },
        {
          value:'18:00-19:00',
          label:'18:00-19:00',
          children:[]
        }
        ]
      }
  },
  created:function(){
      if(localStorage.getItem('nike#token')){
        this.token = localStorage.getItem('nike#token')
      }
      for(var coach of this.coachList){
        this.coachClick[coach] = false
      }
      for(var team of this.teamList){
        this.teamClick[team] = false
      }
      for(var course of this.courseList){
        this.courseClick[course] = false
      }
      this.getData()
    },
  watch: {
    state(newValue, oldValue) {
      console.log(newValue,oldValue)
      if(newValue == 'lookup'){
        return
      }
    }
  },
  methods: {
    getData(){
      let api_1 = '/sellerctr/getSchedule'
      let api_2 = '/sellerctr/getCoach'
      let api_3 = '/sellerctr/getTeam'
      let api_4 = '/sellerctr/getCourse'
      /**
       *   获取教练和队伍的id  并将其 放在一个对象数组里
       */
      //获取当前排课
      this.$axios.get(api_1,{
        params:{
          start_time :'',
          end_time : '',
        }
      }).then((response)=>{
          this.scheduleList = response['data']['data']
      })
      
      //获取教练
      this.$axios.get(api_2).then((response)=>{
        this.coachList = []
        let data = response['data']['data']
        for(let coach of data){
          let obj ={
            id:coach['id'],
            name: coach['user_name']
          }
          this.coachList.push(obj)
        }
        //获取队伍
        this.$axios.get(api_3).then((response)=>{
          this.teamList = []
          let data = response['data']['data']
          for(let team of data){
            let obj ={
              id : team['id'],
              name : team['name']
            }
            this.teamList.push(obj)
          }
          //获取课程
          this.$axios.get(api_4).then((response)=>{
            this.courseList = []
            let data = response['data']['data']
            for(let course of data){
              let obj ={
                id : course['id'],
                name : course['name']
              }
              this.courseList.push(obj)
            }
            this.update('schedule')
          })
        })
      })
    },
    cancelDialog(key){
      switch (key){
        case 'schedule':
          this.scheduleVisible = false
          this.buttonType[key] = 'info'
          break;
        case 'checkAttend':
          this.checkAttendVisible = false
          this.buttonType[key] = 'info'
          break;
        case 'checkTable':
          this.dialogTableVisible = false
          this.checkAttendVisible = true
          break;
        default:
          break;
      }
     
    },
    submitDialog(key){
      switch (key){
        case 'schedule':
          let api_1 = '/sellerctr/schedule'
           if(this.schedule['tp_id'] === ''){
             this.$alert('请选择排课信息', {
                       confirmButtonText: '确定',
                   })
             return
           }
           this.$axios.post(api_1,qs.stringify(this.schedule),
           {
             headers : {
               token : this.token,
               'Content-Type': 'application/x-www-form-urlencoded',
               }
           }
          ).then( (response)=>{
             let code = response['data']['code']
             let name = ''
             if( code == 0){
               this.schedule['start_time'] = ''
               this.schedule['end_time'] = ''
               this.schedule['coach_id'] = '' 
               this.schedule['team_id'] = ''
               this.schedule['tp_id'] = ''
               this.$alert('排课成功', {
                         confirmButtonText: '确定',
                     })
               this.scheduleVisible = false
               this.buttonType['schedule'] = 'info'
             }
             else{
               this.$alert('排课失败', {
                         confirmButtonText: '确定',
                     })
             }
             this.getData()
           })
          break;
          /**
           * 先change函数，在submit函数，成功之后update一下,回来之后写一下update函数，将排课id放在时间段的value里面，因为用不到（或者时间段value+’：‘+排课id）
           */
        case 'checkAttend':
          this.checkAttendVisible = false
          var api_2 = '/sellerctr/getAttendance'
           this.$axios.get(api_2,{
            params:{
              schedule_id :this.attendSchedule['schedule_id'],
              team_id : this.attendSchedule['team_id']
            }
          }
           ).then( (response)=>{
             this.tableData = []
              let studentList = response['data']['data']
              let code = response['data']['code']
              if( code == 0){
                for(let student of studentList){
                  let obj ={
                    student_id : parseInt(student['student_id']),
                    student_name: parseInt(student['student_name']),
                    sign_in : student['sign_in']
                  }
                  this.tableData.push(obj)
                }
                console.log(this.tableData)
                this.state = 'checkTable'
                this.dialogTableVisible = true
              }
              else{
                this.$alert('获取学生名单错误', {
                          confirmButtonText: '确定',
                      })
              }
            })
          break;
        default:
          break;
      }
      
    },
    scheduleChange(data,key){
      switch (key){
        case 'schedule':
          this.schedule['start_time'] = this.date +' ' + data[0].split('-')[0]
          this.schedule['end_time'] = this.date +' ' + data[0].split('-')[1]
          this.schedule['coach_id'] = parseInt(data[1]) 
          this.schedule['team_id'] = parseInt(data[2]) 
          this.schedule['tp_id'] = parseInt(data[3]) 
          break;
        case 'checkAttend':
          console.log(data)
          this.attendSchedule['duration'] = data[0].split('+')[0]
          this.attendSchedule['schedule_id'] = parseInt(data[0].split('+')[1])
          this.attendSchedule['team_id'] = parseInt(data[2].split('+')[0])
          this.attendSchedule['team_name'] = data[2].split('+')[1]
          this.attendSchedule['coach_name'] = data[1].split('+')[1]
          this.attendSchedule['course_name'] = data[3].split('+')[1]
          console.log(this.attendSchedule)
          break
        default:
          break;
      }
      
    },
    getTitle(data,key){
      switch (key){
        case 'schedule':
          return '当前时间为'+data
          break;
        case 'checkAttend':
          let s = this.attendSchedule['duration'] + '  '+ this.attendSchedule['course_name'] + '  ' +this.attendSchedule['coach_name']
          return s
          break;
        default:
          break;
      }
      return '当前时间为'+data
    },
    //update options
    update(type){
      switch (type){
        case 'schedule':
          this.options = [{
          value:'16:00-17:00',
          label:'16:00-17:00',
          children:[]
          },
          {
            value : '17:00-18:00',
            label: '17:00-18:00',
            children:[]
          },
          {
            value:'18:00-19:00',
            label:'18:00-19:00',
            children:[]
          }]
          let children_course = []
          //先遍历course
          for(let course of this.courseList){
            let obj ={
              value:course['id'],
              label:course['name']
            }
            children_course.push(obj)
          }
          
          let children_team =[]
          for(let team of this.teamList){
            let obj ={
              value:team['id'],
              label:team['name'],
              children : children_course
            }
            children_team.push(obj)
          }
          let children_coach = []
          for(let coach of this.coachList){
            let obj ={
              value : coach['id'],
              label : coach['name'],
              children : children_team
            }
            children_coach.push(obj)
          }
          for(let option of this.options){
            option['children'] = children_coach
          }
          break;
        case 'checkAttend':
          let scheduleArray = this.scheduleList[this.date]
          if(typeof(scheduleArray) ==='undefined'){
            this.$alert('今日无排课信息', {
                      confirmButtonText: '确定',
               })
            return
          }
          this.options = []
          //教案value的位置用来存排课的id
          for(let schedule of scheduleArray){
            let isHave =false
            let scheduleID = schedule['id']
            let courseID = schedule['tp_id']
            let courseName = schedule['tp_name']
            let start_time = schedule['start_time'].split(' ')[1].split(':').slice(0,2).join(':')
            let end_time = schedule['end_time'].split(' ')[1].split(':').slice(0,2).join(':')
            let duration = start_time + '-' + end_time
            let obj = {
              value:duration +'+' +scheduleID ,
              label:duration,
              children:[]
            }
            if(this.options.length != 0){
              for(let option of this.options ){
                if(option['value'].split('+')[0] == duration){
                  isHave = true
                  break
                }
              }
            }
            if(!isHave){
              let obj_course = {
                value : courseID + '+' +courseName,
                label : schedule['tp_name']
              }
              let obj_team = {
                value : schedule['team_id'] + '+' +schedule['team_name'] ,
                label : schedule['team_name'],
                children : []
              }
              obj_team['children'].push(obj_course)
              let obj_coach = {
                value : schedule['coach_id']+ '+' +schedule['coach_name'],
                label : schedule['coach_name'],
                children :[]
              }
              obj_coach['children'].push(obj_team)
              obj['children'].push(obj_coach)
              this.options.push(obj)
            }
          }
          break;
        default:
          break;
      }
      //只要点击了button之后就开始获取
    },
    submit(){
      switch (this.state){
        case 'schedule':
          break;
        case 'checkAttend':
        this.isClicked = false
          break;
        case 'edit':
        this.isClicked = false
          break;
        default:
          break;
      }
    },
    getDate(date,data){
      //写options
      if(data.isSelected)
      {
        this.date = data.day
        this.schedule.date=data.day
      }
      return ' p-selected'
    },
    handleOpen(index){
      console.log("open"+ index )
    },
    handleAttend(index, row, e){
      if (e) {
        e.stopPropagation()
      }
      let api = '/sellerctr/attendance'
      let student = this.tableData[index]
      student['sign_in'] = 0
      this.$axios.post(api,qs.stringify(student),
       {
         headers : {
           token : this.token,
           'Content-Type': 'application/x-www-form-urlencoded',
           }
       }
      ).then( (response)=>{
         let code = response['data']['code']
         let name = ''
         if( code == 0){
           this.schedule['start_time'] = ''
           this.schedule['end_time'] = ''
           this.schedule['coach_id'] = '' 
           this.schedule['team_id'] = ''
           this.schedule['tp_id'] = ''
           this.$alert('排课成功', {
                     confirmButtonText: '确定',
                 })
           this.scheduleVisible = false
           this.buttonType['schedule'] = 'info'
         }
         else{
           this.$alert('排课失败', {
                     confirmButtonText: '确定',
                 })
         }
         this.getData()
       })
      this.tableData[index]['sign_in'] = 'attend'
    },
    handleAbsent(index, row, e){
      if (e) {
        e.stopPropagation()
      }
      this.tableData[index]['Attend'] = 'absent'
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSelect(index,indexPath){
       console.log(index,indexPath)
    },
    //用来按钮变色
    buttonClick(key){
      switch (key){
        case 'schedule':
          this.scheduleVisible = true
          this.update(key)
          break;
        case 'checkAttend':
          this.checkAttendVisible = true
          this.update(key)
          break;
        default:
          break;
      }
      for(let index in this.buttonType){
        if(index != key && this.buttonType[index] == 'success'){
          this.buttonType[index] = 'info'
        }
      }
      this.buttonType[key]=(this.buttonType[key] == 'info')?'success':'info'
      if( this.buttonType[key] == 'success'){
        this.state = key
      }
      else{
        this.state = 'lookup'
        this.showMenu = false
      }
    }
  },
 
}
</script>
<style lang="scss">
$Green: #69bc38;
$Gray: #cdcdcb;
$Red : #92535e;
.normal{
  color:$Gray;
}
.attend {
  color: $Green;
}
.absent{
  color:$Red;
}
#schedule {
  .container{
    .el-header{
      text-align: center;
      font-size : 1.875rem;
    }
    .scheduleButton{
      margin: 0;
      margin-left: 15.625rem;
    }
    
    } 
}
</style>
