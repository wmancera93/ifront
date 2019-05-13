import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../../../services/travel-management/housing/housing.service';

@Component({
  selector: 'app-housing-report',
  templateUrl: './housing-report.component.html',
  styleUrls: ['./housing-report.component.css'],
})
export class HousingReportComponent implements OnInit {
  parseT(key) {
    return `pages.travel_management.housing.housing_report.${key}`;
  }
  public is_collapse = false;
  public btnConsult = true;
  public arraySelect: any[] = [];
  constructor(public router: Router, public housingService: HousingService) {}

  ngOnInit() {
    this.arraySelect = this.housingService.getReportLogistics();
  }
  
  log(param) {
    console.log(param);
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
