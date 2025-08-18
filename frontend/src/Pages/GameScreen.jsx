import { useState, useEffect } from "react";
import full_table_bkgrnd from "../assets/full_table_bkgrnd.png";
import ShowCards from "../components/ShowCards.jsx";
import Table from "../components/Table.jsx";
import Button from "../components/Button.jsx";
import {
  startGame,
  submitBid,
  setTrump,
  getGameState,
  continueRound,
  playCard,
  getHand,
  getScore,
} from "../api/api.js";

function GameScreen() {
  const [hand, setHand] = useState([]);
  const [table, setTable] = useState([]);
  const [trumpSuit, setTrumpSuit] = useState(null);
  const [errorWindow, setErrorWindow] = useState("");
  const [isGameDone, setIsGameDone] = useState(false);

  // Fetch initial hand from backend on mount
  useEffect(() => {
    getHand().then((res) => {
      const handWithIds = res.hand.map(([suit, rank], idx) => ({
        id: idx, // zero indexed
        suit,
        rank,
      }));
      setHand(handWithIds);
      getGameState().then((res) => {
        const trumpsBackend = res.is_trump_set
          ? res.trump_suit
          : "Trump not set yet";
        setTrumpSuit(trumpsBackend);
        console.log(res);
        console.log("Trumps were set by " + res.highest_bidder_id);
        console.log("Status of trumps " + res.is_trump_set);
      });
    });
  }, []);

  // start game auto for testing ONLY FOR TESTING
  const handleNewGame = async () => {
    try {
      await startGame();
      await submitBid(130);
      await setTrump("Clubs");

      const gameState = await getGameState();
      const trumps = gameState.is_trump_set ? gameState.trumpSuit : null;
      setTrumpSuit(trumps);
      console.log("Trumps were found to be " + trumps);
    } catch (err) {
      setTrumpSuit("Error: " + err);
    }

    try {
      setTable([]);
      const res = await getHand(false);
      console.log(res);
      const handWithIds = res.hand.map(([suit, rank], idx) => ({
        id: idx, // zero indexed
        suit,
        rank,
      }));
      setHand(handWithIds);
    } catch (err) {
      console.error("New game setup failed", err);
      console.log(await getHand(true));
    }
  };

  const handlePlayCard = async (card) => {
    try {
      const res = await playCard(card); // send card to backend
      const tableWithIds = res.current_table.map(
        ([CardObj, player_id], idx) => ({
          id: idx,
          suit: CardObj.suit,
          rank: CardObj.rank,
        })
      );

      setHand((prev) => prev.filter((c) => c.id !== card.id));
      setTable(tableWithIds);
      return true; // to make it so card isn't played if not valid
    } catch (err) {
      const errMsg = err?.response?.data?.detail;
      console.error("playCard API failed:", errMsg);
      setErrorWindow("Error!" + errMsg);
      return false;
    }
  };

  const handleContinueRound = async () => {
    setTable([]); // Reset table for next trick
    if (hand.length != 0) {
      try {
        const res = await continueRound();
        const tableWithIds = res.current_table.map(
          ([CardObj, player_id], idx) => ({
            id: idx,
            suit: CardObj.suit,
            rank: CardObj.rank,
          })
        );
        setTable(tableWithIds);
        console.log("hand length is " + hand.length);
        
      } catch (err) {
        console.error("playCard API failed:", err);
      }
    } else {
      setIsGameDone(true); // No cards left, game is done
      console.log("Game is done, no cards left in hand.");
    }
  };

  const handleSeeScores = async () => {
    try {
      const res = await getScore();
      console.log("Scores:", res);
    } catch (err) {
      console.error("getScore API failed:", err);
      setErrorWindow("Error fetching scores: " + err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative font-sans"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `url(${full_table_bkgrnd})`,
      }}
    >
      {/* Table area with padding */}
      <p>Trumps are: {trumpSuit}</p>
      <Table>
        <ShowCards cards={table} />
      </Table>
      <div className="flex flex-row">
        {/* Hand area with padding */}
        <ShowCards
          cards={hand}
          onCardClick={async (card) => {
            await handlePlayCard(card);
          }}
        />
        {/* Next Trick button below cards */}
        {!isGameDone ? (
          <Button
            label="Continue"
            onClick={() => handleContinueRound()} // Reset table for next trick
          />
        ) : (
          <Button label="See Scores" onClick={() => handleSeeScores()} />
        )}
      </div>
      {/* <Button
        label="New Game (Testing)"
        onClick={() => handleNewGame()}
        /> */}
      <p>{errorWindow}</p>
    </div>
  );
}

export default GameScreen;
