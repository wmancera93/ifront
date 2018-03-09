import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MyTeamReportService } from '../../../services/shared/common/my-team/my-team-report.service';
import { EspecificMyTeam, InfoWorkTeamReport, Data} from '../../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../../services/my-team/my-team-info.service';
import { DataTableResource } from 'angular-4-data-table';

@Component({ 
  selector: 'app-my-team-reports',
  templateUrl: './my-team-reports.component.html',
  styleUrls: ['./my-team-reports.component.css']
})
export class MyTeamReportsComponent implements OnInit {
  public reportsMyTeamInfo: EspecificMyTeam;
  public specificReportMyTeam:InfoWorkTeamReport;
  public dataReportTeam: Data;
  public rowsOnPage = 5;
  public flagReturnBack: boolean = false;
 

  constructor(public myTeamSharedService: MyTeamReportService,
      public myTeamService:MyTeamInfoService
     ) {
    this.myTeamSharedService.getReportMyTeam().subscribe(
      (data) => {
        this.reportsMyTeamInfo = data;
      })
  }

  ngOnInit() {
  }

  returnBackPage() {
    this.flagReturnBack = true;
  }

  validateReport(i: string, idReport:number) {   
    document.getElementById('listReports').getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(i + 'reports').className = 'nav-item navReport tabReport active-report';
    this.myTeamService.getReportWorkTeam('absences_by_employee',idReport.toString()).subscribe(
      (data:any)=>{
        this.specificReportMyTeam = data.data;
        this.dataReportTeam =this.specificReportMyTeam[0].data;
       console.log(this.dataReportTeam)        
      }
    );

  }
}
