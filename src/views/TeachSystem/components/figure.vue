<template>
  <div class='figure'>
    <!-- 雷达图 -->
    <div class='radarChart'>
      <el-row>
        <p>
          学年末体测成绩与测试幼儿平均成绩
        </p>
      </el-row>
      <el-row>
        <el-col :span='12'>
           <el-image
                style="width: 100px; height: 100px"
                :src="imgUrl"
                ></el-image>
                <br/>
          身体素质测试雷达图
        </el-col>
        <el-col :span='12'>
          <el-image
               style="width: 100px; height: 100px"
               :src="imgUrl"
               ></el-image>
               <br/>
          情感测试数据雷达图
        </el-col>
      </el-row>
    </div>
    <!-- 直方图 -->
    <div class='histogram'>
      <el-row>
        <p>
          全学年健康数据（幼儿个人）
        </p>
      </el-row>
      <el-row>
        <el-col :span='12'>
           <el-image
                style="width: 100px; height: 100px"
                :src="imgUrl"
                ></el-image>
                <br/>
        </el-col>
        <el-col :span='12'>
          <el-image
               style="width: 100px; height: 100px"
               :src="imgUrl"
               ></el-image>
               <br/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='12'>
           <el-image
                style="width: 100px; height: 100px"
                :src="imgUrl"
                ></el-image>
                <br/>
        </el-col>
        <el-col :span='12'>
          <el-image
               style="width: 100px; height: 100px"
               :src="imgUrl"
               ></el-image>
               <br/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
     id:Number
    },
    created() {
      
    },
    data(){
      return{
        imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    },
    methods: {
      getRadarChart() {
        
      },
      getHistogram() {
        
      },
    },
  }
</script>

<style>
</style>
