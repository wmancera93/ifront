
export interface Spends {
    employee_id: number,
    id: number,
    info_travel: InfoTravel,
    level: number,
    pending_synch_server: any,
    status: string,
    travel_request_id: number
}

export interface InfoTravel {
    employee_id: number,
    name_travel: string,
    ticket: number,
    travel_requests_type_id: number,
    travel_requests_type_name: string,
    travel_type_id: number,
    travel_type_name: string
}

export interface SpendsCreate {
    travel_request_id: number,
    allowances: ObjectSpends[],
    anexeds: Annexes[]
}

export interface ObjectSpends {
    id: string,
    id_temp?: number,
    travel_allowance_type_id: number,
    currency_id: number,
    value: number,
    date: string,
    observation: string,
    bill_number: string,
    control_number: string,
    nit: string,
    bussines_name: string,
    doc_num_origin: string,
    provider_code: string,
    population: string,
    have_format: boolean,
    type_of_expense_document: number,

}

export interface Annexes {
    file: any
}
