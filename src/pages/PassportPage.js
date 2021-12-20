import React, {useEffect, useRef, useState} from "react";
import {Header} from "../components/Header";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {retrievePassport} from "../services/terraPassportAPI";
import {useConnectedWallet} from "@terra-money/use-wallet";
import {Loader} from "../components/Loader";
import {messages} from "../constants/constants";
import {Body1, Heading2, Heading3, TextButton2} from "../components/texts";
import {ScoreCard} from "../components/score/ScoreCard";
import {PassportInfo} from "../components/score/PassportInfo";
import {ScoreDetailCard} from "../components/score/ScoreDetailCard";
import {cheokee, grey5} from "../constants/colors";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../constants/dimensions";

/**
 * Filter the score detail to return only the score present in criteria to keep
 * @param {{}} scoreDetail - the detail of the score
 * @param {[]} criteriaToKeep - the list of criteria to keep
 */
const getScoreForCriteria = (criteriaToKeep, scoreDetail) => {

    const criteria = [];

    Object.keys(scoreDetail).forEach((key) => {

        const obj = {};
        obj[key] = scoreDetail[key]

        if (criteriaToKeep.includes(key)) {
            criteria.push(obj);
        }
    });

    console.log(criteria);
    return criteria;
};

const PassportCards = ({passport}) => {
    const middleContainerRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setheight] = useState(0);

    const imageRatio = 211/316;

    const handleResize = () => {
        if(middleContainerRef.current){

            let height = middleContainerRef.current.offsetHeight;
            let width  = middleContainerRef.current.offsetWidth;

            setheight(width*0.9*imageRatio);
            setWidth(width*0.9);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    useEffect( () => {
        handleResize();
    }, [middleContainerRef]);

    const diff = width - height;

    return (
        <Grid container columnSpacing={gridSpacing} style={{marginTop: '50px', height: height}}>
            <Grid item xs={1}/>
            <Grid item xs={3} ref={middleContainerRef}>
                <img src={passport.imageLink} alt='passport' style={{
                    width: height,
                    imageRatio: 1,
                    transform: 'rotate(-90deg) translateY(' + (diff / 1.8) + 'px) translateX(' + (diff / 1.8) + 'px)',
                }}/>
            </Grid>
            <Grid item xs={3}>
                <ScoreCard score={passport.score} meanScore={10} evolution={-2.4} height={height}/>
            </Grid>
            <Grid item xs={4}>
                <PassportInfo address={passport.address} block={passport.block} chainId={passport.network}
                              height={height}
                              style={{
                                  paddingLeft: '29px',
                                  paddingRight: '34px',
                              }}/>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    );
}

const ScoreDetail = ({passport}) => {

    const detail = {
        'activity': [
            'gettingStarted',
            'insomniac',
            'upAndAtThem'
        ],
        'governance': [
            'govDegen',
            'terraActivist',
            'rockTheVote'
        ],
        'degeneracy': [
            'babyDegen',
            'multiTokenate',
            'adultSwim'
        ],
        'cash_out_hodl': [
            'bagBuilder',
            'inDeep',
            'dumpProof'
        ],
        'airdrops': [
            'wenMoon',
            'airdropAddict',
            'repeatCustomer'
        ],
    };

    let activityScore = 0;
    let govScore = 0;
    let degenScore = 0;
    let cashScore = 0;
    let airdropScore = 0;

    detail.activity.forEach((i) => activityScore += passport.scoreDetail[i]);
    detail.governance.forEach((i) => govScore += passport.scoreDetail[i]);
    detail.degeneracy.forEach((i) => degenScore += passport.scoreDetail[i]);
    detail.cash_out_hodl.forEach((i) => cashScore += passport.scoreDetail[i]);
    detail.airdrops.forEach((i) => airdropScore += passport.scoreDetail[i]);

    return (
        <Grid container columnSpacing={gridSpacing}>
            <Grid item xs={1}/>
            <Grid item xs={2}>
                <ScoreDetailCard score={activityScore} title="ACTIVITY" average={3.1} evolution={2.4}
                                 criterias={getScoreForCriteria(detail.activity, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={2}>
                <ScoreDetailCard score={govScore} title="GOVERNANCE" average={0.9} evolution={-1.3}
                                 criterias={getScoreForCriteria(detail.governance, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={2}>
                <ScoreDetailCard score={degenScore} title="DEGENERACY" average={3.1} evolution={1}
                                 criterias={getScoreForCriteria(detail.degeneracy, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={2}>
                <ScoreDetailCard score={cashScore} title="CASH OUT / HODL" average={2.3} evolution={2}
                                 criterias={getScoreForCriteria(detail.cash_out_hodl, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={2}>
                <ScoreDetailCard score={airdropScore} title="AIRDROPS" average={2} evolution={-0.5}
                                 criterias={getScoreForCriteria(detail.airdrops, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={1}/>
        </Grid>);
}

const PleaseConnectWalletPage = () => {
    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Heading2 style={{color: 'white'}}>{messages.pleaseConnectWallet}</Heading2>
        </Box>
    );
}

export const PassportPage = () => {

    const [loading, setLoading] = useState(true);
    const [waitingForConnection, setWaitingForConnection] = useState(true);
    const passport = useSelector(state => state.passport);
    const connectedWallet = useConnectedWallet();
    const dispatch = useDispatch();

    useEffect(() => {
        if (passport) {
            setLoading(false)
            setWaitingForConnection(false)
        } else {
            try {
                if (connectedWallet.walletAddress) {
                    setWaitingForConnection(false)
                    retrievePassport(dispatch, connectedWallet.walletAddress);
                } else
                    setWaitingForConnection(true);
            } catch (e) {
                setWaitingForConnection(true);
            }
        }
    }, [passport, connectedWallet, dispatch]);

    const MainComponent = () => {
        if (waitingForConnection)
            return <PleaseConnectWalletPage/>;
        if (loading)
            return <Loader/>;
        return (
            <Box display='flex' flexDirection='column' width='100%'>
                <Box display='flex' flexDirection='column' width='100%' alignItems='center'>
                    <PassportCards passport={passport}/>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center' style={{marginTop: '40px'}} width='100%'>
                    <Grid container columnSpacing={gridSpacing}>
                        <Grid item xs={1}/>
                        <Grid item xs={10}>
                            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-between'
                                 alignItems='center'>
                                <Box display='flex' flexDirection='column'>
                                    <Heading3 style={{color: grey5}}>SUMMARY</Heading3>
                                    <Body1 style={{color: grey5}}>ADDRESS SCORED ACROSS 15 METRICS IN 5
                                        CATEGORIES</Body1>
                                </Box>
                                <TextButton2 style={{color: cheokee, marginTop: '8px'}}>ABOUT METRIC
                                    DETAILS</TextButton2>
                            </Box>
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                    <Box style={{marginTop: '36px'}}/>
                    <ScoreDetail passport={passport}/>
                </Box>
                <Box style={{marginBottom: '30px'}}/>
            </Box>
        );
    };

    const style = {};

    if (waitingForConnection || loading)
        style.height = '100vh';

    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between' className='biggerBackground' style={{
            minHeight: '100vh',
            padding: '0px 80px',
            ...style
        }}>
            <Header/>
            <MainComponent/>
            <Footer/>
        </Box>
    );

}