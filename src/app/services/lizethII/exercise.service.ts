import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ExerciseService {

  constructor(private tokenService: Angular2TokenService) { }

  getObtenertodo() {
    return this.tokenService.get('hr_reports/requests')
      .map((data: any) => data.json());
  }

  getObtenerPorStado(estado: string) {
    return this.tokenService.get('hr_reports/requests/' + estado)
      .map((data: any) => data.json());
  }


}
