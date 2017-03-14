<template>
  <div id='orgs'>
     <!--<q-tabs :refs="$refs">
      <q-tab v-for="org in orgs" :name="org.name" @click="renderOrg(org.name)" icon="message">
        {{ org.name }}
      </q-tab>
    </q-tabs>-->

    <button v-for="org in orgs" class="primary orgButton" @click="renderOrg(org.name)">
      {{ org.name }}
    </button>

     <div v-if="github.length > 0" v-show="this.authenticated" class="timeline">
      <div class="timeline-label">
        <h4 class="bg-white text-italic">
          Today
        </h4>
      </div>
        <div class="timelineEvents" v-for="event in github">
          <div class="timeline-item">
            <div class="timeline-badge">
              <img :src="event.actor.avatar_url">
            </div>
          <div class="timeline-title">
            {{ event.actor.login }}
          </div>
          <div class="timeline-date text-italic">
            <div>{{ event.created_at }}</div>
          </div>
          <div class="card">
            <div class="card-title">
              {{ event.repo.name }}
            </div>

            <div class="card-content">
              <div v-for="commit in event.payload.commits" class="timeline-item">
                {{ commit.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import store from '../../store'
  import auth from '../auth'
  export default {
    data () {
      return {
        github: [],
        orgs: [],
        refs: {},
        authenticated: store.getters.authenticated
      }
    },
    mounted () {
      this.$options.sockets.githubEvent = (data) => {
        console.log(data)
        this.addNewEvent(data)
      }
      this.getOrgs()
    },
    methods: {
      addNewEvent (data) {
        const newObj = {
          actor: {
            login: data.sender.login,
            avatar_url: data.sender.avatar_url
          },
          created_at: new Date().toISOString().slice(0, 10),
          repo: {
            name: data.repository.name
          },
          payload: {
            commits: data.commits
          }
        }
        this.github.unshift(newObj)
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
              issues: element.issues,
              pushes: element.pushes,
              releases: element.releases
            })
          }, this)
        })
      },
      renderOrg (org) {
        console.log(org)
        this.axios.get('https://api.github.com/orgs/' + org + '/events')
        .then((payload) => {
          this.github = payload.data
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

  .orgButton {
    margin: 5px;
  }
</style>
