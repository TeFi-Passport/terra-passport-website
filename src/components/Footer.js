import React from "react";
import Box from "@mui/material/Box";
import {TefiPassportLogo} from "./TefiPassportLogo";
import gitBookLogo from "../res/images/GitBook.svg";
import githubLogo from "../res/images/GitHub.svg";
import mediumLogo from "../res/images/Medium.svg";
import telegramLogo from "../res/images/Telegram.svg";
import twitterLogo from "../res/images/Twitter.svg";
import {lightOrange30} from "../constants/colors";
import Column from "./Layout/Column";
import Row from "./Layout/Row";
import {useSelector} from "react-redux";

const Icon = ({src, alt, height, style, link}) => {
    return (
        <img src={src}
             alt={alt}
             height={height}
             style={style}
             onClick={() => window.open(link)}/>
    );
}

const IconRow = ({marginBetweenItems}) => {
    return (
        <Row justifyContent='center' alignItems='center'>
            <Icon src={telegramLogo} alt='telegram' height='19px'
                  style={{marginRight: marginBetweenItems, cursor: 'pointer'}} link={'https://t.me/tefipassport'}/>
            <Icon src={twitterLogo} alt='twitter' height='19px'
                  style={{marginRight: marginBetweenItems, cursor: 'pointer'}} link={'https://twitter.com/Tefi_Passport'}/>
            <Icon src={mediumLogo} alt='medium' height='14px' style={{marginRight: marginBetweenItems, cursor: 'pointer'}}
                  link={'https://medium.com/@TeFiPassport'}/>
            <Icon src={githubLogo} alt='github' height='20px' style={{marginRight: marginBetweenItems, cursor: 'pointer'}}
                  link={'https://github.com/TeFi-Passport'}/>
            <Icon src={gitBookLogo} alt='gitbook' height='21px' style={{cursor: 'pointer'}}
                  link={'https://tefipassport.gitbook.io/wiki/'}/>
        </Row>
    );
}

export const Footer = () => {

    const isMobile = useSelector(state => state.isMobile);

    if (isMobile)
        return (
            <Column width='100%' alignItems='center' style={{marginTop: '65px', marginBottom: '35px'}}>
                <Box height='1px' width={'100%'} style={{background: lightOrange30, marginBottom: '28px'}}/>
                <TefiPassportLogo style={{opacity: 0.5, width: '100%', justifyContent: 'center', marginBottom: '30px'}}/>
                <IconRow marginBetweenItems='10vw'/>
            </Column>
        );

    return (
        <Box display='flex' flexDirection='column' style={{paddingBottom: '24px'}}>
            <Box height='1px' width={'100%'} style={{background: lightOrange30, marginBottom: '24px'}}/>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <TefiPassportLogo style={{opacity: 0.5}} height='26px'/>
                <IconRow marginBetweenItems='44px'/>
            </Box>
        </Box>
    );

}