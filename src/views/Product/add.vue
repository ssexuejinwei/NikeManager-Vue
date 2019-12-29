<template>
  <div>
    <header>
      <h1>发布商品</h1>
    </header>
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item label="商品图片" required>
        <el-upload
          action="#"
          list-type="picture-card"
          accept="image/*"
          :auto-upload="false"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品名称" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">上传商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        capacity: 0,
      }
    }
  },
  methods: {
    handleRemove() {},
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
@import './common';

.form {
  width: 500px;
}

</style>