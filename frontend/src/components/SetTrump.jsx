import { getGameState, setTrump } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function SetTrump({ trumpSetter }) {
  const navigate = useNavigate();
  const [trumpSuit, setTrumpSuit] = useState("");
  const [errorWindow, setErrorWindow] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getGameState();
      setTrumpSuit(res.trump_suit);
      trumpSetter = res.highest_bidder;
      console.log("Trump Setter:", trumpSetter);
    })();
  }, []);
  const handleSetTrump = async () => {
    try {
      setTrumpSuit(trumpSuit);
      await setTrump(trumpSuit);
      navigate("/game");
    } catch (err) {
      setErrorWindow("Error setting trump suit: " + err.detail);
    }
  };
  console.log(trumpSetter);

  return (
    <>
      {trumpSetter == "Player" ? (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Select Trump Suit:</label>
            <select
              value={trumpSuit}
              onChange={(suit) => {
                setTrumpSuit(suit.target.value);
              }}
              className="border rounded px-3 py-2"
            >
              <option value="">Select Trump Suit</option>
              <option value="Hearts">Hearts</option>
              <option value="Diamonds">Diamonds</option>
              <option value="Clubs">Clubs</option>
              <option value="Spades">Spades</option>
            </select>
          </div>
          <button
            onClick={handleSetTrump}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition mb-4"
          >
            Confirm Trump Suit and Play
          </button>
          <p>{errorWindow}</p>
        </div>
      ) : (
        <h1>
          Trump has been set by {trumpSetter} as {trumpSuit}{" "}
        </h1>
        // <Button onClick={() => setTrumpSuit("TestTrumpSuit")}/> // Placeholder for testing
      )}
    </>
  );
}

export default SetTrump;
