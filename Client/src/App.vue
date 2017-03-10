
<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
import Start from './components/info/Start.vue'
import store from './store'

export default {
  store,
  name: 'Start',
  components: {
    Start
  }
}
</script>

<style></style>
