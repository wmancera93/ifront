import { Component, OnInit, Pipe, PipeTransform, EventEmitter } from '@angular/core';
import { MyTeamReportService } from '../../../services/shared/common/my-team/my-team-report.service';
import { EspecificMyTeam, InfoWorkTeamReport, Data } from '../../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../../services/my-team/my-team-info.service';
@Component({
  selector: 'app-my-team-reports',
  templateUrl: './my-team-reports.component.html',
  styleUrls: ['./my-team-reports.component.css']
})
export class MyTeamReportsComponent implements OnInit {
  public reportsMyTeamInfo: EspecificMyTeam;
  public rowsOnPage = 5;
  public flagReturnBack: boolean = false;

  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'test'


  constructor(public myTeamSharedService: MyTeamReportService,
    public myTeamService: MyTeamInfoService
  ) {
    this.myTeamSharedService.getReportMyTeam().subscribe(
      (data) => {
        this.reportsMyTeamInfo = data;        
        setTimeout(() => {
          document.getElementById('0reports').click();
        }, 5)
      })
  }

  ngOnInit() {

  }

  returnBackPage() {
    this.flagReturnBack = true;
  }

  validateReport(i: string, idReport: number, report: any) {
    document.getElementById('listReports').getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(i + 'reports').className = 'nav-item navReport tabReport active-report';
    this.myTeamService.getReportWorkTeam(report.url, idReport.toString()).subscribe(
      (data: any) => {
        this.objectReport.emit(data);
      }
    );
  }
}
