import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class MyTeamInfoService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getMyTeamData() {
    return this.tokenService.get('work_team')
      .map((data: any) => data.json());
  }

  getReportWorkTeam(controller: string, id: string) {
    return this.tokenService.get('work_team/' + controller + '/' + id)
      .map((data: any) => data.json());
  }


}
