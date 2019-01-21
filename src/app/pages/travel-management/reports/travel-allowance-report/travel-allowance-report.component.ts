import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTravelsService } from '../../../../services/travel-management/report/report-travels.service';

@Component({
  selector: 'app-travel-allowance-report',
  templateUrl: './travel-allowance-report.component.html',
  styleUrls: ['./travel-allowance-report.component.css']
})
export class TravelAllowanceReportComponent implements OnInit {

  public title: string = 'Solicitud de gastos';
  public is_collapse_report_allowances: boolean = false;
  public reports_list_allowances = null;
  public objectReportAllowances: EventEmitter<any> = new EventEmitter();
  public id_employee: string = '-1';
  public ticket: string = '-1';
  public ticket_cli: string = '-1';
  public date_begin: string = '-1';
  public date_end: string = '-1';
  public legal_travel: string = '-1';
  public showPdf: boolean = false;
  public showExcel: boolean = true;
  public nameReport: string = 'Solicitudes de gastos'
  public objectGeneralAllowance: any[] = [];
  public showDataTableAllowance: boolean = true;

    constructor(public router: Router, public travel_reports_list: ReportTravelsService) {

    this.reports_list_allowances = travel_reports_list.getTravelsReportList();

  }

  ngOnInit() {
    this.travel_reports_list.getTravelsAllowanceReport(this.id_employee,this.ticket,this.ticket_cli,this.date_begin,this.date_end,
      this.legal_travel).subscribe((data: any)=> {
        this.objectGeneralAllowance = data.data[0].data;
        if (this.objectGeneralAllowance.length > 0 ){
          this.objectReportAllowances.emit(data);
        }else {
          this.showDataTableAllowance = false;
        }
    });
  }
  selectTypeReport(array: any) {
    this.router.navigate(['ihr/'+ array.code]);
  }

  collapseReportAllowances(is_collapse: boolean) {
    this.is_collapse_report_allowances = is_collapse;
  }
  returnBackReportAllowances() {
    this.router.navigate(['ihr/travel_management']);
  }

}
