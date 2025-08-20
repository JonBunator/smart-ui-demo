"use client"

import {ReactNode} from "react";
import {ThemeProvider} from '@mui/material/styles';
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import {theme} from "../theme";

export default function MUIProvider({children}: { children: ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider defaultMode="dark" theme={theme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}