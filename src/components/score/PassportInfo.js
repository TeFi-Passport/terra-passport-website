import Box from "@mui/material/Box";
import React from "react";
import {Heading3} from "../texts";
import {grey, grey5} from "../../constants/colors";
import styled from "styled-components";
import {Card} from "./Card";

export const SubTitle = styled.h1`
font-family: RoadRadio;
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: 18px;
letter-spacing: 0px;
text-align: left;
overflow-wrap: break-word;
`;
export const Heading3Bigger = styled.h3`
font-family: RoadRadio;
font-size: 22px;
font-style: normal;
font-weight: 700;
line-height: 0px;
letter-spacing: 0px;
text-align: left;
`;

export const PassportInfo = ({height, address, chainId, block, style}) => {
    return (
        <Card style={{height: height, ...style}}>
            <Box display='flex' flexDirection='column' justifyContent='center' height={height} alignItems='center'>
                <div style={{width: 'max-content'}}>
                    <Box display='flex' flexDirection='column'>
                        <Heading3Bigger style={{color: grey5, marginBottom: '9px'}}>WALLET ADDRESS</Heading3Bigger>
                        <SubTitle style={{color: grey}}>{address}</SubTitle>
                    </Box>
                    <Box display='flex' flexDirection='column' style={{marginTop: '14px'}}>
                        <Heading3 style={{color: grey5, marginBottom: '9px'}}>CHAINID AND BLOCK HEIGHT</Heading3>
                        <SubTitle style={{color: grey}}>{`${chainId} / ${block}`}</SubTitle>
                    </Box>
                </div>
            </Box>
        </Card>
    );
}

export const MobilePassportInfo = ({address, chainId, block, style}) => {
    return (
        <Card style={style}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start' style={{
                padding: '15px 5vw',
                maxWidth: '70vw'
            }}>
                <div style={{width: 'max-content'}}>
                    <Box display='flex' flexDirection='column'>
                        <Heading3Bigger style={{color: grey5, marginBottom: '9px', fontSize: '16px'}}>WALLET ADDRESS</Heading3Bigger>
                        <SubTitle style={{color: grey, fontSize: '11px', maxWidth: '65vw'}}>{address}</SubTitle>
                    </Box>
                    <Box display='flex' flexDirection='column' style={{marginTop: '9px'}}>
                        <Heading3 style={{color: grey5, marginBottom: '9px', fontSize: '12px'}}>CHAINID AND BLOCK HEIGHT</Heading3>
                        <SubTitle style={{color: grey, fontSize: '11px'}}>{`${chainId} / ${block}`}</SubTitle>
                    </Box>
                </div>
            </Box>
        </Card>
    );
}