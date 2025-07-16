import {AnyEventObject, assign, emit, enqueueActions, fromCallback, setup} from "xstate";

export type SurveyFlowMachineContext = {
    numUseCases: number;
    useCaseDuration: number;
    useCaseIndex: number;
    dataIndex: number;
    numDataPerUseCase: number;
    timeout: number | null;
    showHelpDialog: boolean;
};

export type SurveyFlowMachineState = "NotStarted" | "Finished" | {
    UseCase: "NotStarted" | "Running" | "NoMoreData" | "Questions"
}

export type SurveyFlowMachineEvents =  | { type: "startSurvey" }
    | { type: "startUseCase" }
    | { type: "addData" }
    | { type: "completeUseCase" }
    | { type: "completeNoMoreData" }
    | { type: "openHelpDialog" }
    | { type: "closeHelpDialog" }
    | { type: "timerOut" } // TimerOut is only for debugging purposes

const surveyFlowMachine = setup({
    types: {
        context: {} as SurveyFlowMachineContext,
        events: {} as SurveyFlowMachineEvents,
        input: {} as { numUseCases: number, useCaseDuration: number, numDataPerUseCase: number },
        emitted: {} as
            | { type: "sendEmail"; useCaseIndex: number; dataIndex: number }
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
    initial: "NotStarted",
    context: ({input}) => ({
        numUseCases: input.numUseCases,
        useCaseDuration: input.useCaseDuration,
        useCaseIndex: 0,
        dataIndex: 0,
        numDataPerUseCase: input.numDataPerUseCase,
        timeout: null,
        showHelpDialog: false,
    }),
    states: {
        NotStarted: {
            on: {
                startSurvey: "UseCase",
            },
        },
        UseCase: {
            initial: "NotStarted",
            states: {
                NotStarted: {
                    on: {
                        startUseCase: "Running",
                    },
                },
                Running: {
                    always: {
                        guard: ({context}) => context.dataIndex === context.numDataPerUseCase,
                        target: "NoMoreData",
                    },
                    entry: [assign({
                        timeout: ({context}) => {
                            return (new Date()).valueOf() + context.useCaseDuration * 1000;
                            }
                        }),
                        emit(({context}) => {
                            return {
                                type: "sendEmail",
                                useCaseIndex: context.useCaseIndex,
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
                                    if (context.dataIndex < context.numDataPerUseCase) {
                                        enqueue.emit({
                                            type: "sendEmail",
                                            useCaseIndex: context.useCaseIndex,
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
                        completeUseCase: [
                            {
                                guard: ({context}) =>
                                    context.useCaseIndex === context.numUseCases - 1,
                                target: "#surveyFlow.Finished",
                            },
                            {
                                guard: ({context}) =>
                                    context.useCaseIndex !== context.numUseCases - 1,
                                target: "NotStarted",
                                actions: assign({
                                    useCaseIndex: ({context}) => context.useCaseIndex + 1,
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