import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { TrayectBase } from '../../../models/common/travels_management/transportation-logistic/transport-logistic';

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

  createMoreTrayects(id, object: { trayects: TrayectBase[] }) {
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
    dateEndTravel: string,
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
          dateEndTravel +
          '/' +
          typeTransport,
      )
      .map((data: any) => data.json());
  }
  getDestinyFleets() {
    return this.tokenService.get('transportation_destinations').map((data: any) => data.json());
  }
  getTrayectRequestsFleet(idDestiny: string) {
    return this.tokenService.get('transportation_destinations/' + idDestiny + '/journeys').map((data: any) => data.json());
  }
  getTrayecReportExcel(pernr: number, id: string){
    return this.tokenService.get('transport_report/transport_export_employee/' + pernr + '/' + id)
      .map(data => data);
  }
}
