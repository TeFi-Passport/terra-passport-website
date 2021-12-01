import React from "react";
import Box from "@mui/material/Box";
import {TefiPassportLogo} from "./logo";
import gitBookLogo from "../res/images/GitBook.svg";
import githubLogo from "../res/images/GitHub.svg";
import mediumLogo from "../res/images/Medium.svg";
import telegramLogo from "../res/images/Telegram.svg";
import twitterLogo from "../res/images/Twitter.svg";
import {lightOrange30} from "../constants/colors";

export const Footer = () => {

    return (

        <Box display='flex' flexDirection='column' style={{padding: '0px 80px 38px 80px'}}>
            <Box height='1px' width={'100%'} style={{background: lightOrange30, marginBottom: '37px'}}/>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <TefiPassportLogo/>
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <img src={telegramLogo} alt='telegram' height='19px' style={{marginRight: '44px'}}/>
                    <img src={twitterLogo} alt='twitter' height='19px' style={{marginRight: '44px'}}/>
                    <img src={mediumLogo} alt='medium' height='14px' style={{marginRight: '44px'}}/>
                    <img src={githubLogo} alt='github' height='20px' style={{marginRight: '44px'}}/>
                    <img src={gitBookLogo} alt='gitbook' height='21px'/>
                </Box>
            </Box>
        </Box>
    );

}