import random
from collections import defaultdict

SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
RANKS = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A']
POINTS = {'J': 30, '9': 20, 'A': 11, '10': 10, 'K': 3, 'Q': 2, '7': 0, '8': 0}

class Card:
    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank

    def __str__(self):
        return f"{self.rank} of {self.suit}"

    def __lt__(self, other):
        return RANKS.index(self.rank) < RANKS.index(other.rank)
    
    def __eq__(self, other):
        return isinstance(other, Card) and self.suit == other.suit and self.rank == other.rank

    def __hash__(self):
        return hash((self.suit, self.rank))


class Player:
    def __init__(self, name, is_human=False):
        self.name = name
        self.hand = []
        self.is_human = is_human
        self.tricks = []

    def bid(self, current_bid):
        if self.is_human:
            try:
                bid = int(input(f"{self.name}, enter your bid (or 0 to pass) (Current bid = {current_bid}): "))
            except ValueError:
                return 0
            return bid if bid > current_bid and bid <= 130 else 0
        else:
            bot_bid = random.choice([0, current_bid + 10]) if current_bid <= 130 else 0
            if bot_bid <= current_bid:
                return 0 # pass if bot's bid is lower
            return bot_bid

    def play_card(self, lead_suit, trump_suit):
        legal_cards = [card for card in self.hand if card.suit == lead_suit]
        trump_cards = [card for card in self.hand if card.suit == trump_suit]
        if self.is_human:
            while True:
                print(f"Your hand: {[str(card) for card in self.hand]}")
                card_str = input("Enter card to play (e.g., 9 of Hearts): ")
                for card in self.hand:
                    if str(card) == card_str:
                        self.hand.remove(card)
                        return card
                print("Invalid card! Please enter in correct format, e.g. '9 of Hearts'.\n")
        else:
            if legal_cards:
                card = max(legal_cards)
            else:
                card = min(trump_cards) if trump_cards else self.hand[0] 
                # lowest card if can't answer or lowest trumps // change to lowest higher trump than played
            self.hand.remove(card)
            return card
        
    def _hand_value(self):
        """Get hand value for decision of bidding for bots [Not yet implemented in 'bid' method]

        Returns:
            int: total value of cards in hand
        """
        hand_value = [POINTS[card.rank] for card in self.hand]
        return hand_value

class Game:
    def __init__(self):
        names = ["Player", "Opp1", "Partner", "Opp2"]
        self.players = [Player(name, is_human=(i == 0)) for i, name in enumerate(names)]
        self.trump_suit = None
        self.bidding_team = [0, 2] # initialize at player and opp bot
        self.bid_value = 0
        self.table = []

    def deal(self):
        deck = [Card(suit, rank) for suit in SUITS for rank in RANKS]
        random.shuffle(deck)
        for i in range(4):
            self.players[i].hand = sorted(deck[i * 8:(i + 1) * 8], key=lambda c: (SUITS.index(c.suit), RANKS.index(c.rank)))

    def bidding_phase(self):
        current_bid = 50
        highest_bidder = 0
        passes = 0
        
        # Print first four cards to facilitate bidding decisions
        print(f"Your hand currently: {[str(card) for card in self.players[0].hand[:4]]}")

        
        while passes < 4:
            # Change later to instead have one bidding till all other players pass
            for i, player in enumerate(self.players):
                bid = player.bid(current_bid)
                if bid > current_bid:
                    current_bid = bid
                    highest_bidder = i
                else:
                    passes += 1
        self.bid_value = current_bid

        if self.players[highest_bidder].is_human:
            self.trump_suit = input(f"{self.players[highest_bidder].name}, choose trump suit: ")
        else:
            self.trump_suit = random.choice(SUITS)  # For simplicity. Change logic after MVP done
            
        self.bidding_team = [highest_bidder, (highest_bidder + 2) % 4]
        print(f"Trump suit: {self.trump_suit}, Bidding team: {self.bidding_team}, Bid: {self.bid_value}")
        return self.bidding_team, self.bid_value

    def play_trick(self, lead_index: int=0):
        lead_suit = None
        for i in range(4):
            player = self.players[(lead_index + i) % 4]
            card = player.play_card(lead_suit, self.trump_suit)
            if i == 0:
                lead_suit = card.suit
            self.table.append((card, (lead_index + i) % 4))
            print(f"{'\n' if i==0 else ''}{player.name} plays {card}")

        print("TABLE:", [str(card) for card, player_id in self.table], "\n")
        
        def card_value(card: Card):
            if card.suit == self.trump_suit:
                return 50 + POINTS[card.rank]
            elif card.suit == lead_suit:
                return POINTS[card.rank]
            else:
                return 0 # face down card has no value in trick.

        winner_id = max(self.table, key=lambda x: card_value(x[0]))[1] # index of winner
        winner = self.players[winner_id]
        print(f"Trick won by {winner.name}\n")
        winner.tricks.extend([card for card, _ in self.table])
        self.table = [] # clean table after trick
        return winner_id

    def score_game(self):
        scores = defaultdict(int)
        for i, player in enumerate(self.players):
            for card in player.tricks:
                scores[i] += POINTS[card.rank]

        bidding_score = sum(scores[i] for i in self.bidding_team)
        print(f"Bidding team score: {bidding_score}, Required: {100 + self.bid_value}")
        if bidding_score >= 100 + self.bid_value:
            print("Bidding team wins!")
        else:
            print("Opposition wins!")

    def play(self):
        self.deal()
        self.bidding_phase()
        lead_index = 0
        for _ in range(8):
            lead_index = self.play_trick(lead_index)
        self.score_game()

if __name__ == "__main__":
    game = Game()
    game.play()
 