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
import {MobileScoreCard, ScoreCard} from "../components/score/ScoreCard";
import {MobilePassportInfo, PassportInfo} from "../components/score/PassportInfo";
import {ScoreDetailCard} from "../components/score/ScoreDetailCard";
import {cheokee, grey5, prussianBlue, tequila} from "../constants/colors";
import Grid from "@mui/material/Grid";
import {gridSpacing} from "../constants/dimensions";
import RotatedPassport, {passportImageRatio} from "../components/RotatedPassport";
import {useRefSize} from "../hooks/useRefSize";
import Div100vh from "react-div-100vh";
import Column from "../components/Layout/Column";

const content = {
    summary : 'SUMMARY',
    bodyScoreExplanation : 'ADDRESS SCORED ACROSS 15 METRICS IN CATEGORIES',
    aboutMetricDetail : 'ABOUT METRIC DETAILS',
}

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

    return criteria;
};

const PassportCards = ({passport}) => {

    const middleContainerRef = useRef(null);
    const refSize = useRefSize(middleContainerRef);
    const height = refSize.width * 0.9 * passportImageRatio;
    const size = useSelector(state => state.screenSize);
    const isMobile = useSelector(state => state.isMobile);

    if (isMobile) {

        const mobilePassportImageWidth = 0.7*size.width;

        return (
            <Column>
                <Column width='100%'>
                    <RotatedPassport width={mobilePassportImageWidth} img={passport.imageLink} style={{
                        marginLeft : mobilePassportImageWidth/12
                    }}/>
                </Column>
                <MobileScoreCard score={passport.score} meanScore={10} evolution={-2.4} style={{
                    marginTop: -(mobilePassportImageWidth / passportImageRatio - mobilePassportImageWidth) / 2.4,
                    marginBottom: '5vh'
                }}/>
                <MobilePassportInfo address={passport.address} block={passport.block} chainId={passport.network}/>
            </Column>
        );
    }

    return (
        <Grid container columnSpacing={gridSpacing} style={{marginTop: '50px', height: height}}>
            <Grid item xs={1}/>
            <Grid item xs={3} ref={middleContainerRef}>
                <RotatedPassport width={refSize.width * 0.9} img={passport.imageLink}/>
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

    const isMobile = useSelector(state => state.isMobile);

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

    const gridMobileStyle = {
        maxWidth : '70vw'
    };

    const cardMobileStyle = {
        marginBottom: '5vh',
        ...gridMobileStyle
    };

    return (
        <Grid container columnSpacing={!isMobile? gridSpacing : 0} style={isMobile? gridMobileStyle : {}}>
            {!isMobile && <Grid item xs={1}/>}
            <Grid item xs={isMobile? 12 : 2} style={isMobile? cardMobileStyle : {}}>
                <ScoreDetailCard score={activityScore} title="ACTIVITY" average={3.1} evolution={2.4}
                                 criterias={getScoreForCriteria(detail.activity, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={isMobile? 12 : 2} style={isMobile? cardMobileStyle : {}}>
                <ScoreDetailCard score={govScore} title="GOVERNANCE" average={0.9} evolution={-1.3}
                                 criterias={getScoreForCriteria(detail.governance, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={isMobile? 12 : 2} style={isMobile? cardMobileStyle : {}}>
                <ScoreDetailCard score={degenScore} title="DEGENERACY" average={3.1} evolution={1}
                                 criterias={getScoreForCriteria(detail.degeneracy, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={isMobile? 12 : 2} style={isMobile? cardMobileStyle : {}}>
                <ScoreDetailCard score={cashScore} title="CASH OUT / HODL" average={2.3} evolution={2}
                                 criterias={getScoreForCriteria(detail.cash_out_hodl, passport.scoreDetail)}/>
            </Grid>
            <Grid item xs={isMobile? 12 : 2} style={isMobile? cardMobileStyle : {}}>
                <ScoreDetailCard score={airdropScore} title="AIRDROPS" average={2} evolution={-0.5}
                                 criterias={getScoreForCriteria(detail.airdrops, passport.scoreDetail)}/>
            </Grid>
            {!isMobile && <Grid item xs={1}/>}
        </Grid>);
}

const PleaseConnectWalletPage = () => {
    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Heading2 style={{color: 'white'}}>{messages.pleaseConnectWallet}</Heading2>
        </Box>
    );
}

const PassportDetailComponent = ({passport}) => {

    const isMobile = useSelector(state => state.isMobile);

    if (isMobile) {
        return (
            <Box display='flex' flexDirection='column' width='100%'>
                <Box display='flex' flexDirection='column' width='100%' alignItems='center'>
                    <PassportCards passport={passport}/>
                    <Heading3 style={{color: grey5, marginTop: '8vh'}}>{content.summary}</Heading3>
                    <Body1 style={{color: grey5, textAlign: 'center', padding: '0 30px', marginBottom: '5vh'}}>{content.bodyScoreExplanation}</Body1>
                    <ScoreDetail passport={passport}/>
                    <Box style={{
                        marginTop: '5vh',
                        padding: '10px 8vw',
                        borderRadius: '6px',
                        background: tequila
                    }}>
                        <TextButton2 style={{color: prussianBlue}}>
                            {content.aboutMetricDetail}
                        </TextButton2>
                    </Box>
                </Box>
            </Box>
        );
    }

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
                                <Heading3 style={{color: grey5}}>{content.summary}</Heading3>
                                <Body1 style={{color: grey5}}>{content.bodyScoreExplanation}</Body1>
                            </Box>
                            <TextButton2 style={{color: cheokee, marginTop: '8px'}}>{content.aboutMetricDetail}</TextButton2>
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
}

export const PassportPage = () => {

    const [loading, setLoading] = useState(true);
    const [waitingForConnection, setWaitingForConnection] = useState(true);
    const passport = useSelector(state => state.passport);
    const connectedWallet = useConnectedWallet();
    const dispatch = useDispatch();
    useSelector(state => state.screenSize); // just to re-trigger the background size
    const isMobile = useSelector(state => state.isMobile);
    const [triggerBuild, setTriggerBuild] = useState(0);

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
            <PassportDetailComponent passport={passport}/>
        );
    };

    const style = {};

    if (!document.getElementsByClassName('passport_page_container')[0]?.scrollHeight) {
        setTimeout(() => setTriggerBuild(triggerBuild + 1), 150);
    }

    if (waitingForConnection || loading)
        style.height = '100vh';

    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between'
             className={isMobile ? 'mobileBackground' : 'biggerBackground'} style={{
            padding: '0px 5vw',
            minHeight: document.getElementsByClassName('passport_page_container')[0] ? document.getElementsByClassName('passport_page_container')[0].scrollHeight : '100%',
            ...style
        }}>
            <Div100vh>
                <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='100%'
                     className='passport_page_container'>
                    <Header/>
                    <MainComponent/>
                    <Footer/>
                </Box>
            </Div100vh>
        </Box>
    );

}