import { Url } from '../url/url';


export interface MyTeam {
current_boss: EspecificMyTeam;
subordinates_list: EspecificMyTeam[];
}

export interface EspecificMyTeam {
    id: number;
    name: string;
    lastname: string;
    phone: string;
    pernr: number;
    image: Url;
    posicion: string;
    unidad_org: string;
    area: string;
    division_per: string;
    subdivision_per: string;
    fecha_nac: string;
    fecha_ingreso: string;
    name_complete: string;
    number_document: number;
    personal_phone: string;
    contract_type: string;
    address: string;
    short_name: string;
    total_work_team: number;
    work_team_reports: WorkTeamReports[];
    }

interface WorkTeamReports {
    title: string;
    icon: string;
}

export interface InfoWorkTeamReport {
    title: string;
    labels: string[];
    data: Data[];
}

 export interface Data {
    id: string;
    type_absence?: string;
    description_absence?: string;
    start_absence?: string;
    end_absence?: string;
    days_payroll?: number;
    days_natural?: number;
    description_payroll?: string;
    type_accumulation?: string;
    previous_amount?: number;
    current_amount?: number;
    difference_amount?: number;
    percentage_difference?: number;
    field_0?: string;
    field_1?: string;
    field_2?: string;
    field_3?: string;
    field_4?: number;
    begda?: string;
    endda?: string;
    position?: number;
    amount_accrued?: number;
    type_rotation?: string;
    denomination_class?: string;
    denomination_motive?: string;
}

