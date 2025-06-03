import { Link } from "react-router-dom"


function StartScreen() {
    return (
        <>
            <h1> This is the Home Screen! </h1>
            <Link to="/">Home</Link>
            <Link to="/bidding">Go To Bidding!</Link>
            <Link to="/game">Start Game!</Link>
        
        </>
    )
}

export default StartScreen;