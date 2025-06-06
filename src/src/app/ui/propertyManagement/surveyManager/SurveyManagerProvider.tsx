"use client"
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import surveyFlowMachine from "@/app/ui/propertyManagement/surveyManager/stateMachine";
import { setParticipationState, getParticipationState } from '@/lib/db/database';
import {createActor, Actor, SnapshotFrom} from 'xstate';

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
     * Snapshot of the state machine.
     */
    snapshot:  SnapshotFrom<typeof surveyFlowMachine> | undefined
    /**
     * State machine.
     */
    stateMachine: Actor<typeof surveyFlowMachine> | undefined
}

const SurveyManagerContext = createContext<SurveyManagerContextType | undefined>(undefined);


export default function SurveyManagerProvider({children}: { children: React.ReactNode; }) {
    const [machine, setMachine] = useState<Actor<typeof surveyFlowMachine> | undefined>(undefined);
    const [snapshot, setSnapshot] = useState<SnapshotFrom<typeof surveyFlowMachine> | undefined>(undefined);
    const [stringyifiedSnapshot, setStringyfiedSnapshot] = useState<string | undefined>(undefined);

    useEffect(() => {
        getParticipationState()
            .then(state => {
                let stateObject = undefined;
                if(state !== null) {
                    stateObject = JSON.parse(state);
                }
                const actor = createActor(surveyFlowMachine, {
                    input: {numUseCases: 3, useCaseLengthSeconds: 5},
                    snapshot: stateObject
                })
                console.log("actor", actor)
                actor.start();
                setMachine(actor);
                setSnapshot(actor.getSnapshot());
            })
    }, []);

    useEffect(() => {
        const updateParticipationState = async () => {
            if (stringyifiedSnapshot) {
                await setParticipationState(stringyifiedSnapshot);
            }
        };

        updateParticipationState();
    }, [stringyifiedSnapshot]);
    

    useEffect(() => {
        const subscription = machine?.subscribe(async () => {
            if(machine) {
                setSnapshot(machine.getSnapshot());
                setStringyfiedSnapshot(JSON.stringify(machine.getPersistedSnapshot()));
            }
        })
        return () => subscription?.unsubscribe();
    }, [machine]);

    const value = useMemo(() => ({
        startSurvey: () => machine?.send({type: "startSurvey"}),
        startUseCase: () => machine?.send({type: "startUseCase"}),
        addData: () => machine?.send({type: "addData"}),
        completeUseCase: () => machine?.send({type: "completeUseCase"}),
        snapshot: snapshot,
        stateMachine: machine
    }), [machine, snapshot]);
    
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