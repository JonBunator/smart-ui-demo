"use client"
import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import surveyFlowMachine, {SurveyFlowMachineEvents} from "@/app/ui/propertyManagement/surveyManager/stateMachine";
import { setParticipationState, getParticipationState } from '@/lib/db/database';
import {createActor, Actor, SnapshotFrom} from 'xstate';
import {NUM_DATA_PER_SURVEY_STEP, NUM_SURVEY_STEPS, SURVEY_STEP_DURATION} from "@/lib/config";
import { useSnackbar } from "@/app/ui/providers/SnackbarProvider";

interface SurveyManagerContextType {
    /**
     * Starts the next survey step.
     */
    startSurveyStep: () => void
    /**
     * Adds data to the survey step.
     */
    addData: () => void
    /**
     * Completes the questionnaire of the survey step.
     */
    completeQuestions: () => void
    /**
     * Completes data adding and proceeds to questionnaire due to no more data.
     */
    completeNoMoreData: () => void
    /**
     * Shows a help dialog in running state.
     */
    showHelpDialog: (show: boolean) => void
    /**
     * Snapshot of the state machine.
     */
    snapshot:  SnapshotFrom<typeof surveyFlowMachine> | undefined
    /**
     * Index of the survey step.
     */
    surveyStep:  number | undefined
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
    const {error} = useSnackbar();

    useEffect(() => {
        getParticipationState()
            .then(state => {
                const actor = createActor(surveyFlowMachine, {
                    input: {numSurveySteps: NUM_SURVEY_STEPS, surveyStepDuration: SURVEY_STEP_DURATION, numDataPerSurveyStep: NUM_DATA_PER_SURVEY_STEP},
                    snapshot: state !== null ? state : undefined,
                })
                actor.start();
                setMachine(actor);
                setSnapshot(actor.getSnapshot());
            }).catch(() => error());
    }, [error]);
    
    const updateState = useCallback(async () => {
        if(!machine) {
            return;
        }
        const state = JSON.stringify(machine?.getPersistedSnapshot());
        setStringyfiedSnapshot(state);
        if(state !== stringyfiedSnapshot) {
            try {
                await setParticipationState(state);
            } catch {
                error();
            }
        }
        setSnapshot(machine.getSnapshot());
    }, [machine, stringyfiedSnapshot, error]);

    useEffect(() => {
        const subscription = machine?.subscribe(async () => {
            if(machine) {
                await updateState();
            }
            listeners.current.forEach(listener => listener(machine.getSnapshot()));
        })
        return () => subscription?.unsubscribe();
    }, [machine, updateState]);

    const sendEvent = useCallback(async (type: SurveyFlowMachineEvents) => {
        machine?.send(type);
    }, [machine]);


    const subscribe = useCallback((listener: (snapshot: SnapshotFrom<typeof surveyFlowMachine>) => void) => {
        listeners.current.add(listener);
        return () => listeners.current.delete(listener);
    }, []);

    const showHelpDialog = useCallback((show: boolean) => {
        if(show) { 
            sendEvent({type: "openHelpDialog"}).then();
        } else {
            sendEvent({type: "closeHelpDialog"}).then();
        }
    }, [sendEvent]);
    
    const value = useMemo(() => ({
        startSurveyStep: () => sendEvent({type: "startSurveyStep"}),
        addData: () => sendEvent({type: "addData"}),
        completeQuestions: () => sendEvent({type: "completeQuestions"}),
        completeNoMoreData: () => sendEvent({type: "completeNoMoreData"}),
        showHelpDialog,
        snapshot: snapshot,
        surveyStep: snapshot?.context.surveyStep,
        dataIndex: snapshot?.context.dataIndex,
        stateMachine: machine,
        subscribe,
    }), [machine, sendEvent, showHelpDialog, snapshot, subscribe]);
    
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