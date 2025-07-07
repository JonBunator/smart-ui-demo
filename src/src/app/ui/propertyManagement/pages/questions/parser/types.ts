export interface TextareaElementType {
    type: 'textarea';
    name: string;
    description: string;
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
    description: string;
    labels: string[];
}

export interface CheckboxesElementType {
    type: 'checkboxes';
    name: string;
    description: string;
    labels: string[];
}

export type ElementType = TextareaElementType | MultipleChoiceGridElementType | MultipleChoiceElementType | CheckboxesElementType;

export interface QuestionaireType {
    title: string;
    description: string;
    elements: ElementType[];
}

export type ElementPropsType<T> = {
    values: T
    onValuesChange: (values: T) => void
}
