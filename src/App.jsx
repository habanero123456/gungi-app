import React, {useState, createContext, useEffect} from 'react'
import './assets/styles/style.css'
import { GameScreen } from "./components/index.js";
import { createTheme } from '@mui/material/styles'

export const PieceContext = createContext();
export const ThemeContext = createContext();

const App = () => {
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

  const [ pieces, setPieces ] = useState(initPieces);
  const [ turn, setTurn ] = useState(1);
  const [ select, setSelect ] = useState({num: -1, type: -1, level: 0});
  const [ clickFlag, setClickFlag ] = useState(false);
  const [ canMove, setCanMove ] = useState([]);
  const [ modal, setModal ] = useState(0);
  const [ attack, setAttack ] = useState({num: 0, offense: -1, defense: -1});
  const [ whitePieces, setWhitePieces ] = useState(initWhitePieces);
  const [ blackPieces, setBlackPieces ] = useState(initBlackPieces);
  const [ phase, setPhase ] = useState(0);
  const [ winner, setWinner ] = useState(0);
  const [ kifu, setKifu ] = useState([]);
  const [ yomifu, setYomifu ] = useState("");
  const [ click, setClick ] = useState([{num: -1, type: -1, level: 0}]);
  const [ firstArata, setFirstArata ] = useState(false);
  const [ bouCheck, setBouCheck ] = useState([-1, -1]);
  const [ curKifu, setCurKifu ] = useState(-1);
  const [ ruleBook, setRuleBook ] = useState(false);
  
  const theme = createTheme({
    palette: {
        primary: {
            main: '#283593',
        },
        secondary: {
            main: '#e53935',
        },
    }
  });

  return(
    <div>
      <PieceContext.Provider value={{pieces, setPieces, turn, setTurn, select, setSelect, clickFlag, setClickFlag, canMove, setCanMove, modal, setModal, attack, setAttack, whitePieces, setWhitePieces, blackPieces, setBlackPieces, phase, setPhase, winner, setWinner, kifu, setKifu,  yomifu, setYomifu, click, setClick, firstArata, setFirstArata, bouCheck, setBouCheck, curKifu, setCurKifu, ruleBook, setRuleBook}}>
        <ThemeContext.Provider theme={theme}>
          <GameScreen />
        </ThemeContext.Provider>
      </PieceContext.Provider>
    </div>
  )
}

export default App;
