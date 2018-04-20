import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CorporateDocsService {

  constructor(public http: HttpClient) { }


getDocuments(){
  return this.http.get(environment.apiBaseHr + '/api/v2/corporate_documents')
    .map((data: Observable<any>) => data); 
}
}


