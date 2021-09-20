import React from 'react';
import { Piece } from "./index.js"
import { makeStyles } from '@mui/styles';
import useMedia from 'use-media';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: 0,
        width: '459px',
    },
    columnContainer: {
        flexDirection: 'column',
        display: 'flex',
    },
    rowContainer: {
        marginTop: -1,
        marginBottom: 2,
        height: 50,
    },
    containerM: {
        display: 'flex',
        margin: 0,
        width: '351px',
    },
    columnContainerM: {
        flexDirection: 'column',
        display: 'flex',
    },
    rowContainerM: {
        marginTop: -1,
        marginBottom: 2,
        height: 38,
    },
  }));

const Board = () => {
    const classes = useStyles();
    const renderPiece = (column, row) => {
        return <Piece 
            column={column}
            row={row}
        />
    }
    const nineCount = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const isWide = useMedia({minWidth: '769px'});
    if(isWide){
        return(
            <div className={classes.container}>
                <div className={classes.columnContainer}>
                     {nineCount.map((columnInt) =>{
                        return(
                            <div className={classes.rowContainer}>
                            {nineCount.map((rowInt) =>{
                                return(renderPiece(columnInt, rowInt));
                            })}
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    } else {
        return(
            <div className={classes.containerM}>
                <div className={classes.columnContainerM}>
                     {nineCount.map((columnInt) =>{
                        return(
                            <div className={classes.rowContainerM}>
                            {nineCount.map((rowInt) =>{
                                return(renderPiece(columnInt, rowInt));
                            })}
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Board;