import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class FormDataService extends Angular2TokenService {
    public baseUrl: string;
    public url;
    public ambient;

    definitionServer() {
        let url = window.location.href;
        let ambient;
    
        if (url.split("localhost").length === 1) {
          if (url.split("//")[1].split("/")[0].toString() === "10.0.2.210:3003") {
            ambient = "productivo";
          }
          if (url.split("//")[1].split("/")[0].toString() === "10.0.5.100:3003") {
            ambient = "staging";
          }
          if (url.split("//")[1].split("/")[0].toString() === "10.0.7.192:3003") {
            ambient = 'development';
          }
        } else {
          ambient = 'development';
        }
    
        switch (ambient) {
          case 'development':
            this.baseUrl = environment.apiBaseHr_development;
            break;
          case 'dev':
            this.baseUrl = environment.apiBaseHr_development;
            break;
          case 'staging':
            this.baseUrl = environment.apiBaseHr_staging;
            break;
          case 'demo':
            this.baseUrl = environment.apiBaseHr_staging;
            break;
    
    
          default:
            this.baseUrl = environment.apiBaseHr_production;
            break;
        }

        this.init({
            apiBase: this.baseUrl,
            apiPath: 'api/v2',
            globalOptions: {
                headers: {
                    'Content-Type': 'multipart/form-data',  // <-- Set mutlipart/form-data only for this request
                    'Accept': 'multipart/form-data', // <-- Set mutlipart/form-data only for this request
                    'access_token_name': localStorage.getItem('accessToken'),
                    'client_name': localStorage.getItem('client'),
                    'uid_name': localStorage.getItem('uid'),
                    'expiry_name': localStorage.getItem('expiry'),
                    'token-type_name': 'Bearer'
                }
            }
        });
    }

    postRequestsFormData(data: FormData) {
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/' + 'employee_requets',
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );

    }

    postSpendsFormData(data: FormData) {
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/' + 'travel_allowance_requests',
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );

    }

    postNoticeFormData(data: FormData) {
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/' + 'articles',
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );

    }

    putEditArticlesFormData(objectID: number,data: FormData){
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Put,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/' + 'articles/'+ objectID,
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );
  
      }

      postTest(data: FormData){
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/' + 'travel_requests/test_files',
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );
  
      }
      postNewTravel(data: FormData){
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/' + 'travel_requests',
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );
  
      }
      putEditTravelsFormData(objectID: string,data: FormData){
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Put,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/travel_requests/'+ objectID,
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );
  
      }

      putEditSpendFormData(objectID: string,data: FormData){
        this.definitionServer()

        let hdrs = this.currentAuthHeaders;
        hdrs.append('enctype', "multipart/form-data")
        let requestOptions = new RequestOptions({
            method: RequestMethod.Put,
            headers: hdrs,
            url: this.baseUrl + '/api/v2/travel_allowance_requests/'+ objectID,
            body: data
        });
        return this.request(requestOptions).map(
            (response) => response.json()
        );
  
      }








}
