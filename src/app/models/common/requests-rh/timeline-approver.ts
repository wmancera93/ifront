export interface EmployeeRequetsData {
  data: EmployeeRequets[];
  success: boolean;
}
export interface EmployeeRequets {
  title: string;
  request: Request;
  total_request_answers?: number;
  pending_level_approver: PendingLevelApprover;
  message_pending_level_approver: null;
  details_request?: DetailsRequest;
}

export interface DetailsRequest {}

export interface PendingLevelApprover {
  level: number;
  approver_employee: Approver;
}

export interface Approver {
  name: string;
  lastname: string;
  image: Image;
  name_complete: string;
  short_name: string;
  personal_code: number;
  position: string;
  level?: number;
}

export interface Image {
  url: string;
}

export interface Request {
  observation_request: string;
  days_request: number;
  id_activity?: string;
  is_finished?: boolean;
  ticket?: number;
  type_requests_name: string;
  date_begin_format: string;
  date_end_format: string;
  start_time_format?: string;
  end_time_format?: string;
  employee_applicant_to_json: EmployeeApplicantToJSON;
  answers_to_json: AnswersToJSON[];
  created_date: string;
  image?: Image | null;
  non_work_days?: number;
  work_days?: number;
  show_alias?: string;
  total_ammount?: string;
  name_family?: string;
  name_institute?: string;
  days_request_details?: string;
}

export interface AnswersToJSON {
  description: string;
  approver_to_json: Approver;
  created_date: string;
  status: string;
  status_id: string;
}

export interface EmployeeApplicantToJSON {
  id: number;
  division_per: string;
  subdivision_per: string;
  number_document: string;
  div_person_code: string;
  image: Image;
  short_name: string;
  personal_code: number;
  position: string;
  society_code: string;
}
