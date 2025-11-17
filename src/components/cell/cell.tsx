import React, { useCallback } from 'react';
import "./cell.scss"
import { useDispatch, useSelector } from 'react-redux';
import { mark, open, selectCellValue } from '../../store/gameSlice';
import { CellState } from '../../types';
import { RootState } from '../../store/store';

interface CellProps {
    x: number;
    y: number;
}

function Cell({x, y}: CellProps) {
    const dispatch = useDispatch();
    const cellState = useSelector((state: RootState) => state.game.map[y][x]);
    const cellValue = useSelector((state: RootState) =>
        selectCellValue(state.game, {x, y})
    );

    const handleLeftClick = useCallback(() => {
        dispatch(open({x, y}));
    }, [x, y, dispatch]);

    const handleRightClick = useCallback((event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        dispatch(mark({x, y}));
    }, [x, y, dispatch]);

    const className = () => {
        return 'cell'
            + ((cellState === CellState.Closed) ? ' closed' : '')
            + ((cellState === CellState.Opened) ? ' opened' : '')
            + ((cellState === CellState.Marked) ? ' marked' : '')
    }

    return (
        <div className={className()} onClick={handleLeftClick} onContextMenu={handleRightClick} >
            { cellState === CellState.Opened && cellValue ? cellValue : ''}
        </div>
    )
}

export default Cell;