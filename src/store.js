import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameData: {}, // holds game data
    messages: [],
    shopItems: [],
    boughtItems: {}
  },
  mutations: {
    SET_GAME: function (state, data) {
      state.gameData = Object.assign({}, data)
      return state.gameData
    },

    RESET_GAME: state => {
      state.gameData = {}
      state.messages = []
      state.shopItems = []
      state.boughtItems = {}
    },
    CLEAR_MESSAGES: state => {
      state.messages = []
      return state.messages
    },
    SET_MESSAGES: (state, data) => {
      console.log(data)
      state.messages = Object.assign([], data.map(msg => {
        // initial message states
        msg.fail = false
        msg.totalTurn = state.gameData.turn + msg.expiresIn
        
        // arrange messages by probability/risk
        switch (msg.probability) {
          case 'Piece of cake':
            msg.risk = 0
            break
          case 'Walk in the park':
            msg.risk = 1
            break
          case 'Sure thing':
            msg.risk = 2
            break
          case 'Hmmm....':
            msg.risk = 3
            break
          case 'Gamble':
            msg.risk = 4
            break
          case 'Quite likely':
            msg.risk = 5
            break
          case 'Risky':
            msg.risk = 6
            break
          case 'Playing with fire':
            msg.risk = 7
            break
          case 'Rather detrimental':
            msg.risk = 8
            break
          case 'Suicide mission':
            msg.risk = 9
            break
          case 'Impossible':
            msg.risk = 10
            break
          default:
            msg.risk = 11
        }

        return msg
      }))
    },

    SOLVE_MESSAGE: (state, { id, data }) => {
      // changes game data after solving
      state.gameData = Object.assign(state.gameData, {
        lives: data.lives,
        gold: data.gold,
        score: data.score,
        turn: data.turn
      })

      state.messages = state.messages.map(msg => {
        if (msg.adId === id) {
          msg.done = true
          msg.fail = !data.success
          msg.msg = data.message || ''
        }

        return msg
      })
    },
    SET_SHOP_ITEMS: function (state, data) {
      state.shopItems = data
      return state.shopItems
    },

    PURCHASE_SHOP_ITEM: (state, { id, data }) => {
      if (data.shoppingSuccess) {
        // keeps track of bought items
        if (!state.boughtItems.hasOwnProperty(id)) {
          state.boughtItems[id] = 0
        }
        state.boughtItems[id]++
      }

      // Update game state after purchase
      state.gameData = Object.assign(state.gameData, {
        lives: data.lives,
        level: data.level,
        gold: data.gold,
        turn: data.turn
      })
    }

  },
  actions: {
    BEGIN_GAME: ({ commit }) => Api.getGame().then(res => commit('SET_GAME', res.data)),

    RESET_GAME: ({ commit }) => commit('RESET_GAME'),

    FETCH_MESSAGES: ({ commit, state }) => {
      Api.getMessages(state.gameData.gameId).then(res => commit('SET_MESSAGES', res.data))
    },

    CLEAR_MESSAGES: ({ commit }) => commit('CLEAR_MESSAGES'),

    SOLVE_MESSAGE: ({ commit, state }, id) => {
      Api.solveMessages(state.gameData.gameId, id).then(res => commit('SOLVE_MESSAGE', { id, data: res.data }))
    },

    GET_SHOP_ITEMS: ({ commit, state }) => {
      Api.getShopItems(state.gameData.gameId).then(res => commit('SET_SHOP_ITEMS', res.data))
    },
    PURCHASE_SHOP_ITEM: ({ commit, state }, id) => {
      Api.purchaseShopItems(state.gameData.gameId, id).then(res => commit('PURCHASE_SHOP_ITEM', { id, data: res.data }))
    }
  },
  getters: {
    fetchId: function (state) {
      if (state.gameData.hasOwnProperty('gameId')) {
        return state.gameData.gameId
      }
      return null
    },
    getGameData: state => state.gameData,
    getGameMessages: state => state.messages,
    getGameShopItems: state => state.shopItems,
    getGameShopBoughtItems: state => state.boughtItems
  }
})
