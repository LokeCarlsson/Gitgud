<template id="boxes-template">
  <li>
    {{ title }}
    <button v-on:click="$emit('remove')">X</button>
  </li>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: ['title']
  }

</script>
