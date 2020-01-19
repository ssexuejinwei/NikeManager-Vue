<template>
  <div>
  <div class ='User' v-if='!isEdit'>
    <el-container>
      <el-header>
        <el-col>
         <el-menu
           mode="horizontal"
           :default-active="activeIndexFilter"
           @select="handleSelect"
           class='filterMenu'
           >
            <el-menu-item :index="Menufilter[0]" :key="Menufilter[0]">
               {{Menufilter[0]}}
            </el-menu-item>
            <el-submenu index="更多">
               <template slot="title">更多</template>
               <el-menu-item :index="Menufilter[1]">{{Menufilter[1]}}</el-menu-item>
               <el-menu-item :index="Menufilter[2]">{{Menufilter[2]}}</el-menu-item>
            </el-submenu>
         </el-menu>
         </el-col>
      </el-header>
      <el-main >
        <el-table
          :data="UserTableData"
          class="UserTableData"
          @row-click="handleRow"
          :border="true"> 
          <el-table-column prop="name" label="姓名" :class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="sex" label="性别" :class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="age" label="年龄" :class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="tel" label="电话" :class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="level" label="等级" :class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="points" label="积分" :class="borderBottom" align='center'> </el-table-column>
          <el-table-column prop="date" label="加入时间" :class="borderBottom" align='center'> 
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :span='6'>
            <el-button type='danger'>添加新用户</el-button>
            <el-button type='info'>删除用户</el-button>
          </el-col>
          <el-col style="text-align: right;">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="page_size"
                layout="prev, pager, next, jumper"
                :total="pages*page_size">
              </el-pagination>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
  <div class='userAdd' v-if='isEdit'>
    <UserEdit :user='user' @back ='backHome'/>
  </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import UserEdit from './userEdit'
  export default{
    components: {
      UserEdit
    },
    data() {
      return {
        borderBottom :'borderBottom',
        user :{},
        isEdit : false,
        cur_page :1,
        page_size : 10,
        pages :1,
        activeIndexFilter:'时间',
        Menufilter: ['时间','性别','年龄'],
        UserTableData:[]
      }
    },
    created() {
     this.getUser()
    },
    methods: {
      handleRow(row){
        console.log(row['id'])
        for(let user of this.UserTableData){
          if(user['id'] == row['id']){
            this.user = user
            break
          }
        }
        console.log(this.user)
        this.isEdit =true
      },
      backHome(val){
        this.isEdit = val
      },
      getUser(){
        let api ='sellerctr/getParents'
        this.$axios.get(api,{
          params:{
            cur_page:this.cur_page
          }
        }).then((response)=>{
          let list = response['data']['data']['data']
          this.pages =response['data']['data']['total']
          this.UserTableData =[]
          for(let user of list){
            let obj ={
              id :parseInt(user['id']),
              nickName:user['nick_name'],
              wechat : user['open_id'],
              name : user['name'],
              date : user['create_time'].split(' ')[0],
              sex : user['sex']==0?'男':'女',
              tel : user['tel'],
              points : user['score'],
              age : user['age'],
              level : 'Lv ' +user['level']
            }
            this.UserTableData.push(obj)
          }
        })
      },
      handleCurrentChange(val){
        this.cur_page = val
        this.getUser()
      },
      handleSelect() {
        
      }
    },
  }
  
</script>

<style lang="scss">
 .User{
   .el-container{
     .el-header{
       .filterMenu .el-menu-item.is-active {
         background-color: #FE8083 !important;
         font-size: medium !important;
       }
     }
     .el-main{
       .borderBottom{
         border-bottom:solid ;
          /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
       }
     }
   }
 }
</style>
