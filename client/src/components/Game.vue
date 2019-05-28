<template>
  <div id="game-container"></div>
</template>

<script>
export default {
  name: 'game',
  data() {
    return {
      game: null,
    }
  },
  async mounted() {
    this.game = await import('../game/index')
    this.game.connect()
  },
  destroyed() {
    this.game.disconnect()
    console.log('game is destroyed')
  },
}
</script>

<style scoped>
#game-container {
  position: absolute;
}
</style>
