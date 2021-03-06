import { Url } from '../common/url/url';

export interface User {
  id: number;
  email: string;
  provider: string;
  employee_id: number;
  company_id: number;
  uid: string;
  nickname: string;
  active: boolean;
  employee: Employee;
}

export interface Permit {
  state: boolean;
  name: string;
}
export enum PermitsUser {
  PERMISSIONS_SEE_INCOME = 'PERMISSIONS_SEE_INCOME',
  PERMISSIONS_SEE_RETENTIONS = 'PERMISSIONS_SEE_RETENTIONS',
  SHOW_BENEFITS = 'SHOW_BENEFITS',
  HELP = 'HELP',
  BFFE = 'BFFE',
}

export interface Permits {
  PERMISSIONS_SEE_INCOME: Permit;
  PERMISSIONS_SEE_RETENTIONS: Permit;
  SHOW_BENEFITS: Permit;
  HELP: Permit;
  BFFE: Permit;
}

export interface Employee {
  modal?: string;
  email: string;
  pernr: number;
  image: Url;
  posicion: string;
  short_name: string;
  id?: number;
  name?: string;
  lastname?: string;
  name_complete?: string;
  favorite?: boolean;
  phone?: number;
  unidad_org?: string;
  area?: string;
  division_per?: string;
  subdivision_per?: string;
  fecha_nac?: Date;
  fecha_ing?: Date;
  personal_phone?: number;
  contract_type?: string;
  my_boss_employee?: Boss;
  address?: string;
  see_organ?: string;
  see_rpgen?: string;
  is_admin?: string;
  is_travel_approver?: string;
  new_cont?: string;
  is_approver?: boolean;
  trip_by_third?: boolean;
  is_travel_manager?: boolean;
  cost_center?: string;
  city?: string;
  permits?: Permits;
}
export interface Boss {
  name_complete?: string;
  area?: string;
}
