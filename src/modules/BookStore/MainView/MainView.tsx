import { Outlet } from "react-router-dom";

import Grid from '@mui/material/Grid2';

export default function MainView() {
    return (
        <Grid container alignItems={'center'}>
            <Outlet />
        </Grid>
    );
};