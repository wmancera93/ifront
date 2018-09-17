import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';


@Injectable()
export class SpendsService {

  constructor(private tokenService: Angular2TokenService, public http: HttpClient) { }

  getSpendsRequest() {
    return this.tokenService.get('travel_allowance_requests')
      .map((data: any) => data.json());
  }
  getSpendsTypes() {
    return this.tokenService.get('travel_requests/allowance_type_for_select')
      .map((data: any) => data.json());
  }

  getViewDetailSpends(idSpend) {
    return this.tokenService.get('travel_allowance_requests/' + idSpend)
      .map((data: any) => data.json());
  }

  getSpendListTravel() {
    return this.tokenService.get('travel_requests/index_for_select')
      .map((data: any) => data.json());
  }
  getSpendMoneyList() {
    return this.tokenService.get('travel_requests/currency_for_select')
      .map((data: any) => data.json());
  }

  postSpendData(objectSpend: any) {
    return this.tokenService.post('travel_allowance_requests', objectSpend)
      .map((data: any) => data.json());
  }

  deleteSpendData(idDelete) {
    return this.tokenService.delete('travel_allowance_requests/' + idDelete)
      .map((data: any) => data.json());
  }

  putSpendData(idEdit, objectEdit) {
    return this.tokenService.put('travel_allowance_requests/' + idEdit, objectEdit)
      .map((data: any) => data.json());
  }
  deleteDetailSpend(idEdit) {
    return this.tokenService.delete('travel_allowances/destroy_allowance/' + idEdit)
      .map((data: any) => data.json());
  }

  getDetailSpendEdit(idEdit) {
    return this.tokenService.get('travel_allowances/' + idEdit)
      .map((data: any) => data.json());
  }
}
