<template>
  <div>
    <page-header title="商品分类编辑" back />
    <el-table :data="types">
      <el-table-column prop="coverimage" label="图片" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="type" label="值" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editType(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px">
      <el-button type="primary" @click="addType">
        新增分类
      </el-button>
    </div>

    <el-dialog
      title="编辑分类"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="封面" prop="coverimage">
          <el-upload
            action="#"
            accept="image/*"
            class="cover-uploader"
            :show-file-list="false"
            :http-request="handleUpload"
            :on-success="handleUploadSuccess"
            :on-change="handleUploadCover"
          >
            <img
              v-if="form.coverimage"
              :src="form.coverimage.url"
              class="cover"
            >
            <i v-else class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="值" prop="type">
          <el-input v-model="form.type" placeholder="值需唯一" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios'
// eslint-disable-next-line no-unused-vars
import qs from 'querystring'

function reformatImage (url) {
  return url ? {
    name: url.replace(/http:\/\/(.*)\/course\/public\/upload\//, ''),
    url
  } : null
}

export default {
  data () {
    return {
      types: [],

      dialogVisible: false,
      isEdited: false,
      form: {
        coverimage: null,
        name: '',
        type: ''
      }
    }
  },

  created () {
    this.getTypes()
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
      if (!rawFile.url) {
        this.$set(rawFile, 'url', URL.createObjectURL(rawFile.raw))
      }
      if (res?.data?.data?.fileName) {
        this.$set(rawFile, 'name', res?.data?.data?.fileName)
      }
    },

    handleUploadCover (file, fileList) {
      this.form.coverimage = fileList.slice(-1)[0]
    },

    async getTypes () {
      const { data } = await Axios.get('/sellerctr/getGoodsType')
      this.types = data.data
    },

    addType () {
      this.dialogVisible = true
      this.isEdited = false
      this.form = {
        coverimage: null,
        name: '',
        type: ''
      }
    },

    editType (type) {
      this.dialogVisible = true
      this.isEdited = true
      this.form = {
        ...type,
        coverimage: reformatImage(type.coverimage)
      }
    },

    async handleSubmit () {
      // const api = this.isEdited ? '/sellerctr/updateGoodsType' : '/sellerctr/addGoodsType'
      // const data = qs.stringify(this.isEdited ? {

      // })
      try {
        if (!this.isEdited) {
          // Axios.post()
        } else {

        }
      } catch (e) {
        console.error(e)
        this.$message.error('操作失败: ' + e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 60px;

.cover {
  width: $size;
  height: $size;
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
      width: $size;
      height: $size;
      line-height: $size;
      text-align: center;
    }
  }
}
</style>
