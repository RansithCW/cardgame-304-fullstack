import { useState } from 'react';
import axios from 'axios';
import table_background from './assets/table_background.png';
import Card from './components/Card.jsx';
import {
  startGame,
  submitBid,
  setTrump,
  getGameState,
  nextTrick,
} from './api/api.js';

function Bidding() {
    const [gameState, setGameState] = useState(null);
    const [hand, setHand] = useState([]);
    const [table, setTable] = useState([]);
    const [bid, setBid] = useState(0);
    const [trump, setTrump] = useState(null);

    return (
        <div>
            <h2>Bidding Phase</h2>
            <div>
                <h3>Your Hand</h3>
                {hand.map((card) => (
                    <Card key={card.id} suit={card.suit} rank={card.rank} />
                ))}
            </div>
            <div>
                <h3>Current Bid: {bid}</h3>
                <input
                    type="number"
                    value={bid}
                    onChange={(e) => setBid(Number(e.target.value))}
                />
            </div>
            <div>
                <h3>Trump Suit</h3>
                <select
                    value={trump}
                    onChange={(e) => setTrump(e.target.value)}
                >
                    <option value="">Select Trump Suit</option>
                    <option value="hearts">Hearts</option>
                    <option value="diamonds">Diamonds</option>
                    <option value="clubs">Clubs</option>
                    <option value="spades">Spades</option>
                </select>
            </div>
        </div>
    )
}

