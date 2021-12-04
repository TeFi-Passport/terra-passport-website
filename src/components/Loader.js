import CircularProgress from "@mui/material/CircularProgress";
import {grey5} from "../constants/colors";
import Box from "@mui/material/Box";
import React from "react";

export const Loader = () => {
    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' width='100%' height='100%'>
            <CircularProgress style={{'color': grey5}}/>
        </Box>
    );
}