<template>
  <div>
    <page-header title="活动详情" back />
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },

  created () {
    Axios.get('/sellerctr/getActivityById', {
      params: { id: this.id }
    })
  }
}
</script>
