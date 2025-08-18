import { useEffect, useState } from "react";
import Button from "./Button"
import { 
    submitBid,
    getGameState,
 } from "../api/api";
import { useNavigate } from "react-router-dom";
 
 
//NOTE FOR COMING BACK -> Figure out how to not sort the first half hand, and add a button to get dealt and start bidding
export default function SetBid({ onBiddingCompletion }) {
    const navigate = useNavigate()
    const [currBid, setCurrBid] = useState(50)
    const [highBid, setHighBid] = useState(40)
    const [highBidder, setHighBidder] = useState("Player")
    const [allBids, setAllBids] = useState({
        "Player": "no bid yet", 
        "Opp1": "no bid yet", 
        "Partner": "no bid yet", 
        "Opp2": "no bid yet"})
    const [bidError, setBidError] = useState("")
    const [isBiddingDone, setIsBiddingDone] = useState(false)
    // const [trumpSetter, setTrumpSetter] = useState("Player")
    // const [trumps, setTrumps] = useState("Clubs")
    
    useEffect(() => {
        if (isBiddingDone) {
            onBiddingCompletion(highBidder)
        }
    }, [isBiddingDone, highBidder, onBiddingCompletion])

    const handleSubmitBid = async (bid) => {
        try {
            const res = await submitBid(bid);
            const newBids = { ...allBids }
            
            res.bids_made?.forEach(([player, bid]) => {
                newBids[player] = bid;
            })
            setAllBids(newBids)

        } catch (err) {
            setBidError("Error submitting bid: " + err);
            return;
        }
        const gameState = await getGameState()
        console.log(gameState)
        setIsBiddingDone(gameState.is_bidding_complete)
        setHighBid(gameState.highest_bid)
        setCurrBid(gameState.highest_bid + 10) // Changed
        setHighBidder(gameState.highest_bidder)
        // setTrumpSetter(gameState.highest_bidder)
        // setTrumps(gameState.trump_suit)

    };

    const handleIncrementBid = () => {
        try {setCurrBid((prevBid) => {
            let newBid = prevBid + 10;
            newBid = newBid > highBid ? prevBid + 10 : highBid + 10;
            newBid = newBid > 130 ? 130 : newBid;
            return newBid;
        });} catch (err) {
            setBidError("Error" + err)
        }
    }
    

    const handleDecrementBid = () => {
        setCurrBid((prevBid) => {
            let newBid = prevBid - 10;
            newBid = newBid > highBid ? prevBid - 10 : 0;
            return newBid;
        })
    }


    return (
        <>
            <h1>Other Players' Bids:</h1>
            <ul>
                {Object.entries(allBids).map(([player, bid]) => (
                    <li key={player}>
                        {player}: {bid}
                    </li>
                ))}
            </ul>
            { !isBiddingDone ?
                <div className="flex-row-reverse">
                    <Button label="+" onClick={handleIncrementBid} />
                    <p>Your bid: {currBid === 0 ? 'pass': currBid}</p>
                    <Button label="-" onClick={handleDecrementBid} />
                    <br />
                    <Button label="Submit Bid" onClick={() => handleSubmitBid(currBid)} />
                </div>
                : <div>
                    <h1>Bidding is Done!</h1>
                    <h1>Trumps will be set by: {highBidder}</h1>
                </div>
                }
            <h1>{bidError}</h1>
            {bidError && <Button label="ok" onClick={() => setBidError("")} />}
        </>
    )
}