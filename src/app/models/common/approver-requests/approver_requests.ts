import { Url } from '../url/url';

export interface AproverRequests {
    title: string;
    requests: Requests[];
}

export interface Requests {
    observation_request: string;
    ticket: string;
    antiquity: string;
    created_date: string;
    action_approvals_requets_index_view: ActionApprovalsIndex[];
    level_answer_description: string;
    level_answer: string;
    employee_applicant_to_json: EmployeeApplicant;
}

export interface ActionApprovalsIndex {
    title: string;
    is_active: boolean;
}

export interface EmployeeApplicant {
    division_per: string;
    subdivision_per: string;
    image: Url;
    short_name: string;
    personal_code: number;
    position: string;
    type_request_to_json: TypeRequest;
}

export interface TypeRequest {
    id_activity: string;
    description: string;
    prerequisites: string;
}

export interface DetailAproverRequest {
    observation_request: string;
    days_request: number;
    file_support: Url;
    is_finished: boolean;
    ticket: number;
    date_begin_format: string;
    date_end_format: string;
    status: string;
    updated_date: string;
    created_date: string;
    approvers_to_json: Approvers[];
    answers_to_json: any[];
    employee_applicant_to_json: EmployeeApplicant;
    type_request_to_json: TypeRequest;
    image?: Url;
}

export interface Approvers {
    image: Url;
    short_name: string;
}

export interface EmployeeApplicant {
    division_per: string;
    subdivision_per: string;
    image: Url;
    short_name: string;
    personal_code: number;
    position: string;
}

export interface TypeRequest {
    id_activity: string;
    description: string;
    prerequisites: string;
}
