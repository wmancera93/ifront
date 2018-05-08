import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { MyPosition } from '../../models/common/work_team/work_team';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class HierarchicalChartService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getMyWorkTeam(pernrSend: number, actualPage: number) {

    return this.tokenService.post('organization_charts/show_list', { pernr: pernrSend, page: actualPage })
      .map((data: any) => data.json());
  }
  getSearchWorkTeam(letterSearch: string) {

    return this.tokenService.get('organization_charts/search/' + letterSearch)
      .map((data: any) => data.json());

  }
}
