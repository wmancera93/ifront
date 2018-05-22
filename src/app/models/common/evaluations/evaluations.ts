export interface EvaluationState
{
    pending: Evaluations,
    submitted: Evaluations
}
export interface Evaluations {
     id?:number,
     title?:string,
     description:string,
     questions?:Questions
}

export interface Questions
{
    id:number,
    description:string,
    answer_options : Answers
}
export interface Answers
{
    id:number,
    description:string
}