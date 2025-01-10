'use client';

import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header= () => {
    return (
        <AppBar position="static" style={{marginBottom: 20}}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    Любимые рестораны
                </Typography>
            </Toolbar>
        </AppBar>
    );
};