import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {PublicArticle} from '../../../models/common/billboard/my_publications';

@Injectable()
export class MyPublicationsService {

  constructor(public http: HttpClient) { }

  sendDataNotice(object:any) {
    return this.http.post(environment.apiBaseHr + '/api/v2/articles', object)
      .map((data: Observable<any>) => data);
  }

  getMyArticles()
  {
    return this.http.get(environment.apiBaseHr + '/api/v2/articles/my_articles')
    .map((data: Observable<any>) => data);
  }


}

