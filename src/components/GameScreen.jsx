import React from 'react';
import { Board, OwnPieceArea, Params } from "./index.js"
import { Attack } from './modals.jsx';
import { makeStyles } from '@material-ui/core/styles';

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
        margin: "0 20px",
        // margin: '0 auto',
        justifyContent: "center",
        // flexDirection: 'column',
        width: 170,
    },
    rightParamsArea: {
        display: 'flex',
        margin: "0 20px",
        // margin: '0 auto',
        alignItems: "center",
        flexDirection: 'column',
        width: 170,
    },
    paramsAreaSub: {
        // position: 'absolute', 
        height: 200,
        width: 200,
        // border: '2px solid #000',
    },
    board: {
        // margin: '0 auto',
    },
  }));

const GameScreen = () => {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.gameArea}>
                <div className={classes.leftParamsArea}>
                    <OwnPieceArea isWhite={false} />
                    {/* <div className={classes.paramsAreaSub}> */}
                        <Attack />
                    {/* </div> */}
                </div>
                <div className={classes.board}>
                    <Board />
                </div>
                <div className={classes.rightParamsArea}>
                    <div className={classes.paramsAreaSub}>
                        <Params />
                    </div>
                    <OwnPieceArea isWhite={true} />
                </div>
            </div>
        </div>
    )
}

export default GameScreen;