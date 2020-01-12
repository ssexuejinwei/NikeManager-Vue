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
            <el-dialog :title='getTitle(data.day)' :visible.sync="(state =='schedule'|| state=='edit')&&scheduleVisible&&data.isSelected">
             <el-cascader-panel :options="options" @change='scheduleChange'></el-cascader-panel>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="cancelSchedule">取 消</el-button>
                 <el-button type="primary" @click="submitSchedule">确 定</el-button>
               </div>
            </el-dialog>
            <!-- 考勤菜单 -->
            <!-- <el-cascader-panel v-if=" data.isSelected&& state =='checkAttend'" options="options"></el-cascader-panel> -->
            <el-menu v-if=" data.isSelected&& state =='checkAttend'"
              @select="handleSelect"
              menu-trigger="hover "
              mode="horizontal"
              @open = "handleOpen">
              <el-submenu :index ="state">
                <template slot="title">
                  {{state}}
                </template>
                <template v-for="time in timeList">
                  <el-submenu :index ="time" :key="time">
                    <template slot="title">
                      {{time}}
                    </template>
                      <template v-for="course in courseList">
                        <el-submenu :index="course" :key="course">
                          <template slot="title">
                            {{course}}
                          </template>
                          <div>
                            <el-menu-item index="1">
                              <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                  label="学生名单"
                                  prop="name"
                                  width="180">
                                </el-table-column>
                                <el-table-column  label="考勤" width="180">
                                  <template slot-scope="scope">
                                    <el-button
                                    size="medium"	
                                    type='text'
                                    @click="handleAttend(scope.$index,scope.row, $event)">
                                    <span :class="tableData[scope.$index]['Attend']=='attend'?'attend':'normal'">
                                      签到
                                    </span>
                                    </el-button>
                                    <el-button
                                    size="medium"
                                    type='text'
                                    @click="handleAbsent(scope.$index, scope.row, $event)">
                                    <span :class="tableData[scope.$index]['Attend']=='absent'?'absent':'normal'" >
                                    缺席
                                    </span>
                                    </el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </el-menu-item>
                          </div>
                        </el-submenu>
                      </template>
                  </el-submenu>
                </template>
              </el-submenu>
            </el-menu>
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
      scheduleVisible:false,
      scheduleList:{},
      schedule:{
        id:'',
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
      tableData:[{
        'name':'林一',
        'Attend':''
      },
      {
        'name':'林一',
        'Attend':''
      },
      {
        'name':'林一',
        'Attend':''
      },
      {
        'name':'林一',
        'Attend':''
      },
      {
        'name':'林一',
        'Attend':''
      }],
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
      let api_1 = '/sellerctr/getSchedule'
      let api_2 = '/sellerctr/getCoach'
      let api_3 = '/sellerctr/getTeam'
      let api_4 = '/sellerctr/getCourse'
      /**
       *   获取教练和队伍的id  并将其 放在一个对象数组里
       */
      
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
      })
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
      })
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
      })
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
    cancelSchedule(){
      this.scheduleVisible = false
      this.buttonType['schedule'] = 'info'
    },
    submitSchedule(){
      let api = '/sellerctr/schedule'
      console.log(this.schedule['id']==='')
      if(this.schedule['id'] === ''){
        this.$alert('请选择排课信息', {
                  confirmButtonText: '确定',
              })
        return
      }
      this.$axios.post(api,qs.stringify(this.schedule),
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
          this.schedule['id'] = ''
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
      })
    },
    scheduleChange(data){
      this.schedule['id'] = 0
      this.schedule['start_time'] = this.date +' ' + data[0].split('-')[0]
      this.schedule['end_time'] = this.date +' ' + data[0].split('-')[1]
      this.schedule['coach_id'] = parseInt(data[1]) 
      this.schedule['team_id'] = parseInt(data[2]) 
      this.schedule['tp_id'] = parseInt(data[3]) 
    },
    getTitle(data){
      return '当前时间为'+data
    },
    update(){
      //只要点击了button之后就开始获取
    },
    submit(){
      switch (this.state){
        case 'schedule':
        if(this.schedule.date == ''){
            this.$alert('未选择时间', {
                    confirmButtonText: '确定'})
        }
        else if(this.schedule.team == ''){
          this.$alert('队伍未选择', {
                  confirmButtonText: '确定'})
        }
        else if(this.schedule.coach == ''){
          this.$alert('教练未选择', {
                  confirmButtonText: '确定'})
        }
        else if(this.schedule.course == ''){
          this.$alert('课程未选择', {
                  confirmButtonText: '确定'})
        }
        else{
          //全部选择完毕
          const confirmText = ['时间:'+this.schedule.date+'  '+this.schedule.duration, '队伍:'+this.schedule.team,'教练:'+this.schedule.coach,'课程:'+this.schedule.course]
          const newDatas = []
          const h = this.$createElement
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
           this.$confirm(h('div', null, newDatas), '排课内容', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                  }).then(() => {
                    this.$message({
                      type: 'success',
                      message: '排课成功!'
                    });
                    this.isClicked = false
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                    });          
                  });
          // this.$axios.post().then(()=>{
          //   this.schedule =[]
          // })
          //在成功的post回调函数中
        }
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
    scheduleChoose(e,data,type,time){
      if (e) {
        e.stopPropagation()
      }
      this.schedule.duration = time
      switch (type){
        case 'Team':
        this.schedule.team = data
        this.teamClick[data] = !this.teamClick[data]
          break;
        case '教练':
        this.schedule.coach = data
        this.coachClick[data] = !this.coachClick[data]
          break;
        case '课程':
        this.schedule.course = data
        this.courseClick[data] = !this.courseClick[data]
          break;
        default:
          break;
      }
    },
    getDate(date,data){
      if( !this.isLoad){
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
      }
      if(data.isSelected)
      {
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
      this.tableData[index]['Attend'] = 'attend'
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
