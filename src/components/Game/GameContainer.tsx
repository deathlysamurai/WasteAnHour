import { useParams } from "react-router-dom";
import { Suspense, lazy } from 'react';

const TicTacToe = lazy(() => import('./TicTacToe/TicTacToe'));
const Hangman = lazy(() => import('./Hangman/Hangman'));

export default function GameContainer() {
    let params = useParams();
    let game = params.game;

    return(
        <Suspense fallback={<div>Game Loading...</div>}>
            <>
                {(() => {
                    switch(game) {
                        case 'tictactoe': 
                            return <TicTacToe />
                        case 'hangman':
                            return <Hangman />
                    }
                })()}
            </>
        </Suspense>
    )
}