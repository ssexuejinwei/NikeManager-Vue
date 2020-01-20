<template>
  <div class='editInfo'>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
  <el-container>
    <el-aside>
      <el-upload
        class='upload'
        action="#"
        list-type="picture-card"
        accept="image/*"
        :limit="3"
        :http-request="handleUpload"
        :on-success="handleUploadSuccess"
        :on-change="handleUploadChange"
      >
      上传照片
      </el-upload>
      <el-col :offset='8' :span='12'>
        <p>认证：<span style='background-color:#69bc38;color: #FFFFFF;'>主教练</span></p>
      </el-col>
    </el-aside>
    <el-main>
  <el-form class="form" ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="姓名" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别" >
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="联系电话" >
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="工龄" >
          <el-input v-model="form.workAge"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="微信ID">
          <el-input v-model="form.wechat"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="教练介绍" >
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  </el-main>
  </el-container>
  
  <el-container class='bottom'>
    <el-header>
      
      <el-row>
        <el-col :span="8">
          <el-menu :default-active="menuIndex"  mode="horizontal" @select="handleMenuSelect">
            <el-menu-item index="全部课程">全部课程</el-menu-item>
            <el-menu-item index="考勤">考勤</el-menu-item>
          </el-menu>
      </el-col>
      <el-col :span="6" :offset='9'>
        <el-radio-group v-model="RadioIndex" style="margin-bottom: 20px;" v-if="(menuIndex=='全部课程') || (menuIndex == '上课记录')">
          <el-radio-button label="1">周</el-radio-button>
          <el-radio-button label="2">月</el-radio-button>
          <el-radio-button label="3">季度</el-radio-button>
        </el-radio-group>
      </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div v-show="menuIndex=='全部课程'" class='courseTable' >
        <el-table :data="tableCourse" style='wi
        dth: 100%;' class='courseTable'>
            <el-table-column
              prop="time"
              label="上课时间"
             >
            </el-table-column>
            <el-table-column
              prop="course"
              label="课程"
              >
            </el-table-column>
            <el-table-column
              prop="duration"
              label="起止时间"
              >
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                size="medium"	
                type='success'
                @click="handleCancel(scope.$index,scope.row)">
                取消
                </el-button>
              </template>
            </el-table-column>
        </el-table>
        
        <el-button type='danger' style="margin-top: 2rem;" @click='addCourse'>添加课程</el-button>
        <span class="demonstration" ></span>
        <el-pagination
        style="text-align: right;"
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
      <div v-show="menuIndex=='考勤'" class='attendTable' >
        <el-calendar >
          <template
            slot="dateCell"
            slot-scope="{date, data}">
            <p :id="getDate(date,data)" size='medium'
            style='width: 219px;height: 85px;'
            @dblclick="handleSelected"
              :class="data.isSelected ?'is-selected':''">
              {{data.day.split('-').slice(2).join('')}}
            </p>
           
            <el-dialog title="" :visible.sync="dialogTableVisible&&data.isSelected" append-to-body >
                <div style='text-align: center;'>
                 <el-table
                  :data="tableAttend"
                  style="width: 100%">
                  <el-table-column
                    label="课程"
                    prop='course'
                    >
                  </el-table-column>
                  <el-table-column  label="考勤">
                    <template slot-scope="scope">
                      <el-button
                      size="medium"	
                      type='text'
                      disabled
                      >
                      <span :class="tableAttend[scope.$index]['sign_in']==0?'attend':'normal'">
                        签到
                      </span>
                      </el-button>
                      <el-button
                      size="medium"
                      type='text'
                      disabled
                      >
                      <span :class="tableAttend[scope.$index]['sign_in']==1?'absent':'normal'" >
                        缺席
                      </span>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button style='text-align: center;margin-top: 2rem;' type='success' @click='confirm'>
                  确定
                </el-button>
                </div>
              </el-dialog>
          </template>
        </el-calendar>
        <el-row>
          <el-col :offset='1' :span='2'>
            1月未有缺勤
          </el-col>
        </el-row>
        </div>
    </el-main>
  </el-container>
  
  <!-- 添加新课程对话框 -->
  <el-dialog title="添加课程" :visible.sync="outerVisible ">
    <el-form :model="courseForm" >
      <el-form-item label="年龄时段" prop="age" >
        <el-radio-group v-model="courseForm.age">
           <el-radio-button label="3-4岁"></el-radio-button>
           <el-radio-button label="4-5岁"></el-radio-button>
           <el-radio-button label="5-6岁"></el-radio-button>
         </el-radio-group>
      </el-form-item>
      <el-form-item label="项目分类" prop="type" >
          <el-radio-group v-model="courseForm.type">
            <el-radio-button label="篮球"></el-radio-button>
            <el-radio-button label="足球"></el-radio-button>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="课程时间" >
           <el-col :span="10">
                <el-form-item prop="dateStart">
                  <el-date-picker type="date" placeholder="选择日期" v-model="courseForm.dateStart" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-form-item prop="dateEnd">
                  <el-date-picker type="date" placeholder="选择日期" v-model="courseForm.dateEnd" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
       </el-form-item>
      <el-form-item label="课程名称" prop="name" >
        <el-col :span='10'>
          <el-input v-model="courseForm.name"></el-input>
        </el-col>
      </el-form-item>
      <br><br>
      <el-form-item size="large" style="text-align: center;">
        <el-button type="danger" @click="submit">确定</el-button>
        <el-button type="info" @click="outerVisible=false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>

<script>
  import Axios from 'axios'
  export default{
    props:{
      coach_id:Number
    },
    data() {
      return {
        outerVisible:false,
        dialogTableVisible:false,
        date:'',
        menuIndex:'全部课程',
        RadioIndex:1,
        RadioType:'',
        courseForm:{
          age:'3-4岁',
          type:'篮球',
          dateStart:'',
          dateEnd:'',
          name:'5-6岁初级篮球'
        },
        form:{
          name:'韩',
          tel:'1234145',
          sex:'女',
          age:'18',
          workAge:'3个月',
          wechat:'21414',
          intro:'很擅长教篮球'
        },
        tableCourse:[],
        tableAttend:[],
        fileList: []
        
      }
    },
    created() {
      for(let i=0;i<4;i++){
        let obj={
          course:'3-4岁初级篮球(team-01)',
          time:'17-18(周三)',
          duration:'2019.03.21-2019.5.03',
          edit:''
        }
        let jobj={
          course:'16:00-17:00 4-5岁初级篮球班',
          sign_in:0,
        }
        this.tableCourse.push(obj)
        this.tableAttend.push(jobj)
      }
      // this.$axios.get(){
        
      // }
    },
    methods: {
      handleSelected(){
        this.dialogTableVisible = true
      },
      confirm(){
        console.log('i am here')
        this.dialogTableVisible = false
      },
      submit(){
        this.$alert('课程添加成功可在全部课程查看详情', {
                  confirmButtonText: '确定',
              }).then(()=>{
                this.outerVisible=false
              })
      },
      addCourse(){
        this.outerVisible = true
        
      },
      getDate(date,data){
        if(data.isSelected)
        {
          this.date = data.day
        }
        return ' p-selected'
      },
      goBack(){
        this.$emit('back',false)
      },
      handleCancel(index,row){
        console.log(index)
      },
      handleMenuSelect(index){
        this.menuIndex = index
      },
      save(){
        console.log(this.form)
      },
      handleUpload(param) {
        const file = param.file
      
        const formData = new FormData()
        formData.append('image_url', file)
      
        return Axios.post('/sellerctr/save', formData, {
          onUploadProgress: param.onProgress
        })
      },
      handleUploadSuccess(res, rawFile) {
        if (res?.data?.data?.fileName) {
          rawFile.url = process.env.VUE_APP_UPLOAD_PUBLIC_URL + res?.data?.data?.fileName
        }
      },
      handleUploadChange(file, fileList) {
        this.fileList = fileList
      }
    },
  }
</script>

<style lang="scss">
  $Green: #69bc38;
  $Gray: #cdcdcb;
  $Red : #92535e;
  .editInfo{
    .el-container{
      .upload{
        text-align: center;
        margin-top: 50px;
      }
    }
    .bottom{
      .el-main{
        .attendTable{
          .normal{
            color:$Gray;
          }
          .attend {
            color: $Green;
          }
          .absent{
            color:$Red;
          }
        }
      }
    }
  }
</style>
