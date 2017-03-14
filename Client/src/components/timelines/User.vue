<template>
  <div id='user'>
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
  export default {
    data () {
      return {
        github: [],
        authenticated: store.getters.authenticated
      }
    },
    mounted () {
      this.axios.get('https://api.github.com/users/' + store.getters.username + '/events')
        .then((payload) => {
          this.github = payload.data
        })
    }
  }

</script>
