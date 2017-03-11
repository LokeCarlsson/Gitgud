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

      <div v-show="orgs" class="card" style="margin-top: 25px;">
        <div class="card-title">
          Organizations
        </div>
        <div class="list item-delimiter" v-for="org in orgs">
          <q-collapsible icon="explore" :label="org.login">
            <div>
              <ul>
                <li>Hej</li>
                <li>på</li>
                <li>dig</li>
                <li>din</li>
                <li>galning</li>
              </ul>
            </div>
          </q-collapsible>
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
