import React, {useEffect} from "react";
import {Header} from "../components/Header";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer";
import passportImage from "../res/images/passportImage.png";
import {Heading1, Heading2, TextButton1} from "../components/texts";
import {tequila} from "../constants/colors";
import {GhostLargeButton} from "../components/buttons/CustomButtons";
import {useDispatch, useSelector} from "react-redux";
import {setOverlayStage} from "../store/action";
import {mintingOverlayStages} from "../constants/constants";
import {useConnectedWallet} from "@terra-money/use-wallet";
import {retrievePassport} from "../services/terraPassportAPI";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {

    const overlayStage = useSelector(state => state.overlayStage)
    const passport = useSelector(state => state.passport);
    const dispatch = useDispatch();
    const connectedWallet = useConnectedWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if (passport && overlayStage.name !== 'mintCompleted') {
            navigate('/passport');
        } else {
            try {
                if (connectedWallet.walletAddress) {
                    retrievePassport(dispatch, connectedWallet.walletAddress);
                }
            } catch (e) {}
        }
    }, [connectedWallet, passport]);

    const Overlay = overlayStage.component;

    const showConfirmMintOverlay = () => {
        dispatch(setOverlayStage(mintingOverlayStages.confirmMint));
    }

    return (
        <Box display='flex' flexDirection='column' className='background'>
            {overlayStage.name !== mintingOverlayStages.hidden.name && (<Overlay/>)}
            <Box display='flex' flexDirection='column' justifyContent='space-between' height='100vh'>
                <Header/>
                <Box display='flex' flexDirection='row' flexGrow={9}>
                    <Box display='flex' flexDirection='column' flex={5} justifyContent='center'
                         style={{
                             marginLeft: '200px' // todo: fix 'px' and be more adaptive?
                         }}>
                        <Heading1 style={{color: 'white'}}>TEFI PASSPORT</Heading1>
                        <div style={{marginBottom: '12px'}}>
                            <Heading2>
                                <span style={{color: 'white'}}>THE FIRST </span>
                                <span style={{color: tequila}}>NFT PASSPORT BASED ON ON-CHAIN REPUTATION </span>
                                <span
                                    style={{color: 'white'}}>TO GRANT EXCLUSIVE ACCESS WITHIN TERRA DECENTRALIZED FINANCE</span>
                            </Heading2>
                        </div>
                        <GhostLargeButton onClick={showConfirmMintOverlay}><TextButton1>MINT YOUR PASSPORT</TextButton1></GhostLargeButton>
                    </Box>
                    <Box display='flex' flexDirection='column' flex={4} alignItems='center' justifyContent='center'>
                        <img src={passportImage} alt='passport' style={{
                            height: '457px', // todo: fix 'px' and be more adaptive?
                            width: '305px'
                        }}/>
                    </Box>
                </Box>
                <Footer/>
            </Box>
        </Box>
    );

}