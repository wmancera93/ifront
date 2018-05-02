import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DownloadFilesService {

  constructor( private http: HttpClient) { }

  getFile(){
    this.http.get('https://s3.amazonaws.com/hrsolutions/document_management/company/hrsolutions/Presentacion+Corporativa+2016.pdf');
  }

}
