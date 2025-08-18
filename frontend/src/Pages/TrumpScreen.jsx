import { useEffect, useState } from "react";
import SetTrump from "../components/SetTrump";
import { getGameState } from "../api/api.js";


const TrumpScreen = () => {
    const [gameState, setGameState] = useState({});
    useEffect(() => {
        (async () => {
            const currState = await getGameState();
            console.log("Game State:", currState);
            setGameState(currState);
            console.log("Highest Bidder:", currState.highest_bidder);
            console.log("Trump Suit:", currState.trump_suit);
            console.log("Is Trump Set:", currState.is_trump_set);
        })();
    }, []);

    console.log("Game State:", gameState);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Set Trump Suit</h1>
            <SetTrump trumpSetter={gameState.highest_bidder} />
        </div>
    )

}

export default TrumpScreen;// This component is used to set the trump suit after the bidding phase.
// It fetches the game state to determine who can set the trump suit and displays the SetTrump component.