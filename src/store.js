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
    }
  },
  actions: {
    BEGIN_GAME: ({ commit }) => Api.getGame().then(res => commit('SET_GAME', res.data)),

    RESET_GAME: ({ commit }) => commit('RESET_GAME'),

    FETCH_MESSAGES: ({ commit, state }) => {
      Api.getMessages(state.gameData.gameId).then(res => commit('SET_MESSAGES', res.data))
    },

    CLEAR_MESSAGES: ({ commit }) => commit('CLEAR_MESSAGES'),

    GET_SHOP_ITEMS: ({ commit, state }) => {
      Api.getShopItems(state.gameData.gameId).then(res => commit('SET_SHOP_ITEMS', res.data))
    }
  },
  getters: {
    getGameId: function (state) {
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
