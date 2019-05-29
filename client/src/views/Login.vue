<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <Card title="Login">
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" name="email" label="Email" type="email"></v-text-field>
              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="blue darken-3" large dark>Login</v-btn>
          </v-card-actions>
        </Card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from '../services/AuthService'
import Card from '../components/Card'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password,
        })
        localStorage.token = response.data.token
        this.$store.dispatch('userIsLoggedIn', true)
        this.$router.push('/play')
      } catch (err) {
        this.error = err.response.data.error
      }
    },
  },
  components: {
    Card,
  },
}
</script>