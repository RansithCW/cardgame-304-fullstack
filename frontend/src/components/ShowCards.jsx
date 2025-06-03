import Card from './Card.jsx';

function ShowCards({ cards, onCardClick = () => {} }) {

  return (
    <div className="w-full flex flex-row justify-center pb-4 space-x-2 z-10 px-8">
      {cards.map((card) => (
        <Card 
            key={card.id}
            suit={card.suit}
            rank={card.rank}
            onClick={() => onCardClick(card)}
          />
      ))}
    </div>
  );
}

export default ShowCards;