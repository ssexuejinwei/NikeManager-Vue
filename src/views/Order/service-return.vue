<template>
  <div>
    <h3>退货订单信息</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="订单编号">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="订单创建时间">
        <el-date-picker type="datetime" v-model="form.created" />
      </el-form-item>
      <el-form-item label="退还账户积分">
        <el-input type="number" v-model="form.score" />
      </el-form-item>
      <el-form-item label="送货地址信息">
        <el-input type="textarea" v-model="form.address" />
      </el-form-item>
      <el-form-item label="申请/换原因">
        <el-checkbox-group v-model="form.reason">
          <el-checkbox-button v-for="r in REASONS" :label="r" :key="r">{{r}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="其他原因">
        <el-input type="textarea" v-model="form.others" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="danger" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

const REASONS = [
  '尺码问题',
  '货品质量问题',
  '商品发错',
  '物流运输问题'
]

export default {
  data() {
    return {
      form: {
        id: '',
        created: Date.now(),
        score: 0,
        address: '',
        reason: [],
        others: ''
      },
      REASONS
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