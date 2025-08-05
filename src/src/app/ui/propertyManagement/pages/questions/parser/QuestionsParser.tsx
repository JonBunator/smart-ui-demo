"use client"
import { useSurveyManager } from "@/app/ui/propertyManagement/surveyManager/SurveyManagerProvider";
import {QuestionaireType} from "@/app/ui/propertyManagement/pages/questions/parser/types";
import TextElement from "@/app/ui/propertyManagement/pages/questions/parser/elements/TextElement";
import {Button, Typography} from "@mui/material";
import React, {createContext, useCallback, useContext, useMemo, useRef, useState} from "react";
import MultipleChoiceElement from "@/app/ui/propertyManagement/pages/questions/parser/elements/MultipleChoiceElement";
import CheckboxesElement from "@/app/ui/propertyManagement/pages/questions/parser/elements/CheckboxesElement";
import MultipleChoiceGridElement
    from "@/app/ui/propertyManagement/pages/questions/parser/elements/MultipleChoiceGridElement";
import Markdown from "react-markdown";

interface QuestionsParserProps<T> {
    addData: (data: T) => Promise<boolean>
    questionaire: QuestionaireType;
}

interface QuestionsParserContextType {
    /**
     * Subscribes to validation updates. Returns unsubscribe function.
     * @param listener The listener that should listen to validation updates.
     */
    subscribe: (listener: () => boolean) => () => void;
}

const QuestionsParserContext = createContext<QuestionsParserContextType | undefined>(undefined);

export default function QuestionsParser<T>(props: QuestionsParserProps<T>) {
    const {addData, questionaire} = props;
    const [formData, setFormData] = useState<T>({} as unknown as T);
    const errorRef = useRef<Element | null>(null);
    const validationListeners = useRef<Set<() => boolean>>(new Set());
    const { completeQuestions } = useSurveyManager();

    async function submit() {
        const errors = Array.from(validationListeners.current.values()).map(listener => listener());
        const hasErrors = errors.some((error) => error);
        if (!hasErrors) {
            const success = await addData(formData)
            if(!success) {
                console.error("Saving data failed.")
                return;
            }
            completeQuestions();
        } else {
            scrollToError();
        }
    }

    function scrollToError() {
        const errorElement = document.querySelector('.Mui-error');
        if (errorElement) {
            errorRef.current = errorElement;
            errorElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    }

    const subscribe = useCallback((listener: () => boolean) => {
        validationListeners.current.add(listener);
        return () => validationListeners.current.delete(listener);
    }, []);

    const value = useMemo(() => ({
        subscribe,
    }), [subscribe]);

    return (
        <QuestionsParserContext.Provider value={value}>
            <div className="questionaire-wrapper">
                <div className="header">
                    <Typography variant="h5">{questionaire.title}</Typography>
                    <Typography variant="body1">{questionaire.description}</Typography>
                </div>
                <div className="questions">
                    {questionaire.elements.map((element, index) => {
                        return (
                            <div className="question" key={element.name}>
                                    <div className="question-header">
                                        <Typography variant="body1">{`${index + 1}. `}</Typography>
                                        <Markdown>
                                        {`${element.description}${element.type !== "checkboxes" ? " *": ""}`}
                                        </Markdown>
                                    </div>
                                <div className="question-input">
                                    {(() => {
                                        switch (element.type) {
                                            case "text":
                                                return <TextElement element={element} values={formData} onValuesChange={setFormData} />
                                            case "multiple-choice-grid":
                                                return <MultipleChoiceGridElement element={element} values={formData} onValuesChange={setFormData} />
                                            case "multiple-choice":
                                                return <MultipleChoiceElement element={element} values={formData} onValuesChange={setFormData} />
                                            case "checkboxes":
                                                return <CheckboxesElement element={element} values={formData} onValuesChange={setFormData} />
                                            default:
                                                return null;
                                        }
                                    })()}
                                </div>
                        </div>
                        );
                    })}
                </div>
            </div>
            <div className="action-row">
                <Button variant="contained" onClick={submit}>Abschicken</Button>
            </div>
        </QuestionsParserContext.Provider>
    );
}

export function useQuestionsParser(): QuestionsParserContextType {
    const context = useContext(QuestionsParserContext);
    if (!context) {
        throw new Error('useQuestionsParser must be used within a QuestionsParserProvider');
    }
    return context;
}