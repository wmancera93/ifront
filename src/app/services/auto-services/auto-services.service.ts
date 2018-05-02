import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutoServicesService {

  constructor(public http: HttpClient) { }

  getLaboralCertificate(){
    return this.http.get(environment.apiBaseHr + '/api/v2/selfservices/labor_certificates')
    .map((data: Observable<any>) => data);
  }

  getHolidayLetter(){
    return this.http.get(environment.apiBaseHr + '/api/v2/selfservices/holiday_letter')
    .map((data: Observable<any>) => data);
  }
  getPayRollReceipts(){
    return this.http.get(environment.apiBaseHr + '/api/v2/selfservices/payroll_receipts')
    .map((data: Observable<any>) => data);
  }

  getIncomeWithHolding(){
    return this.http.get(environment.apiBaseHr + '/api/v2/selfservices/certificate_income_withholding')
    .map((data: Observable<any>) => data);
  }

}
