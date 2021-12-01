import styled from "styled-components";
import {tequila} from "../../constants/colors";
import React from "react";

const CustomButton = styled.div`
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// todo: update px to more adaptive size
const largeWidth = '343px';
const largeHeight = '48px';

const LargeButton = ({onClick, style, children, className}) => {
    return <CustomButton onClick={onClick} style={{
        width: largeWidth,
        height: largeHeight,
        ...style
    }} className={className}>
        {children}
    </CustomButton>;
}

const SmallButton = ({onClick, style, children, className}) => {
    return <CustomButton onClick={onClick} style={{
        ...style
    }} className={className}>
        <div style={{padding: '11px 38px',}}>
            {children}
        </div>
    </CustomButton>;
}

export const DefaultLargeButton = ({onClick, children}) => {
    return <LargeButton onClick={onClick} style={{background: tequila}}>
        {children}
    </LargeButton>;
}

export const GhostLargeButton = ({onClick, children}) => {
    return <LargeButton onClick={onClick} style={{
        color: 'white',
    }} className={'rounded-corners-gradient1-borders'}>
        {children}
    </LargeButton>;
}

export const DefaultSmallButton = ({onClick, children}) => {
    return <SmallButton onClick={onClick} style={{background: tequila}}>
        {children}
    </SmallButton>;
}

export const GhostSmallButton = ({onClick, children}) => {
    return <SmallButton onClick={onClick} style={{
        color: 'white',
    }} className={'rounded-corners-gradient1-borders'}>
        {children}
    </SmallButton>;
}

