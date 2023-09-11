import { useState } from 'react';
import TicTacCell from './TicTacCell';
import './TicTacToe.css';
import { Button } from '@mui/material';

export default function TicTacToe() {
    const gridSize = 3;
    const playerOptions = ['X', 'O'];
    const [player, setPlayer] = useState(playerOptions[0]);
    const [grid, updateGrid] = useState<string[][]>(Array.from(Array(gridSize), () => new Array(gridSize).fill('')));
    const [winningLine, setWinningLine] = useState<number[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [moves, setMoves] = useState(0);
    const [draw, setDraw] = useState(false);

    const checkForWinner = (row: number, col: number) => {
        let otherPlayer = (player == playerOptions[0]) ? playerOptions[1] : playerOptions[0];
        let won = false;
        let tie = false;
        let newLine = [];
        let moveCount = moves;
        moveCount++;

        let newGrid = Array.from(Array(gridSize), () => new Array(gridSize).fill(''));
        grid.map((g, i) => {
            g.map((c, j) => {
                newGrid[i][j] = c;
            })
        })
        newGrid[row][col] = player;
        
        for(let i = 0; i < gridSize; i++) { //check row
            newLine.push([row, i])
            if(newGrid[row][i] != player)
                break;
            if(i == (gridSize - 1)) {
                setWinningLine(newLine);
                won = true;
            }
        }
        if(!won) { //check col
            newLine = []
            for(let i = 0; i < gridSize; i++) {
                newLine.push([i, col]);
                if(newGrid[i][col] != player)
                    break;
                if(i == (gridSize - 1)) {
                    setWinningLine(newLine);
                    won = true;
                }
            }
        }
        if(!won && (row == col)) { //check diag
            newLine = []
            for(let i = 0; i < gridSize; i++) {
                newLine.push([i, i]);
                if(newGrid[i][i] != player)
                    break;
                if(i == (gridSize - 1)) {
                    setWinningLine(newLine);
                    won = true;
                }
            }
        }
        if(!won && ((row + col) == (gridSize - 1))) { //check anti-diag
            newLine = []
            for(let i = 0; i < gridSize; i++) {
                newLine.push([i, (gridSize - 1) - i]);
                if(newGrid[i][(gridSize - 1) - i] != player)
                    break;
                if(i == (gridSize - 1)) {
                    setWinningLine(newLine);
                    won = true;
                }
            }
        }

        if(!won && (moveCount == (Math.pow(gridSize, 2)))) {
            tie = true;
            setDraw(true);
        }

        if(won || tie) {
            setGameOver(true);
        } else {
            setPlayer(otherPlayer);
        }

        updateGrid(newGrid);
        setMoves(moveCount);
    }

    const resetGame = () => {
        setPlayer(playerOptions[0]);
        updateGrid(Array.from(Array(gridSize), () => new Array(gridSize).fill('')));
        setGameOver(false);
        setWinningLine([]);
        setMoves(0);
        setDraw(false);
    }

    return(
        <div className="ttt-container">
            <div className='player'>{draw ? 'DRAW' : `Player: ${player} ${gameOver ? 'Won' : ''}`}</div>
            <div className='board'>
                {[...Array(gridSize)].map((row, i) => (
                    <div key={`row-${i}`} className='ttt-row'>
                        {[...Array(gridSize)].map((col, j) => (
                            <TicTacCell key={`cell-${(i * gridSize) + j}`} 
                                        player={player} 
                                        checkForWinner={checkForWinner}
                                        row={i}
                                        col={j}
                                        gameOver={gameOver}
                                        value={grid[i][j]}
                                        winningLine={winningLine}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className='footer'>
                {gameOver ? <Button variant='contained' onClick={resetGame}>Reset</Button> : null}
            </div>
        </div>
    )
}