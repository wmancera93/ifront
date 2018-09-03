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
    return this.tokenService.get('/travel_allowance_requests/' + idSpend)
      .map((data: any) => data.json());
  }

}
