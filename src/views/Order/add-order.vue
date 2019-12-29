<template>
  <div>
    <h3>填写订单信息</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="订单编号">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="订单创建时间">
        <el-date-picker type="datetime" v-model="form.created" />
      </el-form-item>
      <el-form-item label="所消耗的积分">
        <el-input type="number" v-model="form.score" />
      </el-form-item>
      <el-form-item label="送货地址信息">
        <el-input type="textarea" v-model="form.address" />
      </el-form-item>
      <el-form-item label="订单物流号">
        <el-input v-model="form.express" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交订单</el-button>
        <el-button>取消订单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        created: Date.now(),
        score: 0,
        address: '',
        express: ''
      }
    }
  },

  methods: {
    handleSubmit() {}
  }
}
</script>