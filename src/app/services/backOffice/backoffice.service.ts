import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class BackofficeService {
  constructor(private tokenService: Angular2TokenService) {}

  getFindEmployee(id: string, name: string) {
    return this.tokenService.get('user/search_employee/' + id + '/' + name).map((data: any) => data.json());
  }

  putUnlockedEmployee(idLogin: string, idUser: string) {
    return this.tokenService.put('user/info_employee/' + idLogin + '/' + idUser, {}).map((data: any) => data.json());
  }
  putChangeColors(idLogin: string, object: any) {
    return this.tokenService.put('companies/change_company_color/' + idLogin, object).map((data: any) => data.json());
  }
}
