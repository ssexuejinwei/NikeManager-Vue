<template>
  <div>
    <page-header title="编辑商品" back />
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      id: this.$route.params.id,
      product: {}
    }
  },

  created () {},

  methods: {
    getProduct () {
      Axios.get('/')
    }
  }
}
</script>
