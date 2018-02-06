import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  getDataEnterprise(){
    return this.http.get(environment.apiBaseHr + "/api/v2/companies/whoami")
    .map((data) => data);
  }

}