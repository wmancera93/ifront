import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TravelManagementService {

  constructor(private tokenService: Angular2TokenService) { }

  getplanningTravelRequests() {
    return this.tokenService.get('planning_travel_requests')
      .map((data: any) => data.json());
  }
      getgeographicLocations(id_consult:string) {
    return this.tokenService.get('geographic_locations/show_childrens/'+ id_consult)
      .map((data: any) => data.json());
  }
}
