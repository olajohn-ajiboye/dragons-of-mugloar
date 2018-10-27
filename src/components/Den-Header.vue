<template>
<div class="">
  <nav class="navbar  navbar-light bg-faded fixed-top title" >
    <div class="float-left">
      <a class="navbar-brand font-weight-bold navbar-static-top header " href="/">Dragon of Mugloar</a>
    </div>
  </nav>
  <header>
    <button class="btn stat" :disabled="getGameId" @click="newGame">Start new game</button>
    <div id="game-stats">
      <div class="stat">Lives: {{ getGameData.lives }}</div>
      <div class="stat">Score: {{ getGameData.score }}</div>
      <div class="stat">Turn: {{ getGameData.turn }}</div>
       <div class="stat">highScore: {{ getGameData.highScore }}</div>
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
      ...mapGetters(['getGameId', 'getGameData', 'getGameMessages']),
    },
    methods: {
      newGame() {
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
.navbar {
background-color:#efebe9;
font-family: 'Spicy Rice', cursive;
font-size: 25px;
}
header {
  padding: 15px;
  background-color:#efebe9 ;
  box-shadow: 10px 6px 5px 0px rgba(0,0,0,0.75);
}
#game-stats {
  margin-top: 10px;
}
#game-stats .stat {
  display: inline-block;
  padding: 5px 15px;
  margin: 3px;
  border-radius: 5px;
  font-weight: bold;
  font-family: 'Spicy Rice', cursive;
}

</style>
