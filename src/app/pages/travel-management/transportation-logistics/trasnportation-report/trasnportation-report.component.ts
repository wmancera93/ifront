import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../../../services/travel-management/housing/housing.service';
import { TransportationLogisticsService } from '../../../../services/travel-management/transportation-logistics/transportation-logistics.service';
import { User } from '../../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-trasnportation-report',
  templateUrl: './trasnportation-report.component.html',
  styleUrls: ['./trasnportation-report.component.css'],
})
export class TrasnportationReportComponent implements OnInit {
  parseT(key) {
    return `pages.travel_management.transportation_logistics.transportation_report.${key}`;
  }

  public objectReportFleets: EventEmitter<any> = new EventEmitter();
  public is_collapse = false;
  public btnConsult = true;
  public selectReport: any[] = [];
  public plate: string = '';
  public destiny: string = '';
  public typeTransport: string = '';
  public date_beginTravel: string = '';
  public date_endTravel: string = '';
  public driver: string = '';
  public dateEndTravel: string;
  public showPdf = false;
  public showExcel = true;
  public show_message: boolean = true;
  public userAuthenticated: User = null;
  private subscriptions: ISubscription[] = [];
  constructor(
    public router: Router,
    public housingService: HousingService,
    public transportationLogisticsService: TransportationLogisticsService,
    private accionDataTableService: DataDableSharedService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));

    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
        debugger
        if (data.action_method === 'showEmployeeTrip') {
          this.printExcel(data.id);
        }
      }),
    ];
  }

  ngOnInit() {
    this.getReport();
    this.selectReport = this.housingService.getReportLogistics();
    this.userAuthenticated.employee.pernr;
  }

  getReport() {
    this.transportationLogisticsService
      .getReportFleets(
        this.driver === '' ? '-1' : this.driver,
        this.plate === '' ? '-1' : this.plate,
        this.destiny === '' ? '-1' : this.destiny,
        this.date_beginTravel === '' ? '-1' : this.date_beginTravel,
        this.date_endTravel === '' ? '-1' : this.date_endTravel,
        this.typeTransport === '' ? '-1' : this.typeTransport,
      )
      .subscribe((data: any) => {
        if (data) {
          this.show_message = false;
        }
        this.objectReportFleets.emit(data);
      });
  }

  returnBack() {
    this.router.navigate(['ihr/travel_management']);
  }

  collapse(param: boolean) {
    this.is_collapse = param;
  }
  selectTypeReport(array: any) {
    this.router.navigate(['ihr/' + array.code]);
  }
  printExcel(id_trayect) {
    this.subscriptions.push(
      this.transportationLogisticsService
        .getTrayecReportExcel(this.userAuthenticated.employee_id, id_trayect)
        .subscribe((data: any) => {
          window.open(data.url);
        }),
    );
  }
}
