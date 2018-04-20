import { Url } from "../url/url";


export interface RequestsRh {
    title: string,
    request_types: TypesRequests[],
    my_requests_list: ListRequests[]
}

export interface TypesRequests {
    id: number,
    id_activity: string,
    name: string,
    available_days: number
}

export interface ListRequests {
    ticket: number,
    observation_request: string,
    is_finished: boolean,
    type_requests_name: string,
    created_date: string,
    status: string,
    next_approver_to_json: NextApprover,
    action_employee_requets_index_view: Action[]
}

export interface NextApprover {
    level: number,
    platform: string,
    approver_employee: AproverEmployee
}

export interface Action {
    title: string,
    is_active: boolean
}

export interface AproverEmployee {
    posicion: string,
    short_name: string
}

export interface DetailRequest {
    pending_level_approver: PendingLevelApprover,
    request: Request,
    total_request_answers: number,
    title: string
}


export interface Request {
    id: number,
    date_begin: string,
    date_end: string,
    created_at: string,
    observation_request: string,
    days_request: number,
    id_activity: string,
    file_support: Url,
    name_applicant: string,
    is_finished: boolean,
    posicion_applicant: string,
    type_requests_name: string,
    employee: EmployeeRequest
    answers: object[]
}

export interface EmployeeRequest {
    id: number,
    name: string,
    lastname: string,
    phone: string,
    pernr: number,
    image: Url,
    posicion: string,
    unidad_org: string,
    area: string,
    division_per: string,
    subdivision_per: string,
    fecha_nac: string,
    fecha_ingreso: string,
    name_complete: string,
    number_document: string,
    personal_phone: string,
    contract_type: string,
    address: string,
}

export interface PendingLevelApprover {
    level: number,
    approver_employee: ApproverEmployee
}

export interface ApproverEmployee {
    name: string,
    lastname: string,
    pernr: number,
    image: Url,
    posicion: string,
    name_complete: string,
    short_name: string
}
