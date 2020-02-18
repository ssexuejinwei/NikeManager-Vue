<template>
  <div>
    <page-header title="活动详情" back />

    <div v-loading="isLoading">
      <act-form
        v-if="origin"
        submit-text="修改活动"
        :origin="origin"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import ActForm from './components/form'

export default {
  components: { ActForm },
  data () {
    return {
      id: this.$route.params.id,
      origin: null,
      isLoading: false
    }
  },

  created () {
    this.isLoading = true
    Axios.get('/sellerctr/getActivityById', {
      params: { id: this.id }
    }).then(({ data }) => {
      this.origin = data.data
    }).catch((e) => {
      this.$message.error(`获取活动信息失败: ${e.message || '未知错误'}`)
      console.error(e)
    }).finally(() => {
      this.isLoading = false
    })
  },

  methods: {
    onSubmit (formData) {
      console.log(formData)
    }
  }
}
</script>
