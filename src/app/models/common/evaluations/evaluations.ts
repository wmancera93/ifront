export interface EvaluationState {
    pending: Evaluations,
    submitted: Evaluations
}
export interface Evaluations {
    id?: number,
    title?: string,
    description: string,
    questions?: Questions
}

export interface Questions {
    id: number,
    description: string,
    answer_options: Answers
}
export interface Answers {
    id: number,
    comment: string
}

export interface ResponseEvaluation {
    evaluation_id: number,
    answers: ResponseAnswer[]
}

export interface ResponseAnswer {
    question_id: number,
    answer_id?: number,
    comments?: string
}

