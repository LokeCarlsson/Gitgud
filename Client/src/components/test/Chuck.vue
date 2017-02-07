<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h2>Get a Free Chuck Norris Quote!</h2>
      <button v-on:click="getQuote()" class="btn btn-primary primary medium circular">
        <i class="">cached</i>
      </button>
      <div class="quote-area" v-if="quote">
        <h4><blockquote>{{ quote }}</blockquote></h4>
      </div>
    </div>
  </template>

  <script>
  export default {
    data () {
      return {
        quote: ''
      }
    },
    methods: {
      getQuote () {
        let vm = this
        this.$http.get('jokes/random')
        .then(function (data) {
          console.log(data)
          vm.quote = data.data.value.joke
        })
      }
    }
  }
  </script>
