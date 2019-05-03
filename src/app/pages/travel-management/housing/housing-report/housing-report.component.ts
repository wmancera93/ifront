import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(public router: Router) {}

  ngOnInit() {}

  returnBack() {
    this.router.navigate(['ihr/travel_management']);
  }

  collapse(param: boolean) {
    this.is_collapse = param;
  }
}
