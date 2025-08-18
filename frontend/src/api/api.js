// src/api/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const startGame = () => api.post('/start-game').then(res => res.data);
export const getGameState = () => api.get('/game-state').then(res => res.data);
export const submitBid = (playerBid) => api.post('/request-bid', { player_bid: playerBid }).then(res => res.data);
export const getHand = () => api.get('/hand').then(res => res.data);
export const continueRound = () => api.post('/continue-round').then(res => res.data);
export const setTrump = (trumpSuit) => api.post('/set-trump', { trump_suit: trumpSuit }).then(res => res.data);
export const playCard = (card) => api.post('/play-card', card).then(res => res.data);
export const getCurrentTable = () => api.get('/current-table').then(res => res.data);
export const getScore = () => api.get('/get-score').then(res => res.data);

// Error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error(`API request to ${error.config.url} failed:`, error.response?.data?.detail || error.message);
    return Promise.reject(error);
  }
);
