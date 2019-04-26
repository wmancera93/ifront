import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getEmployeeByNameByPage(termSearch: string, numberPage: string): Observable<any> {
    termSearch = termSearch.replace(' ', '_');
    return this.tokenService.get('coworkers_list/search/' + termSearch + '/' + numberPage)
      .map((data: any) => data.json());

  }

  getAllEmployees(numberPage: string): Observable<any> {
    return this.tokenService.get('coworkers_list/all/' + numberPage)
      .map((data: any) => data.json());
  }

  getEmployeeById(id: string): Observable<any> {
    return this.tokenService.get('employees/' + id)
      .map((data: any) => data.json());
  }

  getEmployeeTravelsById(text: string): Observable<any> {
    return this.tokenService.get('employee_requets/search_employees/' + text)
      .map((data: any) => data.json());
  }



}
