import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PieceContext } from '../App'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paramsContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    button1: {
        margin: 5,
      },
  }));

const Params = (props) => {
    const classes = useStyles();
    const { phase, setPhase } = useContext(PieceContext);
    const { select, setSelect } = useContext(PieceContext);
    const { canMove, setCanMove } = useContext(PieceContext);
    const { whitePieces, setWhitePieces } = useContext(PieceContext);
    const { blackPieces, setBlackPieces } = useContext(PieceContext);
    const { clickFlag, setClickFlag } = useContext(PieceContext);
    const { turn, setTurn } = useContext(PieceContext);
    const { pieces, setPieces } = useContext(PieceContext);
    const { winner, setWinner } = useContext(PieceContext);
    const { kifu, setKifu } = useContext(PieceContext);
    const { yomifu, setYomifu } = useContext(PieceContext);
    const { click, setClick } = useContext(PieceContext);
    const { bouFlagW, setBouFlagW } = useContext(PieceContext);
    const { bouFlagB, setBouFlagB } = useContext(PieceContext);
    const { bouCheck, setBouCheck } = useContext(PieceContext);

    const kanji = ['師', '大', '中', '小', '兵', '侍', '忍', '馬', '弓', '砦', '槍', '謀', '砲', '筒'];

    let clickString1 = "";
    let clickString2 = "";
    let clickString3 = "";
    if(click.level === 1) {
        clickString1 = `${kanji[click.type]}`
    } 
    if(click.level === 2) {
        clickString1 = `上段：${kanji[click.type]}`
        clickString2 = `下段：${kanji[click.under.type]}`
    }
    if(click.level === 3) {
        clickString1 = `上段：${kanji[click.type]}`
        clickString2 = `中段：${kanji[click.under.type]}`
        clickString3 = `下段：${kanji[click.under.under.type]}`
    }
    const templateSet = () => {
        let templateSetSub = new Array(89).fill({type: -1, whose: 0, level: 0});

        const culcuTemplateSet = (num, type, level, under1, under2) => {
            const x = 8 - (num % 10);
            const y = 8 - ((num - (8 - x)) / 10);
            const oppNum = y * 10 + x;
            if(level === 1) {
                templateSetSub.splice(num, 1, {type: type, whose: 1, level: 1});
                templateSetSub.splice(oppNum, 1, {type: type, whose: 2, level: 1});
            } 
            if(level === 2) {
                templateSetSub.splice(num, 1, {type: type, whose: 1, level: 2, under: {type: under1, whose: 1, level: 1}});
                templateSetSub.splice(oppNum, 1, {type: type, whose: 2, level: 2, under: {type: under1, whose: 2, level: 1}});
            }
            if(level === 3) {
                templateSetSub.splice(num, 1, {type: type, whose: 1, level: 3, under: {type: under1, whose: 1, level: 2, under: {type: under2, whose: 1, level: 1}}});
                templateSetSub.splice(oppNum, 1, {type: type, whose: 2, level: 3, under: {type: under1, whose: 2, level: 2, under: {type: under2, whose: 2, level: 1}}});
            }
            
        }
        culcuTemplateSet(84, 0, 1);
        culcuTemplateSet(74, 12, 1);
        culcuTemplateSet(64, 6, 1);
        culcuTemplateSet(63, 4, 1);
        culcuTemplateSet(65, 4, 1);
        culcuTemplateSet(62, 7, 1);
        culcuTemplateSet(66, 7, 1);
        culcuTemplateSet(73, 1, 2, 6);
        culcuTemplateSet(75, 2, 2, 13);
        culcuTemplateSet(70, 5, 2, 10);
        culcuTemplateSet(78, 5, 2, 10);
        culcuTemplateSet(61, 3, 2, 4);
        culcuTemplateSet(67, 3, 2, 4);
        culcuTemplateSet(82, 8, 3, 9, 10);
        culcuTemplateSet(86, 8, 3, 9, 11);

        return templateSetSub;
    }
    const checkBou = () => {
        const curWPiece = pieces.filter((piece) => {
            return piece.whose === 1;
        })
        const curBPiece = pieces.filter((piece) => {
            return piece.whose === 2;
        })
        const checkBouW = curWPiece.some((piece) => {
            return piece.type === 11;
        })
        const checkBouB = curBPiece.some((piece) => {
            return piece.type === 11;
        })
        setBouCheck([checkBouW, checkBouB]);
    }

    const start = () => {
        const initPieces = new Array(89).fill({type: -1, whose: 0, level: 0});
        let initWhitePieces = new Array(25 - 3);
        for (let i = 0; i < 14; i++) {
        initWhitePieces[i] = i;
        }
        for (let i = 3; i < 11; i++) {
        initWhitePieces[i + 14 - 3] = i;
        }
        initWhitePieces.push(4);
        initWhitePieces.push(4);
        initWhitePieces.push(10);
        initWhitePieces.sort(function(a, b) {
        return a - b;
        });

        let initBlackPieces = new Array(25 - 3);
        for (let i = 0; i < 14; i++) {
        initBlackPieces[i] = i;
        }
        for (let i = 3; i < 11; i++) {
        initBlackPieces[i + 14 - 3] = i;
        }
        initBlackPieces.push(4);
        initBlackPieces.push(4);
        initBlackPieces.push(10);

        initBlackPieces.sort(function(a, b) {
        return b - a;
        });
        setPhase(1);
        setSelect({num: 90, type: 0, level: 1});
        let curCanMove = [];
        for (let i = 6; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                curCanMove.push(10 * i + j);
            }
        }
        setPieces(initPieces);
        setYomifu([]);
        setClickFlag(false);
        setCanMove(curCanMove);
        setWhitePieces(initWhitePieces);
        setBlackPieces(initBlackPieces);
        setTurn(1);
    }
    const toggleWhose = (turn) => {
        if (turn === 1) {
            return 2;
        } else {
            return 1;
        }
    }
    const oppTurn = toggleWhose(turn);

    const endPut = () => {
        const curPhase = phase;
        if (phase === 2) {
            setTurn(oppTurn);
        }
        setPhase(curPhase + 1);
        checkBou();
    }

    const quickStart = () => {
        setPhase(3);
        setYomifu([]);
        setPieces(templateSet());
        setWhitePieces([]);
        setBlackPieces([]);
        setClickFlag(false);
        setTurn(1);
    }

    if(phase === 0) {
        return(
            <div className={classes.paramsContainer}>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button1}
                            onClick={() => start()}
                >
                    始める
                </Button>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button1}
                            onClick={() => quickStart()}
                >
                    クイックスタート
                </Button>
            </div>
            
        )
    } else if(phase === 1 || phase === 2) {
        let sumiBotton;
        if(phase === 1) {
            if(turn === 2) {
                if(bouFlagW === false){
                    sumiBotton = <Button 
                                    variant="contained" 
                                    className={classes.button1}
                                >
                                    済み
                                </Button>;
                } else {
                    sumiBotton = <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button1}
                                    onClick={() => endPut()}
                                >
                                    済み
                                </Button>
                }
            } else {
                if(bouFlagB === false){
                    sumiBotton = <Button 
                                    variant="contained" 
                                    className={classes.button1}
                                >
                                    済み
                                </Button>;
                } else {
                    sumiBotton = <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button1}
                                    onClick={() => endPut()}
                                >
                                    済み
                                </Button>
                }
            }
        } else {
            if(turn === 1) {
                if(bouFlagW === false){
                    sumiBotton = <Button 
                                    variant="contained" 
                                    className={classes.button1}
                                >
                                    済み
                                </Button>;
                } else {
                    sumiBotton = <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button1}
                                    onClick={() => endPut()}
                                >
                                    済み
                                </Button>
                }
            } else {
                if(bouFlagB === false){
                    sumiBotton = <Button 
                                    variant="contained" 
                                    className={classes.button1}
                                >
                                    済み
                                </Button>;
                } else {
                    sumiBotton = <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button1}
                                    onClick={() => endPut()}
                                >
                                    済み
                                </Button>
                }
            }
        }
        return(
            <div className={classes.paramsContainer}>
                {sumiBotton}
                <div>
                    {yomifu}
                </div>
            </div>
        )
    } else if (phase === 3) {
        const numString = `${kifu.length + 1}`;
        let turnString = "";
        if(turn === 1) {
            turnString += "白";
        } else {
            turnString += "黒";
        }
        return (
            <div>
                <div>
                    {turnString}番
                </div>
                <div>
                    {numString}手目
                </div>
                <div>
                    {yomifu}
                </div>
                <div>
                    {clickString1}
                </div>
                <div>
                    {clickString2}
                </div>
                <div>
                    {clickString3}
                </div>
            </div>
        )
    } else if(phase === 4) {
        let winnerString = "";
        if(winner === 1) {
            winnerString = "白";
        } else {
            winnerString = "黒";
        }
        return(
            <div className={classes.paramsContainer}>
                <div>
                    勝者 :　{winnerString}
                </div>    
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button1}
                            onClick={() => start()}
                >
                    再戦
                </Button>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button1}
                            onClick={() => quickStart()}
                >
                    クイックスタート
                </Button>
            </div>
        )
    } else {
        return null;
    }
}

export default Params;