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
                error: {
                    main: '#93000a',
                    contrastText: '#ffdad6',
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
                    bg: "#292a28",
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
                    default: '#e8e8e5',
                    paper: '#faf9f6',
                },
                DataGrid: {
                    bg: "transparent",
                    headerBg: '#e8e8e5',
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
