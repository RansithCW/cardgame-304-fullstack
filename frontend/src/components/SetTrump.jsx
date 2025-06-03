function SetTrump() {
    const [trumpSuit, setTrumpSuit] = useState("");
    const [errorWindow, setErrorWindow] = useState("");
    return(
        <>
            <div className="mb-4">
                <label className="block mb-2">Select Trump Suit:</label>
                <select
                    value={trumpSuit}
                    onChange={(e) => {
                        try {
                            setTrumpSuit(e.target.value);
                        } catch (err) {
                            setErrorWindow("Error setting trump suit: " + err);
                        }
                    }}
                    className="border rounded px-3 py-2"
                >
                    <option value="">Select Trump Suit</option>
                    <option value="hearts">Hearts</option>
                    <option value="diamonds">Diamonds</option>
                    <option value="clubs">Clubs</option>
                    <option value="spades">Spades</option>
                </select>
            </div>
            <button onClick={handleSetTrump} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition mb-4">
                Confirm Trump Suit (cannot be changed once set)
            </button>
        </>
    );
}

export default SetTrump;