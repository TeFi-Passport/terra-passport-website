import React from "react";
import {withTheme} from "@emotion/react";
import Box from "@mui/material/Box";
import {Heading1, Heading2, TextButton1} from "./texts";
import {tequila} from "../constants/colors";
import {GhostLargeButton} from "./buttons/CustomButtons";
import passportImage from "../res/images/passportImage.png";
import Grid from "@mui/material/Grid";
import Column from "./Layout/Column";
import RotatedPassport, {passportImageRatio} from "./RotatedPassport";
import {useSelector} from "react-redux";

const content = {
    title: "TEFI PASSPORT",
    subtitlePart1: "THE FIRST ",
    subtitlePart2: "NFT PASSPORT BASED ON ON-CHAIN REPUTATION ",
    subtitlePart3: "TO GRANT EXCLUSIVE ACCESS WITHIN TERRA DECENTRALIZED FINANCE",
}

const HeroSection = ({showConfirmMintOverlay}) => {

    const size = useSelector(state => state.screenSize);
    const isMobile = useSelector(state => state.isMobile);

    if (isMobile) {

        const imageWidth = 0.7 * size.width;

        return (
            <Column>
                <Heading1 style={{color: 'white', marginTop: '-30px'}}>{content.title}</Heading1>
                <div style={{marginBottom: '12px', marginTop: '-1.4rem'}}>
                    <Heading2>
                        <span style={{color: 'white'}}>{content.subtitlePart1}</span>
                        <span style={{color: tequila}}>{content.subtitlePart2}</span>
                        <span
                            style={{color: 'white'}}>{content.subtitlePart3}</span>
                    </Heading2>
                </div>
                <RotatedPassport width={imageWidth} img={passportImage} style={{
                    marginBottom: -(imageWidth / passportImageRatio - imageWidth) / 2.4,
                    marginLeft: '-3vw'
                }}/>
                <GhostLargeButton onClick={showConfirmMintOverlay}>
                    <TextButton1 style={{padding: '10px 15px'}}>
                        MINT YOUR PASSPORT
                    </TextButton1>
                </GhostLargeButton>
            </Column>
        );
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100%' width='100%'>
            <Grid container display='flex' width='100%' maxWidth='1450px' height='max-content' style={{
                padding: '0 5vw'
            }}>
                <Grid item xs={8}>
                    <Column justifyContent='center' height='100%'>
                        <Heading1 style={{color: 'white', marginTop: '-30px'}}>{content.title}</Heading1>
                        <div style={{marginBottom: '12px', marginTop: '-1.4rem'}}>
                            <Heading2>
                                <span style={{color: 'white'}}>{content.subtitlePart1}</span>
                                <span style={{color: tequila}}>{content.subtitlePart2}</span>
                                <span
                                    style={{color: 'white'}}>{content.subtitlePart3}</span>
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