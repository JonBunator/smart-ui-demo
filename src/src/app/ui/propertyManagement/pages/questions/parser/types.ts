export interface TextElementType {
    type: 'text';
    name: string;
    description: string;
    label: string;
    rows?: number;
    number?: boolean;
}

export interface MultipleChoiceGridElementType {
    type: 'multiple-choice-grid';
    name: string;
    description: string;
    xAxisLabels: string[];
    yAxisLabels: string[];
}

export interface MultipleChoiceElementType {
    type: 'multiple-choice';
    name: string;
    label: string;
    description: string;
    labels: string[];
}

export interface UEQPlusElementType {
    type: 'ueq+';
    name: string;
    description: string;
    scaleSize: number;
    labels: string[][];
}

export interface SliderElementType {
    type: 'slider';
    name: string;
    description: string;
    startLabel: string;
    endLabel: string;
}

export type ElementType = TextElementType | MultipleChoiceGridElementType | MultipleChoiceElementType | UEQPlusElementType | SliderElementType;

export interface QuestionaireType {
    title: string;
    description: string;
    elements: ElementType[];
}

export type ElementPropsType<T> = {
    values: T
    onValuesChange: (values: T) => void
}
