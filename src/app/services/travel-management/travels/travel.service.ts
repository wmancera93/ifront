import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TravelService {

  constructor(private tokenService: Angular2TokenService) { }

  validateDatesTravelRequests(dateBegin: string, dateEnd: string, idEmploee: string ,idTravelExcelpt: string) {
    return this.tokenService.get('travel_requests/is_date_cross/' + dateBegin + '/' + dateEnd + '/' + idEmploee + '/' +idTravelExcelpt)
      .map((data: any) => data.json());
  }
  getplanningTravelRequests() {
    return this.tokenService.get('planning_travel_requests')
      .map((data: any) => data.json());
  }
  getgeographicLocations(id_consult: string) {
    return this.tokenService.get('geographic_locations/show_childrens/' + id_consult)
      .map((data: any) => data.json());
  }
  gettransportTerminals(id_country: string) {
    return this.tokenService.get('geographic_locations/show_transport_terminals/' + id_country)
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
  getHistoricalTravelRequests(id_travel: string) {
    return this.tokenService.get('travel_requests/history_travel_requests/' + id_travel)
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

  getTravelsCosts(id_type_costs: string) {
    return this.tokenService.get('geographic_locations/show_travel_costs/' + id_type_costs)
      .map((data: any) => data.json());
  }

  getTravelsGrahp(imputation_id: string) {
    return this.tokenService.get('geographic_locations/show_travel_graphs/' + imputation_id)
      .map((data: any) => data.json());
  }
  getTravelsOperations(code_grahp: string) {
    return this.tokenService.get('geographic_locations/show_travel_operations/' + code_grahp)
      .map((data: any) => data.json());
  }

  putSendRequestsTravels(id_travels_requests) {
    return this.tokenService.put('travel_requests/send_request_to_approve/' + id_travels_requests, {})
      .map((data: any) => data.json());
  }
  getTravelsAllDetail(id_request: string) {
    return this.tokenService.get('travel_requests/show_all_detail/' + id_request)
      .map((data: any) => data.json());
  }

  getMyTravelRequests() {
    return this.tokenService.get('travel_requests/my_travels_requests')
      .map((data: any) => data.json());
  }
  getFilterTravelCost(id: string, wordFind: string) {
    return this.tokenService.get('geographic_locations/filter_travel_costs/' + id + '/' + wordFind)
      .map((data: any) => data.json());
  }
  getFilterGraphs(id: string, wordFind: string) {
    return this.tokenService.get('geographic_locations/filter_travel_graphs/' + id + '/' + wordFind)
      .map((data: any) => data.json());
  }

  getHotelsByJourney(travel_management_id: string, travel_request_id: string) {
    return this.tokenService.get('travel_requests/show_hotels/' + travel_management_id + '/' + travel_request_id)
      .map((data: any) => data.json());
  }

  deleteHotelsByJourney(id: string, travel_management_id: string, travel_request_id: string) {
    return this.tokenService.delete('travel_requests/destroy_hotel/' + id + '/' + travel_management_id + '/' + travel_request_id)
      .map((data: any) => data.json());
  }

  postHotelNyJourney(object:any, travel_management_id: string, travel_request_id: string){
    return this.tokenService.post('travel_requests/create_hotel/' + travel_management_id + '/' + travel_request_id, object)
    .map((data: any) => data.json());
  }
}
