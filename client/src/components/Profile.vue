<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-title>Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ username }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ location }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserService from '../services/UserService'
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
}
</script>