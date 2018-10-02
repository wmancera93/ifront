import { EmployeeInfoComponent } from "../../../../components/common/employee/employee-info/employee-info.component";
import { Url } from "../../url/url";
export interface TravelsApprovals {
    title: string,
    travel_request: travel_request,
    Employee_applicant_to_json: employee_appilicant_to_json,
    type_request_to_json: type_request_to_json
}

export interface travel_request {
    observation: string,
    is_finished: boolean,
    ticket: number,
    approver_platform: string,
    date_begin_format: string,
    date_end_format: string,
    status_request: string,
    updated_date: string,
    created_date: string,
    approvers_to_json: approvers_to_json,
    answers_to_json: answers_to_json,
}
export interface approvers_to_json{
    image:Url,
    short_name:string
}

export interface answers_to_json{
    observation:string,
    approver_to_json: approver_to_json,
    created_date:string,
    status: string
}
export interface approver_to_json{
    name:string,
    position:string,
    level:number,
    image:Url,
    short_name: string,
    personal_code:number,
    name_complete:string,
    lastname:string
}


export interface employee_appilicant_to_json {
    division_per: string,
    subdivision_per: string,
    image: Url,
    short_name : string,
    personal_code: number,
    position:string,
}

export interface type_request_to_json {
    id_activity:string,
    description:string,
    prerequisites:string,
}
