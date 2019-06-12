import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../../../services/travel-management/housing/housing.service';
import { ISubscription } from 'rxjs/Subscription';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../../models/general/user';

@Component({
  selector: 'app-housing-report',
  templateUrl: './housing-report.component.html',
  styleUrls: ['./housing-report.component.css'],
})
export class HousingReportComponent implements OnInit, OnDestroy {
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
  public titleTable: string = '';
  public show_error: boolean = true;
  public showPdf = false;
  public showExcel = true;
  public userAuthenticated: User = null;
  public objectReportHousing: EventEmitter<any> = new EventEmitter();
  private housingSubscriptions: ISubscription[] = [];

  constructor(
    public router: Router,
    public housingService: HousingService,
    private accionDataTableService: DataDableSharedService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
    this.housingSubscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
        if (data) {
          this.housingService
            .getHousingReportExcel(this.userAuthenticated.employee_id, this.date_begin, this.date_end, this.name, this.housing_id)
            .subscribe((report: any) => {
              window.open(report.url);
            });
        }
      }),
    ];
  }

  ngOnInit() {
    this.getTable();
    this.arraySelect = this.housingService.getReportLogistics();
  }

  getTable() {
    this.housingSubscriptions.push(
      this.housingService.getHousingReport(this.date_begin, this.date_end, this.name, this.housing_id).subscribe((res: any) => {
        if (res) {
          this.show_error = false;
        }
        this.titleTable = res.data[0].title_table;
        this.objectReportHousing.emit(res);
      }),
    );
  }

  returnBack() {
    this.router.navigate(['ihr/travel_management']);
  }

  collapse(param: boolean) {
    this.is_collapse = param;
    this.date_begin = '';
    this.date_end = '';
    this.name = '';
    this.housing_id = '';
  }
  selectTypeReport(array: any) {
    this.router.navigate(['ihr/' + array.code]);
  }
  ngOnDestroy() {
    this.housingSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
