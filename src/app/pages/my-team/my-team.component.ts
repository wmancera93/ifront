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
  public employeePrueba: any []=[];
  public ajustWidth: boolean;
  public flagHideMyteam: boolean = true;

  constructor(public myTeamInfoService: MyTeamInfoService,
    public myTeamSharedService: MyTeamReportService,
    public router: Router) { 
      document.getElementById("loginId").style.display = 'block'
      document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
     }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.myTeamInfoService.getMyTeamData()
      .subscribe((data: any) => {
        this.employeesInMyTeam = data.data;
        if (data.success) {
          setTimeout(() => {
            document.getElementById("loginId").style.display = 'none'
            document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          }, 2000)
        }
      })
  }

  goToMyTeamReports(employeesInMyTeam) {
    this.flagHideMyteam = false;    
    this.myTeamSharedService.setReportMyteam(employeesInMyTeam);  
  }
}
