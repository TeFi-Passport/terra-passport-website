import Box from "@mui/material/Box";
import React from "react";
import {CustomCard} from "../Card";
import styled from "styled-components";
import {TefiPassportSimpleLogo} from "../TefiPassportLogo";
import {grey} from "../../constants/colors";

export const Overlay = ({children, style}) => {
    return (
        <Box display='flex'
             flexDirection='column'
             alignItems='center'
             justifyContent='center'
             style={{
                 position: 'fixed',
                 height: '100vh',
                 width: '100vw',
                 background: 'rgba(17,12,24,0.8)',
                 zIndex: 200,
             }}>
            <CustomCard height='50vh' width='46vw' style={style}>
                {children}
            </CustomCard>
        </Box>
    );
}

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

/**
 * The overlay that has a skeleton layout for  the "Mint your passport overlay" or "Mint completed overlay"
 * @param {string} title
 * @param {string} subtitle
 * @param {JSX.Element} button1
 * @param {JSX.Element} button2
 * @returns {JSX.Element}
 * @constructor
 */
export const AdvancedOverlayLayout = ({title, subtitle, button1, button2}) => {
    return (
        <Overlay style={{
            padding: '20px 63px 20px 63px'
        }}>
            <TefiPassportSimpleLogo height={'55px'}/>
            <Box>
                <Title>{title}</Title>
                <Subtitle style={{color: grey}}>{subtitle}</Subtitle>
            </Box>
            <Box/>
            <Box width='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                {button1}
                {button2}
            </Box>
        </Overlay>
    );
}