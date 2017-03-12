<template>
  <div id='orgs'>
    <div v-show="this.authenticated" class="timeline">
      <div class="timeline-label">
        <h4 class="bg-white text-italic">
          Today
        </h4>
      </div>

        <div class="timelineEvents" v-if="github" v-for="event in github">
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
      <div v-else>
        <spinner color="#2196F3" name="dots" class="spinner"></spinner>
      </div>
    </div>

  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data () {
      return {
        github: [],
        authenticated: store.getters.authenticated
      }
    },
    mounted () {
      this.axios.get('https://api.github.com/orgs/wp15/events')
        .then((payload) => {
          this.github = payload.data
        })
      this.$options.sockets.githubEvent = (data) => {
        this.addNewEvent(data)
      }
    },
    methods: {
      addNewEvent (data) {
        const newObj = {
          actor: {
            login: data.sender.login,
            avatar_url: data.sender.avatar_url
          },
          created_at: data.commits[0].timestamp,
          repo: {
            name: data.repository.name
          },
          payload: {
            commits: data.commits
          }
        }
        this.github.unshift(newObj)
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
