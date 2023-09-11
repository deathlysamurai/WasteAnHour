import { useState, useEffect } from "react";

export default function TicTacCell(props: {
        player: string, 
        checkForWinner: (row: number, col: number) => void,
        row: number,
        col: number,
        gameOver: boolean,
        value: string, 
        winningLine: number[][]
    }) {
    const [value, setValue] = useState('');
    const [cellChosen, setCellChosen] = useState(false);
    const [winner, setWinner] = useState(false);

    useEffect(() => {
        setValue(props.value)
    }, [props.value]);

    useEffect(() => {
        setCellChosen(false);
    }, [props.gameOver]);

    useEffect(() => {
        let sWinningLine = JSON.stringify(props.winningLine);
        let sCell = JSON.stringify([props.row, props.col]);
        setWinner(sWinningLine.indexOf(sCell) != -1);
    }, [props.winningLine])

    const onClick = () => {
        if(!cellChosen && !props.gameOver) {
            setCellChosen(true);
            props.checkForWinner(props.row, props.col);
        }
    }

    const onMouseEnter = () => {
        if(!cellChosen && !props.gameOver) {
            setValue(props.player);
        }
    }
    
    const onMouseLeave = () => {
        if(!cellChosen && !props.gameOver) {
            setValue('');
        }
    }

    return(
        <div className="ttt-cell" 
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
        >
            <div className={(cellChosen || winner) ? '' : 'opacity-lower'}>{value}</div>
        </div>
    )
}