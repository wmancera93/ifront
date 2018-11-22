import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';

@Injectable()
export class AdvancesService {

  constructor(private tokenService: Angular2TokenService, public http: HttpClient) { }

  getAdvancePayments() {
    return this.tokenService.get('travel_advance_payments')
      .map((data: any) => data.json());
  }
  getMyAdvancePayments() {
    return this.tokenService.get('travel_advance_payments/my_travels_advances_requests')
      .map((data: any) => data.json());
  }
  getAdvanceListTravel(idEmployee) {
    return this.tokenService.get('travel_requests/index_for_select_advance_pay/' + idEmployee)
      .map((data: any) => data.json());
  }
  getAdvanceMoneyList() {
    return this.tokenService.get('travel_requests/currency_for_select')
      .map((data: any) => data.json());
  }
  postAdvanceList(newAdvances) {
    return this.tokenService.post('travel_advance_payments', newAdvances)
      .map((data: any) => data.json());
  }
  getAdvanceByID(id) {
    return this.tokenService.get('travel_advance_payments/' + id)
      .map((data: any) => data.json());
  }

  sendRequestToApprove(id) {
    return this.tokenService.get('travel_advance_payments/send_request_to_approve/' + id)
      .map((data: any) => data.json());
  }

  deleteRequestAdvance(id){
    return this.tokenService.delete('travel_advance_payments/destroy_request/' + id)
    .map((data: any) => data.json());     
  }
}
