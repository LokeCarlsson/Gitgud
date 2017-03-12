<template>
  <q-layout>
    <div slot="header" class="toolbar hide-on-drawer-visible">
      <button class="" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title class="hide-on-drawer-visible" :padding="1">
        Gitgud
      </q-toolbar-title>
      <!--<button @click="$refs.rightDrawer.open()">
        <i>help</i>
      </button>-->
    </div>

    <q-tabs slot="navigation" class="justified">
      <q-tab icon="home" route="/" exact replace>Home</q-tab>
      <q-tab v-show="authenticated" icon="group" route="/timeline/orgs" exact replace>Org timeline</q-tab>
      <q-tab v-show="authenticated" icon="person" route="/timeline/user" exact replace>User timeline</q-tab>
    </q-tabs>

    <q-drawer ref="leftDrawer">
      <div class="toolbar">
        <div v-show="authenticated" class="list-label">Welcome,</div>
        <q-toolbar-title :key="username" :padding="1">
          {{ username }}
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <!--Authenticated-->
        <div v-show="authenticated">
          <img class="userAvatar" :src="avatarUrl">
          <h5 class="userDisplayName">{{ displayName }}</h5>
          <p class="userBio">{{ bio }}</p>


          <hr>
          <q-drawer-link icon="account_box" to="/account">
            My account
          </q-drawer-link>
          <q-drawer-link icon="settings" to="/settings">
            Settings
          </q-drawer-link>
        </div>
        <!--Not authenticated-->
        <q-drawer-link v-show="!authenticated" icon="perm_identity" to="/login">
          Login
        </q-drawer-link>
        <hr>

        <!--Authenticated-->
        <div v-if="authenticated" class="item item-link">
          <i class="item-primary">power_settings_new</i>
          <div class="item-content" @click="logout()">Sign out</div>
        </div>
      </div>
    </q-drawer>

    <router-view style="padding: 10px;" class="layout-view"></router-view>

    <!--<q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar">
        <q-toolbar-title :padding="1">
          Empty!
        </q-toolbar-title>
      </div>

      <p style="padding: 20px;" class="text-grey-7">
      </p>
    </q-drawer>-->

    <div slot="footer" class="toolbar">
      <div class="auto flex justify-center within-iframe-hide">
        <button v-go-back="'/'">
          <i class="on-left">
            replay
          </i>
          Back to Home
        </button>
      </div>
      <q-toolbar-title :padding="0" class="within-iframe-only">
        Footer
      </q-toolbar-title>
    </div>

  </q-layout>
</template>

<script>
  import store from '../../store'
  import auth from '../auth'
  import { Toast } from 'quasar'
  export default {
    data () {
      return {
        authenticated: store.getters.authenticated,
        username: store.getters.username,
        displayName: '',
        avatarUrl: '',
        bio: ''
      }
    },
    mounted () {
      if (this.$root.$route.query.token !== undefined) {
        auth.login(this.$root.$route.query)
      }

      this.username = store.getters.username
      this.authenticated = store.getters.authenticated

      if (this.authenticated) {
        this.axios.get('/account', { headers: auth.getAuthHeader() })
        .then((payload) => {
          this.avatarUrl = payload.data.avatarUrl
          this.displayName = payload.data.displayName
          this.bio = payload.data.bio
        })
      }
    },
    methods: {
      logout () {
        auth.logout()
        this.authenticated = false
        this.username = ''
        this.displayName = ''
        this.avatarUrl = ''
        this.bio = ''
        Toast.create('You have been signed out!')
      }
    }
  }

</script>

<style>
  .userAvatar {
    width: 150px;
    height: 150px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin-left: 20px;
    margin-top: 20px;
  }

  .userDisplayName {
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .userBio {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
