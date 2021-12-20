/**
 *
 * @param {number} score - the passport score
 * @param {number} evolution - the evolution in % (e.g 0.024 corresponds to 2.4%)
 * @param {number} meanScore
 * @constructor
 */
import Box from "@mui/material/Box";
import React from "react";
import styled from "styled-components";
import {green1, grey, grey5, red1, tequila} from "../../constants/colors";
import {Card} from "./Card";

export const Title = styled.h1`
font-family: RoadRadio;
font-size: 34px;
font-style: normal;
font-weight: 700;
line-height: 0px;
letter-spacing: 0px;
text-align: left;
`;

const ScoreText = styled.h1`
font-family: RoadRadio;
font-size: 64px;
font-style: normal;
font-weight: 700;
line-height: 0px;
letter-spacing: 0px;
text-align: left;
`;

const ComparisonText = styled.h1`
font-family: RoadRadio;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 0px;
letter-spacing: 0px;
text-align: left;
`;

const EvolutionText = styled.h1`
font-family: RoadRadio;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 20px;
letter-spacing: 0px;
text-align: center;
`;

const EvolutionStat = ({stat}) => {
    return (
        <EvolutionText
            style={{color: stat > 0 ? green1 : red1, marginTop: '30px', marginLeft: '10px'}}>{stat}%</EvolutionText>
    );
}

export const ScoreCard = ({score, evolution, meanScore, height, style}) => {
    return (
        <Card style={{height: height, ...style}}>
            <Box display='flex' flexDirection='column' style={{height: height}}
                 justifyContent='center' alignItems='center'>
                <div style={{width: 'max-content'}}>
                    <Title style={{color: grey5}}>SCORE</Title>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <ScoreText style={{color: tequila}}>{score}/30</ScoreText>
                        <EvolutionStat stat={evolution}/>
                    </Box>
                    <ComparisonText style={{color: grey}}>vs. Mean Score of {meanScore}</ComparisonText>
                </div>
            </Box>
        </Card>
    );
}