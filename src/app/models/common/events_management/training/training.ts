export interface TrainingDetail {
    area_management_name: string,
    area_management_position:string,
    code:string,
    end_date_trainnig:Date,
    id:number,
    name:string,
    ndays:number,
    nhours_for_days:number,
    num_pers_area_management:number,
    pdf:string,
    position_area_management:number,
    position_training_manager:number,
    start_date_trainig:Date,
    status_id:number,
    status_text:string,
    training_manager_name:string,
    training_manager_position:string
}

export interface State{
 id: number,
 is_confirmed: boolean,
 observation?: string
}