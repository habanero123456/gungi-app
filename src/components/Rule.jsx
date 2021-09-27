import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import useMedia from 'use-media';

const useStyles = makeStyles((theme) => ({
    container: {
        height: 428,
        overflowX: "scroll",
        overflowY: "scroll",
    },
    containerM: {
        height: 324,
        overflowX: "scroll",
        overflowY: "scroll",
    },
    type: {
        display: "flex",
        flexWrap: "nowrap",
	    // justifyContent: "unset",
	    justifyContent: "center",
    },
    images: {
        height: 170,
        minWidth: 170,
        backgroundSize: "contain",
    },
    contents: {
    },
  }));
const Rule = () => {
    const classes = useStyles();
    const isWide = useMedia({minWidth: '769px'});
    let containerString = "";
    if(isWide) {
        containerString = `${classes.container}`;
    } else {
        containerString = `${classes.containerM}`;
    }
    return(
        <div className={containerString}>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>駒の動き</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move00-1.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move01-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move01-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move02-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move02-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move03-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move03-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move04-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move04-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move05-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move05-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move06-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move06-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move07-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move07-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move08-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move08-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move09-1.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move10-1.png)`}}></div>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move10-2.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move11-1.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move12-1.png)`}}></div>
                        </div>
                        <div className={classes.type}>
                            <div className={classes.images} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/move13-1.png)`}}></div>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accoContainer}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>ルール</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.contents}>
                    <Typography>
                    1.互いに駒を動かし師を取った(詰んだ)方の勝利
                    <br />
                    <br />
                    2.ゲーム開始時に他のルールに触れない形であれば自分の陣地(手前3段)内で自由に駒を配置することができる
                    <br />
                    <br />
                    3.白駒から配置を始める。駒配置時は師を最初に配置し、残りを交互に配置していく
                    <br />
                    <br />
                    4.全ての駒を配置せずに開始することもできる。全ての駒を配置しない場合は配置終了の合図として「済み」と言わなければならない。
                    配置しなかった駒は手駒として手元に残る。
                    一方が「済み」を宣言した場合も、もう一方は最後まで配置することができる。
                    全ての駒を配置し終えたら、白駒が先行でゲームを開始するが、黒駒が「済み」を宣言したあとに白駒が配置を続けた場合、黒駒が先行になる。
                    <br />
                    <br />
                    5.駒を取られた場合、その駒は二度と盤上には戻ってこれない。手駒はいつでも盤上に置くことができるが、自分の陣地内にしか置けない
                    <br />
                    <br />
                    6.駒は3つまで重ねることができる。駒を重ねた場合下の駒は上の駒を無くさない限り動かすことはできない
                    <br />
                    <br />
                    7.駒を重ねることで得られる効果は以下の通りである。
                    　2,3段重ね・上に重ねた駒の行動範囲を広げることができる。また、同じ段以上の駒からしか攻撃を受けない(師、砲、筒は除く)
                    <br />
                    <br />
                    8.相手の駒を取らずにその駒に自分の駒を重ねる（ツケる）ことができる。ただし、相手自分の共に師、砲、筒の上に駒を重ねることはできず、また、手駒を置く時に相手の駒の上に直接置くこともできない
                    <br />
                    大将や槍など2マス以上移動できる駒は移動途中にある駒を飛び越えて移動することはできない
                    ただし砲と筒の前方移動や弓は飛び越えて移動できる
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>特殊駒</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    帥(スイ）
                    <br />
                    ツケることもツケられることもできないが二弾三段の敵コマを下段ごと取ることができる
                    <br />
                    <br />
                    砲（オオヅツ）筒（ツツ）
                    <br />
                    ツケることができないが二弾三段の敵コマを下段ごと取ることができる
                    <br />
                    <br />
                    砦(トリデ)
                    <br />
                    敵をとることができない
                    <br />
                    <br />
                    謀（サンボウ）
                    <br />
                    この駒がある段まで新できる範囲を広げられる（謀がなくても手前3段は新できる）
                    謀は手前1段にしか新できない。
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Rule