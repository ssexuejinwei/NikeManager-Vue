<template>
  <div>
    <o-header title="商品订单管理"></o-header>
    <router-view />
  </div>
</template>

<script>
import OHeader from './components/header'

export default {
  components: { OHeader }
}
</script>