import React, {useEffect} from "react";
import {Header} from "../components/Header";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {setOverlayStage} from "../store/action";
import {mintingOverlayStages} from "../constants/constants";
import {useConnectedWallet} from "@terra-money/use-wallet";
import {retrievePassport} from "../services/terraPassportAPI";
import {useNavigate} from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Div100vh from 'react-div-100vh'

export const HomePage = () => {

    const overlayStage = useSelector(state => state.overlayStage)
    const passport = useSelector(state => state.passport);
    const dispatch = useDispatch();
    const connectedWallet = useConnectedWallet();
    const navigate = useNavigate();
    const isMobile = useSelector(state => state.isMobile);

    useEffect(() => {
        if (passport && overlayStage.name !== 'mintCompleted') {
            navigate('/passport');
        } else {
            try {
                if (connectedWallet.walletAddress) {
                    retrievePassport(dispatch, connectedWallet.walletAddress);
                }
            } catch (e) {
            }
        }
    }, [connectedWallet, passport]);

    const Overlay = overlayStage.component;

    const showConfirmMintOverlay = () => {
        dispatch(setOverlayStage(mintingOverlayStages.confirmMint));
    }

    return (
        <div className={isMobile? 'mobileBackground' : 'background'} style={{
            padding: '0px 5vw',
            minHeight: document.getElementsByClassName('home_page_container')[0]? document.getElementsByClassName('home_page_container')[0].clientHeight : '100%',
        }}>
            {overlayStage.name !== mintingOverlayStages.hidden.name && (<Overlay/>)}
            <Div100vh>
                <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='100%' className='home_page_container'>
                    <Header/>
                    <HeroSection showConfirmMintOverlay={showConfirmMintOverlay}/>
                    <Footer/>
                </Box>
            </Div100vh>
        </div>
    );

}