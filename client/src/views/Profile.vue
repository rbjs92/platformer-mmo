<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <Card title="Profile">
          <v-card-text>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Username</v-list-tile-title>
                <v-list-tile-sub-title>{{ username }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Location</v-list-tile-title>
                <v-list-tile-sub-title>{{ location }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-text>
        </Card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserService from '../services/UserService'
import Card from '../components/Card'
export default {
  data: () => ({
    username: null,
    location: null,
  }),
  async mounted() {
    const user = (await UserService.profile()).data
    this.username = user.username
    this.location = user.location
  },
  components: {
    Card,
  },
}
</script>