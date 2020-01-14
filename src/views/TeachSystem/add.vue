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
          :limit="3"
          :http-request="handleUpload"
          :on-success="handleUploadSuccess"
          :on-change="handleUploadChange"
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
import Axios from 'axios'

export default {
  data() {
    return {
      form: {
        capacity: 0,
      }
    }
  },
  methods: {
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
    },
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