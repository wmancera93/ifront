import { Component, OnInit } from '@angular/core';
import { MyTeamReportService } from '../../../services/shared/common/my-team/my-team-report.service';
import { MyTeam } from '../../../models/common/myteam/myteam';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-team-reports',
  templateUrl: './my-team-reports.component.html',
  styleUrls: ['./my-team-reports.component.css']
})
export class MyTeamReportsComponent implements OnInit {
  public reportsMyTeamInfo: MyTeam;
  public flagReturnBack: boolean = false;

  constructor(public myTeamSharedService: MyTeamReportService, public router: Router, private route: ActivatedRoute) {
    this.myTeamSharedService.getReportMyTeam().subscribe(
      (data: any) => {
        this.reportsMyTeamInfo = data;
             })     
  }

  ngOnInit() {
  }
  
  returnBackPage()
  {
    this.flagReturnBack = true;
    console.log( this.flagReturnBack)
  }
}
