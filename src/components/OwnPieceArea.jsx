import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PieceContext } from '../App'
import { OwnPiece } from "./index.js"

const useStyles = makeStyles((theme) => ({
    squareContainer: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        padding: 0,
        margin: '0 auto',
        width: 62,
        // height: '100px',
        // flexWrap: "wrap",
        // borderWidth: 10,
        // borderColor: 'black',
    },
    squareContainerSub: {
        height: 210,
        backgroundColor: "#F8BE75",
        // marginTop: 20,
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
    const renderPiece = (piece) => {

    }
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