import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class QueriesService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getDisabilities() {
    return this.tokenService.get('consultations/disabilities')
      .map((data: any) => data.json());
  }

  getEmbargoes() {
    return this.tokenService.get('consultations/embargoes')
      .map((data: any) => data.json());
  }

  getCompensatedVacations() {
    return this.tokenService.get('consultations/compensated_vacations')
      .map((data: any) => data.json());
  }

  getExtraHours() {
    return this.tokenService.get('consultations/extra_hours')
      .map((data: any) => data.json());
  }

  getIncomeWithholdings() {
    return this.tokenService.get('consultations/income_and_withholdings')
      .map((data: any) => data.json());
  }

  getPaymentsDeductions() {
    return this.tokenService.get('consultations/payments_and_deductions')
      .map((data: any) => data.json());
  }

  getPermissions() {
    return this.tokenService.get('consultations/permissions')
      .map((data: any) => data.json());
  }

  getLoans() {
    return this.tokenService.get('consultations/loans')
      .map((data: any) => data.json());
  }

  getVacationEnjoyed() {
    return this.tokenService.get('consultations/vacation_enjoyed')
      .map((data: any) => data.json());
  }
  getVacationBalance() {
    return this.tokenService.get('consultations/vacation_balance')
      .map((data: any) => data.json());
  }
  getSeverances() {
    return this.tokenService.get('consultations/severances')
      .map((data: any) => data.json());
  }
  getAniversary() {
    return this.tokenService.get('consultations/aniversary')
      .map((data: any) => data.json());
  }
  getHistoricalPosts() {
    return this.tokenService.get('consultations/historical_positions')
      .map((data: any) => data.json());
  }
  getIvaEmployee() {
    return this.tokenService.get('consultations/movements_iva')
      .map((data: any) => data.json());
  }
  getAllEvaluationTime() {
    return this.tokenService.get('evaluation_messages')
      .map((data: any) => data.json());
  }
  getEvaluationMessagesByMonth(period: string) {
    return this.tokenService.get('evaluation_messages/find_for_period/' + period)
      .map((data: any) => data.json());
  }
  getEvaluationMessagesByDay(day: string) {
    return this.tokenService.get('evaluation_messages/find_for_day/' + day)
      .map((data: any) => data.json());
  }
  getEvaluationMessagesByPeriod(date1: string, date2: string) {
    return this.tokenService.get('evaluation_messages/find_date_range/' + date1 + '/' + date2)
      .map((data: any) => data.json());
  }
}
