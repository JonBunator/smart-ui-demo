"use client"
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import surveyFlowMachine, {
    SurveyFlowMachineContext,
    SurveyFlowMachineState
} from "@/app/ui/propertyManagement/surveyManager/stateMachine";
import { setParticipationState, getParticipationState } from '@/lib/db/database';
import { createActor, Actor } from 'xstate';

interface SurveyManagerContextType {
    /**
     * Starts the survey.
     */
    startSurvey: () => void
    /**
     * Starts the next use case.
     */
    startUseCase: () => void
    /**
     * Adds data to the use case.
     */
    addData: () => void
    /**
     * Completes the questionnaire of the use case.
     */
    completeUseCase: () => void
    /**
     * Context of the state machine.
     */
    context: SurveyFlowMachineContext | undefined
    /**
     * Current state of the state machine.
     */
    state: SurveyFlowMachineState | undefined
    /**
     * State machine.
     */
    stateMachine: Actor<typeof surveyFlowMachine> | undefined
}

const SurveyManagerContext = createContext<SurveyManagerContextType | undefined>(undefined);


export default function SurveyManagerProvider({children}: { children: React.ReactNode; }) {
    const [machine, setMachine] = useState<Actor<typeof surveyFlowMachine> | undefined>(undefined);
    const [context, setContext] = useState<SurveyFlowMachineContext | undefined>(undefined);
    const [state, setState] = useState<SurveyFlowMachineState | undefined>(undefined);

    useEffect(() => {
        console.log(machine?.getSnapshot())
    }, [machine]);

    useEffect(() => {
        getParticipationState()
            .then(state => {
                let stateObject = undefined;
                if(state !== null) {
                    stateObject = JSON.parse(state);
                }
                const actor = createActor(surveyFlowMachine, {
                    input: {numUseCases: 3, useCaseLengthSeconds: 60},
                    snapshot: stateObject
                })
                actor.start();
                setMachine(actor);
            })
    }, []);


    useEffect(() => {
        const subscription = machine?.subscribe(async () => {
            if(machine) {
                const snapshot = machine.getSnapshot();
                setContext(snapshot.context);
                setState(snapshot.value);
                const state = machine.getPersistedSnapshot();
                await setParticipationState(JSON.stringify(state));
            }
        })
        return () => subscription?.unsubscribe();
    }, [machine]);

    const value = useMemo(() => ({
        startSurvey: () => machine?.send({type: "startSurvey"}),
        startUseCase: () => machine?.send({type: "startUseCase"}),
        addData: () => machine?.send({type: "addData"}),
        completeUseCase: () => machine?.send({type: "completeUseCase"}),
        context: context,
        state: state,
        stateMachine: machine
    }), [machine, context, state]);
    
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