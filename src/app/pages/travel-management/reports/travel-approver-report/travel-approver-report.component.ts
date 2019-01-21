import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTravelsService } from '../../../../services/travel-management/report/report-travels.service';

@Component({
  selector: 'app-travel-approver-report',
  templateUrl: './travel-approver-report.component.html',
  styleUrls: ['./travel-approver-report.component.css']
})
export class TravelApproverReportComponent implements OnInit {

  public title: string = 'Aprobadores';
  public is_collapse_report_approvers: boolean = false;
  public reports_list_approvers = null;
  public objectReportApprover: EventEmitter<any> = new EventEmitter();
  public id_employee: string = '-1';
  public ticket: string = '-1';
  public ticket_cli: string = '-1';
  public date_begin: string = '-1';
  public date_end: string = '-1';
  public approver: string = '-1';
  public level: string = '-1';
  public showPdf: boolean = false;
  public showExcel: boolean = true;
  public nameReport: string = 'Aprobaciones solicitudes de viajes'
  public objectGeneralApprover: any[] = [];
  public showDataTableApprover: boolean = true;



  constructor(public router: Router,public travel_reports_list: ReportTravelsService) {

    this.reports_list_approvers = travel_reports_list.getTravelsReportList();

  }

  
  ngOnInit() {
    this.travel_reports_list.getTravelsApprovedReport(this.id_employee,this.ticket,this.ticket_cli,this.date_begin,
      this.date_end,this.approver,this.level).subscribe((data: any) => {
        this.objectGeneralApprover = data.data[0].data;
        if (this.objectGeneralApprover.length > 0 ){
          this.objectReportApprover.emit(data);
        }else {
          this.showDataTableApprover = false;
        }
    })
    
  }
  selectTypeReport(array: any) {
    this.router.navigate(['ihr/'+ array.code]);
  }

  collapseReportApprovers(is_collapse: boolean) {
    this.is_collapse_report_approvers = is_collapse;
  }
  returnBackReportApprovers() {
    this.router.navigate(['ihr/travel_management']);
  }

}
