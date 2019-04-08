import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {MyTeam} from '../../../../models/common/myteam/myteam';
import { Router } from '@angular/router';

@Injectable()
export class MyTeamReportService {
  exportMyTeamReports: Subject<any> = new Subject<any>();

  constructor(public router: Router) { }

  getReportMyTeam() {
    return this.exportMyTeamReports;
  }

  setReportMyteam(objectMyTeamReport: any) {
    return this.exportMyTeamReports.next(objectMyTeamReport);
  }

}
