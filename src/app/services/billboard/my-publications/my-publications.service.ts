import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {PublicArticle} from '../../../models/common/billboard/my_publications';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class MyPublicationsService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  sendDataNotice(object:any) {
    return this.tokenService.post('articles', object)
      .map((data: any) => data.json()); 
  }

  getArticles(id:number){    
    return this.tokenService.get('articles/'+id)
      .map((data: any) => data.json()); 
  }

  getAllArticles(){    
    return this.tokenService.get('articles')
      .map((data: any) => data.json()); 
  }

  getMyArticles(){
    return this.tokenService.get('articles/my_articles')
      .map((data: any) => data.json()); 
  }

 putPublishNews(id:any){
    return this.tokenService.put('articles/'+id+'/publish_or_hide',{})
      .map((data: any) => data.json()); 
  }
  putEditArticles(objectID: number,objectEdit: any){
    return this.tokenService.put('articles/'+ objectID,objectEdit)
      .map((data: any) => data.json());   
  }

  deleteArticles(objectID: number){
    return this.tokenService.delete('articles/'+objectID)
      .map((data: any) => data.json());    
  }

  postComment(id:number,comment:string){
    return this.tokenService.post('articles/'+id+'/create_comment', {comment_text:comment})
      .map((data: any) => data.json()); 
  }

  deleteComment(id:number,id_comment:number){
    return this.tokenService.delete('articles/'+id+'/destroy_comment/'+id_comment)
      .map((data: any) => data.json());   
  }

  editComment (id:number,id_comment:number,comment_text:string){
    return this.tokenService.put('articles/'+id+'/edit_comment/'+id_comment,{comment_text :comment_text})
      .map((data: any) => data.json()); 
  }

}

