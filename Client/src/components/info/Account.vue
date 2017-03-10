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
    <p>
      {{ userInfo }}
    </p>
    <button @click="getOrgs()">hej</button>
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
          console.log(payload)
        })
      }
    }
  }
</script>

<style>


</style>
