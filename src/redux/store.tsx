import { configureStore } from '@reduxjs/toolkit';
import ticTacToeReducer from './slices/ticTacToeSlice';

export const store = configureStore({
  reducer: {
    tictactoe: ticTacToeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch