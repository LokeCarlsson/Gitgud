<template>
  <div id='start'>
    <h4>
      Hello!
    </h4>
    <p>
      Welcome to Gitgud!
    </p>
    <p>
      Use timelines:
      <a href="http://quasar-framework.org/components/timeline.html">quasar-framework.org/components/timeline</a>
    </p>
    <div> {{ github }}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        github: 'There will be stuff here!'
      }
    },
    mounted () {

    }
  }

</script>

<style>


</style>
