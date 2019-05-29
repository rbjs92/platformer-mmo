<template>
  <div>
    <div id="game-container"></div>
    <!-- <profile></profile> -->
  </div>
</template>

<script>
import Profile from './Profile'
export default {
  name: 'game',
  components: {
    Profile,
  },
  async mounted() {
    const game = await import('../game/index')
    game.connect()
  },
}
</script>

<style scoped>
#game-container {
  position: absolute;
}
</style>
