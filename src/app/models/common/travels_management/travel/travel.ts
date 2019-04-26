import { Url } from '../../url/url';

export interface Travel {
    travel_managements: Travel_managements;
    travel_request: Travel_request;
    travel_request_annexeds: Travel_request_annexeds[];
}

export interface Travel_managements {
    data?: any;
    labels?: any;
    title: string;
    title_table: string;
}

export interface Travel_request {
    answers_to_json?: any;
    created_date: string;
    employee_applicant_to_json: Employee_applicant_to_json;
    is_finished: boolean;
    observation: string;
    pending_level_approver: Pending_level_approver;
    status_request: string;
    ticket: number;
    travel_requests_type_id: number;
    travel_requests_type_name: string;
    travel_type_id: number;
}

export interface Travel_request_annexeds {
   id: number;
   name: string;
   file: Url;
}

export interface Employee_applicant_to_json {
    division_per: string;
    image: Url;
    personal_code: number;
    position: string;
    short_name: string;
    subdivision_per: string;
}

export interface Pending_level_approver {
    approver_employee: Approver_employe;
    level: number;
    status_request: string;
    ticket: number;
    travel_requests_type_id: number;
    travel_requests_type_name: string;
    travel_type_id: number;
}
export interface Approver_employe {
    image: Url;
    lastname: string;
    name: string;
    name_complete: string;
    personal_code: number;
    position: string;
    short_name: string;
}
