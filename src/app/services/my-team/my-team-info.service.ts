import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyTeamInfoService {

  constructor(public http: HttpClient) { }

  getMyTeamData() {
    return this.http.get(environment.apiBaseHr + '/api/v2/work_team')
      .map((data: Observable<any>) => data);
  }

  getReportWorkTeam(controller: string, id: string) {
    return this.http.get(environment.apiBaseHr + '/api/v2/work_team/' + controller + '/' + id)
      .map((data: Observable<any>) => data);
  }


}
