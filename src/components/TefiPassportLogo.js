import Box from "@mui/material/Box";
import React from "react";
import logo from '../res/images/logo.svg';
import {TextLogo} from "./texts";

export const TefiPassportLogo = ({style, height = '28px'}) => {
    return (
        <Box display='flex' flexDirection='row' height={height} alignItems='center' style={{...style}}>
            <img src={logo} style={{marginRight: '18px', height: height}} alt='logo'/>
            <TextLogo>TEFI PASSPORT</TextLogo>
        </Box>
    );
}

export const TefiPassportSimpleLogo = ({height}) => {
    return (<Box>
        <img src={logo} alt='logo' style={{height: height}}/>
    </Box>);
}