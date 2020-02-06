<template>
  <div class='courseAdd'>
    <header class='teachHeader'>
      <h1>添加课程</h1>
    </header>
    <el-container>
      <el-aside/>
      <el-container>
        <!-- 基本信息 -->
      <el-main class='basicInfo'>
        <el-form :model="courseForm" >
          <el-row>
            <el-col :span="8">
          <el-form-item  prop="age" >
            <el-radio-group v-model="courseForm.age">
               <el-radio-button label="3-4岁"></el-radio-button>
               <el-radio-button label="4-5岁"></el-radio-button>
               <el-radio-button label="5-6岁"></el-radio-button>
             </el-radio-group>
          </el-form-item>
            </el-col>
            <el-col :span='6' :offset='2'>
          <el-form-item  prop="type" >
              <el-radio-group v-model="courseForm.type">
                <el-radio-button label="篮球"></el-radio-button>
                <el-radio-button label="足球"></el-radio-button>
              </el-radio-group>
           </el-form-item>
           </el-col>
           </el-row>
           
           <el-row>
             <el-col :span='12' >
              <el-form-item label="课程名称" prop="name" >
                <el-col :span='10'>
                  <el-input v-model="courseForm.name"></el-input>
                </el-col>
                <el-col :span='3' :offset='1'>
                  <el-button type="danger" @click="makeSure">确定</el-button>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="学员人数设置(人):" prop="person" >
                <el-col :span='10'>
                  <el-input v-model="courseForm.person"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          <br><br><br><br>
          <el-form-item size="large" style="text-align: center;">
            <el-button type="warning" @click="save">保存</el-button>
            <el-button @click="outerVisible=false">重置</el-button>
          </el-form-item>
          </el-row>
        </el-form>
      </el-main>
     
      <br><br>
      <!-- 选择训练流程 -->
      <el-main class='stepInfo'>
        <el-col style='text-align: right;'>
          <el-button @click='addStep'><i class='el-icon-plus'></i></el-button>
          <el-button @click='deleteStep' :disabled='this.stepsList.length==0?true:false'><i class='el-icon-delete'></i></el-button>
        </el-col>
        <br>
        <br>
        <br>
        <el-row v-for="(value,index) in stepsList" :key='index'>
          <el-col :span='6'>
            <el-card >
               <div style="text-align: center;">
                    <slot> 步骤-{{index+1}}</slot>
                  </div>
                 </el-card>
          </el-col>
          <el-col :span='6' :offset='3'>
            <el-radio-group v-model="value.radio" :class='radioDisplay(value,index)' >
                  <el-radio-button label="有球"></el-radio-button>
                  <el-radio-button label="无球"></el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span='6' :offset="value.className=='radio-hide'?9:0">
              <el-select v-model="value.select" placeholder="请选择">
                <el-option
                  v-for="item in value.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-col>
          <br><br>
          <br><br>
        </el-row>
        <el-row>
          <el-col style="text-align: center;">
            <el-button type="warning" @click="save">保存</el-button>
            <el-button @click="outerVisible=false">重置</el-button>  
          </el-col>
        </el-row>
      </el-main>
      <br><br>
      
      <!-- 选择评测项 -->
      课程评测项
      <el-main class='markInfo'>
        
        <el-form ref="form" :model="markForm" label-width="100px">
          <el-form-item label="身体素质目标:">
              <el-col :span='3' style="margin-left: 1.25rem;" v-for='(value,index) in markForm.body' :key='index'>
                <el-input v-model="markForm.body[index]"></el-input>
              </el-col>
          </el-form-item>
          <el-form-item label="技术目标:">
            <el-col :span='3' style="margin-left: 1.25rem;" v-for='(value,index) in markForm.technical' :key='index'>
              <el-input v-model="markForm.technical[index]"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="情感目标:">
              <el-col :span='3' style="margin-left: 1.25rem;" v-for='(value,index) in markForm.sense' :key='index'>
                <el-input v-model="markForm.sense[index]"></el-input>
              </el-col>
          </el-form-item>
            <el-col style="text-align: center;">
              <el-button type="warning" @click="save">保存</el-button>
              <el-button @click="outerVisible=false">重置</el-button>  
            </el-col>
        </el-form>
      </el-main>
      <el-footer>
        <el-col style="text-align: center;margin-top: 1.25rem;">
          <el-button type="danger" @click="save">提交</el-button>
          <el-button @click='cancel' >取消</el-button>  
        </el-col>
      </el-footer>
      </el-container>
      <el-aside/>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        outerVisible:false,
        courseForm:{
          age:'3-4岁',
          type:'篮球',
          person:'6',
          name:'5-6岁初级篮球'
        },
        markForm:{
          body:[],
          technical:[],
          sense:[],
          
        },
        stepsList:[{
          stepName:'',
          radio:'有球',
          index:0,
          select:'0',
          className:'',
          options: [{
            value: '0',
            label: '热身'
          }, {
            value: '1',
            label: '跑步一小时'
          }, {
            value: '2',
            label: '仰卧起坐30个',
          },
          {
            value: '3',
            label: '放松',
          },
          {
            value: '4',
            label: '无',
          }],
          }
        ]
      }
    },
    created() {
      for(let i =0 ;i <6; i ++){
        this.markForm.body.push('')
        this.markForm.technical.push('')
        this.markForm.sense.push('')
      }
    },
    methods: {
      cancel(){
         this.$router.go(-1);//返回上一层
      },
      makeSure(){
        
      },
      save(){
        
      },
      radioDisplay(value,index){
        console.log(value.select)
        console.log(value.options[value.select].label)
        
        if(value.select==''){
          console.log('display-0')
          this.stepsList[index].className = 'radio-display'
          return 'radio-display'
        }
        else if(value.options[value.select].label!='热身'&&(value.options[value.select].label.indexOf('放松')==-1)){
          this.stepsList[index].className = 'radio-display'
          return 'radio-display'
        }
        else{
          this.stepsList[index].className = 'radio-hide'
          return 'radio-hide'
        }
      },
      deleteStep(){
        this.stepsList.pop()
      },
      addStep() {
        let obj={
          stepName:'',
          radio:'有球',
          index:0,
          select:'0',
          options: [{
            value: '0',
            label: '热身'
          }, {
            value: '1',
            label: '跑步一小时'
          }, {
            value: '2',
            label: '仰卧起坐30个',
          },
          {
            value: '3',
            label: '放松',
          },
          {
            value: '4',
            label: '无',
          }],
          }
        this.stepsList.push(obj)
      }
    },
  }
</script>

<style lang="scss">
  .courseAdd{
    header {
      padding: 0.5rem 1rem;
      margin-bottom: 2rem;
      background: #FE8083;
      h1 {
        font-size: 1rem;
        margin: 0;
      }
    }
    .el-container{
      .el-container{
        .basicInfo{
          border: 2px solid ;
        }
        .stepInfo{
          border: 2px solid ;
          .radio-display{
          }
          .radio-hide{
            display: none;
          }
        }
        .markInfo{
          border: 2px solid ;
        }
      }
    }
  }
</style>
