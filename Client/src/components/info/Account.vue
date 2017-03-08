<template>
  <div id='about'>
    <h4>
      Hello!
    </h4>
    <p>

    </p>
  </div>
</template>

<script>
  import auth from '../auth/index.js'
  export default {
    data () {
      return {
        user: auth.user,
        userInfo: ''
      }
    },
    mounted () {
      if (this.$root.$route.query.token || !auth.checkAuth()) {
        auth.login(this.$root.$route.query.token)
      }
      if (auth.checkAuth()) {
        this.getAccount()
      }
    },
    methods: {
      logout () {
        auth.logout()
      },
      getAccount () {
        this.axios.get('/account', { headers: auth.getAuthHeader() })
        .then((payload) => {
          this.userInfo = payload.data
          this.user.username = payload.data.username
          console.log(payload.data)
        })
      }
    }
  }
</script>

<style>


</style>
