
<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
import About from './components/info/About.vue'
/*
 * Root component
 */
export default {
  name: 'About',
  components: {
    About
  }
}
</script>

<style></style>
