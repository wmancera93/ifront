import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class DemographicChartsService {

  constructor(private tokenService: Angular2TokenService) { }

  getChildrens() {
    return this.tokenService.get('demographic_data/total_children')
      .map((data: any) => data.json());
  }
}
