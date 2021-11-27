import styled from "styled-components";
import {primaryColor} from "../../constants/colors";
import React from "react";

const Button = styled.button`
  display: inline-block;
  color: ${primaryColor};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${primaryColor};
  border-radius: 3px;
  display: block;
  cursor: pointer
`;

export const CustomButton = ({onClick, text}) => {
    return <Button onClick={onClick}>{text}</Button>;
}