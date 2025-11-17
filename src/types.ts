export enum CellState {
    Closed = 0,
    Opened = 1,
    Marked = 2,
}

export interface GameState {
    loss: boolean,
    boardHeight: number,
    boardWidth: number,
    minesCount: number,
    mines: Array<Coordinates>,
    map: Array<Array<CellState>>,
}

export interface Coordinates {
    x: number,
    y: number,
}