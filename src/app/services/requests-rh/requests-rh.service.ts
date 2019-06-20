import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class RequestsRhService {
  constructor(public http: HttpClient, private tokenService: Angular2TokenService) {}

  getAllRequests() {
    return this.tokenService.get('employee_requets').map((data: any) => data.json());
  }

  getRequestDetailById(ticket: number) {
    return this.tokenService.get('employee_requets/show_by_company/' + ticket).map((data: any) => data.json());
  }

  postRequests(object: any) {
    return this.tokenService.post('employee_requets', object).map((data: any) => data);
  }

  deleteRequests(id: number) {
    return this.tokenService.delete('employee_requets/' + id).map((data: any) => data.json());
  }
  getAllSelectRequest(id_employee: any, form: string) {
    return this.tokenService.get('employees/index_for_education/' + id_employee + '/' + form).map((data: any) => data.json());
  }
  getListHousingList() {
    return this.tokenService.get('housing/list').map((data: any) => data.json());
  }

  getListBedsHousing(id) {
    return this.tokenService.get(`housing/${id}/list_beds`).map((data: any) => data.json());
  }
  getListTypeDocument() {
    return this.tokenService.get('document_types').map((data: any) => data.json());
  }
  getListVitalDays() {
    return this.tokenService.get('workdays_type').map((data: any) => data.json());
  }
}
