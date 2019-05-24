import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../../../services/travel-management/housing/housing.service';
import { TransportationLogisticsService } from '../../../../services/travel-management/transportation-logistics/transportation-logistics.service';

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
  public plate: string;
  public destiny: string;
  public typeTransport: string;
  public dateTravel: string;
  public driver: string;
  public availability: string;
  public ocupation: string;
  constructor(
    public router: Router,
    public housingService: HousingService,
    public transportationLogisticsService: TransportationLogisticsService,
  ) {
   ;
  }

  ngOnInit() {
    this.getReport();
    this.selectReport = this.housingService.getReportLogistics();
  }

  getReport(){
    this.transportationLogisticsService
    .getReportFleets(
      this.driver === undefined ? '-1' : this.driver,
      this.plate === undefined ? '-1' : this.plate,
      this.destiny === undefined ? '-1' : this.destiny,
      this.dateTravel === undefined ? '-1' : this.dateTravel,
      this.availability === undefined ? '-1' : this.availability,
      this.ocupation === undefined ? '-1' : this.ocupation,
      this.typeTransport === undefined ? '-1' : this.typeTransport,
    )
    .subscribe((data: any) => {
      this.objectReportFleets.emit(data);
    })
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
}
