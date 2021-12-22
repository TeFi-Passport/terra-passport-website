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
import Column from "../Layout/Column";
import Row from "../Layout/Row";

const content = {
    title: 'SCORE',
    maxScore: 30,
    vsMeanScore: 'vs. Mean Score of',
}

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

const EvolutionStat = ({stat, marginTop = '30px', marginLeft = '10px', style}) => {
    return (
        <EvolutionText
            style={{
                color: stat > 0 ? green1 : red1,
                marginTop: marginTop,
                marginLeft: marginLeft
            }}>{stat}%</EvolutionText>
    );
}

export const MobileScoreCard = ({score, evolution, meanScore, style}) => {
    return (
        <Card style={{width: '85vw', ...style}}>
            <Row style={{padding: '12px 0 4px 0'}}
                 justifyContent='center' alignItems='flex-end'>
                <Column style={{width: 'max-content'}}>
                    <Title style={{color: grey5, fontSize: '14px'}}>{content.title}</Title>
                    <ScoreText style={{color: tequila, fontSize: '48px'}}>{score}/{content.maxScore}</ScoreText>
                </Column>
                <Row justifyContent='center' alignItems='flex-start'>
                    <EvolutionStat stat={evolution} marginLeft={0} marginTop={0} style={{marginLeft: '12px'}}/>
                    <ComparisonText style={{
                        color: grey,
                        lineHeight: '9px',
                        fontSize: '9px',
                        marginLeft: '12px'
                    }}>{content.vsMeanScore} {meanScore}</ComparisonText>
                </Row>
            </Row>
        </Card>
    );
}

export const ScoreCard = ({score, evolution, meanScore, height, style}) => {
    return (
        <Card style={{height: height, ...style}}>
            <Box display='flex' flexDirection='column' style={{height: height}}
                 justifyContent='center' alignItems='center'>
                <div style={{width: 'max-content'}}>
                    <Title style={{color: grey5}}>{content.title}</Title>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <ScoreText style={{color: tequila}}>{score}/{content.maxScore}</ScoreText>
                        <EvolutionStat stat={evolution}/>
                    </Box>
                    <ComparisonText style={{color: grey}}>{content.vsMeanScore} {meanScore}</ComparisonText>
                </div>
            </Box>
        </Card>
    );
}