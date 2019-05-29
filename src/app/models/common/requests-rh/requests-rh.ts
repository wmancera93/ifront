import { Url } from '../url/url';

export interface RequestsRh {
  title: string;
  request_types: TypesRequests[];
  my_requests_list: ListRequests[];
  list_requets_types: ListRequetsTypes[];
}

export interface TypesRequests {
  id: number;
  id_activity: string;
  name: string;
  alias:string;
  available_days: number;
  maximum_days: number;
  minimum_days: number;
}

export interface ListRequests {
  ticket: number;
  observation_request: string;
  is_finished: boolean;
  type_requests_id: number;
  type_requests_name: string;
  created_date: string;
  status: string;
  next_approver_to_json: NextApprover;
  action_employee_requets_index_view: Action[];
  flag_count?: number;
}

export interface ListRequetsTypes {
  id: number;
  alias: string;
  id_activity: string;
  name: string;
  active?: boolean;
}

export interface NextApprover {
  level: number;
  platform: string;
  approver_employee: AproverEmployee;
}

export interface Action {
  title: string;
  is_active: boolean;
}

export interface AproverEmployee {
  posicion: string;
  short_name: string;
}

export interface DetailRequest {
  message_pending_level_approver?: string;
  pending_level_approver: PendingLevelApprover;
  request: Request;
  total_request_answers: number;
  title: string;
}

export interface Request {
  observation_request: string;
  days_request: number;
  id_activity: string;
  image: Url;
  is_finished: boolean;
  ticket: number;
  type_requests_name: string;
  date_begin_format: string;
  date_end_format: string;
  employee_applicant_to_json: EmployeeRequest;
  answers_to_json: AnswersToJson[];
  created_date: string;
}

export interface EmployeeRequest {
  posicion: string;
  division_per: string;
  subdivision_per: string;
  image: Url;
  short_name: string;
  personal_code: number;
}

export interface PendingLevelApprover {
  level: number;
  approver_employee: ApproverEmployee;
}

export interface AnswersToJson {
  description: string;
  approver_to_json: ApproverEmployee;
  created_date: string;
}

export interface ApproverEmployee {
  name: string;
  lastname: string;
  personal_code: number;
  image: Url;
  position: string;
  name_complete: string;
  short_name: string;
  level?: number;
}

export interface formsRequest {
  observation_request?: boolean;
  date_begin?: boolean;
  date_end?: boolean;
  days_request?: boolean;
  file_support?: boolean;
  start_time?: boolean;
  end_time?: boolean;
  file_sopport?: boolean;
}

export declare interface TypesRequest {
  VITD: formsRequest;
  PRSC: formsRequest;
  INCA: formsRequest;
  PERM: formsRequest;
  VCCP: formsRequest;
  VACA: formsRequest;
}

export declare interface DetailRequestLogistics{
  date_in:string,
  date_out:string,
  benefist:string,
  thrid:string,
  companion:string,
  destiny:string,
  number_bed:number|string,
  label_bed: string,
  plate:string
} 
