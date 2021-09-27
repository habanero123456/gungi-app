import React, { useContext } from 'react';
import { PieceContext } from '../App'
import { makeStyles } from '@mui/styles';
import Button from '@material-ui/core/Button';
import { Rule } from "./index.js"
import useMedia from 'use-media';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 120,
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 2, 2),
    marginTop: 250,
  },
  paperM: {
    position: 'absolute',
    width: 120,
    margin: "-80px 0 0 20px",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: 120,
    height: 120,
    backgroundColor: "#ffffff",
  },
  button1: {
    margin: 5,
  },
  button2: {
    height: 30,
    width: 30,
    margin: 5,
    padding: 0,
  },
  closeContainer: {
      display: "flex",
      justifyContent: "flex-end",
  },
  ruleBookContainer: {
    width: 458,
    height: 458,
    backgroundColor: "#cccccc",
    position: "absolute",
  },
  ruleBookContainerM: {
    margin: -2,
    width: 354,
    height: 354,
    backgroundColor: "#cccccc",
    position: "absolute",
  },
}));

const Attack = () => {
    const classes = useStyles();
    const { modal, setModal } = useContext(PieceContext);
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
                    </Button>
                </div>
            </div >
        )
    } else {
        return null;
    }
}

const RuleBook = () => {
    const classes = useStyles();
    const isWide = useMedia({minWidth: '769px'});
    let ruleBookContainerString = "";
    if(isWide) {
        ruleBookContainerString = `${classes.ruleBookContainer}`
    } else {
        ruleBookContainerString = `${classes.ruleBookContainerM}`
    }
    const { ruleBook, setRuleBook } = useContext(PieceContext);
    const clickRule = () => {
        setRuleBook(!ruleBook)
    }
    if(ruleBook) {
        return (
            <div className={ruleBookContainerString}>
                <div className={classes.closeContainer}>
                    <Button 
                        variant="contained" 
                        className={classes.button2}
                        onClick={() => clickRule()}
                    >
                        ×
                    </Button>
                </div>
                <Rule />
            </div>
        )
    } else {
        return null
    }
}
export { Attack, RuleBook}