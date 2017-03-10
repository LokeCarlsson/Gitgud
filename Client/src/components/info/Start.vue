<template>
  <div id='start'>
    <h4>
      Welcome to gitgud!
    </h4>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data () {
      return {
        authenticated: store.getters.authenticated
      }
    },
    mounted () {
    }
  }

</script>

<style>

</style>
