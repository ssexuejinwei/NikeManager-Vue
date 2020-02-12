<template>
  <header class="header">
    <div class="title" v-if="title">{{title}}</div>
    <div>
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'page-header',
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  margin: 0 -20px 16px;
}

.title {
  border-bottom: 1px rgba(0,0,0,0.15) solid;
  padding: 12px 20px;
  color: #444;
}
</style>