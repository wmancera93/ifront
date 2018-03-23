import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QueriesService {

  constructor(public http: HttpClient) { }

  getDisabilities() {
    return this.http.get(environment.apiBaseHr + '/api/v2/consultations/disabilities')
      .map((data: Observable<any>) => data);
  }

}
