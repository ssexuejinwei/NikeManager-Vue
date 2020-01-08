<template>
  <div>
    <header>
      <h1>添加活动</h1>
    </header>
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item label="活动图片" required>
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
      <el-form-item label="活动人数" required>
        <el-input v-model="form.capacity"></el-input>
      </el-form-item>
      <el-form-item label="报名积分" required>
        <el-input v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item label="报名时间" required>
        <el-date-picker
          v-model="form.date1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-date-picker
          v-model="form.date2"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动信息" required>
        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="form.information"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">上传活动</el-button>
        <el-button @click="onSubmit">保存到未上架</el-button>
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
        score: 0,
        date1: null,
        date2: null,
        information: ''
      },
      fileList: []
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