import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { PieceContext } from '../App'
import { OwnPiece } from "./index.js"

const useStyles = makeStyles((theme) => ({
    squareContainer: {
        padding: 0,
        margin: '0 auto',
        width: 93,
    },
    squareContainerSub: {
        height: 150,
        backgroundColor: "#F8BE75",
        border: '1px solid #333',
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: 'column',
    }
  }));

const OwnPieceArea = (props) => {
    const classes = useStyles();
    const { whitePieces, setWhitePieces } = useContext(PieceContext);
    const { blackPieces, setBlackPieces } = useContext(PieceContext);

    const curWhitePieces = Array.from(whitePieces)
    const whiteTypes = curWhitePieces.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });

    const curBlackPieces = Array.from(blackPieces)
    const blackTypes = curBlackPieces.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });

    return(
        <div className={classes.squareContainer}>
                 {props.isWhite 
                    ? <div className={classes.squareContainerSub}>
                        {whiteTypes.map((index)=>{
                            return(
                                <OwnPiece isWhite={props.isWhite} index={index}/>
                            )
                        })}
                        {/* {for(let i = 0; i < 14; i++){

                        }} */}
                    </div>
                    : <div className={classes.squareContainerSub}>
                        {blackTypes.map((index)=>{
                            return(
                                <OwnPiece isWhite={props.isWhite} index={index}/>
                            )
                        })}
                    </div>
                 }
        </div>
    )
}

export default OwnPieceArea;