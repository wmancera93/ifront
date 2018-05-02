import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MasterDataService {

  constructor(public http: HttpClient) { }

  getDataBussiness()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/business')
    .map((data: Observable<any>) => data); 
  }

  getDataBanking()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/banking')
    .map((data: Observable<any>) => data); 
  }

  getDataStudies()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/studies')
    .map((data: Observable<any>) => data); 
  }

  getDataPersonal()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/personal')
    .map((data: Observable<any>) => data); 
  }

  getDataContact()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/contact')
    .map((data: Observable<any>) => data); 
  }

  getDataFamily()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/family')
    .map((data: Observable<any>) => data); 
  }

  getDataBeneficiaries()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/beneficiaries')
    .map((data: Observable<any>) => data); 
  }

  getDataSocialSecurity()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/social_security')
    .map((data: Observable<any>) => data);
  }

  getDataReteFuente()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/my_data/retefuente')
    .map((data: Observable<any>) => data);
  }

}
