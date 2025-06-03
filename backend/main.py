import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging

from game_logic import Card, Player, Game, SUITS, POINTS, RANKS

### IMPORTANT NOTE TODO:
# Make the bots trash-talk (e.g. with ai generation)

app = FastAPI(debug=True)
logger = logging.getLogger("uvicorn.error")
logger.setLevel(logging.DEBUG)

origins = [
    "http://localhost:5173" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

games = {}
memory_db = {"game": []}

class FrontendCard(BaseModel):
    id: int
    suit: str
    rank: str
    
class BidRequest(BaseModel):
    player_bid: int

class TrumpRequest(BaseModel):
    trump_suit: str


@app.post("/start-game")
def start_game():
    global game
    game = Game()
    hand = game.deal()
    return {"message": "Game Started", "hand": [str(card) for card in hand[:4]]}  # Return first four cards for bidding

@app.get("/game-state")
async def get_game_state():
    if "game" in globals():
        return game.get_state()
    raise HTTPException(status_code=400, detail={"error": "Game not initialized"})


@app.post("/request-bid")
async def request_bid(request_bid: BidRequest):
    if "game" not in globals():
        raise HTTPException(status_code=400, detail={"error": "Game not initialized"})
    if game.is_bidding_complete:
        return {
            "message": "Bidding already complete",
            "highest_bid": game.highest_bid,
            "trump_suit": game.trump_suit,
            "highest_bidder": game.players[game.highest_bidder_id].name,
            "bidding_team": [game.players[i].name for i in game.bidding_team]
        }
    player_bid = request_bid.player_bid        
    return await game.bidding_phase(player_bid)  # Assume player makes first bid always

@app.get("/hand")
async def get_hand():
    if "game" not in globals():
        raise HTTPException(status_code=400, detail={"error": "Game not initialized"})
    return {"hand": [(card.suit, card.rank) for card in game.players[0].hand]}
        
        
@app.post("/set-trump")
async def set_trump(data: TrumpRequest):
    print("Received trump_suit:", data.trump_suit)
    if "game" not in globals():
        raise HTTPException(status_code=400, detail={"error": "Game not initialized"})
    try:
        trump = await game.set_trump(data.trump_suit)
        print(game.trump_suit, game.is_trump_set)
        print(game.is_bidding_complete, game.highest_bidder_id, game.highest_bid)
        return {"message": f"Trump suit set to {trump}", "trump_suit": trump}
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error": str(e), "valid_suits": SUITS})
    


# Smt wrong with the play_trick function. 
# It makes everyone play twice -- kinda obvious the way I set it up, lol 
# found it -> changed for i in range(4) to while len(game.table) < 4
@app.post("/continue-round")
async def continue_round():
    if "game" not in globals():
        raise HTTPException(status_code=400, detail={"error": "Game not initialized"})
    # play_trick handles bots till human's turn, and returns result and play-card endpoint handles call with human's card
    return await game.play_trick()
    

@app.post("/play-card")
async def card_to_play(frontend_card: FrontendCard):
    if "game" not in globals():
        raise HTTPException(status_code=400, detail={"error": "Game not initialized"})
    if len(game.table) >= 4:
        raise HTTPException(status_code=400, detail={"error": "Trick already completed"})
    
    try:
        backend_card = Card(suit=frontend_card.suit, rank=frontend_card.rank)
        return await game.play_trick(selected_card=backend_card)
    except ValueError as e: 
        raise HTTPException(status_code=400, detail={"error": str(e), "valid_cards": [(c.rank, c.suit) for c in game.players[0].hand]})

@app.get("/current-table")
async def get_current_table():
    if "game" in globals() and hasattr(game, "table"):
        return {"cards": [(str(card), pid) for card, pid in game.table]}
    else:
        return {"error": "Game not initialized"}
    
 
    