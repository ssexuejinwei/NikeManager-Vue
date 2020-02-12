<template>
  <div class="figure">
    <!-- 雷达图 -->
    <div class="radarChart">
      <el-row>
        <h1>
          学年末体测成绩与测试幼儿平均成绩
        </h1>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div
            id="radar1"
            style="width: 600px;height: 400px;"
          />
          <br>
          <p>
            身体素质测试雷达图
          </p>
        </el-col>
        <el-col :span="12">
          <div
            id="radar2"
            style="width: 600px;height: 400px;"
          />
          <br>
          <p>
            情感测试数据雷达图
          </p>
        </el-col>
      </el-row>
    </div>
    <!-- 直方图 -->
    <div class="histogram">
      <el-row>
        <h1>
          全学年健康数据（幼儿个人）
        </h1>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrl"
          />
          <br>
        </el-col>
        <el-col :span="12">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrl"
          />
          <br>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrl"
          />
          <br>
        </el-col>
        <el-col :span="12">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrl"
          />
          <br>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    id: Number
  },
  data () {
    return {
      charts: '',
      opinionData: [
        {
          value: [2, 3, 4, 2, 1, 3],
          name: '学年末'
        },
        {
          value: [2, 1, 1, 4, 3, 2],
          name: '平均成绩'
        }
      ],
      indicatorBody: [
        { name: '速度', max: 4 },
        { name: '柔韧', max: 4 },
        { name: '平衡', max: 4 },
        { name: '协调', max: 4 },
        { name: '灵敏', max: 4 },
        { name: '力量', max: 4 }
      ],
      indicatorSense: [
        { name: '独立', max: 4 },
        { name: '团结', max: 4 },
        { name: '尊重', max: 4 },
        { name: '友爱', max: 4 },
        { name: '专注', max: 4 },
        { name: '谦虚', max: 4 }
      ],
      imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      this.drawPie('radar1')
      this.drawPie('radar2')
    })
  },
  methods: {
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: '',
          padding: [4, 4, 4, 4]
        },
        tooltip: {},
        legend: {
          data: ['学年末', '平均成绩']
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: 3,
              padding: [1, 2]
            }
          },
          indicator: id == 'radar1' ? this.indicatorBody : this.indicatorSense
        },
        series: [{
          name: '',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: this.opinionData
        }]
      })
    },
    getRadarChart () {

    },
    getHistogram () {

    }
  }
}
</script>

<style lang="scss">
  .figure{
    .radarChart{
      h1{
        text-align: center;
      }
      p{
        text-align:center;
      }
    }
    .histogram{
      h1{
        text-align: center;
      }
    }
  }

</style>
