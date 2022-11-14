import { makeStyles } from '@mui/styles';
import { PieceContext } from '../App'
import React, {useState, useContext, useEffect} from 'react'
import '../assets/styles/style.css'
import useMedia from 'use-media';

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
    squareM: {
        width: 40,
        height: 40,
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
    pieceM: {
        backgroundSize: "contain",
        margin: 0,
        borderColor: 'black',
        borderWidth: 1,
        // boxSizing: "border-box",
        width: 38,
        height: 38,
    },
    selected: {
        backgroundColor: "#D0D0D0",
    },
    canMove: {
        backgroundColor: "#f5a38e",
    },
    image: {

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
    const { bouCheck, setBouCheck } = useContext(PieceContext);
    const { curKifu, setCurKifu } = useContext(PieceContext);
    
    const thisNum = 10 * (props.column - 1) + 9 - props.row;

    const curPieces = Array.from(pieces);
    const thisPiece = curPieces[thisNum];

    const thisClickFlag = clickFlag;
    const isWide = useMedia({minWidth: '769px'});

    let squareString = "";
    if(isWide) {
        squareString = `${classes.square}`;
    } else {
        squareString = `${classes.squareM}`;
    }
    let classString = "";
    if(isWide) {
        classString = `${classes.piece}`;
    } else {
        classString = `${classes.pieceM}`;
    }

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

    //攻撃
    useEffect(() => {
        if (attack.defense === thisNum){
            //キャンセル
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
                //レベル３のとき
                if(offenseLevel === 3) {
                    //3が3をとる
                    if(offenseLevel === difenseLevel) {
                        let underColor = 0;
                        //0 黒黒黒　1黒黒白　2黒白黒　3黒白白 (白が攻めの場合)
                        if(curPieces[attack.defense].under.whose !== oppTurn) { 
                            if(curPieces[attack.defense].under.under.whose === oppTurn) {
                                underColor = 1;
                            }
                        } else {
                            if(curPieces[attack.defense].under.under.whose !== oppTurn) {
                                underColor = 2;
                            } else {
                                underColor = 3;
                            }
                        }
                        switch (underColor) {
                            case 0 :
                                curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: 1});
                                curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                                break;
                            case 1 :
                                curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: 2, under: curPieces[attack.defense].under.under});
                                curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                                break;
                            case 2 :
                                curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: 2, under: {type: curPieces[attack.defense].under.type, whose: oppTurn, level: 1}});
                                curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                                break;
                            case 3 :
                                curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: 3, under: curPieces[attack.defense].under});
                                curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                                break;
                            default:
                                break;
                        }
                        console.log(curPieces[attack.defense].under);
                        // curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level, under: curPieces[attack.defense].under});
                        // curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    //3が2をとる
                    } else if (offenseLevel - difenseLevel === 1) {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level - 1, under: curPieces[attack.defense].under});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    //3が1をとる
                    } else {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level - 2});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    }
                //レベル２のとき
                } else if(offenseLevel === 2) {
                    //2が2をとる
                    if(offenseLevel === difenseLevel) {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level, under: curPieces[attack.defense].under});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    } else {
                        curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level - 1});
                        curPieces.splice(attack.offense, 1, curPieces[attack.offense].under);
                    }
                //レベル１のとき
                } else {
                    curPieces.splice(attack.defense, 1, {type: curPieces[attack.offense].type, whose: oppTurn, level: curPieces[attack.offense].level});
                    curPieces.splice(attack.offense, 1, {type: -1, whose: 0, level: 0});
                }
                addKifu(curPieces);
                setYomifu(`${x + 1}-${y + 1}-${curPieces[thisNum].level}-${kanji[curPieces[thisNum].type]}`);
                setClickFlag(!clickFlag);
            }
            //ツケる
            if(attack.num === 3) {
                //手駒新
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
            }).map((piece) => {
                return piece.index;
            })
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
                if(thisPiece.level !== 3) {
                    if(thisPiece.level >= item.level) {
                        return true;
                    }
                //レベル３の時
                } else {
                    if(thisPiece.whose !== item.whose) {
                        if(thisPiece.level >= item.level) {
                            return true;
                            }
                    } else {
                        if(item.level !== 3) {
                            return true;
                            }
                    }
                }
            }).map((piece) => {
                return piece.index;
            })
            return checkCanMove;
        }

        const isPiece = (num, exception) => {
            if(exception) {
                console.log(thisNum);
                console.log(num);
                if(num >= 0 && num <= 88) {
                    if(curPieces[num].whose !== 0) {
                        if(curPieces[thisNum].level >= curPieces[num].level) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                if(num >= 0 && num <= 88) {
                    return curPieces[num].whose === 0;
                } else {
                    return false;
                }
            }
        }

        const moveNum = (num) => {
            switch (num) {
                case 1 :
                    return moveCalculate([0, -1], thisPiece.whose);
                case 2 :
                    return moveCalculate([0, 1], thisPiece.whose);
                case 3 :
                    return moveCalculate([1, 0], thisPiece.whose);
                case 4 :
                    return moveCalculate([-1, 0], thisPiece.whose);
                case 5 :
                    return moveCalculate([1, -1], thisPiece.whose);
                case 6 :
                    return moveCalculate([-1, -1], thisPiece.whose);
                case 7 :
                    return moveCalculate([1, 1], thisPiece.whose);
                case 8 :
                    return moveCalculate([-1, 1], thisPiece.whose);
                case 9 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose))){
                        return moveCalculate([0, -2], thisPiece.whose);
                    }
                    break;
                case 10 :
                    if(isPiece(moveCalculate([0, 1], thisPiece.whose))){
                        return moveCalculate([0, 2], thisPiece.whose);
                    }
                    break;
                case 11 :
                    if(isPiece(moveCalculate([1, 0], thisPiece.whose))){
                        return moveCalculate([2, 0], thisPiece.whose);
                    }
                    break;
                case 12 :
                    if(isPiece(moveCalculate([-1, 0], thisPiece.whose))){
                        return moveCalculate([-2, 0], thisPiece.whose);
                    }
                    break;
                case 13 :
                    if(isPiece(moveCalculate([1, -1], thisPiece.whose))){
                        return moveCalculate([2, -2], thisPiece.whose);
                    }
                    break;
                case 14 :
                    if(isPiece(moveCalculate([-1, -1], thisPiece.whose))){
                        return moveCalculate([-2, -2], thisPiece.whose);
                    }
                    break;
                case 15 :
                    if(isPiece(moveCalculate([1, 1], thisPiece.whose))){
                        return moveCalculate([2, 2], thisPiece.whose);
                    }
                    break;
                case 16 :
                    if(isPiece(moveCalculate([-1, 1], thisPiece.whose))){
                        return moveCalculate([-2, 2], thisPiece.whose);
                    }
                    break;
                case 17 :
                    return moveCalculate([1, -2], thisPiece.whose);
                case 18 :
                    return moveCalculate([-1, -2], thisPiece.whose);
                case 19 :
                    return;
                case 20 :
                    return;
                case 21 :
                    return;
                case 22 :
                    return;
                case 23 :
                    return;
                case 24 :
                    return;
                case 25 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose)) && isPiece(moveCalculate([0, -2], thisPiece.whose))){
                        return moveCalculate([0, -3], thisPiece.whose);
                    }
                    break;
                case 26 :
                    if(isPiece(moveCalculate([0, 1], thisPiece.whose)) && isPiece(moveCalculate([0, 2], thisPiece.whose))){
                        return moveCalculate([0, 3], thisPiece.whose);
                    }
                    break;
                case 27 :
                    if(isPiece(moveCalculate([1, 0], thisPiece.whose)) && isPiece(moveCalculate([2, 0], thisPiece.whose))){
                        return moveCalculate([3, 0], thisPiece.whose);
                    }
                    break;
                case 28 :
                    if(isPiece(moveCalculate([-1, 0], thisPiece.whose)) && isPiece(moveCalculate([-2, 0], thisPiece.whose))){
                        return moveCalculate([-3, 0], thisPiece.whose);
                    }
                    break;
                case 29 :
                    if(isPiece(moveCalculate([1, -1], thisPiece.whose)) && isPiece(moveCalculate([2, -2], thisPiece.whose))){
                        return moveCalculate([3, -3], thisPiece.whose);
                    }
                    break;
                case 30 :
                    if(isPiece(moveCalculate([-1, -1], thisPiece.whose)) && isPiece(moveCalculate([-2, -2], thisPiece.whose))){
                        return moveCalculate([-3, -3], thisPiece.whose);
                    }
                    break;
                case 31 :
                    if(isPiece(moveCalculate([1, 1], thisPiece.whose)) && isPiece(moveCalculate([2, 2], thisPiece.whose))){
                        return moveCalculate([3, 3], thisPiece.whose);
                    }
                    break;
                case 32 :
                    if(isPiece(moveCalculate([-1, 1], thisPiece.whose)) && isPiece(moveCalculate([-2, 2], thisPiece.whose))){
                        return moveCalculate([-3, 3], thisPiece.whose);
                    }
                    break;
                case 33 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose)) 
                        && isPiece(moveCalculate([0, -2], thisPiece.whose)) 
                        && isPiece(moveCalculate([0, -3], thisPiece.whose))) {
                        return moveCalculate([0, -4], thisPiece.whose);
                    }
                    break; 
                case 34 :
                    if(isPiece(moveCalculate([0, 1], thisPiece.whose)) 
                        && isPiece(moveCalculate([0, 2], thisPiece.whose)) 
                        && isPiece(moveCalculate([0, 3], thisPiece.whose))) {
                        return moveCalculate([0, 4], thisPiece.whose);
                    }
                    break; 
                case 35 :
                    if(isPiece(moveCalculate([1, -1], thisPiece.whose)) 
                        && isPiece(moveCalculate([2, -2], thisPiece.whose)) 
                        && isPiece(moveCalculate([3, -3], thisPiece.whose))) {
                        return moveCalculate([4, -4], thisPiece.whose);
                    }
                    break; 
                case 36 :
                    if(isPiece(moveCalculate([-1, -1], thisPiece.whose)) 
                        && isPiece(moveCalculate([-2, -2], thisPiece.whose)) 
                        && isPiece(moveCalculate([-3, -3], thisPiece.whose))) {
                        return moveCalculate([-4, -4], thisPiece.whose);
                    }
                    break; 
                case 37 :
                    if(isPiece(moveCalculate([1, 1], thisPiece.whose)) 
                        && isPiece(moveCalculate([2, 2], thisPiece.whose)) 
                        && isPiece(moveCalculate([3, 3], thisPiece.whose))) {
                        return moveCalculate([4, 4], thisPiece.whose);
                    }
                    break; 
                case 38 :
                    if(isPiece(moveCalculate([-1, 1], thisPiece.whose)) 
                        && isPiece(moveCalculate([-2, 2], thisPiece.whose)) 
                        && isPiece(moveCalculate([-3, 3], thisPiece.whose))) {
                        return moveCalculate([-4, 4], thisPiece.whose);
                    }
                    break; 
                case 41 :
                    return moveCalculate([3, -4], thisPiece.whose);
                case 42 :
                    return moveCalculate([-3, -4], thisPiece.whose);
                case 90 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)){
                        return moveCalculate([0, -2], thisPiece.whose);
                    }
                    break; 
                case 170 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    &&isPiece(moveCalculate([1, -1], thisPiece.whose), true)){
                        return moveCalculate([1, -2], thisPiece.whose);
                    }
                    break; 
                case 180 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    &&isPiece(moveCalculate([-1, -1], thisPiece.whose), true)){
                        return moveCalculate([-1, -2], thisPiece.whose);
                    }
                    break;
                case 250 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([0, -2], thisPiece.whose), true)){
                        return moveCalculate([0, -3], thisPiece.whose);
                    }
                    break;
                case 330 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([0, -2], thisPiece.whose), true)
                    && isPiece(moveCalculate([0, -3], thisPiece.whose), true)){
                        return moveCalculate([0, -4], thisPiece.whose);
                    }
                    break; 
                case 39 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([1, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([1, -2], thisPiece.whose), true)){
                        return moveCalculate([2, -3], thisPiece.whose);
                    }
                    break; 
                case 40 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([-1, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([-1, -2], thisPiece.whose), true)){
                        return moveCalculate([-2, -3], thisPiece.whose);
                    }
                    break; 
                case 43 :
                    if(isPiece(moveCalculate([0, -1], thisPiece.whose), true)
                    && isPiece(moveCalculate([0, -2], thisPiece.whose), true)
                    && isPiece(moveCalculate([0, -3], thisPiece.whose), true)
                    && isPiece(moveCalculate([0, -4], thisPiece.whose), true)){
                        return moveCalculate([0, -5], thisPiece.whose);
                    }
                    break; 
                default:
                    break;
                }
        }

        let canMoveNum = [];

        switch (thisPiece.type) {
            case 0 : //師
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(1), moveNum(2), moveNum(3), moveNum(4), 
                                  moveNum(5), moveNum(6), moveNum(7), moveNum(8)];
                }
                if(thisPiece.level >= 2) {
                    canMoveNum.push(...[moveNum(9), moveNum(10), moveNum(11), moveNum(12),
                                        moveNum(13), moveNum(14), moveNum(15), moveNum(16)]);
                }
                if(thisPiece.level === 3) {
                    canMoveNum.push(...[moveNum(25), moveNum(26), moveNum(27), moveNum(28),
                                        moveNum(29), moveNum(30), moveNum(31), moveNum(32)]);
                }
                break;
            case 1 : //大
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
                    canMoveNum.push(...[moveNum(5), moveNum(6), moveNum(7), moveNum(8)]);

                    if(thisPiece.level >= 2) {
                        canMoveNum.push(...[moveNum(13), moveNum(14), moveNum(15), moveNum(16)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(29), moveNum(30), moveNum(31), moveNum(32)]);
                    }
                }
                break;
            case 2 : //中
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
                    canMoveNum.push(...[moveNum(1), moveNum(2), moveNum(3), moveNum(4)]);

                    if(thisPiece.level >= 2) {
                        canMoveNum.push(...[moveNum(9), moveNum(10), moveNum(11), moveNum(12)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(25), moveNum(26), moveNum(27), moveNum(28)]);
                    }
                }
                break;
            case 3 : //小
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(1), moveNum(2),moveNum(3),moveNum(4),
                                  moveNum(5),moveNum(6)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(9), moveNum(10), moveNum(11), 
                                            moveNum(12), moveNum(13), moveNum(14)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(25), moveNum(26),moveNum(27),
                                            moveNum(28), moveNum(29), moveNum(30)]);
                    }
                }
                break;
            case 4 : //兵
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(1), moveNum(2)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(9), moveNum(10)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(25), moveNum(26)]);
                    }
                }
                break;
            case 5 : //侍
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(1), moveNum(2),moveNum(5),moveNum(6)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(9), moveNum(10), 
                                            moveNum(13), moveNum(14)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(25), moveNum(29), moveNum(30)]);
                    }
                }
                break;
            case 6 : //忍
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(5), moveNum(6),moveNum(7),moveNum(8),
                                  moveNum(13), moveNum(14),moveNum(15),moveNum(16)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(29), moveNum(30), 
                                            moveNum(31),moveNum(32)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(35), moveNum(36), 
                                            moveNum(37),moveNum(38)]);
                    }
                }
                break;
            case 7 : //馬
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(1), moveNum(2),moveNum(3),moveNum(4),
                                  moveNum(9), moveNum(10)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(11), moveNum(12), 
                                            moveNum(25),moveNum(26)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(27), moveNum(28), 
                                            moveNum(33),moveNum(34)]);
                    }
                }
                break;
            case 8 : //弓
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(2),moveNum(90),
                                moveNum(170),moveNum(180)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(250), moveNum(39), 
                                            moveNum(40), moveNum(10)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(26), moveNum(330), 
                                            moveNum(41), moveNum(42)]);
                    }
                }
                break;
            case 9 : //砦
                if(thisPiece.level !== 0) {
                    canMoveNum = [moveNum(1), moveNum(3), moveNum(4),
                                moveNum(7), moveNum(8)];
                
                    if(thisPiece.level >= 2) {
                        console.log(canMoveNum);
                        canMoveNum.push(...[moveNum(9), moveNum(11), moveNum(12), 
                                            moveNum(15), moveNum(16)]);
                    }
                    if(thisPiece.level === 3) {
                        canMoveNum.push(...[moveNum(25), moveNum(27), moveNum(28), 
                                            moveNum(31), moveNum(32)]);
                    }
                }
                break;
            case 10 : //槍
            if(thisPiece.level !== 0) {
                canMoveNum = [moveNum(1), moveNum(2),moveNum(5),
                              moveNum(6),moveNum(9)];
            
                if(thisPiece.level >= 2) {
                    console.log(canMoveNum);
                    canMoveNum.push(...[moveNum(10),moveNum(13), 
                                        moveNum(14), moveNum(25)]);
                }
                if(thisPiece.level === 3) {
                    canMoveNum.push(...[moveNum(29), moveNum(30), 
                                        moveNum(33), moveNum(34)]);
                }
            }
                break;
            case 11 : //謀
            if(thisPiece.level !== 0) {
                canMoveNum = [moveNum(2), moveNum(5), moveNum(6)];
            
                if(thisPiece.level >= 2) {
                    console.log(canMoveNum);
                    canMoveNum.push(...[moveNum(10), moveNum(13), 
                                        moveNum(14)]);
                }
                if(thisPiece.level === 3) {
                    canMoveNum.push(...[moveNum(26), moveNum(30), moveNum(33)]);
                }
            }
                break;
            case 12 : //砲
            if(thisPiece.level !== 0) {
                canMoveNum = [moveNum(2), moveNum(3), moveNum(4), moveNum(250)];
            
                if(thisPiece.level >= 2) {
                    console.log(canMoveNum);
                    canMoveNum.push(...[moveNum(10), moveNum(11), 
                                        moveNum(12), moveNum(330)]);
                }
                if(thisPiece.level === 3) {
                    canMoveNum.push(...[moveNum(26), moveNum(27), 
                                        moveNum(28), moveNum(43)]);
                }
            }
                break;
            case 13 : //筒
            if(thisPiece.level !== 0) {
                canMoveNum = [moveNum(7), moveNum(8), moveNum(90)];
            
                if(thisPiece.level >= 2) {
                    console.log(canMoveNum);
                    canMoveNum.push(...[moveNum(15), moveNum(16), moveNum(250)]);
                }
                if(thisPiece.level === 3) {
                    canMoveNum.push(...[moveNum(31), moveNum(32), moveNum(330)]);
                }
            }
                break;
            default:
                break;
        }
        console.log(canMoveNum);
        const checkedCanMove = isIncludeKing(canMoveNum);
        // const checkedRideable = checkRideable(checkedCanMove);
        const checkedLevel = checkLevel(checkedCanMove);
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
                    searchCanMove();
                }
            }else{
                //選択解除
                if(!canMove.includes(thisNum)){
                    setClickFlag(!clickFlag);
                    setSelect({num: -1, type: -1, level: 0});
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
                    // checkBou();
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
                    //王手
                    if(curPieces[thisNum].type === 0) {
                        if(select.level === 3) {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 2, under: curPieces[thisNum]});
                            curPieces.splice(select.num, 1, curPieces[select.num].under);
                        } else if(select.level === 2) {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                            curPieces.splice(select.num, 1, curPieces[select.num].under);
                        } else {
                            curPieces.splice(thisNum, 1, {type: select.type, whose: turn, level: 1});
                            curPieces.splice(select.num, 1, {type: -1, whose: 0, level: 0});
                        }
                        addKifu(curPieces);
                        setWinner(turn);
                        setCurKifu(kifu.length);
                        setPhase(4)
                    // } else if(select.type === 9) {
                    //     setModal(2);
                    //     setAttack({num: -1, offense: select.num, defense: thisNum});
                    // } else if(select.type === 0 || select.type === 9 || select.type > 10) {
                    //     setModal(3);
                    //     setAttack({num: -1, offense: select.num, defense: thisNum});
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
                setSelect({num: -1, type: -1, level: 0});
                setCanMove([]);
                setTurn(oppTurn);
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
                        addKifu(curPieces);
                        if(phase === 1) {
                            setTurn(oppTurn);
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
                        addKifu(curPieces);
                        setSelect({num: -1, type: -1, level: 0});
                        setCanMove([]);
                        if(phase === 1) {
                            setTurn(oppTurn);
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
                    addKifu(curPieces);
                    setSelect({num: -1, type: -1, level: 0});
                    setCanMove([]);
                    if(phase === 1) {
                        setTurn(oppTurn);
                    } 
                }
            }
            console.log(firstArata);
        }
        console.log({...curPieces[thisNum], thisNum: thisNum, params: thisPieceString});
    }
    return(
        <button className={squareString} onClick={() =>{clickPiece()}}>
            <div className={classString} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${thisPieceString}.png)`}}></div>
        </button>
    )
}

export default Piece;