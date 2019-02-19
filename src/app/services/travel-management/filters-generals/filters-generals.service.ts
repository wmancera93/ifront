import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class FiltersGeneralsService {

  constructor(private tokenService: Angular2TokenService) { }

  getSearchByTravelNumberSAP(current_view: string, number: string) {
    return this.tokenService.get('travel_request_filters/search_by_travel_number/' + current_view + '/' + number)
      .map((data: any) => data.json());
  }

  getSearchByTravelNumberIHR(current_view: string, number: string) {
    return this.tokenService.get('travel_request_filters/search_by_travel_number_id/' + current_view + '/' + number)
      .map((data: any) => data.json());
  }

  getSearchTravelByStatus(current_view: string, status: string) {
    return this.tokenService.get('travel_request_filters/filters_by_state/' + current_view + '/' + status)
      .map((data: any) => data.json());
  }
 
  getSearchTravelByStatusLiquid(current_view: string, status: string) {
    return this.tokenService.get('travel_request_filters/filters_by_liquid/' + current_view + '/' + status)
      .map((data: any) => data.json());
  }

  getSearchTravelByDate(current_view: string, date_begin: string, date_end:string) {
    return this.tokenService.get('travel_request_filters/search_by_date/' + current_view + '/' + date_begin + '/' + date_end)
      .map((data: any) => data.json());
  }

  getSearchTravelByEmployee(current_view: string, employee: string) {
    return this.tokenService.get('travel_request_filters/search_by_travel_employee/' + current_view + '/' + employee)
      .map((data: any) => data.json());
  }

}
