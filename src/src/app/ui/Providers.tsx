"use client"
import {SmartComponentManager} from "smart-ui";
import {SmartAgentProvider} from "smart-ui";
import {
    SSRProvider,
    RendererProvider,
    createDOMRenderer,
    renderToStyleElements,
} from '@fluentui/react-components';
import { useServerInsertedHTML } from 'next/navigation';
import {callAgentEndpoint} from "@/app/openAI/openAI";
import {ReactNode, useRef, useState} from "react";

export default function Providers({children}: {children: ReactNode}) {
    const [renderer] = useState(() => createDOMRenderer());
    const didRenderRef = useRef(false);

    useServerInsertedHTML(() => {
        if (didRenderRef.current) {
            return;
        }
        didRenderRef.current = true;
        return <>{renderToStyleElements(renderer)}</>;
    });

    return (
        <SmartComponentManager>
            <SmartAgentProvider callAgent={callAgentEndpoint}>
                <RendererProvider renderer={renderer}>
                    <SSRProvider>
                        {children}
                    </SSRProvider>
                </RendererProvider>
            </SmartAgentProvider>
        </SmartComponentManager>
    );
}