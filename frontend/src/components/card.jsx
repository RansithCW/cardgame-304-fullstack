import React from 'react';

// Map suits to symbols and colors
const suitSymbols = {
    hearts: { symbol: '♥', color: 'red' },
    diamonds: { symbol: '♦', color: 'red' },
    clubs: { symbol: '♣', color: 'black' },
    spades: { symbol: '♠', color: 'black' },
};


function Card({ rank, suit, onClick }) {
    const suitInfo = suitSymbols[suit?.toLowerCase()] || {};
    const cardStyle = {
        width: '80px',
        height: '120px',
        border: '1px solid #333',
        borderRadius: '8px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '2px 2px 8px #aaa',
        userSelect: 'none',
    };

    const rankStyle = {
        color: suitInfo.color,
        fontWeight: 'bold',
        fontSize: '1.2em',
    };

    const suitStyle = {
        color: suitInfo.color,
        fontSize: '1.5em',
        alignSelf: 'center',
    };

    return (
        <div style={cardStyle} onClick={onClick}>
            <div style={rankStyle}>{rank}</div>
            <div style={suitStyle}>{suitInfo.symbol}</div>
            {/* Display rank at the bottom */}
            <div style={{ ...rankStyle, alignSelf: 'flex-end' }}>{rank}</div>
        </div>
    );
};



export default Card;
