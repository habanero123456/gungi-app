import React, { useContext } from 'react';
import { PieceContext } from '../App'
import { Board, OwnPieceArea, Params } from "./index.js"
import { Attack, RuleBook } from './modals.jsx';
import { makeStyles } from '@mui/styles';
import useMedia from 'use-media';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: "0 auto",
        width: 900,
        flexDirection: 'column',
    },
    topBar: {
        display: 'flex',
        margin: '10px auto',
        // flexDirection: 'column',
        alignItems: "space-around",
        justifyContent: "space-around",
        height: 50,
        width: 360
    },
    topBarM: {
        display: 'flex',
        margin: '10px auto',
        // flexDirection: 'column',
        alignItems: "space-around",
        justifyContent: "space-around",
        // height: 50,
        width: 360,
    },
    
    gameArea: {
        display: 'flex',
        // flexDirection: 'column',
        margin: '0 auto',
        // paddingTop: '50px',
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
        // display: 'flex',
        height: 200,
        width: 160,
    },
    board: {
        marginTop: 1,
    },
    button1: {
        // marginBottom: 10,
        width: 120,
    },
    containerM: {
        // display: 'flex',
        margin: "0 auto",
        // flexDirection: 'column',
        // justifyContent: "center",
        // alignItems: "center",
        // width: 900,
    },
    gameAreaM: {
        display: 'flex',
        // margin: "50px auto",
        flexDirection: 'column',
        // justifyContent: "center",
        alignItems: "center",
    },
    ownPieceArea: {
        display: 'flex',
        // justifyContent: "center",
        // alignItems: "center",
        margin: 20,
    },
    paramsAreaM: {
        // display: 'flex',
        // justifyContent: "center",
        // padding: 20,
    },
    boardM: {
        marginTop: 1,
    },
  }));

const GameScreen = () => {
    const classes = useStyles();
    const isWide = useMedia({minWidth: '769px'});
    const { ruleBook, setRuleBook } = useContext(PieceContext);
    const { phase, setPhase } = useContext(PieceContext);
    const { pieces, setPieces } = useContext(PieceContext);
    // const { kifu, setKifu } = useContext(PieceContext);

    const clickRule = () => {
        setRuleBook(!ruleBook)
    }

    const initPieces = new Array(89).fill({type: -1, whose: 0, level: 0});
    const clickRestart = () => {
        setPhase(0);
        setPieces(initPieces);
        // setKifu([])
    }
    if(isWide) {
        return(
            <div className={classes.container}>
                <div className={classes.topBar}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button1}
                        onClick={() => clickRestart()}
                    >
                        はじめから
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button1}
                        onClick={() => clickRule()}
                    >
                        ルール
                    </Button>
                </div>
                <div className={classes.gameArea}>
                    <div className={classes.leftParamsArea}>
                        <OwnPieceArea isWhite={false} />
                        <Attack />
                    </div>
                    <div className={classes.board}>
                        {/* <div className={classes.ruleContainer}> */}
                            <RuleBook />
                        {/* </div> */}
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
                <div className={classes.topBarM}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button1}
                        onClick={() => clickRestart()}
                    >
                        はじめから
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button1}
                        onClick={() => clickRule()}
                    >
                        ルール
                    </Button>
                </div>
                <div className={classes.gameAreaM}>
                    <div className={classes.boardM}>
                        <RuleBook />
                        <Board />
                    </div>    
                    <div className={classes.ownPieceArea}>
                        <OwnPieceArea isWhite={true} />
                        <div className={classes.paramsAreaM}>
                            <Params />
                            <Attack />
                        </div>
                        <OwnPieceArea isWhite={false} />
                    </div>
                    
                </div>
            </div>
        )
    }
    
}

export default GameScreen;