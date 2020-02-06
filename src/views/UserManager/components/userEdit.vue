<template>
  <div class='userEditInfo'>
    <el-page-header @back="goBack" content="返回商户列表">
    </el-page-header>
  <el-container style='width: 100%;'>
    <el-aside>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <el-col :span='8' >
              <el-upload
                class="avatar-uploader"
                action="#"
                accept="image/*"
                :limit="3"
                :http-request="handleUpload"
                :on-success="handleUploadSuccess"
                :on-change="handleUploadChange"
                :show-file-list="false">
                <img v-if="squareImageUrl==''?false:true" :src="squareImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p style='text-align: right;'>头像</p>
            </el-col>
    </el-aside>
    <el-col :span='18'>
      <el-main>
       
    <el-form label-position="left" label-width="80px" class="form" ref="form" :model="form"  >
   
      <el-form-item  label="昵称" >
        <el-col :span='8'>
          <el-input  v-model="form.nickName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="真实姓名" >
        <el-col :span='8'>
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-row>
      <el-col :span='9'>
      <el-form-item label="微信ID">
          <el-input v-model="form.wechat"></el-input>
      </el-form-item>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span='9'>
      <el-form-item label="会员时间" >
          <el-input v-model="form.date"></el-input>
      </el-form-item>
      </el-col>
      </el-row>
      <el-row>
      <el-col :span='9'>
      <el-form-item label="个人积分" >
          <el-input v-model="form.points"></el-input>
      </el-form-item>
      </el-col>
      </el-row>
      <el-col :span='24'>
      <el-form-item label="会员等级">
          <el-radio-group v-model="form.level">
            <el-radio-button label="Lv 1"></el-radio-button>
            <el-radio-button label="Lv 2"></el-radio-button>
            <el-radio-button label="Lv 3"></el-radio-button>
          </el-radio-group>
      </el-form-item>
      </el-col>
      <el-form-item label="电话" >
        <el-col :span='8'>
         <el-input v-model="form.tel"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" >
        <el-col :span='8'>
          <el-input v-model="form.sex"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="年龄" >
        <el-col :span='12'>
          <el-input v-model="form.age"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="收货地址">
        <div  v-for="(data, index) in form.address">
          <el-row style="margin-top: 0.625rem;">
          <el-col :span='12'>
             <el-input v-model="data['content']"></el-input>
          </el-col>
          <el-col :span='4' style="margin-left: 0.8625rem;">
            <el-checkbox @change ='((value)=>{setDefault(value,index)})' v-model="form.address[index]['isDefault']" >设为默认地址</el-checkbox>
          </el-col>
          <el-col :span='4' style="margin-left: 0.8625rem;" v-if="index==form.address.length-1">
            <el-button @click='addAddress'><i class='el-icon-plus'></i></el-button>
          </el-col>
          </el-row>
        </div>
        <el-row v-if='form.address.length == 0'>
          <el-col :span='12'>
             <el-input v-model="form.address[0]" placeholder="还未添加收货地址"></el-input>
          </el-col>
          <el-col :span='4' style="margin-left: 0.8625rem;">
            <el-button @click='addAddress'><i class='el-icon-plus'></i></el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="danger" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    </el-main>
   </el-col>
  </el-container>
  <!-- 填写收货地址对话框 -->
  <el-dialog title="填写地址信息" :visible.sync="addAddressVisible">
    <el-form :model="addressForm" label-width="80px">
      <el-form-item label="收件人" >
        <el-col :span='8'>
         <el-input v-model="addressForm.name"></el-input>
        </el-col>
      </el-form-item> 
      <el-row >
        <el-col :span='8'>
      <el-form-item label="手机号" >
         <el-input v-model="addressForm.tel"></el-input>
      </el-form-item> 
      </el-col>
      <el-col :span='8'>
      <el-form-item label="邮政编码" >
         <el-input v-model="addressForm.code"></el-input>
      </el-form-item>
      </el-col>
      </el-row>
      <el-form-item label="地址" >
          <el-input type="textarea" v-model="addressForm.address"></el-input>
      </el-form-item>
      <el-form-item  style='text-align: right;'>
          <el-checkbox  v-model="addressForm.setDefault">设为默认地址</el-checkbox>
      </el-form-item>
      <el-form-item  style='text-align: center;'>
        <el-button type="danger" @click="submit">提 交</el-button>
        <el-button type='success' @click="addAddressVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios'
  export default{
    props:{
      user:Object
    },
    data() {
      return {
        squareImageUrl:'',
        addAddressVisible : false,
        form:{
          setDefault:false,
          labelWidth:'10px',
          name:'韩',
          id:134,
          tel:'1234145',
          nickName:'3个月',
          wechat:'王小佳',
          sex:'女',
          date:34,
          points:134,
          age:'3',
          level:'3个月',
          birth:'2019-9-8',
          points:'21414',
          address:[],
        },
        addressForm:{
          name:'sss',
          tel:'12455',
          code:'1244',
          address:'afafaf',
          setDefault:false,
        },
        addressList:[],
        tableCourse:[],
        tableAttend:[],
        fileList: []
        
      }
    },
    created() {
      console.log(' iam here')
      console.log(this.user)
      this.form['id']=this.user['id']
      this.form['nickName']=this.user['nickName']
      this.form['wechat']=this.user['wechat']
      this.form['name']=this.user['name']
      this.form['date']=this.user['date']
      this.form['sex']=this.user['sex']
      this.form['tel']=this.user['tel']
      this.form['points']=this.user['points']
      this.form['age']=this.user['age']
      this.form['level']=this.user['level']
        // this.$axios.get(){
      console.log(this.form)  
      this.getAddress()
      // }
    },
    methods: {
      submit(){
        this.addAddressVisible = false
      },
      addAddress(){
        this.addAddressVisible = true
      },
      setDefault(value,index){
        console.log(value,index)
        for(let data of this.form.address){
          data['isDefault']  = false
        }
        this.form.address[index]['isDefault'] = true
      },
      getAddress(){
        let api='/parentsctr/getAddress'
        console.log(this.form['id'])
        this.$axios.get(api,{
          params:{
            parents_id:this.form['id']
          }
        }).then((response)=>{
          let addressList = response['data']['data']
          console.log(addressList)
          for(let address of addressList){
            let obj={
              id:address['id'],
              tel:address['tel'],
              name : address['name'],
              address: address['address'],
              isDefault:parseInt(address['isDefault']) ==1?true:false,
              content : address['name'] +'  '+address['tel']+'   '+address['address'],
            }
            this.addressList.push(obj)
          }
          console.log('address',this.addressList)
          //sort
          let i =0
          for(let address of this.addressList ){
            let isDefault = address['isDefault']
            if( isDefault == true){
              let temp = this.addressList[i]
              this.addressList[i] = this.addressList[0]
              this.addressList[0] = temp
              break
            }
            i++;
          }
          console.log('address',this.addressList)
          this.form['address']=this.addressList
        })
      },
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
        this.squareImageUrl = this.fileList[this.fileList.length-1].url
      }
    },
  }
</script>

<style lang="scss">
  .userEditInfo{
    .el-container{
      .el-main{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
      }
    }
  }
</style>
