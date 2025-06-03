import { useNavigate, useState } from "react";
import {
    startGame,
    getGameState,
    submitBid,
    setTrump,
} from '../api/api.js'
import Card from "../components/Card.jsx";
import SetTrump from "../components/SetTrump.jsx";
import Button from "../components/Button.jsx";
import ShowCards from "../components/ShowCards.jsx";


function BiddingScreen() {
    const navigate = useNavigate();

    const [bid, setBid] = useState(0);
    const [trumpSuit, setTrumpSuit] = useState("");
    const [gameState, setGameState] = useState(null);
    const [errorWindow, setErrorWindow] = useState("")

    const handleStartGame = () => {
        startGame().then(() => {
            navigate("/bidding");
        });
    };

    useEffect(() => {
        (async () => {
            await startGame();
            const gameState = await getGameState();
            setGameState(gameState);
            const halfHand = gameState.hand.slice(0, 3); // Only first 4 cards for bidding
            <ShowCards cards={halfHand} onCardClick={(card) => {}} />
        })();
    }, []);

    const handleSubmitBid = async () => {
        try {
            await submitBid(bid);
        } catch (err) {
            setErrorWindow("Error submitting bid: " + err);
            return;
        }
        await getGameState().then(setGameState);
    };




        return (
            <>
                <h1>This is the bidding Screen!</h1>
                <div className="min-h-screen flex flex-col items-center justify-center relative font-sans" style={{ background: 'linear-gradient(135deg, #e6f9ec 0%, #b2f2d7 100%)', fontFamily: "'Inter', sans-serif" }}>
                    <h1 className="text-4xl font-bold mb-4">Bidding Phase</h1>
                    <p>Your Current Hand: </p>
                    <div className="flex flex-wrap justify-center mb-4">
                        {gameState && gameState.hand.map((card) => (
                            <div key={card.id} className="m-2">
                                <Card rank={card.rank} suit={card.suit} />
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Your Bid:</label>
                        <input
                            type="number"
                            value={bid}
                            onChange={(e) => setBid(Number(e.target.value))}
                            className="border rounded px-3 py-2"
                        />
                    </div>
                    <button onClick={handleSubmitBid} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition mb-4">
                        Submit Bid
                    </button>
                    if (!{gameState.is_trump_set} && !{gameState.is_bidding_phase}) {
                        <SetTrump />
                    } else {
                        <p className="text-lg mb-4">{gameState.message}</p>
                    }
                </div>
            </>
    );
};

export default BiddingScreen;