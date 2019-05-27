<template>
  <v-toolbar dark color="blue darken-3">
    <v-toolbar-items>
      <v-btn to="/" flat>Home</v-btn>
      <v-btn to="/profile" v-if="$store.state.userIsLoggedIn" flat>Profile</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/login" v-if="!$store.state.userIsLoggedIn" flat>Login</v-btn>
      <v-btn to="/register" v-if="!$store.state.userIsLoggedIn" flat>Register</v-btn>
      <v-btn @click="logout" v-if="$store.state.userIsLoggedIn" flat>Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$store.dispatch('userIsLoggedIn', false)
      this.$router.push('/')
    },
  },
}
</script>