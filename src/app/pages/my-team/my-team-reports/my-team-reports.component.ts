import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MyTeamReportService } from '../../../services/shared/common/my-team/my-team-report.service';
import { EspecificMyTeam } from '../../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../../services/my-team/my-team-info.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-team-reports',
  templateUrl: './my-team-reports.component.html',
  styleUrls: ['./my-team-reports.component.css'],
})
export class MyTeamReportsComponent implements OnInit {
  public reportsMyTeamInfo: EspecificMyTeam;
  public rowsOnPage = 5;
  public flagReturnBack = false;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport = '';

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.my_team.my_team_reports.${key}`;
  }

  constructor(
    public myTeamSharedService: MyTeamReportService,
    public myTeamService: MyTeamInfoService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.tokenService.validateToken().subscribe(
      () => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString(),
        });
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      },
    );
    this.myTeamSharedService.getReportMyTeam().subscribe(data => {
      this.reportsMyTeamInfo = data;
      setTimeout(() => {
        document.getElementById('0reports').click();
      }, 5);
    });
  }

  ngOnInit() {

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 200);
  }

  returnBackPage() {
    this.flagReturnBack = true;
  }

  validateReport(i: string, idReport: number, report: any) {
    document
      .getElementById('listReports')
      .getElementsByClassName('active-report')[0]
      .classList.remove('active-report');
    document.getElementById(i + 'reports').className =
      'nav-item navReport tabReport active-report';
    this.myTeamService
      .getReportWorkTeam(report.url, idReport.toString())
      .subscribe((data: any) => {
        if (data.data.length > 0) {
          this.nameReport = data.data[0].title_table;
          this.objectReport.emit(data);
        } else {
          this.nameReport = '';
          this.objectReport.emit(data);
        }
      });
  }
}
