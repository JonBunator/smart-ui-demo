'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    cssVariables: {
        colorSchemeSelector: 'data',
    },
    colorSchemes: {
        dark: {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#a4c8ae',
                    contrastText: '#3b4a3f',
                },
                secondary: {
                    main: '#e7d6b7',
                },
                error: {
                    main: '#ffdad6',
                    contrastText: '#93000a',
                },
                info: {
                    main: '#aec1df',
                    contrastText: '#3d4f68',
                },
                success: {
                    main: '#d4fade',
                },
                warning: {
                    main: '#fde181',
                },
                background: {
                    default: '#121412',
                    paper: '#1e201e',
                },
            },
        },
        light: {
            palette: {
                mode: 'light',
                primary: {
                    main: '#7a9481',
                },
                secondary: {
                    main: '#e7d6b7',
                },
                error: {
                    main: '#ffdad6',
                    contrastText: '#93000a',
                },
                info: {
                    main: '#aec1df',
                    contrastText: '#3d4f68',
                },
                success: {
                    main: '#d4fade',
                },
                warning: {
                    main: '#fde181',
                },
                background: {
                    default: '#e8e8e5',
                    paper: '#faf9f6',
                },
            },
        }
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 4,
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
    },
});
