import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

@Component({
  selector: 'app-iva-employee',
  templateUrl: './iva-employee.component.html',
  styleUrls: ['./iva-employee.component.css']
})
export class IvaEmployeeComponent implements OnInit, OnDestroy {

  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public token: boolean;
  public showExcel: boolean = true;
  public userAuthenticated: User;
  public countAfter: number = 0;
  public translate: Translate = null;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(private tokenService: Angular2TokenService,
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService, public translateService: TranslateService
  ) {

    this.translate = this.translateService.getTranslate();
    this.nameReport = this.translate.app.frontEnd.pages.queries.iva_employee.name_table_ts;

      this.tokenService.validateToken()
        .subscribe(
          (res) => {
            this.token = false;
          },
          (error) => {
            this.objectToken.emit({
              title: error.status.toString(),
              message: error.json().errors[0].toString()
            });
            document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
            this.token = true;
          })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.accionDataTableService.getActionDataTable().subscribe((data) => {
      if (data === this.nameReport && this.countAfter === 0) {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getIvaMovementsExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          window.open(info.url);
        })
      }
    });
    this.queriesService.getIvaEmployee()
      .subscribe((data: any) => {
        this.objectReport.emit(data);

      });
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
