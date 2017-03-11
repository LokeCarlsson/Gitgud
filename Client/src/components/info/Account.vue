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

    </p>
    <button @click="getOrgs()">hej</button>
    <br>


      <div v-show="orgs" class="card">
        <div class="card-title">
          Organizations
        </div>
        <div class="list bordered inner-delimiter highlight">
          <div class="item" v-for="org in orgs">
            <i>mail</i>
            <div class="item-content">
              <div class="item-label">
                {{org.login}}
              </div>
              <button class="item-value">
                <i>keyboard_arrow_right</i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="card">
        <div class="card-title bg-primary text-white">
          {{ org.login }}
        </div>
        <div class="card-content card-force-top-padding">
          {{ org.repos_url }}
        </div>
      </div>
    </div>-->

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
