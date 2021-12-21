import React from "react";
import Box from "@mui/material/Box";

const Row = ({ children, ...other }) => {
    return (
        <Box {...other} display='flex' flexDirection='row'>
            {children}
        </Box>
    );
};

export default Row;