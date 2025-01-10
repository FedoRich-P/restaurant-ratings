'use client'

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './globals.css';
import {Providers} from "@/store/providers";
import {theme} from "@/styles/theme";
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Providers>
        </body>
        </html>
    );
}