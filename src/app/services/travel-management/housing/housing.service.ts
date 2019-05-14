import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class HousingService {
  public reportLogistics: any;
  constructor(private tokenService: Angular2TokenService) {
    this.reportLogistics = [
      {
        id: 1,
        name: 'Alojamientos',
        code: 'housing_reports',
      },
      {
        id: 2,
        name: 'Transporte',
        code: 'fleet_reports',
      },
    ];
  }

  getReportLogistics() {
    return this.reportLogistics;
  }
  postNewHousing(object: any) {
    return this.tokenService.post('housing', object).map((data: any) => data.json());
  }
  getIndexHousing() {
    return this.tokenService.get('housing').map((data: any) => data.json());
  }
  getShowHousingById(id) {
    return this.tokenService.get('housing/' + id).map((data: any) => data.json());
  }
  putEditHousing(id: string, object: any) {
    return this.tokenService.put('housing/' + id, object).map((data: any) => data.json());
  }
  deleteHousing(id_housing) {
    return this.tokenService.delete('housing/' + id_housing).map((data: any) => data.json());
  }
  putEditBedrooms(idBedrooms: string, label: any) {
    return this.tokenService.put('bedrooms/' + idBedrooms, label).map((data: any) => data.json());
  }
  deleteBedrooms(idBedrooms: string) {
    return this.tokenService.delete('bedrooms/' + idBedrooms).map((data: any) => data.json());
  }
  putEditBed(idBed: string, param:any) {
    return this.tokenService.put('bed/'+ idBed, param).map((data: any) => data.json());
  }
  deleteBed(idBed: string) {
    return this.tokenService.delete('bed/' + idBed).map((data: any) => data.json());
  }
}
