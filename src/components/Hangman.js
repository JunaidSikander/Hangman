import React, {useState} from 'react'
import {randomWord} from "../words";

const Hangman = ({maxWrong}) => {
    const [states, setStates] = useState({nWrong: 0, guessed: new Set(), answer: randomWord()});

    const guessedWord = () => {
        return states.answer
            .split("")
            .map(ltr => (states.guessed.has(ltr) ? ltr : "_"));
    };

    const handleGuess = (e) => {
        let ltr = e.target.value;
        setStates((prevState) => {
            return ({
                ...prevState,
                guessed: prevState.guessed.add(ltr),
                nWrong: prevState.nWrong + (prevState.answer.includes(ltr) ? 0 : 1)
            });
        });
    };

    const generateButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
            <button
                key={ltr}
                value={ltr}
                onClick={handleGuess}
                disabled={states.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    };

    const restart = () => setStates({nWrong: 0, guessed: new Set(), answer: randomWord()});

    const gameOver = states.nWrong >= maxWrong;
    const altText = `${states.nWrong}/${maxWrong}`;
    const isWinner = guessedWord().join("") === states.answer;
    let gameState = generateButtons();
    if (isWinner) gameState = 'You Win!';
    if (gameOver) gameState = 'You Lose!';

    return (
        <div className='Hangman'>
            <h1>Hangman</h1>
            <img src={`/images/${[states.nWrong]}.jpg`} alt={altText}/>
            {
                !(states.nWrong > maxWrong)
                    ? <>
                        <p> Guessed Wrong: {states.nWrong} </p>
                        <p className='Hangman-word'>{!gameOver ? guessedWord() : states.answer}</p>
                        <p className='Hangman-btns'>{gameState}</p>
                    </>
                    : <>
                        <p className='loose'> You Loose... </p>
                        <p> The word is <b className='loose'> {states.answer} </b></p>
                    </>
            }
            <div>
                <button id='restart' onClick={restart}>Restart</button>
            </div>
        </div>
    )
};

export default Hangman;

Hangman.defaultProps = {
    maxWrong: 6,
};
