<template>
  <div>
  <div class ='User' v-if='!isEdit'>
    <page-header title="所有用户">
      </page-header>
      
    <el-container>
      <el-header>
        <el-col :span='4'>
         <el-menu
           mode="horizontal"
           text-color='#000000'
           :default-active="activeIndexFilter"
           @select="handleSelect"
           >
            <el-menu-item index="0" :key="0">
               {{Menufilter[0]}}
            </el-menu-item>
            <el-submenu index="更多">
               <template slot="title">更多</template>
               <el-menu-item index="1" :key='1'>{{Menufilter[1]}}</el-menu-item>
               <el-menu-item index="2" :key='2'>{{Menufilter[2]}}</el-menu-item>
            </el-submenu>
         </el-menu>
         </el-col>
         <el-col :span='4' :offset='9' style='margin-top: 0.625rem;'>
           <el-input placeholder="请输入内容" v-model="search.value" style="width: 500px">
             <el-select v-model="search.key" slot="prepend" placeholder="请选择" style="width: 100px">
               <el-option label="用户名" value="name"></el-option>
               <el-option label="性别" value="sex"></el-option>
               <el-option label="年龄" value="age"></el-option>
               <el-option label="电话" value="tel"></el-option>
               <el-option label="积分" value="score"></el-option>
               <el-option label="加入时间" value="create_time"></el-option>
             </el-select>
             <el-button slot="append"  @click="handleSearch">搜索</el-button>
           </el-input>
           <el-button style="margin-left: 16px" v-show="search.value" type="text" @click="handleClearSearch">
             清空搜索结果
           </el-button>
         </el-col>
      </el-header>
      <el-main >
        <el-table
          :data="UserTableData"
          class="UserTableData"
          highlight-current-row
          @current-change="handleCurrentChangeTable"
          :border="true"> 
          <el-table-column prop="name" label="姓名"  align='center'> </el-table-column>
          <el-table-column prop="sex" label="性别"  align='center'> </el-table-column>
          <el-table-column prop="age" label="年龄"  align='center'> </el-table-column>
          <el-table-column prop="tel" label="电话"  align='center'> </el-table-column>
          <el-table-column prop="level" label="等级"  align='center'> </el-table-column>
          <el-table-column prop="points" label="积分"  align='center'> </el-table-column>
          <el-table-column prop="date" label="加入时间"  align='center'> 
          </el-table-column>
          <el-table-column  label="操作"  align='center'>
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
      <el-footer>
        <el-row>
          <el-col :span='6'>
            <!-- <el-button type='danger' @click='isAdd = true'>添加新用户</el-button> -->
            <el-button class='delete-button' @click='deleteUser'>删除用户</el-button>
          </el-col>
          <el-col style="text-align: right;">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="page_size"
                layout="prev, pager, next, jumper"
                :total="total">
              </el-pagination>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
  <div class='userEdit' v-if='isEdit'>
    <UserEdit :user='user' @update='handleEditFinish' @back ='backHome'/>
  </div>
  </div>
</template>

<script>
  import UserEdit from './userEdit'
  import qs from 'qs'
  export default{
    components: {
      UserEdit
    },
    data() {
      return {
        search: {
          key: 'name',
          value: ''
        },
        title:'更多',
        chooseID:0,
        isChoose:false,
        user :{},
        isEdit : false,
        cur_page :1,
        page_size : 10,
        total :1,
        activeIndexFilter:'0',
        currentIndex:'',
        Menufilter: ['时间','年龄','性别'],
        UserTableData:[]
      }
    },
    watch: {
    },
    created() {
     this.getUser(0)
    },
    methods: {
      handleClearSearch() {
        this.search.value = ''
        // @todo
      },
      handleSearch() {
        if (this.search.value) {
          //处理一下性别的
          if(this.search.key=='sex'){
            this.search.value = this.search.value=='男'?0:1
          }
          let api='/sellerctr/searchParents'
          this.$axios.get(api,{
            params:{
              cur_page:1,
              key:this.search.key,
              value:this.search.value
            }
          }).then((response)=>{
            let list = response['data']['data']['data']
            this.total =response['data']['data']['total']
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
                level : 'Lv ' +(user['level']+1),
                avatar:user['avatar'] ==null?'':user['avatar']
              }
              this.UserTableData.push(obj)
              this.activeIndexFilter=''
            }
          }).catch(()=>{
            this.$alert('error')
          })
        }
        // @todo
      },
      handleEditFinish(val){
        if(val){
          this.getUser(this.currentIndex)
        }
      },
      handleEdit(index,row){
        console.log(index,row)
        for(let user of this.UserTableData){
          if(user['id'] == row['id']){
            this.user = user
            break
          }
        }
        this.isEdit =true
        },
      backHome(val){
        this.isEdit = val
      },
      getUser(type){
        let api ='sellerctr/getParents'
        this.$axios.get(api,{
          params:{
            cur_page:this.cur_page,
            type:type
          }
        }).then((response)=>{
          let list = response['data']['data']['data']
          this.total =response['data']['data']['total']
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
              level : 'Lv ' +(user['level']+1),
              avatar:user['avatar'] ==null?'':user['avatar']
            }
            this.UserTableData.push(obj)
          }
        })
      },
      handleCurrentChange(val){
        this.cur_page = val
        this.getUser(this.currentIndex)
      },
      handleSelect(key) {
        this.currentIndex = key
        this.title=this.Menufilter[key]
        this.getUser(key)
      },
      handleCurrentChangeTable(val){
        this.chooseID=val['id']
        this.isChoose = true
      },
      deleteUser(){
       if(this.isChoose){
        this.$confirm('确认删除该用户?', '', {
                   cancelButtonText: '返回',
                   confirmButtonText: '确定',
                   type: 'warning'
                 }).then(() => {
                   let api ='/sellerctr/deleteParents'
                   var data = {
                    id : this.chooseID,
                   }
                   this.$axios.post(api, qs.stringify(data)
                   ).then(() => {
                     this.$alert('删除成功', {
                               confirmButtonText: '确定',
                             }).then(()=>{
                               this.getUser(this.currentIndex)
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
         this.$alert('请先选择用户', {
                   confirmButtonText: '确定',
                 });
       }
      },
    }
  }
  
</script>

<style lang="scss">
  $Green: #69bc38;
  $Gray: #cdcdcb;
  $Red : #92535e;
  $pink : #FE8083;
 .User{
   .el-container{
     .el-header{
       .el-menu{
          .el-menu-item.is-active{
             background-color: #52bcf0;
             border-color:#52bcf0  ;
           }
           .el-submenu{
             .el-submenu .is-active{
               background-color: #52bcf0;
               border-color:#52bcf0  ;
             }
             .el-menu-item.is-active{
                background-color: #52bcf0;
                border-color:#52bcf0  ;
              }
           }
          
       }
       .el-input{
         border-color:#52bcf0 ;
       }
       .el-button{
         color:#FFFFFF ;
         background-color: #52bcf0;
       }
     }
     .el-main{
       .el-table{
         .el-button{
           color:#52bcf0 ;
           border-color: #52bcf0;
         }
       }
     }
     .el-footer{
       .el-button{
         color: #fa7959;
         background-color: #FFFFFF;
         border-color:#fa7959 ;
       }
     }
   }
 }
</style>
