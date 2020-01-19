<template>
  <div>
  <div class ='coachList' v-show='isEdit==false'>
    <el-container>
      <el-header >
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
      </el-header> 
        <br/>
      <el-main style="padding: 0; height:35rem; border: solid #000000;">
        <el-table 
          :data="coachTable"
          height="540"
          :border="true"> 
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
              type='danger'
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
        <el-button type='danger' @click = "outerVisible = true">添加新教练</el-button>
        </el-col>
          <el-col :span="5" >
        <el-button type='info' @click = "deleteStudent" >删除教练</el-button>
        </el-col>
      </el-row>
    </el-footer>
    </el-container>
  </div>
  
  <div class ='coachEdit'>
    <PEdit :coach_id ='editID' @back='handleBack' v-show='isEdit==true'/>
  </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import PEdit from './coachEdit'
  
  export default{
    components: {
      PEdit
    },
    data() {
      return {
        outerVisible:false,
        isEdit:false,
        editID :0,
        activeIndexType:'篮球',
        menuType: ['篮球','足球'],
        coachTable:[]
      }
    },
    created() {
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
            edit :''
          }
         this.coachTable.push(obj)
        }
      })
    },
    methods: {
      deleteStudent(){
        
      },
      handleBack(data){
        this.isEdit =data
      },
      handleEdit(index) {
        this.editID = parseInt(this.coachTable[index]['id'])
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
</style>
