import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';    
import { addToDiscard, addToHandP1, addToHandP2, addToScoreP1, addToScoreP2, clearHandP1, clearHandP2, takeFromDiscard } from '../stateManagement/cardTracker';


const Main = () => {

    let warCards = [];
    let winner = "";
    let player1Score = useSelector((state)=>state.player1.player1Score);
    let computerScore = useSelector((state)=>state.player2.player2Score);
    const dispatch = useDispatch();

    let cardValueMatrix = {
        "ACE": 14,
        "KING": 13,
        "QUEEN": 12,
        "JACK": 11
    }

    const [deckid, setDeckID] = useState(null);

    //keep track of which card is being played
    const playerCard = useSelector((state)=>state.player1.hand)
    const dealerCard = useSelector((state)=>state.player2.hand)
    const [piles, setPiles] = useState(null)
    const [gameOver, setGameOver] = useState(false);

    const getCards = async () => { 
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();
        const deckid = data.deck_id;
        setDeckID(deckid);

    }

        useEffect(() => {
           getCards()
        }, []);

        let playRound = async () => {
            let player1Card = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`);
            let computerCard = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`);
            let player1CardData = await player1Card.json();
            let dealerCardData = await computerCard.json();
            calculateWinner(player1CardData.cards[0].value,player1CardData.cards[0].code,dealerCardData.cards[0].value,dealerCardData.cards[0].code);
            dispatch(addToHandP2(dealerCardData.cards[0].image))
            dispatch(addToHandP1([player1CardData.cards[0].image]))
        };



        let calculateWinner = (player1Card, player1CardCode, computerCard, computerCardCode) => {
            let card1Value = player1Card;
            let card2Value = computerCard; 
            let cardCodes = [...warCards,computerCardCode,player1CardCode]
            if (isNaN(player1Card)) {
                card1Value = cardValueMatrix[player1Card];
            };
            if (isNaN(computerCard)) {
                card2Value = cardValueMatrix[computerCard];
            };
            card1Value = Number(card1Value)
            card2Value = Number(card2Value)
            if  (card1Value > card2Value) {
                dispatch(addToScoreP1(playerCard.length+dealerCard.length))
                addCardToPile(cardCodes, "player1")
                console.log(`player1 wins`, card1Value, card2Value)
                dispatch(clearHandP1())
                dispatch(clearHandP2())
            } else if(card2Value > card1Value) {
                
                dispatch(addToScoreP2(playerCard.length+dealerCard.length))
                addCardToPile(cardCodes, "computer")                
                console.log(`Computer wins`, card1Value, card2Value);
                dispatch(clearHandP1())
                dispatch(clearHandP2())
            } else {
                alert("War!, Playing out", String(card1Value) , String(card2Value));
                warCards.push(player1CardCode,computerCardCode);
                playRound();
            }
        }

        let addCardToPile = async (cardCodes, winnerName) => {
            let cardsToAdd = cardCodes.join();
            let addResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckid}/pile/${winnerName}/add/?cards=${cardsToAdd}`);
            let addData = await addResponse.json();
            console.log(addData.remaining);
            if (addData.remaining == 0) {
                setGameOver(true);
                if (player1Score > computerScore) {
                    winner = "You win!";
                } else if (computerScore > player1Score) {
                    winner = "You lose!";
                } else {
                    winner = "Tie!";
                }
            }
            setPiles(addData);
            console.log(piles);
            warCards = []
        }
    
    return (
        <div>
            {gameOver ? <h1>Game Over, {winner}</h1> : <button onClick={playRound}>Go to war!</button>}
            <h1>Let's Play War</h1>
           { playerCard.length > 0 ? playerCard.map((card)=><img src={card} alt="player card"></img>): <img src="https://www.vanishingincmagic.com/gallery/photos/jumbo-bicycle-card-blank-face-blue-backed-1.jpg" alt="blue playing card"></img>}
           <hr></hr>
           { dealerCard.length >0 ? dealerCard.map((card)=><img src={card} alt="dealer card"></img>) : <img src="https://www.vanishingincmagic.com/gallery/photos/jumbo-bicycle-card-blank-face-blue-backed-1.jpg" alt="blue playing card"></img>}
        
        </div>
    )
}

export default Main