import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ReportTravelsService {

  constructor(private tokenService: Angular2TokenService) { }
  
  getTravelsRequestsReport(param : any) {
    return this.tokenService.get('travel_requests/travel_request_report/' + param)
      .map((data: any) => data.json());
  }

  getTravelsRequestsReportExcel(id : any) {
    return this.tokenService.get('travel_requests/travel_request_report/' + id)
      .map((data: any) => data.json());
  }
}
