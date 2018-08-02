import { Url } from "../url/url";

export interface PerformanceEvaluation {
    id:number;
    code:string;
    name:string;
    status_name:string;
    status_code:string;
    created_date: string;
    updated_date: string;
    start_evaluation_date: string;
    end_evaluation_date:string;
    start_planning_date:string,
    end_planning_date:string,
    start_excecution_date:string;
    end_excecution_date: string;
    target_date:string;
    qualifier?: Qualifier;
    period_evaluation: string,
    period_planning: string,
}
export interface Qualifier{
    id: number;
    name:string;
    lastname: string;
    phone:string;
    pernr: number;
    image: Url
    unidad_org:string;
    area: string;
    division_per:string;
    subdivision_per:string;
    name_complete: string;
    personal_phone: string;
    short_name:string;
    personal_code: number;
    position:string;
    get_user_of_email: string;
    get_domain_of_email:string;

}