import { Component, OnInit, Pipe, PipeTransform, EventEmitter } from '@angular/core';
import { MyTeamReportService } from '../../../services/shared/common/my-team/my-team-report.service';
import { EspecificMyTeam, InfoWorkTeamReport, Data } from '../../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../../services/my-team/my-team-info.service';
import { EILSEQ } from 'constants';
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
  public nameReport: string = '';


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
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
  }

  returnBackPage() {
    this.flagReturnBack = true;
  }

  validateReport(i: string, idReport: number, report: any) {
    document.getElementById('listReports').getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(i + 'reports').className = 'nav-item navReport tabReport active-report';
    this.myTeamService.getReportWorkTeam(report.url, idReport.toString()).subscribe(
      (data: any) => {
        if (data.data.length > 0) {
          this.nameReport = data.data[0].title;
          this.objectReport.emit(data);
        } else {
          this.nameReport = '';
          this.objectReport.emit(data);
        }
      }
    );
  }
}
