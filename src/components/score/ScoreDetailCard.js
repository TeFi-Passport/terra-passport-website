import React, {useState} from "react";
import {darkBackground, green1, grey5, red1, tequila} from "../../constants/colors";
import Box from "@mui/material/Box";
import styled from "styled-components";
import down_arrow from '../../res/images/down_arrow.svg';
import up_arrow from '../../res/images/up_arrow.svg';
import star from '../../res/images/star.svg';
import {Card, cardRadius} from "./Card";

const criteriaToName = {
    'gettingStarted': 'GETTING STARTED',
    'insomniac': 'INSOMNIAC',
    'upAndAtThem': 'UP AND AT THEM',
    'govDegen': 'GOV DEGEN',
    'terraActivist': 'TERRA ACTIVIST',
    'rockTheVote': 'ROCK THE VOTE',
    'babyDegen': 'BABY DEGEN',
    'multiTokenate': 'MULTI TOKENATE',
    'adultSwim': 'ADULT SWIM',
    'bagBuilder': 'BAG BUILDER',
    'inDeep': 'IN DEEP',
    'dumpProof': 'DUMP PROOF',
    'wenMoon': 'WEN MOON',
    'airdropAddict': 'AIRDROP ADDICT',
    'repeatCustomer': 'REPEAT CUSTOMER'
};

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

const CriteriaDetailText = styled.div`
font-family: RoadRadio;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: 20px;
letter-spacing: 0px;
text-align: center;
`;

/**
 *
 * @param {number} score
 * @param {string} name
 * @param {string} key - unique key
 * @constructor
 */
const CriteriaDetail = ({score, name, key}) => {

    return (
        <Box display='flex' flexDirection='column' alignItems='center' key={key}
             style={{marginTop: '10px'}}>
            <Box display='flex' flexDirection='row'>
                <img src={star} alt='star'/>
                {score > 1 && (<img src={star} alt='star' style={{marginLeft: '5px'}}/>)}
                {score > 2 && (<img src={star} alt='star' style={{marginLeft: '5px'}}/>)}
            </Box>
            <CriteriaDetailText style={{color: grey5, marginTop: '10px'}}>{criteriaToName[name]}</CriteriaDetailText>
        </Box>
    );
}

/**
 *
 * @param {string} title - the name of the criteria
 * @param {number} score - the score of the criteria
 * @param {number} evolution - the percentage of evolution
 * @param {number} average - the average score for this criteria
 * @param {[]} criterias - the detail of the score. e.g [{'criteria': "ABC", score: 2}]
 * @returns {JSX.Element}
 * @constructor
 */
export const ScoreDetailCard = ({title, score, evolution, average, criterias}) => {

    const [open, setOpen] = useState(false);

    const components = [];

    for (let i = 0; i < criterias.length; i++) {
        for (let key in criterias[i]) {
            const score = criterias[i][key];
            const name = key;
            if (score > 0)
                components.push(<CriteriaDetail score={score} key={name} name={name}/>);
        }
    }

    return (
        <Card
            style={{
                width: '195px',
                background: 'transparent'
            }}>
            <Box display='inline-flex' flexDirection='column'
                 justifyContent='center' alignItems='center'
                 style={{background: darkBackground, borderRadius: cardRadius}}>
                <Title style={{color: grey5}}>{title}</Title>
                <ScoreText style={{color: tequila}}>{score}</ScoreText>
                <EvolutionText style={{color: evolution < 0 ? red1 : green1}}>{evolution}%</EvolutionText>
                <AVGText style={{color: grey5}}>AVG {average}</AVGText>
                {open && components.length > 0 && (
                    <Box display='flex' flexDirection='column' style={{paddingTop: '20px', width: '100%'}}>
                        {components}
                    </Box>)}
                <img src={open ? up_arrow : down_arrow} width='11px' alt='down arrow'
                     style={{marginTop: '16px', marginBottom: '16px', cursor: 'pointer'}} onClick={() => {
                    if (criterias.length > 0)
                        setOpen(!open)
                }}/>
            </Box>
        </Card>
    );
};