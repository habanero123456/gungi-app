// import './App.css';
import React, {useState, createContext, useEffect} from 'react'
import './assets/styles/style.css'
import { GameScreen } from "./components/index.js";

export const PieceContext = createContext();

let initPieces = new Array(89).fill({type: -1, whose: 0, level: 0});
// initPieces[64] = {type: 11, whose: 1, level: 1};
// initPieces[84] = {type: 12, whose: 1, level: 1};
// initPieces[62] = {type: 4, whose: 1, level: 1};
// initPieces[82] = {type: 4, whose: 1, level: 1};
// initPieces[24] = {type: 11, whose: 2, level: 1};
// initPieces[4] = {type: 12, whose: 2, level: 1};
// initPieces[32] = {type: 4, whose: 2, level: 2, under: {type: 4, whose: 1, level: 1}};

// let emptyArr25 = new Array(25);
let initOwnPieces = new Array(25 - 3);

for (let i = 0; i < 14; i++) {
  initOwnPieces[i] = i;
}
for (let i = 3; i < 11; i++) {
  initOwnPieces[i + 14 - 3] = i;
}
initOwnPieces.push(4);
initOwnPieces.push(4);
initOwnPieces.push(10);

initOwnPieces.sort(function(a, b) {
  return a - b;
});

const App = () => {
  const [ pieces, setPieces ] = useState(initPieces);
  const [ turn, setTurn ] = useState(1);
  const [ select, setSelect ] = useState({num: -1, type: -1, level: 0});
  const [ clickFlag, setClickFlag ] = useState(false);
  const [ canMove, setCanMove ] = useState([]);
  const [ modal, setModal ] = useState(0);
  const [ attack, setAttack ] = useState({num: 0, offense: -1, defense: -1});
  const [ whitePieces, setWhitePieces ] = useState(initOwnPieces);
  const [ blackPieces, setBlackPieces ] = useState(initOwnPieces);
  const [ phase, setPhase ] = useState(0);
  const [ winner, setWinner ] = useState(0);
  const [ kifu, setKifu ] = useState([]);
  const [ yomifu, setYomifu ] = useState({num: -1, type: -1});
  const [ click, setClick ] = useState([{num: -1, type: -1, level: 0}]);

  useEffect(() => {
      // console.log(canMove);
  }, [canMove])
  
  return(
    <div>
      <PieceContext.Provider value={{pieces, setPieces, turn, setTurn, select, setSelect, clickFlag, setClickFlag, canMove, setCanMove, modal, setModal, attack, setAttack, whitePieces, setWhitePieces, blackPieces, setBlackPieces, phase, setPhase, winner, setWinner, kifu, setKifu,  yomifu, setYomifu, click, setClick}}>
        <GameScreen />
      </PieceContext.Provider>
    </div>
  )
}

export default App;
