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
            <Box display='flex' flexDirection='column' justifyContent='center' height={height}>
                <Box display='flex' flexDirection='column'>
                    <Heading3Bigger style={{color: grey5}}>WALLET ADDRESS</Heading3Bigger>
                    <SubTitle style={{color: grey}}>{address}</SubTitle>
                </Box>
                <Box display='flex' flexDirection='column'>
                    <Heading3 style={{color: grey5}}>CHAINID AND BLOCK HEIGHT</Heading3>
                    <SubTitle style={{color: grey}}>{`${chainId} / ${block}`}</SubTitle>
                </Box>
            </Box>
        </Card>
    );
}