<template>
  <v-app>
    <app-nav></app-nav>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNav from './components/AppNav.vue'

export default {
  name: 'app',
  components: {
    AppNav,
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('userIsLoggedIn', true)
    } else {
      this.$store.dispatch('userIsLoggedIn', false)
    }
  },
}
</script>