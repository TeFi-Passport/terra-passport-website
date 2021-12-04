import React, {useEffect, useState} from "react";
import {Header} from "../components/Header";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {retrievePassport} from "../services/terraPassportAPI";
import {useConnectedWallet} from "@terra-money/use-wallet";
import {Loader} from "../components/Loader";
import {messages} from "../constants/constants";
import {Heading2} from "../components/texts";
import passportImage from "../res/images/passportImage.png";
import {ScoreCard} from "../components/score/ScoreCard";
import {PassportInfo} from "../components/score/PassportInfo";


const PassportCards = ({passport}) => {
    const width = '316px';
    const height = '211px';

    const diff = parseInt(width.substring(0, height.length - 2)) - parseInt(height.substring(0, height.length - 2));

    return (
        <Box display='flex' flexDirection='row' width='100%' justifyContent='space-around' style={{marginTop: '80px'}}>
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
                    console.log('here');
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
        return <PassportCards passport={passport}/>
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between' height='100vh'>
            <Header/>
            <MainComponent/>
            <Footer/>
        </Box>
    );

}