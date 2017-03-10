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
      <q-tab icon="library_books" route="/chuck" exact replace>Chuck</q-tab>
      <q-tab v-if="user.authenticated" icon="library_add" route="/secretquote" replace>Secret Quote</q-tab>
    </q-tabs>

    <q-drawer ref="leftDrawer">
      <div class="toolbar">
        <div v-if="user.authenticated" class="list-label">Welcome,</div>
        <q-toolbar-title :key="user.username" :padding="1">
          {{ user.username }}
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <!--Authenticated-->
        <div v-if="user.authenticated">
          <img class="userAvatar" :src="userInfo.avatarUrl">
          <h5 class="userDisplayName">{{ userInfo.displayName }}</h5>
          <p class="userBio">{{ userInfo.bio }}</p>


          <hr>
          <q-drawer-link icon="account_box" to="/account">
            My account
          </q-drawer-link>
          <q-drawer-link icon="settings" to="/chuck">
            Settings
          </q-drawer-link>
        </div>
        <!--Not authenticated-->
        <q-drawer-link v-if="!user.authenticated" icon="perm_identity" to="/login">
          Login
        </q-drawer-link>
        <hr>

        <!--Authenticated-->
        <div v-if="user.authenticated" @click="logout()" class="item item-link">
          <i class="item-primary" @click="logout()">power_settings_new</i>
          <div class="item-content">Sign out</div>
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
  import auth from '../auth/index.js'
  export default {
    data () {
      return {
        user: auth.user,
        userInfo: ''
      }
    },
    mounted () {
      if (this.$root.$route.query.token || !auth.checkToken()) {
        auth.login(this.$root.$route.query)
      }
      console.log('True? ', auth.isLoggedIn)
      if (auth.checkToken()) {
        this.getAccount()
      }
    },
    methods: {
      logout () {
        auth.logout()
      },
      getAccount () {
        this.axios.get('/account', { headers: auth.getAuthHeader() })
        .then((payload) => {
          if (payload.data) {
            this.userInfo = payload.data
          }
        })
        .catch((e) => {
          auth.logout()
          console.log(e)
        })
      }
    }
  }

</script>

<style>
  #bot {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  #messages-container {
    margin-top: 20px;
  }

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
