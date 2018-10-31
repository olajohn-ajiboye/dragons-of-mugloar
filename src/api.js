import axios from 'axios'

const api = axios.create({
  baseURL: `https://www.dragonsofmugloar.com/api/v2`,
  withCredentials: false
})

export default {
  getGame: () => api.post('/game/start'),
  getMessages: gameId => api.get(`/${gameId}/messages`),
  solveMessages: (gameId, adId) => api.post(`/${gameId}/solve/${adId}`),
  getShopItems: gameId => api.get(`/${gameId}/shop`),
  purchaseShopItems: (gameId, itemId) => api.post(`/${gameId}/shop/buy/${itemId}`)
}
