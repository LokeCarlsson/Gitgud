<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
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
      <q-tab v-if="!user.authenticated" icon="perm_identity" route="/login" replace>Login</q-tab>
      <q-tab v-if="!user.authenticated" icon="lock_outline" route="/signup" replace>Sign up</q-tab>
      <q-tab v-if="user.authenticated" icon="library_add" route="/secretquote" replace>Secret Quote</q-tab>
    </q-tabs>

    <q-drawer ref="leftDrawer">
      <div class="toolbar">
        <q-toolbar-title :padding="1">
          {{ user.username }}
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="home" to="/" exact>
          Home
        </q-drawer-link>
        <hr>
        <!-- <div class="list-label">Links</div> -->
        <q-drawer-link icon="account_box" to="/about">
          My account
        </q-drawer-link>
        <div class="item">
          <i class="item-primary" @click="logout()">power_settings_new</i>
          <div class="item-content">Log out</div>
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
        user: auth.user
      }
    },
    methods: {
      logout () {
        auth.logout()
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

</style>
