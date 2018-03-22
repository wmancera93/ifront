import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { MyPosition } from '../../models/common/work_team/work_team';

@Injectable()
export class HierarchicalChartService {

  constructor(public http: HttpClient) { }

  getMyWorkTeam(pernrSend:number, actualPage:number){

    return this.http.post(environment.apiBaseHr + '/api/v2/organization_charts/show_list',{pernr:pernrSend, page:actualPage})
    .map((data: Observable<any>) => data);
  }
  getSearchWorkTeam(letterSearch:string){
    
    return this.http.get(environment.apiBaseHr + '/api/v2/organization_charts/search/'+letterSearch)
    .map((data:Observable<any>)=>data);

  }
}
 