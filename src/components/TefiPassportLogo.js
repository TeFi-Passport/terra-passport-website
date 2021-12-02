import Box from "@mui/material/Box";
import React from "react";
import logo from '../res/images/logo.svg';
import {TextLogo} from "./texts";

export const TefiPassportLogo = () => {
    return (
        <Box display='flex' flexDirection='row' height='33px' alignItems='center'>
            <img src={logo} style={{marginRight: '18px', height: '33px'}} alt='logo'/>
            <TextLogo>TEFI PASSPORT</TextLogo>
        </Box>
    );
}

export const TefiPassportSimpleLogo = ({height}) => {
    return (<Box>
        <img src={logo} alt='logo' style={{height: height}}/>
    </Box>);
}