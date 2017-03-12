<template>
  <div id='settings'>
      <div v-if="orgs" class="card" style="margin-top: 25px;">
        <div class="card-title">
          Organizations
        </div>
        <div class="list item-delimiter">
          <q-collapsible  icon="explore" v-for="(org, index) in orgs" :label="org.name">
            <div class="list">
              <label class="item">
                <div class="item-primary">
                  <q-checkbox
                  :id="org.name + 'commits'"
                  v-model="org.commits"></q-checkbox>
                </div>
                <div class="item-content">
                  Commits
                </div>
              </label>
              <label class="item">
                <div class="item-primary">
                  <q-checkbox
                  :id="org.name + 'pushes'"
                  v-model="org.pushes"></q-checkbox>
                </div>
                <div class="item-content">
                  Pushes
                </div>
              </label>
              <label class="item">
                <div class="item-primary">
                  <q-checkbox
                  :id="org.name + 'releases'"
                  v-model="org.releases"></q-checkbox>
                </div>
                <div class="item-content">
                  Releases
                </div>
              </label>
            </div>
          </q-collapsible>
        </div>
      </div>
      <spinner v-else color="#2196F3" name="dots" class="spinner"></spinner>
    {{ this.orgs }}
    </div>
</template>

<script>
  import auth from '../auth/index.js'
  export default {
    data () {
      return {
        userInfo: '',
        orgs: ''
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
          this.orgs = []
          payload.data.forEach((element) => {
            this.orgs.push({
              name: element.login,
              commits: false,
              pushes: false,
              releases: false
            })
          }, this)
        })
      },
      sendToDB () {
        console.log('hej')
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
