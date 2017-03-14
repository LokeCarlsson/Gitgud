<template>
  <div id='account'>
    <h4>
      {{ userInfo.displayName }}
    </h4>
    <p>
      ID: {{ userInfo._id }}
    </p>
    <p>
       <a :href="userInfo.profileUrl">{{ userInfo.username }}</a>
    </p>
    <p>
      {{ userInfo.updatedAt }}
    </p>

  </div>
</template>

<script>
  import auth from '../auth/index.js'
  export default {
    data () {
      return {
        user: auth.user,
        userInfo: '',
        orgs: '',
        repos: ''
      }
    },
    mounted () {
      this.getAccount()
    },
    methods: {
      getAccount () {
        this.axios.get('/account', { headers: auth.getAuthHeader() })
        .then((payload) => {
          this.userInfo = payload.data
        })
      },
      getOrgs () {
        this.axios.get('/orgs', { headers: auth.getAuthHeader() })
        .then((payload) => {
          this.orgs = payload.data
        })
      },
      getRepos (url) {
        this.axios.get(url, { headers: auth.getAuthHeader() })
        .then((payload) => {
          this.repos = payload.data
        })
      }
    }
  }
</script>

<style>


</style>
