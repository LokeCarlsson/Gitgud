<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h2>Chuck Norris Quotes!</h2>
    <button v-on:click="getQuote()" class="btn btn-primary primary medium circular">
        <i class="">cached</i>
      </button>
    <div class="quote-area" v-if="quote">
      <h4>
        <blockquote :key="quote">{{ quote }}</blockquote>
      </h4>
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
    mounted () {
      this.getQuote()
    },
    methods: {
      getQuote () {
        let vm = this
        this.axios.get('/api/random-quote')
          .then((data) => {
            vm.quote = data.data
          })
      }
    }
  }

</script>
