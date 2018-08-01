import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TravelService {

  constructor(private tokenService: Angular2TokenService) { }

  getplanningTravelRequests() {
    return this.tokenService.get('planning_travel_requests')
      .map((data: any) => data.json());
  }
  getgeographicLocations(id_consult:string) {
    return this.tokenService.get('geographic_locations/show_childrens/'+ id_consult)
      .map((data: any) => data.json());
  }
  gettransportTerminals(id_city:string) {
    return this.tokenService.get('geographic_locations/show_transport_terminals/'+ id_city)
      .map((data: any) => data.json());
  }
  getTravelRequests() {
    return this.tokenService.get('travel_requests')
      .map((data: any) => data.json());
  }
  getTravelRequestsByid(idTravel:string) {
    return this.tokenService.get('travel_requests/'+ idTravel)
      .map((data: any) => data.json());
  }
}
