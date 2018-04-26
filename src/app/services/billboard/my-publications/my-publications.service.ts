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

 putPublishNews(id:any){
    return this.http.put(environment.apiBaseHr + '/api/v2/articles/'+id+'/publish_or_hide',{})
    .map((data: Observable<any>) => data);
  }
  putEditArticles(objectID: number,objectEdit: any)
  {
    return this.http.put(environment.apiBaseHr + '/api/v2/articles/'+objectID,{objectEdit})
    .map((data: Observable<any>) => data);    
  }

  deleteArticles(objectID: number)
  {
    return this.http.delete(environment.apiBaseHr + '/api/v2/articles/'+objectID)
    .map((data: Observable<any>) => data);    
  }

  postComment(id:number,comment:string)
  {
    return this.http.post(environment.apiBaseHr + '/api/v2/articles/'+id+'/create_comment', {comment_text:comment})
    .map((data: Observable<any>) => data);
  }

}

