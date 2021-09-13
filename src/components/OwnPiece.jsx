import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PieceContext } from '../App'

const useStyles = makeStyles((theme) => ({
    container: {
        // display: 'flex',
        margin: 0,
        width: '50px',
        // flexWrap: 'wrap',
        // flexDirection: 'column',
    },
    square: {
        width: 30,
        height: 30,
        borderWidth: 0,
        // borderColor: 'black',
        // boxSizing: "border-box",
        // margin: -1,
        // flexDirection: 'column',
        backgroundColor: "#F8BE75",
    },
    piece: {
        backgroundSize: "contain",
        borderWidth: 0,
        // boxSizing: "border-box",
        width: 30,
        // margin: -1,
        height: 30,
    },
    selected: {
        backgroundColor: "#D0D0D0",
    },
  }));

const OwnPiece = (props) => {
    const classes = useStyles();
    const { whitePieces, setWhitePieces } = useContext(PieceContext);
    const { blackPieces, setBlackPieces } = useContext(PieceContext);
    const { pieces, setPieces } = useContext(PieceContext);
    const { turn, setTurn } = useContext(PieceContext);
    const { select, setSelect } = useContext(PieceContext);
    const { clickFlag, setClickFlag } = useContext(PieceContext);
    const { canMove, setCanMove } = useContext(PieceContext);
    const { modal, setModal } = useContext(PieceContext);
    const { attack, setAttack } = useContext(PieceContext);
    const { phase, setPhase } = useContext(PieceContext);
    const { click, setlick } = useContext(PieceContext);
   
    const thisType = props.index;
    
    // const thisPieceString = "4-1-0";

    let whoseNum;
    if(props.isWhite) {
        whoseNum = 1;
    } else {
        whoseNum = 2;
    }

    let classString = `${classes.piece}`;
    if (select.type === thisType && select.num === 89 + whoseNum) {
        classString  += ` ${classes.selected}`;
    } 

    let curOwnPieces;
    if(props.isWhite){
        curOwnPieces = Array.from(whitePieces);
    } else {
        curOwnPieces = Array.from(blackPieces);
    }

    let count = 0;
    for(let i = 0; i < curOwnPieces.length; ++i){
        if(curOwnPieces[i] == thisType)
            count++;
    }

    let thisUnderColor;
    if (count === 1) {
        thisUnderColor = 0;
    } else if (count === 2) {
        if (whoseNum === 1) {
            thisUnderColor = 1;
        } else {
            thisUnderColor = 2;
        }
    } else if (count === 3) {
        if (whoseNum === 1) {
            thisUnderColor = 3;
        } else {
            thisUnderColor = 6;
        }
    } else {
        thisUnderColor = 7;
    }

    const thisPieceString = `piece${props.index}-${whoseNum}-${thisUnderColor}`;

    const curPieces = Array.from(pieces);
    const someonesPiecesSub = curPieces.map((item, index) => {
        if(item.whose != 0) {
            return index;
        } else {
            return 0;
        }
    })
    const someonesPieces = someonesPiecesSub.filter((item) => {
        return item != 0;
    })

    const toggleWhose = (whose) => {
        if (whose === 1) {
            return 2;
        } else {
            return 1;
        }
    }
    const oppTurn = toggleWhose(turn);

    const checkAratable = (array) => {
        const alones = [0, 9, 11, 12, 13];
        const checkCanMove = array.filter((item) => {
            if(item.type !== 0 && item.whose !== oppTurn && item.level !== 3) {
                return true;
            }
            // return item.type !== 0 && item.whose === turn;
        }).map((piece) => {
            return piece.index;
        })
        return checkCanMove;
    }

    const searchCanMove = () => {
        let curCanMove = [];
        if(whoseNum === 1) {
            for (let i = 6; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    // curCanMove.push(10 * i + j);
                    curCanMove.push({...curPieces[10 * i + j], index: 10 * i + j});
                }
            }
        }
        if(whoseNum === 2) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 9; j++) {
                    curCanMove.push({...curPieces[10 * i + j], index: 10 * i + j});
                    // curCanMove.push(10 * i + j);
                }
            }
        }
        const noonePieces = curCanMove.filter((item) => {
            return !someonesPieces.includes(item);
        })
        // setCanMove(noonePieces);
        const checkedAratable = checkAratable(curCanMove);

        // console.log(curCanMove);
        console.log(curCanMove);
        // console.log(select);
        setCanMove(checkedAratable);
        // setCanMove(curCanMove);
    }
    

    const clickPiece = () => {
        console.log(thisType);
        // console.log(select);
        // console.log(whitePieces);
        // console.log(blackPieces);
        if(phase !== 0) {
            if (clickFlag === false) {
                if (whoseNum === turn){
                    setClickFlag(!clickFlag);
                    setSelect({num: whoseNum + 89, type: thisType, level: 1});
                    searchCanMove();
                }
            }else{
                //選択解除
                if(select.num === whoseNum + 89){
                    setClickFlag(!clickFlag);
                    setSelect({num: -1, type: -1, level: 0});
                    setCanMove([]);
                }
            }
        }
    }

    return(
        <button className={classes.square} onClick={() =>{clickPiece()}}>
            <div className={classString} style={{ backgroundImage: `url(/images/${thisPieceString}.png)`}}></div>
        </button>
    )
}

export default OwnPiece;