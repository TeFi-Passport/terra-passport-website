import {useSelector} from "react-redux";
import Div100vh from "react-div-100vh";
import Box from "@mui/material/Box";
import React from "react";

export const CustomDiv100vh = ({children}) => {
    const isMobile = useSelector(state => state.isMobile);

    if (isMobile)
        return <Div100vh>{children}</Div100vh>;

    return <Box minHeight='100vh'>{children}</Box>;
}