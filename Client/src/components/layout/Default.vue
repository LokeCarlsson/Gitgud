<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        Gitgud
      </q-toolbar-title>
      <button @click="$refs.rightDrawer.open()">
        <i>help</i>
      </button>
    </div>

    <q-tabs slot="navigation" class="justified">
      <q-tab icon="view_quilt" route="/" exact replace>Home</q-tab>
      <q-tab icon="view_quilt" route="/chuck" exact replace>Chuck</q-tab>
      <q-tab icon="view_day" route="/404" replace>404</q-tab>
      <q-tab icon="view_day" route="/cash" replace>402</q-tab>
    </q-tabs>

    <q-drawer swipe-only ref="leftDrawer">
      <div class="toolbar">
        <q-toolbar-title :padding="1">
            Gitgud
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="home" to="/" exact>
          Home
        </q-drawer-link>
        <hr>
        <!-- <div class="list-label">Links</div> -->
        <q-drawer-link icon="account_box" to="/about">
          About
        </q-drawer-link>
      </div>
    </q-drawer>

    <router-view style="padding: 10px;" class="layout-view"></router-view>

    <q-drawer right-side swipe-only ref="rightDrawer">
      <div class="toolbar">
        <q-toolbar-title :padding="1">
            Empty!
        </q-toolbar-title>
      </div>

      <p style="padding: 20px;" class="text-grey-7">
      </p>
    </q-drawer>

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
export default {
  data () {
    return {}
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
