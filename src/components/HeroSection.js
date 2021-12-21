import React from "react";
import {withTheme} from "@emotion/react";
import useWindowSize from "../hooks/useWindowSize";
import {isMobile} from "../utils/mobileUtils";
import Box from "@mui/material/Box";
import {Heading1, Heading2, TextButton1} from "./texts";
import {tequila} from "../constants/colors";
import {GhostLargeButton} from "./buttons/CustomButtons";
import passportImage from "../res/images/passportImage.png";
import Grid from "@mui/material/Grid";
import Column from "./Layout/Column";

const HeroSection = ({showConfirmMintOverlay}) => {

    const size = useWindowSize();
    const _isMobile = isMobile(size.width);

    if (_isMobile) {
        return <div/>;
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%'>
            <Grid container display='flex' width='100%' maxWidth='1450px' height='max-content' style={{
                padding: '0 5vw'
            }}>
                <Grid item xs={8}>
                    <Column justifyContent='center' height='100%'>
                        <Heading1 style={{color: 'white', marginTop: '-30px'}}>TEFI PASSPORT</Heading1>
                        <div style={{marginBottom: '12px', marginTop: '-1.4rem'}}>
                            <Heading2>
                                <span style={{color: 'white'}}>THE FIRST </span>
                                <span style={{color: tequila}}>NFT PASSPORT BASED ON ON-CHAIN REPUTATION </span>
                                <span
                                    style={{color: 'white'}}>TO GRANT EXCLUSIVE ACCESS WITHIN TERRA DECENTRALIZED FINANCE</span>
                            </Heading2>
                        </div>
                        <GhostLargeButton onClick={showConfirmMintOverlay}><TextButton1>MINT YOUR
                            PASSPORT</TextButton1></GhostLargeButton>
                    </Column>
                </Grid>
                <Grid item display='flex' flexDirection='column' xs={4} alignItems='flex-end' justifyContent='center'>
                    <img src={passportImage} alt='passport' style={{
                        minHeight: '15vw',
                        maxHeight: 'max(50vh, 10vw)',
                        maxWidth: '35vw'
                    }}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default withTheme(HeroSection);