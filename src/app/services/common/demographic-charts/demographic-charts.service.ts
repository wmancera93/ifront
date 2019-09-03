import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';

interface BaseData {
  name: string;
  value: number;
}
declare type Data = Observable<{ data: BaseData[]; success: boolean }>;

@Injectable()
export class DemographicChartsService {
  constructor(private tokenService: Angular2TokenService) {}

  getChildrens(): Data {
    return this.tokenService.get('data_demographics/total_children').map((data: any) => data.json());
  }
  getCivilStatus(): Data {
    return this.tokenService.get('data_demographics/civil_status').map((data: any) => data.json());
  }
  getGenerations(): Data {
    return this.tokenService.get('data_demographics/generations').map((data: any) => data.json());
  }
  getGender(): Data {
    return this.tokenService.get('data_demographics/personal_groups').map((data: any) => data.json());
  }
  getAreaNumber(): Data {
    return this.tokenService.get('data_demographics/genders').map((data: any) => data.json());
  }
}
