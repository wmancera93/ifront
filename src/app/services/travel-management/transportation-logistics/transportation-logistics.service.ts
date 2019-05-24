import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TransportationLogisticsService {
  constructor(private tokenService: Angular2TokenService) {}

  getIndexTransportation() {
    return this.tokenService.get('vehicle').map((data: any) => data.json());
  }

  getDetailFleets(idFleets) {
    return this.tokenService.get('vehicle/' + idFleets).map((data: any) => data.json());
  }

  postNewFleet(object: any) {
    return this.tokenService.post('vehicle', object).map((data: any) => data.json());
  }

  createMoreTrayects(id, object: any) {
    return this.tokenService.post(`vehicle/${id}/create_more_journeys`, object).map((data: any) => data.json());
  }

  editFleet(id, object: any) {
    return this.tokenService.put(`vehicle/${id}`, object).map((data: any) => data.json());
  }

  deleteFleet(idFleets) {
    return this.tokenService.delete('vehicle/' + idFleets).map((data: any) => data.json());
  }

  deleteJourney(id) {
    return this.tokenService.delete('trips_journey/' + id).map((data: any) => data.json());
  }
  getReportFleets(
    driver: string,
    plate: string,
    destiny: string,
    dateTravel: string,
    availability: string,
    ocupation: string,
    typeTransport: string,
  ) {
    return this.tokenService
      .get(
        'transport_report/report_vehicle/' +
          driver +
          '/' +
          plate +
          '/' +
          destiny +
          '/' +
          dateTravel +
          '/' +
          availability +
          '/' +
          ocupation +
          '/' +
          typeTransport,
      )
      .map((data: any) => data.json());
  }
  getDestinyFleets() {
    return this.tokenService.get('transportation_destinations').map((data: any) => data.json());
  }
}
