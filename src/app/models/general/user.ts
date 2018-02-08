export interface User {
    id: number,
    email: string,
    provider: string,
    employee_id: number,
    company_id: number,
    uid: string,
    nickname: string,
    active: boolean,
    employee: Employee
}

export interface Employee {
    email: string,
    pernr: number,
    image: Url,
    posicion: string,
    short_name: string,  
}

export interface Url {
    url: string
}