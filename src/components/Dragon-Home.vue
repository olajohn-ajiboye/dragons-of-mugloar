<template>
   <div id="message">
    <button class="btn btn-outline-success" :disabled="!fetchId" @click="fetchMessages">Fetch messages</button>

    <div class="message-status">
      <span class="box solved"></span><span style="margin-right: 1rem">solved Ads</span>
      <span class="box fail"></span><span style="margin-right: 1rem">Solving failed</span>
      <span class="box no-turns"></span><span>No turns</span>
    </div>

    <div class="message-list">
      <div
        class="message-item" v-for="item in getGameMessages" :key="item.adId"
        :class="{
          done: item.done, fail: item.done && item.fail,
          history: !item.done && (getGameData.hasOwnProperty('turn') && item.totalTurn <= getGameData.turn)
        }"
      >
        <button
          type ="button"
          class="btn btn-secondary"
          :disabled="item.done || (getGameData.hasOwnProperty('turn') && item.totalTurn <= getGameData.turn)"
          @click="solveMessage(item.adId)"
        >Solve</button>
        <div class="msg">{{ item.message }}</div>
        <div class="info"><span class="reward">Reward: {{ item.reward }}</span> {{ item.probability }}</div>
        <div class="msg result">{{ item.msg || '&nbsp;' }}</div>
      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
 import { mapGetters } from 'vuex'
export default {
  name: 'DragonHome',
  computed: {
      ...mapGetters(['fetchId', 'getGameData', 'getGameMessages']),
    },
    methods: {
      newGame() {
        this.$store.dispatch('START_GAME')
      },
      fetchMessages() {
        this.$store.dispatch('FETCH_MESSAGES')
      },
      solveMessage(id) {
        this.$store.dispatch('SOLVE_MESSAGE', id)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#message {
  padding: 1rem;
  -webkit-box-shadow: -13px 6px 11px -1px rgba(18,12,10,1);
  -moz-box-shadow: -13px 6px 11px -1px rgba(18,12,10,1);
  box-shadow: -13px 6px 11px -1px rgba(18,12,10,1);
  font-family: 'Source Sans Pro', sans-serif;
}
#message .message-status {
  margin: 1rem
}
#message .message-list {
  font-size: 1rem;
}
#message .message-item {
  padding: 1rem;
  background-color: #efebe9;
  margin-bottom: 0.3rem;
  border-left: 0.5rem solid #efebe9;
  border-radius: 0.5rem; 
}
#message .message-item.red {
  border-color: red;
}
#message .message-item .btn {
  float: left;
  margin-right: 0.5rem;
}

#message .message-item .msg.result {
  padding-top: 0.5rem;
  font-style: italic;
}
#message .message-item .info {
  padding-top: 0.3rem 
}
#message .message-item .reward {
  background-color: #e0f1e5;
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: bold;
}
#message .message-item.done {
  background-color: #ccc;
  border-color: #189e22;
}
#message .message-item.fail {
  background-color: #dcbdbd;
  border-color: #bb4545;
}
#message .message-item.history {
  background-color: #dfdfdf;
  color: #b2b2b2;
  border-color: #555;
}

#message .message-status .box {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
#message .message-status .box.solved {
  background-color: #189e22;
}
#message .message-status .box.fail {
  background-color: #bb4545;
}
#message .message-status .box.no-turns {
  background-color: #555;
}


</style>
