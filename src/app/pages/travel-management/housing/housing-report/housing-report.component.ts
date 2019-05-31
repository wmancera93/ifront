import { Component, OnInit, EventEmitter } from '@angular/core';
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
  public housing_id: string = '';
  public date_begin: string = '';
  public date_end: string = '';
  public name: string = '';
  public show: boolean = true;
  public objectReportHousing: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router, public housingService: HousingService) {}

  ngOnInit() {
    this.getTable();
    this.arraySelect = this.housingService.getReportLogistics();
  }
  getTable() {
    this.housingService.getHousingReport(this.date_begin, this.date_end, this.name, this.housing_id).subscribe((data: any) => {
      if (data) {
        this.show = false;
      }
      this.objectReportHousing.emit(data);
    });
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
