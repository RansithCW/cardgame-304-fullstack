import { useEffect, useState } from "react";
import { startGame, getGameState, getHand } from "../api/api.js";
import Card from "../components/Card.jsx";
import SetTrump from "../components/SetTrump.jsx";
import Button from "../components/Button.jsx";
import ShowCards from "../components/ShowCards.jsx";
import SetBid from "../components/SetBid.jsx";
import { useNavigate } from "react-router-dom";

function BiddingScreen() {
  const navigate = useNavigate();
  const [isBiddingDone, setIsBiddingDone] = useState(false);
  const [trumpSuit, setTrumpSuit] = useState("");
  const [halfHand, setHalfHand] = useState([]);
  const [highBidder, setHighBidder] = useState("Player");
  const [errorWindow, setErrorWindow] = useState("");

  useEffect(() => {
    (async () => {
      const res = await startGame();
      console.log(res);
      const halfHand = res.hand.map(([suit, rank], idx) => ({
        id: idx, // zero indexed
        suit,
        rank,
      }));
      setHalfHand(halfHand);
    })();
  }, []);

  return (
    <>
      <h1>This is the bidding Screen!</h1>
      <div
        className="min-h-screen flex flex-col items-center justify-center relative font-sans"
        style={{
          background: "linear-gradient(135deg, #e6f9ec 0%, #b2f2d7 100%)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <>
          <h1 className="text-4xl font-bold mb-4">Bidding Phase</h1>
          <p>Your Current Hand: </p>
          <ShowCards cards={halfHand} />
          {!isBiddingDone ? (
            <SetBid
              onBiddingCompletion={(trumpSetter) => {
                setIsBiddingDone(true);
                setHighBidder(trumpSetter);
              }}
            />
          ) : 
            <div className="text-2xl font-semibold mt-4">
              <p>Trumps will be set by the highest bidder</p>
              <p>Highest Bidder: {highBidder}</p>
              {/* <Button
                onClick={async () => {
                  try { navigate("/trump"); }
                  catch (err) {
                    setErrorWindow("Error navigating to Trump Screen: " + err);
                  }
                 }} 
                 label="Continue to Trump Setting"/> */}
                  <h1 className="text-3xl font-bold mb-4">Set Trump Suit</h1>
                  <SetTrump trumpSetter={highBidder} />
            </div>
          }
        </>
      </div>
    </>
  );
}

export default BiddingScreen;
