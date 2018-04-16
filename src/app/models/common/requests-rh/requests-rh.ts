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
    is_finished: boolean,
    type_requests_name: string,
    created: string,
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