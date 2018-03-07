import { Component, OnInit } from '@angular/core';
import { MyTeam } from '../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../services/my-team/my-team-info.service'
import { Router } from '@angular/router';
import { MyTeamReportService } from '../../services/shared/common/my-team/my-team-report.service';
import { timeout } from 'q';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  public employeesInMyTeam: MyTeam[] = [];
  public ajustWidth: boolean;
  public flagHideMyteam: boolean = true;

  constructor(public myTeamInfoService: MyTeamInfoService,
    public myTeamSharedService: MyTeamReportService,
    public router: Router) {  }

  ngOnInit() {
    this.myTeamInfoService.getMyTeamData()
      .subscribe((data: any) => {
        this.employeesInMyTeam = data.data;
        
      })


  }

  goToMyTeamReports(employeesInMyTeam) {
    this.flagHideMyteam = false;    
    this.myTeamSharedService.setReportMyteam(employeesInMyTeam);  
  }
}
