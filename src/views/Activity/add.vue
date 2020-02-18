<template>
  <div>
    <page-header title="添加活动" back />
    <el-form
      ref="form"
      class="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="活动封面" prop="coverimage">
        <el-upload
          action="#"
          accept="image/*"
          class="cover-uploader"
          :show-file-list="false"
          :limit="1"
          :http-request="handleUpload"
          :on-success="handleUploadSuccess"
          :on-change="handleUploadCover"
        >
          <img
            v-if="form.coverimage"
            :src="UPLOAD_PUBLIC_URL+ form.coverimage"
            class="cover"
          >
          <i
            v-else
            class="el-icon-plus"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="活动图片" prop="images">
        <el-upload
          action="#"
          list-type="picture-card"
          accept="image/*"
          :http-request="handleUpload"
          :on-success="handleUploadSuccess"
          :on-change="handleUploadImages"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="活动人数" prop="people_num">
        <el-input-number
          v-model="form.people_num"
          :min="1"
          :precision="0"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="报名积分" prop="score">
        <el-input-number
          v-model="form.score"
          :min="0"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="报名时间" prop="apply_time">
        <el-date-picker
          v-model="form.apply_time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </el-form-item>
      <el-form-item label="活动时间" prop="activity_time">
        <el-date-picker
          v-model="form.activity_time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </el-form-item>
      <el-form-item label="活动信息" prop="info">
        <el-input
          v-model="form.info"
          type="textarea"
          :autosize="{ minRows: 2 }"
        />
      </el-form-item>
      <el-form-item label="是否上架" required prop="putaway">
        <el-switch
          v-model="form.putaway"
          :active-value="0"
          :inactive-value="1"
        />
      </el-form-item>
      <el-form-item size="large">
        <el-button
          type="primary"
          @click="onSubmit"
        >
          添加活动
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Axios from 'axios'
import { format } from 'date-fns'
import qs from 'querystring'

const gt0 = (r, v, cb) => {
  if (v > 0) cb()
  else cb(new Error())
}

export default {
  data () {
    return {
      form: {
        people_num: 1,
        apply_time: null,
        activity_time: null,
        info: '',
        coverimage: '',
        images: [],
        putaway: 0,
        score: 0,
        title: ' ',
        rich_text: ''
      },
      rules: {
        coverimage: [
          { required: true, trigger: 'change', message: '活动封面不能为空' }
        ],
        images: [
          { type: 'array', required: true, trigger: 'change', message: '活动图片不能为空' }
        ],
        people_num: [
          { required: true, trigger: 'blur', message: '活动人数不能为空' },
          { validator: gt0, trigger: 'blur', message: '活动人数需大于0' }
        ],
        score: [
          { required: true, trigger: 'blur', message: '报名积分不能为空' },
          { validator: gt0, trigger: 'blur', message: '报名积分需大于0' }
        ],
        apply_time: [
          { required: true, trigger: 'blur', message: '报名时间不能为空' }
        ],
        activity_time: [
          { required: true, trigger: 'blur', message: '活动时间不能为空' }
        ],
        info: [
          { required: true, trigger: 'blur', message: '活动信息不能为空' }
        ]
      },
      UPLOAD_PUBLIC_URL: process.env.VUE_APP_UPLOAD_PUBLIC_URL
    }
  },

  computed: {
    formData () {
      const f = d => format(d ?? new Date(), 'yyyy-MM-dd HH:mm:ss')
      return {
        people_num: this.form.people_num,
        apply_start_time: f(this.form.apply_time[0]),
        apply_end_time: f(this.form.apply_time[1]),
        activity_start_time: f(this.form.activity_time[0]),
        activity_end_time: f(this.form.activity_time[1]),
        info: this.form.info,
        coverimage: this.form.coverimage,
        images: JSON.stringify(this.form.images),
        putaway: this.form.putaway,
        title: this.form.title,
        score: this.form.score,
        rich_text: this.form.rich_text
      }
    }
  },

  methods: {
    handleUpload (param) {
      const file = param.file

      const formData = new FormData()
      formData.append('image_url', file)

      return Axios.post('/sellerctr/save', formData, {
        onUploadProgress: param.onProgress
      })
    },
    handleUploadSuccess (res, rawFile) {
      if (res?.data?.data?.fileName) {
        rawFile.url = process.env.VUE_APP_UPLOAD_PUBLIC_URL + res?.data?.data?.fileName
        rawFile.fileName = res?.data?.data?.fileName
      }
    },
    handleUploadChange (file, fileList) {
      this.fileList = fileList
    },
    handleUploadCover (file) {
      this.form.coverimage = file.fileName
    },
    handleUploadImages (file, fileList) {
      this.form.images = fileList.map(f => f.fileName)
    },

    onSubmit () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        Axios.post('/sellerctr/addActivity', qs.stringify(this.formData))
          .then(() => {
            this.$alert('添加成功', '成功').then(() => {
              this.$router.go(-1)
            })
          }).catch(e => {
            console.log(e)
            this.$alert(`错误原因: ${e.message || '未知错误'}`, '添加失败')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
}

.cover {
  width: 80px;
  height: 80px;
  object-fit: contain;
  display: block;
}

.cover-uploader {
  &::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }

    .el-icon-plus {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
  }
}

</style>
