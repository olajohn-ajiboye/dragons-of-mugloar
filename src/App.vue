<template>
  <div id="app">
    <DenHeader/>
     <div >
      <div class="row">
       <div class="col-xs-12 col-sm-8 col-md-8 messages">
        <DragonHome/>
       </div>
       <div class="col-xs-6 col-md-4 shop">
       <DragonShop/>
    </div>
  </div>
 </div>
</div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import DenHeader from './components/Den-Header'
import DragonHome from './components/Dragon-Home'
import DragonShop from './components/Dragon-Shop'

export default {
  name: 'App',
  components: {
    DenHeader,
    DragonShop,
    DragonHome
  },
  watch: {
    //resets game when lives becomes 0
    'getGameData.lives' (lives) {
      if (lives == 0) {
        alert('Game over');
        this.$store.dispatch('RESET_GAME');
      }
    }
  },
  computed: {
    ...mapGetters(['getGameId', 'getGameData']),
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
