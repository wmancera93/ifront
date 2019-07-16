import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class DemographicChartsService {

  constructor(private tokenService: Angular2TokenService) { }

  getChildrens() {
    return this.tokenService.get('data_demographics/total_children')
      .map((data: any) => data.json());
  }
  getCivilStatus() {
    return this.tokenService.get('data_demographics/civil_status')
      .map((data: any) => data.json());
  }
  getGenerations() {
    return this.tokenService.get('data_demographics/generations')
      .map((data: any) => data.json());
  }
}
