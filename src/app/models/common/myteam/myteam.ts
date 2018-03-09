import { Url } from "../url/url";


export interface MyTeam {
current_boss :EspecificMyTeam,
subordinates_list: EspecificMyTeam[]
}

export interface EspecificMyTeam {
    id: number,
    name: string,
    lastname: string,
    phone: string,
    pernr: number,
    image: Url,
    posicion: string,
    unidad_org: string,
    area: string,
    division_per:string,
    subdivision_per:string,
    fecha_nac: string,
    fecha_ingreso: string,
    name_complete: string,
    number_document: number,
    personal_phone: string,
    contract_type: string,
    address: string,
    short_name: string,
    total_work_team: number,
    work_team_reports: WorkTeamReports[]
    }

interface WorkTeamReports{
    title: string,
    icon: string
}

