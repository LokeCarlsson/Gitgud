<template>
  <div class="col-sm-4 col-sm-offset-4">
    <div v-if="!authenticated">
      <h2>Log In</h2>
      <p>Log in to your account to get some great quotes.</p>
      <div class="alert alert-danger" v-if="error">
        <p :key="error"> {{ error }}</p>
      </div>
      <button class="btn btn-primary">
        <a href="http://127.0.0.1:3000/login">Login with Github</a>
      </button>
    </div>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data () {
      return {
        error: '',
        user: store.getters.user,
        authenticated: store.getters.authenticated
      }
    }
  }

</script>
