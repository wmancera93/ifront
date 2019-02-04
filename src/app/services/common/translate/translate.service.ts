import { Injectable } from '@angular/core';
import { Translate } from '../../../models/common/translate/translate';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TranslateService {
  public translate: Translate = null;

  constructor(private tokenService: Angular2TokenService) {
    if (this.translate === null) {
      this.getTravelsApprovedReport('es').subscribe((data: any) => {
        this.translate = data;
      })
    }
  }

  getTranslate() {
    return this.translate;
  }

  deleteTranslate() {
    this.translate = null;
    return this.translate;
  }
  getTravelsApprovedReport(languaje: any) {
    return this.tokenService.get('companies_traslate/tree_language/' + languaje)
      .map((data: any) => data.json());
  }


}
