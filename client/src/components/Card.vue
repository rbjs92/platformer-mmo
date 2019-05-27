<template>
  <v-card>
    <v-toolbar dark color="blue darken-3">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <slot>No slot content defined.</slot>
  </v-card>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style></style>
