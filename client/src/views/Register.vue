<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-alert v-model="errorState" dismissible type="error">{{ error }}</v-alert>
        <Card title="Register">
          <v-card-text>
            <v-form>
              <v-text-field v-model="username" name="username" label="Username" type="text"></v-text-field>
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
            <v-btn @click="register" color="blue darken-3" large dark>Register</v-btn>
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
      username: '',
      email: '',
      password: '',
      error: null,
      errorState: false,
    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        localStorage.token = await response.data.token
        this.$store.dispatch('userIsLoggedIn', true)
        this.$router.push('/play')
      } catch (error) {
        this.error = error.response.data.error
        this.errorState = true
      }
    },
  },
  components: {
    Card,
  },
}
</script>