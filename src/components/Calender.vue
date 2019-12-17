<template>
<el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''" @click="fun(data,date)">
      {{ data.day.split('-').slice(2).join() }}
    </p>
  </template>
</el-calendar>
</template>
<style>
 p .is-selected {
    color: black;
  }
</style>
<script>
export default {
  name: 'Calender',
  methods: {
    fun(data, date) {
     console.log(data)
    }
  }
}
</script>
