import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyTeam } from '../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../services/my-team/my-team-info.service';
import { Router } from '@angular/router';
import { MyTeamReportService } from '../../services/shared/common/my-team/my-team-report.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  public employeesInMyTeam: MyTeam[] = [];
  public employeePrueba: any[] = [];
  public ajustWidth: boolean;
  public flagHideMyteam = true;
  public flagReturnBack = false;
  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  parseT(key) {
    return `pages.my_team.${key}`;
  }

  constructor(
    public myTeamInfoService: MyTeamInfoService,
    public myTeamSharedService: MyTeamReportService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService
  ) {
    this.tokenService.validateToken().subscribe(
      () => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString()
        });
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      }
    );
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.myTeamInfoService.getMyTeamData().subscribe((data: any) => {
      this.employeesInMyTeam = data.data;
      if (data.success) {
        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 1000)
      }
    });

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  goToMyTeamReports(employeesInMyTeam) {
    this.flagHideMyteam = false;

    this.myTeamSharedService.setReportMyteam(employeesInMyTeam);
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
}
