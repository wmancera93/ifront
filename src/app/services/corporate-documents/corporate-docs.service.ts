import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class CorporateDocsService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }


  getDocuments() {
    return this.tokenService.get('corporate_documents')
      .map((data: any) => data.json());
  }

  getDocumentsByType(numType: number) {
    return this.tokenService.get('corporate_documents/select_document/' + numType)
      .map((data: any) => data.json());
  }
}


