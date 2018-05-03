import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class MasterDataService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getDataBussiness() {
    return this.tokenService.get('my_data/business')
      .map((data: any) => data.json());
  }

  getDataBanking() {
    return this.tokenService.get('my_data/banking')
      .map((data: any) => data.json());
  }

  getDataStudies() {
    return this.tokenService.get('my_data/studies')
      .map((data: any) => data.json());
  }

  getDataPersonal() {
    return this.tokenService.get('my_data/personal')
      .map((data: any) => data.json());
  }

  getDataContact() {
    return this.tokenService.get('my_data/contact')
      .map((data: any) => data.json());
  }

  getDataFamily() {
    return this.tokenService.get('my_data/family')
      .map((data: any) => data.json());
  }

  getDataBeneficiaries() {
    return this.tokenService.get('my_data/beneficiaries')
      .map((data: any) => data.json());
  }

  getDataSocialSecurity() {
    return this.tokenService.get('my_data/social_security')
      .map((data: any) => data.json());
  }

  getDataReteFuente() {
    return this.tokenService.get('my_data/retefuente')
      .map((data: any) => data.json());
  }

}
