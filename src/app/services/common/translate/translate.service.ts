import { Injectable } from '@angular/core';
import { Translate } from '../../../models/common/translate/translate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class TranslateService {
  public translate: Translate = null;

  constructor(private http: HttpClient) {
    if (this.translate === null) {
      this.getTravelsApprovedReport('ES').subscribe((data: any) => {
        this.translate = JSON.parse(data.data[0].data[0].language_json_file);        
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
    let baseUrl: string;
   
    let url = window.location.href;
    let ambient;

    if (url.split("localhost").length === 1) {
      if (url.split("-").length > 1) {
        ambient = url.split("-")[0].split("/")[url.split("-")[0].split("/").length - 1];
      }
    } else {
      ambient = 'development';
    }

    switch (ambient) {
      case 'development':
        baseUrl = environment.apiBaseHr_development;
        break;
      case 'dev':
        baseUrl = environment.apiBaseHr_development;
        break;
      case 'staging':
        baseUrl = environment.apiBaseHr_staging;
        break;
      case 'demo':
        baseUrl = environment.apiBaseHr_staging;
        break;


      default:
        baseUrl = environment.apiBaseHr_production;
        break;
    }
    return this.http.get(baseUrl + '/api/v2/companies/tree_language/' + languaje)
      .map((data: any) => data);
  }


}
