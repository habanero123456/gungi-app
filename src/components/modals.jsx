import React, { useContext } from 'react';
import { PieceContext } from '../App'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import useMedia from 'use-media';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 120,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    marginTop: 250,
  },
  paperM: {
    position: 'absolute',
    width: 120,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
    margin: "-98px 0 0 5px",
    // display: "flex",
    // flexDirection: "column",
    // marginTop: 250,
    // justifyContent: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: 120,
    // margin: 5,
  },
  button1: {
    margin: 5,
  },
}));

const Attack = () => {
    const classes = useStyles();
    const { modal, setModal } = useContext(PieceContext);
    const { turn, setTurn } = useContext(PieceContext);
    const { attack, setAttack } = useContext(PieceContext);
    const isWide = useMedia({minWidth: '769px'});
    let paperString = "";
    if(isWide) {
        paperString = `${classes.paper}`
    } else {
        paperString = `${classes.paperM}`
    }
    const clickButton = (number) => {
        setModal(0);
        const newAttack = {num: number, offense: attack.offense, defense: attack.defense}
        setAttack(newAttack);
    }

    if(modal === 1) {
        return (
            <div id="modal" className={paperString}>
                <div id="content" className={classes.content}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button1}
                        onClick={() => clickButton(2)}
                    >
                        取る
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button1}
                        onClick={() => clickButton(3)}
                    >
                        ツケる
                    </Button>
                    <Button 
                        variant="contained" 
                        className={classes.button1}
                        onClick={() => clickButton(1)}
                    >
                        キャンセル
                        {/* <ClearRoundedIcon /> */}
                    </Button>
                </div>
            </div >
        )
    } else if (modal === 2) {
        return (
            <div id="modal" className={paperString}>
                <div id="content" className={classes.content}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button1}
                        onClick={() => clickButton(3)}
                    >
                        ツケる
                    </Button>
                        <Button 
                        variant="contained" 
                        className={classes.button1}
                        onClick={() => clickButton(1)}
                    >
                        キャンセル
                        {/* <ClearRoundedIcon /> */}
                    </Button>
                </div>
            </div >
        )
    } else if (modal === 3) {
        return (
            <div id="modal" className={paperString}>
                <div id="content" className={classes.content}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button1}
                        onClick={() => clickButton(2)}
                    >
                        取る
                    </Button>
                        <Button 
                        variant="contained" 
                        className={classes.button1}
                        onClick={() => clickButton(1)}
                    >
                        キャンセル
                        {/* <ClearRoundedIcon /> */}
                    </Button>
                </div>
            </div >
        )
    } else {
        return null;
    }
}

export { Attack }