import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  getDataEnterprise(ambient) {
    let baseUrl: string;


    switch (ambient) {
      case 'development':
        baseUrl = environment.apiBaseHr_development;
        break;
      case 'dev':
        baseUrl = environment.apiBaseHr_development;
        break;
      case 'staging':
        baseUrl = environment.apiBaseHr_staging;
        break;
      case 'demo':
        baseUrl = environment.apiBaseHr_staging;
        break;


      default:
        baseUrl = environment.apiBaseHr_production;
        break;
    }
    return this.http.get(baseUrl + '/api/v2/companies/whoami')
      .map((data: any) => data);
  }

}
