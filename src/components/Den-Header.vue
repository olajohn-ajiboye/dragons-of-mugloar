<template>
<div id="dragon-header">
  
  <nav class="navbar  navbar-light fixed-top" >
      <p class="navbar-brand  navbar-static-top" >Dragon of Mugloar</p>
  </nav>

  <header >
    <button class="btn btn-secondary stat float-left" :disabled="fetchId" @click="startNewGame">Start new game</button>
    <div id="game-stats">
      <p class="stat">Lives: {{ getGameData.lives }}</p>
      <p class="stat">Score: {{ getGameData.score }}</p>
      <p class="stat">Turn: {{ getGameData.turn }}</p>
      <p class="stat">Highscore: {{ getGameData.highScore }}</p>
    </div>
  </header>

</div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  name: 'DenHeader',
  computed: {
      ...mapGetters(['fetchId', 'getGameData', 'getGameMessages']),
    },
    methods: {
      startNewGame() {
        this.$store.dispatch('BEGIN_GAME')
      },
      fetchMessages() {
        this.$store.dispatch('FETCH_MESSAGES')
      }
    },
}
</script>

<!-- Add "scoped" attribute to divmit CSS to this component only -->
<style scoped>
#dragon-header {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1rem
}

#dragon-header .navbar {
  background-color: #efebe9;
  box-shadow: 10px 6px 5px 0px rgba(0,0,0,0.15);
  font-family: 'Spicy Rice', cursive;
}

header {
  padding: 1.5rem;
  background-color:#efebe9;
  box-shadow: 10px 6px 5px 0px rgba(0,0,0,0.15);
  
}

#game-stats .stat {
  display: inline-block;
  padding: 0.3rem 0.3rem;
  margin: 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
}

</style>
