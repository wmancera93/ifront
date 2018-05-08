import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class DownloadFilesService {

  constructor(private http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getFile(){
    this.tokenService.get('https://s3.amazonaws.com/hrsolutions/document_management/company/hrsolutions/Presentacion+Corporativa+2016.pdf');
  }

}
