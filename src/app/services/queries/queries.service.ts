import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QueriesService {

  constructor(public http: HttpClient) { }

  getDisabilities() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/disabilities')
      .map((data: Observable<any>) => data);
  }

  getEmbargoes() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/embargoes')
      .map((data: Observable<any>) => data);
  }

  getCompensatedVacations() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/compensated_vacations')
      .map((data: Observable<any>) => data);
  }

  getExtraHours() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/extra_hours')
      .map((data: Observable<any>) => data);
  }

  getIncomeWithholdings() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/income_and_withholdings')
      .map((data: Observable<any>) => data);
  }

  getPaymentsDeductions() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/payments_and_deductions')
      .map((data: Observable<any>) => data);
  }

  getPermissions() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/permissions')
      .map((data: Observable<any>) => data);
  }

  getLoans() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/loans')
      .map((data: Observable<any>) => data);
  }

  getVacationEnjoyed() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/vacation_enjoyed')
      .map((data: Observable<any>) => data);
  }
  getVacationBalance() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/vacation_balance')
      .map((data: Observable<any>) => data);
  }
  getSeverances() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/severances')
      .map((data: Observable<any>) => data);
  }
  getAniversary() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/aniversary')
      .map((data: Observable<any>) => data);
  }
}
