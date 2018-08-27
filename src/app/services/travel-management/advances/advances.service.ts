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
  getAdvanceListTravel() {
    return this.tokenService.get('travel_requests/index_for_select')
      .map((data: any) => data.json());
  }
  getAdvanceMoneyList() {
    return this.tokenService.get('travel_requests/currency_for_select')
      .map((data: any) => data.json());
  }
  postAdvanceMoneyList(newAdvances) {
    return this.tokenService.post('travel_advance_payments',{advances:newAdvances})
      .map((data: any) => data.json());
  }
  getAdvanceByID(id) {
    return this.tokenService.get('/travel_advance_payments/'+id)
      .map((data: any) => data.json());
  }
}
