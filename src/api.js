import axios from 'axios'
// import { EventBus } from './event'

const api = axios.create({
  baseURL: `https://www.dragonsofmugloar.com/api/v2`,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getGame: () => api.post('/game/start'),
  getMessages: gameId => api.get(`/${gameId}/messages`),
  solveMessages: (gameId, adId) => api.post(`/${gameId}/solve/${adId}`),
  getShopItems: gameId => api.get(`/${gameId}/shop`),
  purchaseShopItems: (gameId, itemId) => api.post(`/${gameId}/shop/buy/${itemId}`)
}
