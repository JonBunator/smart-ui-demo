"use client"
import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import surveyFlowMachine from "@/app/ui/propertyManagement/surveyManager/stateMachine";
import { setParticipationState, getParticipationState } from '@/lib/db/database';
import {createActor, Actor, SnapshotFrom} from 'xstate';
import {NUM_USE_CASES, USE_CASE_DURATION} from "@/lib/config";

interface SurveyManagerContextType {
    /**
     * Starts the survey.
     */
    startSurvey: () => Promise<void>
    /**
     * Starts the next use case.
     */
    startUseCase: () => Promise<void>
    /**
     * Adds data to the use case.
     */
    addData: () => Promise<void>
    /**
     * Completes the questionnaire of the use case.
     */
    completeUseCase: () => Promise<void>
    /**
     * Snapshot of the state machine.
     */
    snapshot:  SnapshotFrom<typeof surveyFlowMachine> | undefined
    /**
     * Index of the current use case.
     */
    useCaseIndex:  number | undefined
    /**
     * Index of the current data point.
     */
    dataIndex:  number | undefined
    /**
     * State machine.
     */
    stateMachine: Actor<typeof surveyFlowMachine> | undefined
    /**
     * Subscribes to state machine snapshot changes. Returns unsubscribe function
     * @param listener The listener that should listen to changes.
     */
    subscribe: (listener: (snapshot: SnapshotFrom<typeof surveyFlowMachine>) => void) => () => void;
}

const SurveyManagerContext = createContext<SurveyManagerContextType | undefined>(undefined);

export default function SurveyManagerProvider({children}: { children: React.ReactNode; }) {
    const [machine, setMachine] = useState<Actor<typeof surveyFlowMachine> | undefined>(undefined);
    const [snapshot, setSnapshot] = useState<SnapshotFrom<typeof surveyFlowMachine> | undefined>(undefined);
    const [stringyfiedSnapshot, setStringyfiedSnapshot] = useState<string| undefined>(undefined);
    const listeners = useRef<Set<(snapshot: SnapshotFrom<typeof surveyFlowMachine>) => void>>(new Set());

    useEffect(() => {
        getParticipationState()
            .then(state => {
                const actor = createActor(surveyFlowMachine, {
                    input: {numUseCases: NUM_USE_CASES, useCaseDuration: USE_CASE_DURATION},
                    snapshot: state !== null ? state : undefined,
                })
                actor.start();
                setMachine(actor);
                setSnapshot(actor.getSnapshot());
            })
    }, []);
    
    const updateState = useCallback(async () => {
        if(!machine) {
            return;
        }
        const state = JSON.stringify(machine?.getPersistedSnapshot());
        setStringyfiedSnapshot(state);
        if(state !== stringyfiedSnapshot) {
            await setParticipationState(state);
        }
        setSnapshot(machine.getSnapshot());
    }, [machine, stringyfiedSnapshot]);

    useEffect(() => {
        const subscription = machine?.subscribe(async () => {
            if(machine) {
                await updateState();
            }
            listeners.current.forEach(listener => listener(machine.getSnapshot()));
        })
        return () => subscription?.unsubscribe();
    }, [machine, updateState]);

    const sendEvent = useCallback(async (type: "startSurvey" | "startUseCase" | "addData" | "completeUseCase") => {
        machine?.send({type: type});
    }, [machine]);


    const subscribe = useCallback((listener: (snapshot: SnapshotFrom<typeof surveyFlowMachine>) => void) => {
        listeners.current.add(listener);
        return () => listeners.current.delete(listener);
    }, []);

    const value = useMemo(() => ({
        startSurvey: () => sendEvent("startSurvey"),
        startUseCase: () => sendEvent("startUseCase"),
        addData: () => sendEvent("addData"),
        completeUseCase: () => sendEvent("completeUseCase"),
        snapshot: snapshot,
        useCaseIndex: snapshot?.context.useCaseIndex,
        dataIndex: snapshot?.context.dataIndex,
        stateMachine: machine,
        subscribe,
    }), [machine, sendEvent, snapshot, subscribe]);
    
    return (
        <SurveyManagerContext.Provider value={value}>
            {children}
        </SurveyManagerContext.Provider>
    );
};

export function useSurveyManager(): SurveyManagerContextType {
    const context = useContext(SurveyManagerContext);
    if (!context) {
        throw new Error('useSurveyManager must be used within a SurveyManagerProvider');
    }
    return context;
}