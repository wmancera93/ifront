export interface EvaluationState {
    pending: Evaluations,
    submitted: Evaluations
}
export interface Evaluations {
    id?: number,
    code: string,
    title?: string,
    description: string,
    questions_to_json: Questions[],
    sections_to_json: Sections
}
export interface Sections {
    id: number,
    description: string,
    code: string,
    question_type_id?: number,
    parent_id?: number,
    question_childrens_to_json?: Questions[],
    answer_options?: Answers
}

export interface Questions {
    id: number,
    description: string,
    code: string,
    answer_options: Answers,
    parent_id: string,
    question_type: QuestionType,
    question_type_id: number
}
export interface QuestionType {
    code: string
}
export interface Answers {
    id: number,
    description: string,
    code: string
}

export interface ResponseEvaluation {
    section_id?: number,
    evaluation_id: number,
    question_id: number,
    answer_id?: number,
    comments?: string,
    openAnswer?: string,
    answers?: MultipleAnswer[],
    parent_id?: number,
    question_type: string
}

export interface MultipleAnswer {
    answer_id: number
}