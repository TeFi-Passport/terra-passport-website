import {TefiPassportSimpleLogo} from "../TefiPassportLogo";
import {Overlay} from "./Overlay";
import React from "react";
import styled from "styled-components";
import {Heading3} from "../texts";
import {grey, tequila} from "../../constants/colors";
import Box from "@mui/material/Box";
import {MintButton} from "../buttons/MintButton";

const Title = styled.h1`
font-family: RoadRadio;
font-size: 30px;
font-style: normal;
font-weight: 700;
line-height: 30px;
letter-spacing: 0px;
text-align: center;
color: white;
`;
const Subtitle = styled.h1`
font-family: RoadRadio;
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: 15px;
letter-spacing: -0.23999999463558197px;
text-align: center;
`;

export const MintYourPassportOverlay = ({onMintClick, onDismissClick}) => {

    return (
        <Overlay style={{
            padding: '20px 63px 20px 63px'
        }}>
            <TefiPassportSimpleLogo height={'55px'}/>
            <Box>
                <Title>Mint your passport</Title>
                <Subtitle style={{color: grey}}>Get your nft passport now to access decentralized finance on Terra</Subtitle>
            </Box>
            <Box/>
            <Box width='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <MintButton/>
                <Heading3 onClick={onDismissClick} style={{color: tequila, cursor: 'pointer'}}>
                    NOT NOW
                </Heading3>
            </Box>
        </Overlay>
    );
}