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
      <button class="full-width primary" @click="sendToDB()">Save</button>

      <!--<br>-->
      <!--{{ this.orgs }}-->
    </div>
</template>

<script>
  import auth from '../auth/index.js'
  import { Toast, Dialog } from 'quasar'
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
          if (payload.data.length <= 0) {
            this.loadFromGithub()
          }
          payload.data.forEach((element) => {
            this.orgs.push({
              name: element.name,
              commits: element.commits,
              pushes: element.pushes,
              releases: element.releases
            })
          }, this)
        })
      },
      loadFromGithub () {
        this.axios.get('/orgs/github', { headers: auth.getAuthHeader() })
        .then((payload) => {
          this.orgs = []
          if (payload.data.length <= 0) {
            Dialog.create({
              title: 'Oops',
              message: 'Did you forget to grant access to your organizations or maybe you are not admin of any organizations?'
            })
          }
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
        this.axios.post('/orgs', {
          data: this.orgs
        }, { headers: auth.getAuthHeader() })
        .then((payload) => {
          Toast.create.positive('Settings saved!')
        })
        .catch(() => {
          Toast.create.negative('Something went wrong!')
        })
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
