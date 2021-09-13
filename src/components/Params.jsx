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
    const { click, setlick } = useContext(PieceContext);

    const templateSet = () => {
        let templateSetSub = new Array(89).fill({type: -1, whose: 0, level: 0});

        const culcuTemplateSet = (num, type) => {
            const x = 8 - (num % 10);
            const y = 8 - ((num - (8 - x)) / 10);
            const oppNum = y * 10 + x;
            templateSetSub.splice(num, 1, {type: type, whose: 1, level: 1});
            templateSetSub.splice(oppNum, 1, {type: type, whose: 2, level: 1});
        }
        culcuTemplateSet(84, 0);
        culcuTemplateSet(71, 1);
        culcuTemplateSet(77, 2);
        culcuTemplateSet(83, 3);
        culcuTemplateSet(85, 3);
        culcuTemplateSet(63, 4);
        culcuTemplateSet(65, 4);
        culcuTemplateSet(62, 5);
        culcuTemplateSet(66, 5);
        culcuTemplateSet(60, 7);
        culcuTemplateSet(68, 7);
        culcuTemplateSet(82, 8);
        culcuTemplateSet(86, 8);
        culcuTemplateSet(61, 9);
        culcuTemplateSet(67, 9);
        culcuTemplateSet(80, 10);
        culcuTemplateSet(88, 10);
        culcuTemplateSet(64, 11);
        culcuTemplateSet(81, 12);
        culcuTemplateSet(87, 13);

        return templateSetSub;
    }
    
    const start = () => {
        setPhase(1);
        setSelect({num: 90, type: 0, level: 1});
        let curCanMove = [];
        for (let i = 6; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                curCanMove.push(10 * i + j);
            }
        }
        setClickFlag(!clickFlag);
        setCanMove(curCanMove);
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
    }

    const quickStart = () => {
        setPhase(3);
        setPieces(templateSet());
        setWhitePieces([4, 4, 6, 6, 10]);
        setBlackPieces([4, 4, 6, 6, 10]);
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
        return(
            <div className={classes.paramsContainer}>
                <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button1}
                            onClick={() => endPut()}
                >
                    済み
                </Button>
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
        // const yomihu = `piece${select.type}-${select.whose}-${select.level}`;
        // const yomihu = `${select}`;
        return (
            <div>
                <div>
                    {turnString}番
                </div>
                <div>
                    {numString}手目
                </div>
                {/* <div>
                    {yomihu}
                </div> */}
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