import {AnyEventObject, assign, emit, enqueueActions, fromCallback, setup} from "xstate";

export type SurveyFlowMachineContext = {
    numSurveySteps: number;
    surveyStepDuration: number;
    surveyStep: number;
    dataIndex: number;
    numDataPerSurveyStep: number;
    timeout: number | null;
    showHelpDialog: boolean;
};

export type SurveyFlowMachineState = "InitialQuestions" | "Finished" | {
    SurveyStep: "NotStarted" | "Running" | "NoMoreData" | "Questions"
}

export type SurveyFlowMachineEvents =
    { type: "startSurveyStep" }
    | { type: "addData" }
    | { type: "completeQuestions" }
    | { type: "completeNoMoreData" }
    | { type: "openHelpDialog" }
    | { type: "closeHelpDialog" }
    | { type: "timerOut" } // TimerOut is only for debugging purposes

const surveyFlowMachine = setup({
    types: {
        context: {} as SurveyFlowMachineContext,
        events: {} as SurveyFlowMachineEvents,
        input: {} as { numSurveySteps: number, surveyStepDuration: number, numDataPerSurveyStep: number },
        emitted: {} as
            | { type: "sendEmail"; surveyStep: number; dataIndex: number }
            | { type: "clockTick", timeDifference: number },
    },
    actors: {
        timerInterval: fromCallback(({input, sendBack}: {
            input: { timeout: number | null }, sendBack: (event: AnyEventObject) => void}) => {
            const interval = setInterval(() => {
                const now = new Date();
                const timeDifference = input.timeout
                    ? Math.ceil((input.timeout - now.valueOf()) / 1000)
                    : undefined;
                sendBack({type: 'clockTick', timeDifference: timeDifference});
                if (timeDifference !== undefined && timeDifference <= 0) {
                    sendBack({type: 'timerOut'});
                }
            }, 1000);
            return () => clearInterval(interval);
        })
    }
}).createMachine({
    id: "surveyFlow",
    initial: "InitialQuestions",
    context: ({input}) => ({
        numSurveySteps: input.numSurveySteps,
        surveyStepDuration: input.surveyStepDuration,
        surveyStep: 0,
        dataIndex: 0,
        numDataPerSurveyStep: input.numDataPerSurveyStep,
        timeout: null,
        showHelpDialog: false,
    }),
    states: {
        InitialQuestions: {
            on: {
                completeQuestions: "SurveyStep",
            },
        },
        SurveyStep: {
            initial: "NotStarted",
            states: {
                NotStarted: {
                    on: {
                        startSurveyStep: "Running",
                    },
                },
                Running: {
                    always: {
                        guard: ({context}) => context.dataIndex === context.numDataPerSurveyStep,
                        target: "NoMoreData",
                    },
                    entry: [assign({
                        timeout: ({context}) => {
                            return (new Date()).valueOf() + context.surveyStepDuration * 1000;
                            }
                        }),
                        emit(({context}) => {
                            return {
                                type: "sendEmail",
                                surveyStep: context.surveyStep,
                                dataIndex: context.dataIndex,
                            };
                        }),
                    ],
                    exit: [assign({showHelpDialog: false})],
                    invoke: {
                        id: "timerInterval",
                        src: "timerInterval",
                        input: ({context: {timeout}}) => ({timeout}),
                    },
                    on: {
                        openHelpDialog: {
                            actions: [ assign({showHelpDialog: true})]
                        },
                        closeHelpDialog: {
                            actions: [ assign({showHelpDialog: false})]
                        },
                        timerOut: {
                            internal: true,
                            target: "Questions",
                        },
                        addData: {
                            actions: [
                                assign({
                                    dataIndex: ({ context }) => context.dataIndex + 1,
                                }),
                                enqueueActions(({context, enqueue}) => {
                                    if (context.dataIndex < context.numDataPerSurveyStep) {
                                        enqueue.emit({
                                            type: "sendEmail",
                                            surveyStep: context.surveyStep,
                                            dataIndex: context.dataIndex,
                                        });
                                    }
                                }),
                            ],
                        },
                        clockTick: {
                            internal: true,
                            actions: [
                                emit(({event}) => {
                                    return event;
                                }),
                            ]
                        }
                    },
                },
                NoMoreData: {
                    on: {
                        completeNoMoreData: {
                            target: "Questions"
                        }
                    }
                },
                Questions: {
                    on: {
                        completeQuestions: [
                            {
                                guard: ({context}) =>
                                    context.surveyStep === context.numSurveySteps - 1,
                                target: "#surveyFlow.Finished",
                            },
                            {
                                guard: ({context}) =>
                                    context.surveyStep !== context.numSurveySteps - 1,
                                target: "NotStarted",
                                actions: assign({
                                    surveyStep: ({context}) => context.surveyStep + 1,
                                    dataIndex: 0,
                                }),
                            },
                        ],
                    },
                },
            },
        },
        Finished: {
            type: "final",
        },
    },
});

export default surveyFlowMachine;