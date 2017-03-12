<template>
  <div id='settings'>
      <div v-if="orgs" class="card" style="margin-top: 25px;">
        <div class="card-title">
          Organizations
        </div>
        <div class="list item-delimiter"
          v-for="(org, index) in orgs"
          v-bind:key="org.id"
          v-bind:title="org">
          <q-collapsible icon="explore" :label="org.login">
              <div class="list">
                hej
                <label class="item">
                <div class="item-primary">
                  <q-checkbox v-model="commits"></q-checkbox>
                </div>
                <div class="item-content">
                  Commits
                </div>
              </label>
              <label class="item">
                <div class="item-primary">
                  <q-checkbox v-model="pushes"></q-checkbox>
                </div>
                <div class="item-content">
                  Pushes
                </div>
              </label>
              <label class="item">
                <div class="item-primary">
                  <q-checkbox v-model="releases"></q-checkbox>
                </div>
                <div class="item-content">
                  Releases
                </div>
              </label>
            </div>
          </q-collapsible>
        </div>
      </div>
      <div v-else>
        <spinner color="#2196F3" name="dots" class="spinner"></spinner>
      </div>
    </div>

  </div>
</template>

<script>
  import auth from '../auth/index.js'
  export default {
    data () {
      return {
        userInfo: '',
        orgs: '',
        repos: '',
        commits: false,
        pushes: false,
        releases: false,
        value: ''
      }
    },
    mounted () {
      this.getAccount()
      this.getOrgs()
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
    },
    computed: {
      commits () {
        console.log(this.org.id)
        console.log(this.commits)
      }
    }
  }
</script>

<style>
  .spinner {
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
  }
</style>
