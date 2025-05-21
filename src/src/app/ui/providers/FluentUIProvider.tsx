"use client"

import {
    SSRProvider,
    RendererProvider,
    createDOMRenderer,
    renderToStyleElements, webDarkTheme, webLightTheme, FluentProvider,
} from '@fluentui/react-components';
import { useServerInsertedHTML } from 'next/navigation';
import {ReactNode, useEffect, useRef, useState} from "react";
import { useColorScheme } from '@mui/material/styles';
import {useMediaQuery} from "@mui/material";

export default function FluentUIProvider({children}: {children: ReactNode}) {
    const [renderer] = useState(() => createDOMRenderer());
    const didRenderRef = useRef(false);
    const [darkTheme, setDarkTheme] = useState(true);

    useServerInsertedHTML(() => {
        if (didRenderRef.current) {
            return;
        }
        didRenderRef.current = true;
        return <>{renderToStyleElements(renderer)}</>;
    });

    const { mode } = useColorScheme();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        if(mode === "system" || mode === undefined) {
            setDarkTheme(prefersDarkMode);
        } else {
            setDarkTheme(mode === "light");
        }
    }, [mode, prefersDarkMode]);

    return (
        <RendererProvider renderer={renderer}>
            <SSRProvider>
                <FluentProvider theme={darkTheme ? webDarkTheme : webLightTheme} className={`${darkTheme ? "dark" : "light"}`}>
                    {children}
                </FluentProvider>
            </SSRProvider>
        </RendererProvider>
    );
}