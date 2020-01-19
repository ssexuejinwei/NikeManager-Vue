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
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-aside>
    <el-main>
  <el-form class="form" ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="学员姓名" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别" >
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="生日">
          <el-input v-model="form.birth"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="身高" >
          <el-input v-model="form.height"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="体重" >
          <el-input v-model="form.weight"></el-input>
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
        <el-form-item label="联系电话" >
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="积分" >
          <el-input v-model="form.points"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="体能经验" >
          <el-input v-model="form.physicalExperience"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="球类经验" >
          <el-input v-model="form.ballExperience"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="期待队友" >
          <el-input v-model="form.mate"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="7">
        <el-form-item size="large">
          <el-button type="danger" @click="save">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  </el-main>
  </el-container>
  
  <el-container>
    <el-header>
      
      <el-row>
        <el-col :span="8">
          <el-menu :default-active="menuIndex"  mode="horizontal" @select="handleMenuSelect">
            <el-menu-item index="全部课程">全部课程</el-menu-item>
            <el-menu-item index="上课记录">上课记录</el-menu-item>
            <el-menu-item index="学员评测">学员评测</el-menu-item>
          </el-menu>
      </el-col>
      <el-col :span="8" :offset='7'>
        <el-radio-group v-model="RadioIndex" style="margin-bottom: 20px;" v-if="(menuIndex=='全部课程') || (menuIndex == '上课记录')">
          <el-radio-button label="1">周</el-radio-button>
          <el-radio-button label="2">月</el-radio-button>
          <el-radio-button label="3">季度</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="RadioIndex" v-if="menuIndex=='学员评测'"style="margin-bottom: 20px;">
          <el-radio-button label="1">课后反馈</el-radio-button>
          <el-radio-button label="2">阶段性评测</el-radio-button>
          <el-radio-button label="3">年度体测</el-radio-button>
        </el-radio-group>
      </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div v-show="menuIndex=='全部课程'" class='courseTable' >
        <el-table :data="tableCourse" style='width: 100%;' class='courseTable'>
            <el-table-column
              prop="course"
              label="课程"
             >
            </el-table-column>
            <el-table-column
              prop="time"
              label="上课时间"
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
           <span class="demonstration" ></span>
            <el-pagination
            style="text-align: right;"
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
      </div>
      <div v-show="menuIndex=='上课记录'" class='attendTable' >
        <el-table :data="tableAttend" style='width: 100%;' class='attendTable'>
         <el-table-column
           prop="course"
           label="课程"
          >
         </el-table-column>
         <el-table-column
           prop="time"
           label="上课时间"
           >
         </el-table-column>
         <el-table-column
           prop="status"
           label="状态">
         </el-table-column>
       </el-table>
        <span class="demonstration" ></span>
         <el-pagination
         style="text-align: right;"
           layout="prev, pager, next"
           :total="50">
         </el-pagination>
   </div>
      <div v-show="menuIndex=='学员评测'" class='evaluateTable' >
        <el-table
              v-show="RadioIndex!=3"
              :data="tableEvaluate"
              :span-method="objectSpanMethod"
              border
              style="width: 100%; margin-top: 20px">
              <el-table-column
                prop="content"
                label="ID"
               >
              </el-table-column>
              <el-table-column
                prop="performance"
                label="表现">
              </el-table-column>
              <el-table-column
                label="评分">
                <template slot-scope="scope">
                  <el-rate
                    v-model="tableEvaluate[scope.$index]['value']"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </template>
              </el-table-column>
          </el-table>
        <div class='Radar chart' v-show="RadioIndex == 3">
          <el-row>
            <el-col :span='12'>
               <el-image
                    style="width: 100px; height: 100px"
                    :src="imgUrl"
                    :fit="fit"></el-image>
                    <br/>
              身体素质测试雷达图
            </el-col>
            <el-col :span='12'>
              <el-image
                   style="width: 100px; height: 100px"
                   :src="imgUrl"
                   :fit="fit"></el-image>
                   <br/>
              情感测试数据雷达图
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
  </div>
</template>

<script>
  export default{
    props:{
      student_id:Number
    },
    data() {
      return {
        imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        menuIndex:'全部课程',
        RadioIndex:1,
        RadioType:'',
        form: {
          capacity: 0,
          score: 0,
          date1: null,
          date2: null,
          information: ''
        },
        form:{
          name:'韩',
          height:134,
          tel:'1234145',
          physicalExperience:'3个月',
          mate:'王小佳',
          sex:'女',
          weight:34,
          points:134,
          ballExperience:'3个月',
          birth:'2019-9-8',
          wechat:'21414'
        },
        tableCourse:[],
        tableAttend:[],
        tableEvaluate:[{
          content:'教学内容',
          value:4,
          performance:'团队表现'
        },
        {
          content:'教学内容',
          value:3,
          performance:'个人表现'
        },
        {
          content:'运动目标',
          value:2,
          performance:'身体素质'
        },
        {
          content:'运动目标',
          value:4,
          performance:'技能'
        },
        {
          content:'情感目标',
          value:3,
          performance:'团队表现'
        },
         {
           content:'情感目标',
           value:4,
           performance:'个人表现'
         }
        ],
        fileList: []
        
      }
    },
    created() {
      for(let i=0;i<4;i++){
        let obj={
          course:'3-4岁初级难求(team-01)',
          time:'17-18(周三)',
          edit:''
        }
        let jobj={
          course:'3-4岁初级难求(team-01)',
          time:'17-18(周三)',
          status:'签到'
        }
        this.tableCourse.push(obj)
        this.tableAttend.push(jobj)
        console.log(this.tableEvaluate)
      }
      // this.$axios.get(){
        
      // }
    },
    methods: {
      goBack(){
        this.$emit('back',false)
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      handleCancel(index,row){
        console.log(index)
      },
      handleMenuSelect(index){
        this.menuIndex = index
        console.log(this.menuIndex)
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
  .editInfo{
    .el-container{
      .upload{
        text-align: center;
        margin-top: 50px;
      }
    }
  }
</style>
