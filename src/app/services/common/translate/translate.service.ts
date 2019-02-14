import { Injectable } from '@angular/core';
import { Translate } from '../../../models/common/translate/translate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class TranslateService {
  public translate: Translate = null;

  constructor(private http: HttpClient) {
    if (this.translate === null) {
      this.changeLanguaje('es');
    }
  }

  changeLanguaje(param: string){
    this.getTransalate(param).subscribe((data: any) => {
      this.translate = JSON.parse(data.data[0].data[0].language_json_file);     
    })   
  }

  changeLanguajeFirst(param: string) {    
    return this.getTransalate(param);
  }

  getTranslate() {
    return this.translate;
  }

  deleteTranslate() {
    this.translate = null;
    return this.translate;
  }

  getTransalate(languaje: any): any {
   
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

    
    this.http.get(baseUrl + '/api/v2/' + languaje + '/companies/tree_language')
    .map((data: any) => data).subscribe(object => {
      this.translate = JSON.parse(object.data[0].data[0].language_json_file)
    });
    return this.http.get(baseUrl + '/api/v2/' + languaje + '/companies/tree_language')
    .map((data: any) => data);
  }


}
