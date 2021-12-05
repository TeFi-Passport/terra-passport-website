import React, {useEffect, useState} from "react";
import {Header} from "../components/Header";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {retrievePassport} from "../services/terraPassportAPI";
import {useConnectedWallet} from "@terra-money/use-wallet";
import {Loader} from "../components/Loader";
import {messages} from "../constants/constants";
import {Body1, Heading2, Heading3, TextButton2} from "../components/texts";
import passportImage from "../res/images/passportImage.png";
import {ScoreCard} from "../components/score/ScoreCard";
import {PassportInfo} from "../components/score/PassportInfo";
import {ScoreDetailCard} from "../components/score/ScoreDetailCard";
import {cheokee, grey5} from "../constants/colors";

const PassportCards = ({passport}) => {
    const width = '316px';
    const height = '211px';

    const diff = parseInt(width.substring(0, height.length - 2)) - parseInt(height.substring(0, height.length - 2));

    return (
        <Box display='flex' flexDirection='row' width='100%' justifyContent='space-around'
             style={{marginTop: '50px', height: '211px'}}>
            <img src={passportImage} alt='passport' style={{
                height: width, // todo: fix 'px' and be more adaptive?
                width: height,
                transform: 'rotate(-90deg) translateY(' + diff / 2 + 'px) translateX(' + diff / 2 + 'px)',
                marginRight: diff + 'px'
            }}/>
            <ScoreCard score={passport.score} meanScore={10} height={height} evolution={-2.4}/>
            <PassportInfo height={height} address={passport.address} block={passport.block} chainId={passport.network}
                          style={{
                              paddingLeft: '49px',
                              paddingRight: '64px',
                          }}/>
        </Box>
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

    console.log(passport);

    detail.activity.forEach((i) => activityScore += passport.scoreDetail[i]);
    detail.governance.forEach((i) => govScore += passport.scoreDetail[i]);
    detail.degeneracy.forEach((i) => degenScore += passport.scoreDetail[i]);
    detail.cash_out_hodl.forEach((i) => cashScore += passport.scoreDetail[i]);
    detail.airdrops.forEach((i) => airdropScore += passport.scoreDetail[i]);

    return (
        <Box display='flex' flexDirection='row' justifyContent='space-around'
             style={{marginTop: '50px', marginLeft: '20px', marginRight: '20px'}}>
            <ScoreDetailCard score={activityScore} title="ACTIVITY" average={3.1} evolution={2.4}/>
            <ScoreDetailCard score={govScore} title="GOVERNANCE" average={0.9} evolution={-1.3}/>
            <ScoreDetailCard score={degenScore} title="DEGENERACY" average={3.1} evolution={1}/>
            <ScoreDetailCard score={cashScore} title="CASH OUT / HODL" average={2.3} evolution={2}/>
            <ScoreDetailCard score={airdropScore} title="AIRDROPS" average={2} evolution={-0.5}/>
        </Box>
    );
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
                <PassportCards passport={passport}/>
                <Box display='flex' flexDirection='column' alignItems='center' style={{marginTop: '40px'}}>
                    <Box display='flex' flexDirection='row' width='90%' justifyContent='space-between'
                         alignItems='center'>
                        <Box display='flex' flexDirection='column'>
                            <Heading3 style={{color: grey5}}>SUMMARY</Heading3>
                            <Body1 style={{color: grey5}}>ADDRESS SCORED ACROSS 15 METRICS IN 5 CATEGORIES</Body1>
                        </Box>
                        <TextButton2 style={{color: cheokee, marginTop: '8px'}}>ABOUT METRIC DETAILS</TextButton2>
                    </Box>
                </Box>
                <ScoreDetail passport={passport}/>
                <Box style={{marginBottom: '30px'}}/>
            </Box>
        )
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between' height='100vh'>
            <Header/>
            <MainComponent/>
            <Footer/>
        </Box>
    );

}