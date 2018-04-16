import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestsRhService {

  constructor(public http: HttpClient) { }

  getAllRequests() {
    return this.http.get(environment.apiBaseHr + '/api/v2/employee_requets')
      .map((data: Observable<any>) => data);
  }

}
