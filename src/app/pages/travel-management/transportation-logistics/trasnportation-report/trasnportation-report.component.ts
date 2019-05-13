import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../../../services/travel-management/housing/housing.service';

@Component({
  selector: 'app-trasnportation-report',
  templateUrl: './trasnportation-report.component.html',
  styleUrls: ['./trasnportation-report.component.css'],
})
export class TrasnportationReportComponent implements OnInit {
  parseT(key) {
    return `pages.travel_management.transportation_logistics.transportation_report.${key}`;
  }
  public is_collapse = false;
  public btnConsult = true;
  public selectReport: any[] = [];

  constructor(public router: Router, public housingService: HousingService) {}

  ngOnInit() {
    this.selectReport = this.housingService.getReportLogistics();
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
