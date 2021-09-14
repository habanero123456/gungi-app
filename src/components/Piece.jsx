import { makeStyles } from '@material-ui/core/styles';
import { PieceContext } from '../App'
import React, {useState, useContext, useEffect} from 'react'
import { Autorenew } from '@material-ui/icons';
import '../assets/styles/style.css'

const test = "testPieceImg";

const useStyles = makeStyles((theme) => ({
    square: {
        width: 52,
        height: 52,
        borderWidth: 1,
        borderColor: 'black',
        boxSizing: "border-box",
        marginLeft: -1,
        backgroundColor: "#F8BE75",
        borderSpacing: 0,
        borderCollapse: "collapse",
        boxSizing: "border-box",
    },
    text: {
      fontSize: 24,
    },
    piece: {
        backgroundSize: "contain",
        margin: 0,
        borderColor: 'black',
        borderWidth: 1,
        // boxSizing: "border-box",
        width: 50,
        height: 50,
    },
    // blackPiece: {
    //     transform: "scale(1, -1)",
    //     margin: 0,
    // },
    selected: {
        backgroundColor: "#D0D0D0",
    },
    canMove: {
        backgroundColor: "#f5a38e",
    },
  }));

const Piece = (props) => {
    const classes = useStyles();
    const { pieces, setPieces } = useContext(PieceContext);
    const { turn, setTurn } = useContext(PieceContext);
    const { select, setSelect } = useContext(PieceContext);
    const { clickFlag, setClickFlag } = useContext(PieceContext);
    const { canMove, setCanMove } = useContext(PieceContext);
    const { modal, setModal } = useContext(PieceContext);
    const { attack, setAttack } = useContext(PieceContext);
    const { whitePieces, setWhitePieces } = useContext(PieceContext);
    const { blackPieces, setBlackPieces } = useContext(PieceContext);
    const { phase, setPhase } = useContext(PieceContext);
    const { winner, setWinner } = useContext(PieceContext);
    const { kifu, setKifu } = useContext(PieceContext);
    const { yomifu, setYomifu } = useContext(PieceContext);
    const { click, setClick } = useContext(PieceContext);
    const { firstArata, setFirstArata } = useContext(PieceContext);
    const { bouFlagW, setBouFlagW } = useContext(PieceContext);
    const { bouFlagB, setBouFlagB } = useContext(PieceContext);
    const { bouCheck, setBouCheck } = useContext(PieceContext);
    
    const thisNum = 10 * (props.column - 1) + 9 - props.row;

    const curPieces = Array.from(pieces);
    const thisPiece = curPieces[thisNum];

    const thisClickFlag = clickFlag;

    let classString = `${classes.piece}`;
    // if (thisPiece.whose === 2) {
    //     classString  += ` ${classes.blackPiece}`;
    // }
    if (select.num === thisNum) {
        classString  += ` ${classes.selected}`;
    } 
    if (canMove.includes(thisNum)) {
        classString  += ` ${classes.canMove}`;
    }
    
    const toggleWhose = (whose) => {
        if (whose === 1) {
            return 2;
        } else {
            return 1;
        }
    }
    const oppTurn = toggleWhose(turn);

    const x = thisNum % 10;
    const y = (thisNum - x) / 10;

    const kanji = ['師', '大', '中', '小', '兵', '侍', '忍', '馬', '弓', '砦', '槍', '謀', '砲', '筒'];

    const addKifu = (thisPieces) => {
        const newKifu = Array.from(kifu);
        newKifu.push(thisPieces);
        setKifu(newKifu);
    }

    const checkBou = () => {
        const curWPiece = curPieces.filter((piece) => {
            return piece.whose === 1;
        })
        const curBPiece = curPieces.filter((piece) => {
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

    //攻撃
    useEffect(() => {
        //キャンセル
        if (attack.defense === thisNum){
            if(attack.num === 1) {
                if(turn === 1) {
                    setTurn(2);
                } else {
                    setTurn(1);
                }
                setClickFlag(!clickFlag);
                setAttack({num: 0, piece: -1});
            }

            let offenseLevel = 1;
            let difenseLevel = 1;
            if(attack.offense < 90) {
                offenseLevel = curPieces[attack.offense].level;
                difenseLevel = curPieces[attack.defense].level;
            }
            
            //取る
            if(attack.num === 2) {
                //レベル２，３のとき
                if(offenseLevel === 3) {
                    if(offenseLevel === difenseLevel) {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level, under: curPieces[attack.defense]});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    } else if (offenseLevel - difenseLevel === 1) {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level - 1, under: curPieces[attack.defense]});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    } else {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level - 2});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    }
                } else if(offenseLevel === 2) {
                    //同レベをとる
                    if(offenseLevel === difenseLevel) {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level, under: curPieces[attack.defense]});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    } else {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level - 1});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    }
                } else {
                    curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level});
                    curPieces.splice(attack.offense, 1, {type: 0, whose: 0, level: 0});
                }
                addKifu(curPieces);
                // setYomifu(`${x}-${y}-${thisPiece.level}-${kanji[thisPiece.type]}`);
                setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}`);
                setClickFlag(!clickFlag);
                checkBou();
            }
            //ツケる
            if(attack.num === 3) {
                let newPiece;
                if(attack.offense >= 90) {
                    newPiece = {
                        type: attack.type, 
                        whose: oppTurn, 
                        level: curPieces[attack.defense].level + 1,
                        under: curPieces[attack.defense]
                    }
                    curPieces.splice(attack.defense, 1, newPiece);
                } else {
                    if(offenseLevel === 3) {
                        if(offenseLevel - difenseLevel === 1) {
                            newPiece = {
                                type: curPieces[attack.offense].type, 
                                whose: oppTurn, 
                                level: curPieces[attack.offense].level,
                                under: curPieces[attack.defense]
                            }
                        } else {
                            newPiece = {
                                type: curPieces[attack.offense].type, 
                                whose: oppTurn, 
                                level: curPieces[attack.offense].level - 1,
                                under: curPieces[attack.defense]
                            }
                        }
                    }
                    if(offenseLevel === 2) {
                        if(offenseLevel - difenseLevel === 1) {
                            newPiece = {
                                type: curPieces[attack.offense].type, 
                                whose: oppTurn, 
                                level: curPieces[attack.offense].level,
                                under: curPieces[attack.defense]
                            }
                        } else {
                            newPiece = {
                                type: curPieces[attack.offense].type, 
                                whose: oppTurn, 
                                level: curPieces[attack.offense].level + 1,
                                under: curPieces[attack.defense]
                            }
                        }  
                    }
                    if(offenseLevel === 1) {
                        newPiece = {
                            type: curPieces[attack.offense].type, 
                            whose: oppTurn, 
                            level: curPieces[attack.offense].level + 1,
                            under: curPieces[attack.defense]
                        }
                    }
                    curPieces.splice(attack.defense, 1, newPiece);
                    if(offenseLevel >= 2) {
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    } else {
                        curPieces.splice(attack.offense, 1, {type: -1, whose: 0, level: 0});
                    }
                }
                addKifu(curPieces);
                setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}`);
                setClickFlag(!clickFlag);
                checkBou();
            }
            setPieces(curPieces);
            setSelect({num: -1, type: -1, level: 0});
        }
    }, [attack])

    const UnderColorCheck = () => {
        if (thisPiece.level === 1) {
            return 0;
        } else if (thisPiece.level === 2) {
            if (thisPiece.under.whose === 1) {
                return 1;
            } else {
                return 2;
            }
        } else if (thisPiece.level === 3) {
            if (thisPiece.under.whose === 1) {
                if (thisPiece.under.under.whose === 1) {
                    return 3;
                } else {
                    return 4;
                }
            } else {
                if (thisPiece.under.under.whose === 1) {
                    return 5;
                } else {
                    return 6;
                }
            }
        }
    }
    const thisUnderColor = UnderColorCheck();
    const thisPieceString = `piece${thisPiece.type}-${thisPiece.whose}-${thisUnderColor}`;
    // let provisionalPiece = "";
    // if(thisPiece.whose !== 0) {
    //     provisionalPiece = `piece0-${thisPiece.whose}-3`;
    //     // provisionalPiece = "testPiece";
    // }

    const searchCanMove = () => {

        const moveCalculate = (xy, whose) => {
            if (whose === 1){
                const dx = xy[0];
                const dy = xy[1];
                if(x + dx >= 0 && x + dx <= 9 && y + dy >= 0 && y + dy <= 9) {
                    return (y + dy) * 10 + x + dx;
                }
            } else {
                const dx = xy[0];
                const dy = -xy[1];
                if(x + dx >= 0 && x + dx <= 9 && y + dy >= 0 && y + dy <= 9) {
                    return (y + dy) * 10 + x + dx;
                }
            }
        }
        // const checkCheckMate

        const isIncludeKing = (array) => {
            const checkCanMove = curPieces.reduce((accumulator, currentValue, pieceIndex, prevArray) => {
                for(let i = 0; i < array.length; i++) {
                    if (array[i] === pieceIndex) {
                        accumulator.push({type: currentValue.type, whose: currentValue.whose, index: pieceIndex});
                    }
                }
                return accumulator;
            }, []).filter((item) => {
                if(item.type === 0) {
                    if(item.whose !== turn) {
                        return true;
                    } 
                } else {
                    return true;
                }
                // return item.type !== 0 && item.whose === turn;
            }).map((piece) => {
                return piece.index;
            })
            return checkCanMove;
        }
        const checkRideable = (array) => {
            let checkCanMove = [];
            const alones = [0, 12, 13];
            if(alones.includes(thisPiece.type)) {
                checkCanMove = curPieces.reduce((accumulator, currentValue, pieceIndex, prevArray) => {
                    for(let i = 0; i < array.length; i++) {
                        if (array[i] === pieceIndex) {
                            accumulator.push({type: currentValue.type, whose: currentValue.whose, index: pieceIndex});
                        }
                    }
                    return accumulator;
                }, []).filter((item) => {
                    return item.whose !== turn;
                }).map((piece) => {
                    return piece.index;
                })
            } else {
                checkCanMove = array;
            }
            return checkCanMove;
        }

        const checkLevel = (array) => {
            const checkCanMove = curPieces.reduce((accumulator, currentValue, pieceIndex, prevArray) => {
                for(let i = 0; i < array.length; i++) {
                    if (array[i] === pieceIndex) {
                        accumulator.push({...currentValue, index: pieceIndex});
                    }
                }
                return accumulator;
            }, []).filter((item) => {
                if(thisPiece.type === 0 || thisPiece.type === 12 || thisPiece.type === 13) {
                    return true;
                } else {
                    if(thisPiece.level >= item.level) {
                        return true;
                      }
                }
            }).map((piece) => {
                return piece.index;
            })
            return checkCanMove;
        }

        const isPiece = (num) => {
            if(num >= 0 && num <= 88) {
                return curPieces[num].whose === 0;
            } else {
                return false;
            }
        }
        let canMoveNum = [];

        switch (thisPiece.type) {
            case 0 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), 
                                    moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose), moveCalculate([1, 1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose)];
                }
                break;
            case 1 :
                if(thisPiece.level !== 0) {
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([i, 0], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([-i, 0], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([0, i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([0, -i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    if(thisPiece.level >= 2) {
                        canMoveNum.push(moveCalculate([1, 1], thisPiece.whose));
                        canMoveNum.push(moveCalculate([1, -1], thisPiece.whose));
                        canMoveNum.push(moveCalculate([-1, 1], thisPiece.whose));
                        canMoveNum.push(moveCalculate([-1, -1], thisPiece.whose));
                    }
                }
                break;
            case 2 :
                if(thisPiece.level !== 0) {
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([i, i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([i, -i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([-i, i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([-i, -i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    if(thisPiece.level >= 2) {
                        canMoveNum.push(moveCalculate([0, 1], thisPiece.whose));
                        canMoveNum.push(moveCalculate([0, -1], thisPiece.whose));
                        canMoveNum.push(moveCalculate([1, 0], thisPiece.whose));
                        canMoveNum.push(moveCalculate([-1, 0], thisPiece.whose));
                    }
                }
                break;
            case 3 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), 
                                    moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    // canMoveNum = [moveCalculate([1, 0], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([0, -1], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), 
                    //                 moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose), moveCalculate([0, -2], thisPiece.whose), moveCalculate([0, 2], thisPiece.whose), 
                    //                 moveCalculate([2, 0], thisPiece.whose), moveCalculate([-2, 0], thisPiece.whose)];
                    canMoveNum = [moveCalculate([1, 0], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([0, -1], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), 
                                    moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose)];
                    if(isPiece(canMoveNum[0])) {
                        canMoveNum.push(moveCalculate([2, 0], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[2])) {
                        canMoveNum.push(moveCalculate([0, -2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[3])) {
                        canMoveNum.push(moveCalculate([-2, 0], thisPiece.whose));
                    }
                }
                break;
            case 4 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose)];
                    if(isPiece(canMoveNum[0])) {
                        canMoveNum.push(moveCalculate([0, -2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[1])) {
                        canMoveNum.push(moveCalculate([0, 2], thisPiece.whose));
                    }
                }
                break;
            case 5 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, 1], thisPiece.whose), moveCalculate([0, -1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    canMoveNum = [moveCalculate([0, 1], thisPiece.whose), moveCalculate([0, -1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose)];
                    if(isPiece(canMoveNum[0])) {
                        canMoveNum.push(moveCalculate([0, 2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[1])) {
                        canMoveNum.push(moveCalculate([0, -2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[2])) {
                        canMoveNum.push(moveCalculate([2, 0], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[3])) {
                        canMoveNum.push(moveCalculate([-2, 0], thisPiece.whose));
                    }
                }
                break;
            case 6 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose), 
                    moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose)];
                    if(isPiece(canMoveNum[0])) {
                        canMoveNum.push(moveCalculate([0, -2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[2])) {
                        canMoveNum.push(moveCalculate([2, -2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[3])) {
                        canMoveNum.push(moveCalculate([-2, -2], thisPiece.whose));
                    }
                }
                break;
            case 7 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([1, 1], thisPiece.whose), moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    canMoveNum = [moveCalculate([1, 1], thisPiece.whose), moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose)];
                    if(isPiece(canMoveNum[0])) {
                        canMoveNum.push(moveCalculate([2, 2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[1])) {
                        canMoveNum.push(moveCalculate([2, -2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[2])) {
                        canMoveNum.push(moveCalculate([-2, 2], thisPiece.whose));
                    }
                    if(isPiece(canMoveNum[3])) {
                        canMoveNum.push(moveCalculate([-2, -2], thisPiece.whose));
                    }
                }
                break;
            case 8 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([1, 2], thisPiece.whose), moveCalculate([1, -2], thisPiece.whose), moveCalculate([-1, 2], thisPiece.whose), moveCalculate([-1, -2], thisPiece.whose), 
                                        moveCalculate([2, 1], thisPiece.whose), moveCalculate([2, -1], thisPiece.whose), moveCalculate([-2, 1], thisPiece.whose), moveCalculate([-2, -1], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    canMoveNum = [moveCalculate([1, 2], thisPiece.whose), moveCalculate([1, -2], thisPiece.whose), moveCalculate([-1, 2], thisPiece.whose), moveCalculate([-1, -2], thisPiece.whose), 
                                    moveCalculate([2, 1], thisPiece.whose), moveCalculate([2, -1], thisPiece.whose), moveCalculate([-2, 1], thisPiece.whose), moveCalculate([-2, -1], thisPiece.whose),
                                    moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([0, -1], thisPiece.whose)];
                }
                break;
            case 9 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), 
                                    moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose), moveCalculate([1, 1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose)];
                } else if(thisPiece.level >= 2) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([0, 1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose), 
                    moveCalculate([1, -1], thisPiece.whose), moveCalculate([-1, -1], thisPiece.whose), moveCalculate([1, 1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose)];
                }
                break;
            case 10 :
                if(thisPiece.level !== 0) {
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([0, i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                    for(let i = 1; i <= 9; i++) {
                        const newMove = moveCalculate([0, -i], thisPiece.whose);
                        canMoveNum.push(newMove);
                        if(!isPiece(newMove)) {
                            break;
                        }
                    }
                }
                if(thisPiece.level >= 2) {
                    canMoveNum.push(moveCalculate([1, 0], thisPiece.whose));
                    canMoveNum.push(moveCalculate([-1, 0], thisPiece.whose));
                }
                break;
            case 11 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([1, 0], thisPiece.whose), moveCalculate([-1, 0], thisPiece.whose)];
                }
                break;
            case 12 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([1, 1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose), 
                                    moveCalculate([1, -2], thisPiece.whose), moveCalculate([-1, -2], thisPiece.whose)];
                }
                break;
            case 13 :
                if(thisPiece.level === 1) {
                    canMoveNum = [moveCalculate([0, -1], thisPiece.whose), moveCalculate([1, 1], thisPiece.whose), moveCalculate([-1, 1], thisPiece.whose), 
                                    moveCalculate([1, -2], thisPiece.whose), moveCalculate([-1, -2], thisPiece.whose)];
                }
                break;
        }
        const checkedCanMove = isIncludeKing(canMoveNum);
        const checkedRideable = checkRideable(checkedCanMove);
        const checkedLevel = checkLevel(checkedRideable);

        // console.log(checkedRideable);
        // console.log(checkedLevel);
        
        setCanMove(checkedLevel);
    }

    const clickPiece = () => {
        if (phase === 3) {
            //選択
            setClick(curPieces[thisNum]);
            if (thisClickFlag === false) {
                if (thisPiece.whose === turn){
                    setClickFlag(!thisClickFlag);
                    setSelect({num: thisNum, type: curPieces[thisNum].type, level: curPieces[thisNum].level});
                    // setClick(curPieces[thisNum]);
                    searchCanMove();
                }
            }else{
                //選択解除
                if(select.num === thisNum){
                    setClickFlag(!clickFlag);
                    setSelect({num: -1, type: -1, level: 0});
                    // setClick({type: -1, whose: 0, level: 0})
                    setCanMove([]);
                }
            }
            //動かす
            if (canMove.includes(thisNum)){
                //空マス
                if (curPieces[thisNum].whose === 0){
                    //アラタ
                    if(select.num === 90){
                        let newWhitePieces = Array.from(whitePieces);
                        const arataIndex = newWhitePieces.indexOf(select.type);
                        newWhitePieces.splice(arataIndex, 1);
                        setWhitePieces(newWhitePieces);
                        curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                        setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}-新`);
                    }else if(select.num === 91) {
                        let newBlackPieces = Array.from(blackPieces);
                        const arataIndex = newBlackPieces.indexOf(select.type);
                        newBlackPieces.splice(arataIndex, 1);
                        setBlackPieces(newBlackPieces);
                        curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                        setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}-新`);
                    //移動
                    } else {
                        if (curPieces[select.num].level === 1) {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: select.level});
                            curPieces.splice(select.num, 1, {type: -1, whose: 0, level: 0});
                        } else if (curPieces[select.num].level >= 2) {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                            curPieces.splice(select.num, 1, curPieces[select.num].under);
                        }
                        setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}`);
                    }
                    setClickFlag(!clickFlag);
                    addKifu(curPieces);
                    checkBou();
                }
                //自駒
                else if (curPieces[thisNum].whose === turn){
                    if(select.num >= 90) {
                        setAttack({num: 3, offense: select.num, defense: thisNum, type: select.type});
                    } else if(select.level >= curPieces[thisNum].level) {
                        setModal(2);
                        setAttack({num: -1, offense: select.num, defense: thisNum});
                    }
                }
                //敵駒
                if (curPieces[thisNum].whose === oppTurn){
                    //取るかつけるか
                    if(curPieces[thisNum].type === 0) {
                        if(select.level === 3) {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 2, under: curPieces[thisNum]});
                            curPieces.splice(select.num, 1, curPieces[select.num]);
                        } else if(select.level === 2) {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                            curPieces.splice(select.num, 1, curPieces[select.num]);
                        } else {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                            curPieces.splice(select.num, 1, {type: 0, whose: 0, level: 0});
                        }
                        
                        setWinner(turn);
                        setPhase(4);
                    } else if(select.type === 9) {
                        setModal(2);
                        setAttack({num: -1, offense: select.num, defense: thisNum});
                    } else if(select.type === 0 || select.type === 9 || select.type > 10) {
                        setModal(3);
                        setAttack({num: -1, offense: select.num, defense: thisNum});
                    } else if (select.level !== 3){
                        if(select.level >= curPieces[thisNum].level) {
                            setModal(1);
                            setAttack({num: -1, offense: select.num, defense: thisNum});
                        }
                    } else {
                        if(curPieces[thisNum].level === 3){
                            setModal(3);
                            setAttack({num: -1, offense: select.num, defense: thisNum});
                        } else {
                            setModal(1);
                            setAttack({num: -1, offense: select.num, defense: thisNum});
                        }
                        
                    }
                }
                setPieces(curPieces);
                // setClickFlag(!clickFlag);
                setSelect({num: -1, type: -1, level: 0});
                setCanMove([]);
                setTurn(oppTurn);
                console.log(bouCheck);
            }
        } else if (phase === 1 || phase === 2) {
            if (canMove.includes(thisNum)){
                if (curPieces[thisNum].whose === 0){
                    if(select.num === 90){
                        let newWhitePieces = Array.from(whitePieces);
                        const arataIndex = newWhitePieces.indexOf(select.type);
                        newWhitePieces.splice(arataIndex, 1);
                        setWhitePieces(newWhitePieces);
                        curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                        let curCanMove = [];
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 9; j++) {
                                curCanMove.push(10 * i + j);
                            }
                        }
                        if(firstArata === false) {
                            setSelect({num: 91, type: 0, level: 1});
                            setCanMove(curCanMove);
                            setFirstArata(true);
                        } else {
                            setSelect({num: -1, type: -1, level: 0});
                            setCanMove([]);
                        }
                        setClickFlag(!clickFlag);
                        setPieces(curPieces);
                        setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}-新`);
                        // addKifu(curPieces);
                        if(phase === 1) {
                            setTurn(oppTurn);
                        } 
                        if(select.type === 11) {
                            setBouFlagW(true);
                        }
                    }else if(select.num === 91) {
                        let newBlackPieces = Array.from(blackPieces);
                        const arataIndex = newBlackPieces.indexOf(select.type);
                        newBlackPieces.splice(arataIndex, 1);
                        setBlackPieces(newBlackPieces);
                        curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});

                        setClickFlag(!clickFlag);
                        setPieces(curPieces);
                        setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}-新`);
                        // addKifu(curPieces);
                        setSelect({num: -1, type: -1, level: 0});
                        setCanMove([]);
                        if(phase === 1) {
                            setTurn(oppTurn);
                        } 
                        if(select.type === 11) {
                            setBouFlagB(true);
                        }
                    }
                } else if (curPieces[thisNum].whose === turn){
                    if(select.num === 90){
                        let newWhitePieces = Array.from(whitePieces);
                        const arataIndex = newWhitePieces.indexOf(select.type);
                        newWhitePieces.splice(arataIndex, 1);
                        setWhitePieces(newWhitePieces);
                        let newPiece = {};
                        if(thisPiece.level < 3) {
                            newPiece = {
                                type: select.type, 
                                whose: turn, 
                                level: select.level + 1,
                                under: thisPiece
                            }
                        }
                        curPieces.splice(thisNum, 1, newPiece);

                    }else if(select.num === 91) {
                        let newBlackPieces = Array.from(blackPieces);
                        const arataIndex = newBlackPieces.indexOf(select.type);
                        newBlackPieces.splice(arataIndex, 1);
                        setBlackPieces(newBlackPieces);
                        let newPiece = {};

                        if(thisPiece.level < 3) {
                            newPiece = {
                                type: select.type, 
                                whose: turn, 
                                level: select.level + 1,
                                under: thisPiece
                            }
                        }
                        curPieces.splice(thisNum, 1, newPiece);
                    }
                    setClickFlag(!clickFlag);
                    setPieces(curPieces);
                    setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}-新`);
                    // addKifu(curPieces);
                    setSelect({num: -1, type: -1, level: 0});
                    setCanMove([]);
                    if(phase === 1) {
                        setTurn(oppTurn);
                    } 
                }
            }
            console.log(firstArata);
        }
            console.log(turn);
            console.log({...curPieces[thisNum], thisNum: thisNum, params: thisPieceString});
    }
    return(
        <button className={classes.square} onClick={() =>{clickPiece()}}>
            <div className={classString} style={{ backgroundImage: `url(/images/${thisPieceString}.png)`}}></div>
        </button>
    )
}

export default Piece;