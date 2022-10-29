import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { PieceContext } from '../App'
import Button from '@material-ui/core/Button';
import useMedia from 'use-media';

const useStyles = makeStyles((theme) => ({
    paramsContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        width: 160,
        height: 80,
    },
    paramsContainer2: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        width: 160,
        height: 180,
    },
    button1: {
        marginBottom: 10,
        width: 160,
      },
    button1M: {
        // margin: "0 10px 10px 10px",
        // padding: 0,
        // padding: "6px 10px",
        width: 150,
    },
    buttonContainer: {
        width: 150,
        display: "flex",
        justifyContent: "space-between",
    },
    button2: {
        marginBottom: 10,
    },
    button2M: {
        marginBottom: 10,
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
    const { bouCheck, setBouCheck } = useContext(PieceContext);
    const { curKifu, setCurKifu } = useContext(PieceContext);

    const isWide = useMedia({minWidth: '769px'});
    let button1String = "";
    if(isWide) {
        button1String = `${classes.button1}`;
    } else {
        button1String = `${classes.button1M}`;
    }
    let button2String = "";
    if(isWide) {
        button2String = `${classes.button2}`;
    } else {
        button2String = `${classes.button2M}`;
    }
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
        culcuTemplateSet(74, 10, 1);
        culcuTemplateSet(64, 4, 1);
        culcuTemplateSet(63, 5, 1);
        culcuTemplateSet(65, 5, 1);
        culcuTemplateSet(62, 9, 1);
        culcuTemplateSet(66, 9, 1);
        culcuTemplateSet(60, 4, 1);
        culcuTemplateSet(68, 4, 1);
        culcuTemplateSet(71, 6, 1);
        culcuTemplateSet(77, 6, 1);
        culcuTemplateSet(85, 1, 1);
        culcuTemplateSet(83, 2, 1);
        

        // templateSetSub.splice(44, 1, {type: 5, whose: 1, level: 1});
        // templateSetSub.splice(44, 1, {type: 5, whose: 1, level: 2, under: {type: 1, whose: 1, level: 1}});
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
        setKifu([initPieces]);
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
        setWhitePieces([3, 3, 4, 4, 6, 7, 10, 10]);
        setBlackPieces([3, 3, 4, 4, 6, 7, 10, 10]);
        setClickFlag(false);
        setTurn(1);
        setKifu([templateSet()])
    }

    const displayKifu = (direction) => {
        if(direction === true) {
            //戻る
            const befCurKifu = curKifu;
            setCurKifu(befCurKifu - 1); 
            setPieces(kifu[befCurKifu - 1]);
        } 
        if(direction === false) {
            //次
            const befCurKifu = curKifu;
            setCurKifu(befCurKifu + 1); 
            setPieces(kifu[befCurKifu + 1]);
        }
    }

    if(phase === 0) {
        return(
            <div className={classes.paramsContainer}>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={button1String}
                            onClick={() => start()}
                >
                    始める
                </Button>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={button1String}
                            onClick={() => quickStart()}
                >
                    初期配置
                </Button>
            </div>
            
        )
    } else if(phase === 1 || phase === 2) {
        const numString = `${kifu.length }`;
        let sumiBotton;
        if(phase === 1) {
            if(turn === 2) {
                sumiBotton = <Button 
                                variant="contained" 
                                color="primary" 
                                className={button1String}
                                onClick={() => endPut()}
                            >
                                済み
                            </Button>
            } else {
                sumiBotton = <Button 
                                variant="contained" 
                                color="primary" 
                                className={button1String}
                                onClick={() => endPut()}
                            >
                                済み
                            </Button>
            }
        } else {
            if(turn === 1) {
                sumiBotton = <Button 
                                variant="contained" 
                                color="primary" 
                                className={button1String}
                                onClick={() => endPut()}
                            >
                                済み
                            </Button>
            } else {
                sumiBotton = <Button 
                                variant="contained" 
                                color="primary" 
                                className={button1String}
                                onClick={() => endPut()}
                            >
                                済み
                            </Button>
            }
        }
        return(
            <div className={classes.paramsContainer}>
                {sumiBotton}
                <div>
                    {numString}手目
                </div>
                <div>
                    {yomifu}
                </div>
            </div>
        )
    } else if (phase === 3) {
        const numString = `${kifu.length }`;
        let turnString = "";
        if(turn === 1) {
            turnString += "白";
        } else {
            turnString += "黒";
        }
        return (
            <div className={classes.paramsContainer}>
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
        const numString = `${curKifu}`;
        let winnerString = "";
        if(winner === 1) {
            winnerString = "白";
        } else {
            winnerString = "黒";
        }
        let prevKifuButton = "";
        if(curKifu > 0) {
            prevKifuButton = <Button
                                variant="contained" 
                                className={button2String}
                                color="primary" 
                                onClick={() => displayKifu(true)}
                            >←</Button>
        } else {
            prevKifuButton = <Button
                                variant="contained" 
                                className={button2String}
                            >←</Button>
        }
        let nextKifuButton = "";
        if(curKifu < kifu.length - 1) {
            nextKifuButton = <Button
                                variant="contained" 
                                className={button2String}
                                color="primary" 
                                onClick={() => displayKifu(false)}
                            >→</Button>
        } else {
            nextKifuButton = <Button
                                variant="contained" 
                                className={button2String}
                            >→</Button>
        }
        return(
            <div className={classes.paramsContainer2}>
                <div>
                    {numString}手目
                </div>
                <div>
                    勝者 :　{winnerString}
                </div> 
                <div className={classes.buttonContainer}>
                    {prevKifuButton}
                    {nextKifuButton}
                </div>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={button1String}
                            onClick={() => start()}
                >
                    再戦
                </Button>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={button1String}
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