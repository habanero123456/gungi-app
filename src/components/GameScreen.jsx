import React, { useContext } from 'react';
import { PieceContext, ThemeContext} from '../App'
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
        width: 115,
    },
    containerM: {
        margin: "0 auto",
    },
    gameAreaM: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    ownPieceArea: {
        display: 'flex',
        margin: 20,
    },
    paramsAreaM: {
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
    const { canMove, setCanMove } = useContext(PieceContext);
    const { select, setSelect } = useContext(PieceContext);
    const { clickFlag, setClickFlag } = useContext(PieceContext);
    const { modal, setModal } = useContext(PieceContext);
    const { kifu, setKifu } = useContext(PieceContext);
    const { turn, setTurn } = useContext(PieceContext);
    const theme = useContext(ThemeContext);

    const clickRule = () => {
        setRuleBook(!ruleBook)
        console.log(theme);
    }

    const initPieces = new Array(89).fill({type: -1, whose: 0, level: 0});
    const clickRestart = () => {
        setPhase(0);
        setCanMove([])
        setSelect({num: -1, type: -1, level: 0})
        setClickFlag(false);
        setPieces(initPieces);
        setModal(0);
    }
    const toggleWhose = (whose) => {
        if (whose === 1) {
            return 2;
        } else {
            return 1;
        }
    }
    const oppTurn = toggleWhose(turn);

    const setPrevPiece = () => {
        if(kifu.length > 1){
            console.log(kifu);
            const prevKifu = Array.from(kifu);
            prevKifu.pop();
            setKifu(prevKifu);
            setTurn(oppTurn);
            setPieces(kifu[kifu.length - 2]);
        }
    }

    if(phase === 3) {
        if(isWide) {
            return(
                <div className={classes.container}>
                    <div className={classes.topBar}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            // color={theme.palette.primary} 
                            className={classes.button1}
                            onClick={() => clickRestart()}
                        >
                            はじめから
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button1}
                            onClick={() => setPrevPiece()}
                        >
                            一手戻る
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
                                <RuleBook />
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
                            onClick={() => setPrevPiece()}
                        >
                            一手戻る
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
    } else {
        if(isWide) {
            return(
                <div className={classes.container}>
                    <div className={classes.topBar}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            // color={theme.palette.primary} 
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
                                <RuleBook />
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
}

export default GameScreen;