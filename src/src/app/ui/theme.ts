'use client';
import { createTheme } from '@mui/material/styles';
import { deDE as deDEDatagrid } from '@mui/x-data-grid/locales';
import { deDE } from '@mui/material/locale';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    cssVariables: true,
    colorSchemes: {
        dark: {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#c6ecd0',
                    contrastText: '#4a6c56',
                },
                success: {
                    main: '#c6ecd0',
                    contrastText: '#4a6c56',
                },
                warning: {
                    main: '#fde181',
                },
                background: {
                    default: '#0d0f0d',
                    paper: '#1e201e',
                },
                DataGrid: {
                    bg: "transparent",
                    headerBg: '#333533',
                }
            },
        },
        light: {
            palette: {
                mode: 'light',
                primary: {
                    main: '#7a9481',
                },
                success: {
                    main: '#7a9481',
                },
                warning: {
                    main: '#fde181',
                },
                background: {
                    default: '#e3e3df',
                    paper: '#eeeeea',
                },
                DataGrid: {
                    bg: "transparent",
                    headerBg: '#f4f4f0',
                }
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
},
    deDE,
    deDEDatagrid);
