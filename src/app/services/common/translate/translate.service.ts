import { Injectable } from '@angular/core';
import { Translate } from '../../../models/common/translate/translate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class TranslateService {
  public translate: Translate = null;
  public test;

  constructor(private http: HttpClient) {
    if (this.translate === null) {
      if (JSON.parse(localStorage.getItem('treeLanguaje')) !== null) {
        this.changeLanguaje(JSON.parse(localStorage.getItem('treeLanguaje')).data[0].data[0].code_language.toLowerCase());
      } else {
        this.changeLanguaje('es');
      }
    } else {
      this.translate = JSON.parse(localStorage.getItem('treeLanguaje')).data[0].data[0].language_json_file;
    }
  }

  changeLanguaje(param: string) {
    this.getTransalate(param).subscribe((data: any) => {
      this.translate = JSON.parse(data.data[0].data[0].language_json_file);
      localStorage.setItem('treeLanguaje', JSON.stringify(data));
    });
  }

  changeLanguajeFirst(param: string) {
    const object = this.getTransalate(param);
    object.subscribe(data => {
      this.translate = JSON.parse(data.data[0].data[0].language_json_file);
      localStorage.setItem('treeLanguaje', JSON.stringify(data));
    });
    return object;
  }

  getTranslate() {
    if (JSON.parse(localStorage.getItem('treeLanguaje')) !== null) {
      this.translate = JSON.parse(JSON.parse(localStorage.getItem('treeLanguaje')).data[0].data[0].language_json_file);
    }
    return this.translate;
  }

  getTranslateTest() {
    return this.test;
  }

  deleteTranslate() {
    this.translate = null;
    return this.translate;
  }

  getTransalate(languaje: any): any {

    let baseUrl: string;

    const url = window.location.href;
    let ambient;

    if (url.split('localhost').length === 1) {
      if (url.split('-').length > 1) {
        ambient = url.split('-')[0].split('/')[url.split('-')[0].split('/').length - 1];
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
    this.test = this.http.get(baseUrl + '/api/v2/' + languaje + '/companies/tree_language')
      .map((data: any) => data);
    return this.test;
  }


}
