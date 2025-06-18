import {AnyEventObject, assign, emit, fromCallback, setup} from "xstate";

export type SurveyFlowMachineContext = {
    numUseCases: number;
    useCaseDuration: number;
    useCaseIndex: number;
    dataIndex: number;
    timeout: number | null;
};

export type SurveyFlowMachineState = "NotStarted" | "Finished" | {
    UseCase: "NotStarted" | "Running" | "Questions"
}

const surveyFlowMachine = setup({
    types: {
        context: {} as SurveyFlowMachineContext,
        events: {} as
            | { type: "startSurvey" }
            | { type: "startUseCase" }
            | { type: "addData" }
            | { type: "completeUseCase" }
            | { type: "timerOut" }, // TimerOut is only for debugging purposes
        input: {} as { numUseCases: number, useCaseDuration: number },
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
        timeout: null,
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
                    invoke: {
                        id: "timerInterval",
                        src: "timerInterval",
                        input: ({context: {timeout}}) => ({timeout}),
                    },
                    on: {
                        timerOut: {
                            internal: true,
                            target: "Questions",
                        },
                        addData: {
                            actions: [
                                assign({
                                    dataIndex: ({context}) => context.dataIndex + 1,
                                }),
                                emit(({context}) => {
                                    return {
                                        type: "sendEmail",
                                        useCaseIndex: context.useCaseIndex,
                                        dataIndex: context.dataIndex,
                                    };
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