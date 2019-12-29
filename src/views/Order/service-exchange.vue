<template>
  <div>
    <h3>换货订单信息</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="订单编号">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="订单创建时间">
        <el-date-picker type="datetime" v-model="form.created" />
      </el-form-item>
      <el-form-item label="送货地址信息">
        <el-input type="textarea" v-model="form.address" />
      </el-form-item>
      <el-form-item label="换货理由填写">
        <el-input type="textarea" v-model="form.reason" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="danger" @click="handleCancel">取消</el-button>
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
        address: '',
        reason: '',
      }
    }
  },

  methods: {
    handleSubmit() {},
    handleCancel() {
      this.$router.back()
    }
  }
}
</script>