<template>
  <div id="app">
    <DenHeader/>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import DenHeader from './components/Den-Header'
import DenHome from './components/Dragon-Den'
import DenShop from './components/Dragon-Shop'

export default {
  name: 'App',
  components: {
    DenHeader,
    DenShop,
    DenHome
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
