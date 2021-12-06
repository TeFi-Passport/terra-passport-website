import {Card} from "./Card";
import React from "react";
import {green1, grey5, red1, tequila} from "../../constants/colors";
import Box from "@mui/material/Box";
import styled from "styled-components";
import down_arrow from '../../res/images/down_arrow.svg';

const Title = styled.h1`
font-family: RoadRadio;
font-size: 17px;
font-style: normal;
font-weight: 700;
line-height: 22px;
letter-spacing: 0px;
text-align: center;
`;

const ScoreText = styled.h1`
font-family: RoadRadio;
font-size: 48px;
font-style: normal;
font-weight: 700;
line-height: 0px;
letter-spacing: 0px;
text-align: center;
`;

const EvolutionText = styled.h1`
font-family: RoadRadio;
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: 0px;
letter-spacing: 0px;
text-align: center;
`;

const AVGText = styled.h1`
font-family: RoadRadio;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 0px;
letter-spacing: 0px;
text-align: center;
`;

export const ScoreDetailCard = ({height, title, score, evolution, average}) => {
    return (
      <Card style={{width: '195px'}}>
          <Box display='flex' flexDirection='column' style={{height: height}}
               justifyContent='center' alignItems='center'>
              <Title style={{color: grey5}}>{title}</Title>
              <ScoreText style={{color: tequila}}>{score}</ScoreText>
              <EvolutionText style={{color: evolution < 0 ? red1 : green1}}>{evolution}%</EvolutionText>
              <AVGText style={{color: grey5}}>AVG {average}</AVGText>
              <img src={down_arrow} width='11px' alt='down arrow' style={{marginTop: '16px',marginBottom: /*'16px'*/ 0, opacity: 0}}/>
          </Box>
      </Card>
    );
};