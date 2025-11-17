import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellState, Coordinates, GameState } from "../types";

const DEFAULT_SIZE = 10;

const initialState: GameState = {
    loss: false,
    boardHeight: DEFAULT_SIZE,
    boardWidth: DEFAULT_SIZE,
    minesCount: DEFAULT_SIZE ** 2 / 10,
    mines: [],
    map: [...Array(DEFAULT_SIZE)].map((_) =>
        [...Array(DEFAULT_SIZE)].fill(CellState.Closed)
    ),
};

const isMine = (state: GameState, cell: Coordinates) => {
    return state.mines.some(
        (item: Coordinates) => item.x === cell.x && item.y === cell.y
    );
};

const cellsAround = (coordinates: Coordinates) => {
    const cells: Array<Coordinates> = [];

    for (let xStep = -1; xStep <= 1; xStep++) {
        for (let yStep = -1; yStep <= 1; yStep++) {
            if (xStep || yStep) {
                cells.push({
                    x: coordinates.x + xStep,
                    y: coordinates.y + yStep,
                });
            }
        }
    }

    return cells;
};

const randomCell = (state: GameState): Coordinates => {
    return {
        x: Math.floor(Math.random() * state.boardWidth),
        y: Math.floor(Math.random() * state.boardHeight),
    };
};

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        newGame(state: GameState) {
            state.loss = false;
            state.map = [...Array(state.boardHeight)].map((_) =>
                [...Array(state.boardWidth)].fill(CellState.Closed)
            );

            // Mines generation
            while (state.mines.length < state.minesCount) {
                let newMine: Coordinates = randomCell(state);

                if (!isMine(state, newMine)) {
                    state.mines.push(newMine);
                }
            }
        },
        open(state, action: PayloadAction<Coordinates>) {
            const { x, y } = action.payload;

            if (!state.loss) {
                if (isMine(state, { x, y })) {
                    state.loss = true;
                    console.log("loss");
                }
                state.map[y][x] = CellState.Opened;
            }
        },
        mark(state, action: PayloadAction<Coordinates>) {
            const { x, y } = action.payload;

            if (!state.loss) {
                if (state.map[y][x] !== CellState.Opened) {
                    state.map[y][x] =
                        state.map[y][x] === CellState.Closed
                            ? CellState.Marked
                            : CellState.Closed;
                }
            }
        },
    },
});

export default gameSlice.reducer;

export const { newGame, open, mark } = gameSlice.actions;
export const selectCellValue = (state: GameState, coordinates: Coordinates) => {
    return cellsAround(coordinates).filter((c) => isMine(state, c)).length;
};
