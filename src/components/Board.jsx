import React from 'react';
import { Piece } from "./index.js"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: 0,
        width: '459px',
    },
    status: {
    },
    columnContainer: {
        flexDirection: 'column',
        display: 'flex',
    },
    rowContainer: {
        marginTop: -1,
        marginBottom: 2,
        height: 50,
    }
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
    return(
        <div className={classes.container}>
            {/* <div className={classes.status}>{status}</div> */}
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

        // <div className="container">
        // <div className="columnContainer">
        //     <div className="rowContainer">
        //     {nineCount.map((columnInt) =>{
        //         return(
        //             <div className="rowContainer">
        //             {nineCount.map((rowInt) =>{
        //                 return(renderPiece(columnInt, rowInt));
        //             })}
        //             </div>
        //         );
        //     })}
        //     </div>
        // </div>
    // </div>
    )
}

export default Board;