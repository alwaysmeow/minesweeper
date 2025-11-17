import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import Cell from '../cell/cell';
import "./board.scss"
import { RootState } from '../../store/store';
import { newGame } from '../../store/gameSlice';

function Board() {
    const store = useStore<RootState>();

    const dispatch = useDispatch();
    dispatch(newGame());
    const map = store.getState().game.map;

    return (
        <div className="board">
            { 
                map.map((row, y) => (
                    <div className='row' key={y}>
                        {
                            row.map((_, x) => 
                                <Cell x={x} y = {y} key={`${x} ${y}`}></Cell>
                            )
                        }
                    </div>)
                ) 
            }
        </div>
    )
}

export default Board;