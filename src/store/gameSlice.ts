import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CellState, Coordinates, GameState } from '../types';

const DEFAULT_SIZE = 10;

const initialState: GameState = {
    loss: false,
    boardHeight: DEFAULT_SIZE,
    boardWidth: DEFAULT_SIZE,
    minesCount: DEFAULT_SIZE ** 2 / 10,
    mines: [],
    map: [...Array(DEFAULT_SIZE)].map(_ => [...Array(DEFAULT_SIZE)].fill(CellState.Closed)),
}

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        newGame(state: GameState) {
            state.loss = false;
            state.map = [...Array(state.boardHeight)].map(_ => [...Array(state.boardWidth)].fill(CellState.Closed))
        },
        open(state, action: PayloadAction<Coordinates>) {
            const { x, y } = action.payload;
            if (state.mines.some((item: Coordinates) => item.x === x && item.y === y)) {
                state.loss = true
            }
            state.map[y][x] = CellState.Opened;
        },
        mark(state, action: PayloadAction<Coordinates>) {
            const { x, y } = action.payload;
            if (state.map[y][x] !== CellState.Opened)
            state.map[y][x] = state.map[y][x] === CellState.Closed ? CellState.Marked : CellState.Closed;
        },
    }
});

export default gameSlice.reducer;

export const { newGame, open, mark } = gameSlice.actions;