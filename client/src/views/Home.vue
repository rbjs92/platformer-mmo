<template>
  <v-responsive>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to the game</h3>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Check out our upcoming release!</div>
          <v-btn
            to="/register"
            v-if="!$store.state.userIsLoggedIn"
            class="mx-0"
            color="primary"
            large
          >Sign up</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
}
</script>