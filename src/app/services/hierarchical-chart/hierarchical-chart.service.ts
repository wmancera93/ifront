import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { MyPosition } from '../../models/common/work_team/work_team';

@Injectable()
export class HierarchicalChartService {

  constructor(public http: HttpClient) { }

  getMyWorkTeam(){
    return this.http.get(environment.apiBaseHr + '/api/v2/organization_charts/show_list')
    .map((data: Observable<any>) => data);
  }
}
 