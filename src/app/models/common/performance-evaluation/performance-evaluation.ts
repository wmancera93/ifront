import { Url } from "../url/url";

export interface PerformanceEvaluation {
    id:number;
    code:string;
    name:string;
    status_name:string;
    count_evaluation_objetives:number;
    current_weight:string;
    missing_weight:string;
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
    area: string,
    division_per:string
    get_domain_of_email:string,
    get_user_of_email:string,
    id:number,
    image:Url,
    lastname:string,
    name:string,
    name_complete:string,
    pernr:number,
    personal_code:number,
    personal_phone:string,
    phone:string,
    position:string,
    short_name:string,
    subdivision_per:string,
    unidad_org:string

}