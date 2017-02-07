
<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
import Start from './components/info/Start.vue'
/*
 * Root component
 */
export default {
  name: 'Start',
  components: {
    Start
  }
}
</script>

<style></style>
