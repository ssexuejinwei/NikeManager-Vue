<template>
  <div class="home">
    <p>
      <router-link to="/">Home</router-link>
    </p>
    <p>
      <router-link to="/Student">/Student</router-link>
    </p>
    <p>
      <router-link to="/Schedule">/Schedule</router-link>
    </p>
    <p>
      <router-link to="/activity">/activity</router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>
