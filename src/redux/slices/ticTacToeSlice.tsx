import { createSlice } from '@reduxjs/toolkit';

let currentState = JSON.parse(localStorage.getItem("tictactoe")!) as TicTacToeState;

interface TicTacToeState {
    wins: number
}

const initialState: TicTacToeState = {
    wins: "tictactoe" in localStorage ? currentState.wins : 0,
}

export const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    addWin: (state) => {
        currentState.wins++;
        localStorage.setItem('tictactoe', JSON.stringify(currentState));
        state.wins++;
    },
  },
})

export const { addWin } = ticTacToeSlice.actions

export default ticTacToeSlice.reducer