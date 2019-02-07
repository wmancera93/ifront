import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ReportTravelsService } from "../../../../services/travel-management/report/report-travels.service";
import { TravelService } from "../../../../services/travel-management/travels/travel.service";
import { DataDableSharedService } from "../../../../services/shared/common/data-table/data-dable-shared.service";
import { User } from "../../../../models/general/user";
import { Alerts } from "../../../../models/common/alerts/alerts";
import { AlertsService } from "../../../../services/shared/common/alerts/alerts.service";
import { Translate } from "../../../../models/common/translate/translate";
import { TranslateService } from "../../../../services/common/translate/translate.service";

@Component({
  selector: "app-travel-allowance-report",
  templateUrl: "./travel-allowance-report.component.html",
  styleUrls: ["./travel-allowance-report.component.css"]
})
export class TravelAllowanceReportComponent implements OnInit {
  public title: string;
  public is_collapse_report_allowances: boolean = false;
  public reports_list_allowances = null;
  public objectReportAllowances: EventEmitter<any> = new EventEmitter();
  public id_employee: string = "-1";
  public personal_number: string = "-1";
  public ticket: string = "-1";
  public ticket_cli: string = "-1";
  public date_begin: string = "";
  public date_end: string = "";
  public legat_travel_type: string = "-1";
  public objectGeneralAllowances: any[] = [];
  public showPdf: boolean = false;
  public showExcel: boolean = true;
  public nameReport: string;
  public objectGeneralAllowance: any[] = [];
  public showDataTableAllowance: boolean = true;
  public typeTravelLegal: any[] = [];
  public btnConsultSpend: boolean = true;
  public translate: Translate = null;
  public userId: User = null;
  public countAfter: number = 0;

  constructor(
    public router: Router,
    public travel_reports_list: ReportTravelsService,
    public travelManagementService: TravelService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService, public translateService: TranslateService
  ) {

    this.translate = this.translateService.getTranslate();
    this.title = this.translate.app.frontEnd.pages.travel_management.reports.travel_allowance_report.tittle_ts;
    this.nameReport = this.translate.app.frontEnd.pages.travel_management.reports.travel_allowance_report.name_table_ts;

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data === this.nameReport && this.countAfter === 0) {
        this.getObjectPrint("excel");
      }
    });
    this.reports_list_allowances = travel_reports_list.getTravelsReportList();
    document
      .getElementsByTagName("body")[0]
      .setAttribute("style", "overflow-y:auto");
  }

  ngOnInit() {
    this.getObjectPrint("general");
    this.travelManagementService
      .getplanningTravelRequests()
      .subscribe((data: any) => {
        this.typeTravelLegal = this.sortByAphabet(
          data.data.legal_travels_types
        );
      });

    this.userId = JSON.parse(localStorage.getItem("user")).employee_id;
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function (a, b) {
      const nameA: String = a.name.toLowerCase();
      const nameB: String = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });

    return dataBySort;
  }

  selectTypeReport(array: any) {
    this.router.navigate(["ihr/" + array.code]);
  }

  collapseReportAllowances(is_collapse: boolean) {
    this.is_collapse_report_allowances = is_collapse;

    this.personal_number = "";
    this.ticket = "";
    this.ticket_cli = "";
    this.date_begin = "";
    this.date_end = "";
    this.legat_travel_type = "-1";
    this.getObjectPrint("general");
  }

  returnBackReportAllowances() {
    this.router.navigate(["ihr/travel_management"]);
  }
  getObjectPrint(param) {
    let personal_number_send = this.personal_number === "" ? "-1" : this.personal_number;
    let ticket_send = this.ticket === "" ? "-1" : this.ticket;
    let ticket_cli_send = this.ticket_cli === "" ? "-1" : this.ticket_cli;
    let date_begin_send = this.date_begin === "" ? "-1" : this.date_begin.replace("-", "").toString().replace("-", "");
    let date_end_send = this.date_end === "" ? "-1" : this.date_end.replace("-", "").toString().replace("-", "");

    if (param === "general") {
      this.travel_reports_list.getTravelsAllowanceReport(personal_number_send, ticket_send, ticket_cli_send, date_begin_send, date_end_send, this.legat_travel_type)
        .subscribe((data: any) => {
          this.objectGeneralAllowances = data.data[0].data;
          if (this.objectGeneralAllowances.length > 0) {
            this.objectReportAllowances.emit(data);
          } else {
            this.showDataTableAllowance = false;
          }
        });
      this.showDataTableAllowance = true;
    } else {
      this.travel_reports_list
        .getTravelsAllowanceReportExcel(
          this.userId,
          personal_number_send,
          ticket_send,
          ticket_cli_send,
          date_begin_send,
          date_end_send,
          this.legat_travel_type
        )
        .subscribe((data: any) => {
          window.open(data.url);
        });
    }
  }


  validateNumberSpend(name: string, value: any) {
    let proof = /^[0-9]+$/.test(value);
    switch (name) {
      case 'personal_number':
        if (!proof) {
          this.personal_number = value.split(value[value.length - 1])[0];
        } else {
          this.personal_number = value;
        }
        break;
      case 'ticket':
        if (!proof) {
          this.ticket = value.split(value[value.length - 1])[0];
        } else {
          this.ticket = value;
        }
        break;
      case 'ticket_cli':
        if (!proof) {
          this.ticket_cli = value.split(value[value.length - 1])[0];
        } else {
          this.ticket_cli = value;
        }
        break;
    }
  }
  validateDateAllowance() {
    if ((this.date_begin === '') && (this.date_end === '')) {
      this.btnConsultSpend = true;
    } else {
      if ((this.date_begin !== '') && (this.date_end !== '')) {
        this.btnConsultSpend = true;
        let dayBegin = new Date(this.date_begin).getTime();
        let dayEnd = new Date(this.date_end).getTime();
        let calculate = ((dayEnd - dayBegin) / (1000 * 60 * 60 * 24));
        if (calculate < 0) {
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Error', message: this.translate.app.frontEnd.pages.travel_management.reports.travel_allowance_report.message_alert_one_ts, confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.btnConsultSpend = false;
        }
      } else {
        const alertWarning: Alerts[] = [{ type: 'warning', title: this.translate.app.frontEnd.pages.travel_management.reports.travel_allowance_report.type_alert_ts, message: this.translate.app.frontEnd.pages.travel_management.reports.travel_allowance_report.message_alert_two_ts, confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
        this.btnConsultSpend = false;
      }
    }

  }
  ngOnDestroy() {
    this.countAfter += 1;
  }
}
