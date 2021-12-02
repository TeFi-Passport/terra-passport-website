import React, {useEffect, useState} from "react";
import {Header} from "../components/Header";
import {MintButton} from "../components/buttons/MintButton";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer";
import passportImage from "../res/images/passportImage.png";
import {Heading1, Heading2, TextButton1} from "../components/texts";
import {orange1} from "../constants/colors";
import {generateScore} from "../utils/scoreGeneration";
import {MintYourPassportOverlay} from "../components/overlays/MintYourPassportOverlay";
import {GhostLargeButton} from "../components/buttons/CustomButtons";

export const HomePage = () => {

    const [popupShown, showPopup] = useState(false);

    useEffect(() => {
        window.score = generateScore;
    });

    const mint = () => {

    }

    return (
        <Box display='flex' flexDirection='column'>
            {popupShown && (<MintYourPassportOverlay onDismissClick={() => showPopup(false)} onMintClick={mint}/>)}
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
                                <span style={{color: orange1}}>NFT PASSPORT BASED ON ON-CHAIN REPUTATION </span>
                                <span
                                    style={{color: 'white'}}>TO GRANT EXCLUSIVE ACCESS WITHIN TERRA DECENTRALIZED FINANCE</span>
                            </Heading2>
                        </div>
                        <GhostLargeButton onClick={() => showPopup(true)}><TextButton1>MINT YOUR PASSPORT</TextButton1></GhostLargeButton>
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