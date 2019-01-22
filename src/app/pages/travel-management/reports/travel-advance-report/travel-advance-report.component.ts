import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTravelsService } from '../../../../services/travel-management/report/report-travels.service';

@Component({
  selector: 'app-travel-advance-report',
  templateUrl: './travel-advance-report.component.html',
  styleUrls: ['./travel-advance-report.component.css']
})
export class TravelAdvanceReportComponent implements OnInit {

  public title: string = 'Solicitud de anticipos';
  public is_collapse_report_advance: boolean = false;
  public reports_list_advance = null;
  public objectReportAdvance: EventEmitter<any> = new EventEmitter();  
  public id_employee: string = '-1';
  public ticket: string = '-1';
  public ticket_cli: string = '-1';
  public date_begin: string = '-1';
  public date_end: string = '-1';
  public showPdf: boolean = false;
  public showExcel: boolean = true;
  public nameReport: string = 'Anticipos de viaje';
  public objectGeneralAdvance: any[] = [];
  public showDataTableAdvance: boolean = true;


    constructor(public router: Router, public travel_reports_list: ReportTravelsService) {

    this.reports_list_advance = travel_reports_list.getTravelsReportList();

  }

  ngOnInit() {
    this.travel_reports_list.getTravelsAdvanceReport(this.id_employee, this.ticket, this.ticket_cli, this.date_begin, 
      this.date_end).subscribe((data: any) => {
        this.objectGeneralAdvance = data.data[0].data;
        if (this.objectGeneralAdvance.length > 0 ){
          this.objectReportAdvance.emit(data);
        }else {
          this.showDataTableAdvance = false;
        }
      
    })
  }
  selectTypeReport(array: any) {
    this.router.navigate(['ihr/' + array.code]);
  }

  collapseReportAdvance(is_collapse: boolean) {
    this.is_collapse_report_advance = is_collapse;
  }
  returnBackReportAdvance() {
    this.router.navigate(['ihr/travel_management']);
  }
}
