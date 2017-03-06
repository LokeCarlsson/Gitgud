<template>
  <div class="col-sm-4 col-sm-offset-4">
    <div v-if="!user.authenticated">
      <h2>Log In</h2>
      <p>Log in to your account to get some great quotes.</p>
      <div class="alert alert-danger" v-if="error">
        <p :key="error"> {{ error }}</p>
      </div>
      <button class="btn btn-primary" @click="lock.show()">Log in</button>
    </div>
  </div>
</template>

<script>
  import auth from './index.js'
  import Auth0Lock from 'auth0-lock'
  export default {
    data () {
      return {
        error: '',
        user: auth.user,
        lock: new Auth0Lock(
        'Jsj9njAAuO3Rb3FPfLjwN0ypRRRpTiJW',
        'ilmmec.eu.auth0.com')
      }
    },
    methods: {
      submit () {
        // auth.login(this)
        // this.$router.push('/')
      }
    }
  }

</script>
