import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TravelService {

  constructor(private tokenService: Angular2TokenService) { }

  getplanningTravelRequests() {
    return this.tokenService.get('planning_travel_requests')
      .map((data: any) => data.json());
  }
  getgeographicLocations(id_consult: string) {
    return this.tokenService.get('geographic_locations/show_childrens/' + id_consult)
      .map((data: any) => data.json());
  }
  gettransportTerminals(id_city: string) {
    return this.tokenService.get('geographic_locations/show_transport_terminals/' + id_city)
      .map((data: any) => data.json());
  }
  getTravelRequests() {
    return this.tokenService.get('travel_requests')
      .map((data: any) => data.json());
  }
  getTravelRequestsByid(idTravel: string, edit: boolean) {
    return this.tokenService.get('travel_requests/' + idTravel + '/' + edit)
      .map((data: any) => data.json());
  }

  deleteTravelById(id: string) {
    return this.tokenService.delete('travel_requests/' + id)
      .map((data: any) => data.json());
  }
  getTravelById(id: string) {
    return this.tokenService.get('travel_requests/' + id)
      .map((data: any) => data.json());
  }
  getDestinationsById(id: string, travel_request_id: string) {
    return this.tokenService.get('travel_requests/show_journey/' + id + '/' + travel_request_id)
      .map((data: any) => data.json());
  }

  deleteTravelByDestination(id: string, id_requests_tarvels: any) {
    return this.tokenService.delete('travel_requests/destroy_journey/' + id + '/' + id_requests_tarvels)
      .map((data: any) => data.json());
  }

  deleteFile(id: string, id_requests_tarvels: any) {
    return this.tokenService.delete('travel_requests/destroy_file/' + id + '/' + id_requests_tarvels)
      .map((data: any) => data.json());
  }
  putEditTravel(id_request: any, newEditTravel: any) {
    return this.tokenService.put('travel_requests/' + id_request, newEditTravel)
      .map((data: any) => data.json());
  }
}
