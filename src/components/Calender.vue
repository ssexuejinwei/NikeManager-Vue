<template>
<el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p @click="data.isSelected ? 'show' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
    </p>
  </template>
</el-calendar>
</template>
<script>
  export default{
    methods: {
      show ({date, data}) {
        console.log(data)
      }

    },
    data () {
      return {
        value :  new Date()
      }
    }

  }
</script>
<style>
  .is-selected {
    color: #1989FA;
  }
</style>
