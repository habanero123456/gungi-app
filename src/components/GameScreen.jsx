import React from 'react';
import { Board, OwnPieceArea, Params } from "./index.js"
import { Attack } from './modals.jsx';
import { makeStyles } from '@material-ui/core/styles';
import useMedia from 'use-media';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: "0 auto",
        width: 900,
    },
    gameArea: {
        display: 'flex',
        margin: '0 auto',
        paddingTop: '50px',
    },
    leftParamsArea: {
        display: 'flex',
        justifyContent: "center",
        width: 170,
    },
    rightParamsArea: {
        display: 'flex',
        // margin: "0 20px",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'column',
        // width: 200,
        width: 170,
        // height: 460,
    },
    paramsArea: {
        height: 200,
        width: 200,
    },
    board: {
        marginTop: 1,
    },

    containerM: {
        display: 'flex',
        margin: "50px auto",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        // width: 900,
    },
    gameAreaM: {
        // display: 'flex',
        // margin: '0 auto',
        // paddingTop: '50px',
    },
    ownPieceArea: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    paramsAreaM: {
        display: 'flex',
        justifyContent: "center",
    },
    boardM: {
        marginTop: 1,
    },
  }));

const GameScreen = () => {
    const classes = useStyles();
    const isWide = useMedia({minWidth: '769px'});
    if(isWide) {
        return(
            <div className={classes.container}>
                <div className={classes.gameArea}>
                    <div className={classes.leftParamsArea}>
                        <OwnPieceArea isWhite={false} />
                        <Attack />
                    </div>
                    <div className={classes.board}>
                        <Board />
                    </div>
                    <div className={classes.rightParamsArea}>
                        <div className={classes.paramsArea}>
                            <Params />
                        </div>
                        <OwnPieceArea isWhite={true} />
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className={classes.containerM}>
                <div className={classes.gameAreaM}>
                    <div className={classes.boardM}>
                        <Board />
                    </div>    
                    <div className={classes.ownPieceArea}>
                        <OwnPieceArea isWhite={true} />
                        <OwnPieceArea isWhite={false} />
                    </div>
                    <div className={classes.paramsAreaM}>
                        <Attack />
                        <Params />
                    </div>
                </div>
            </div>
        )
    }
    
}

export default GameScreen;