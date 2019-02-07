import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { Angular2TokenService } from 'angular2-token';
import { User } from '../../../models/general/user';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

@Component({
  selector: 'app-payments-deductions',
  templateUrl: './payments-deductions.component.html',
  styleUrls: ['./payments-deductions.component.css']
})
export class PaymentsDeductionsComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel: boolean = true;
  public userAuthenticated: User;
  public countAfter: number = 0;
  public translate: Translate = null;

  constructor(public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
    private tokenService: Angular2TokenService, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();
    this.nameReport = this.translate.app.frontEnd.pages.queries.my_hour_extras.name_table_ts;
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.accionDataTableService.getActionDataTable().subscribe((data) => {
      if (data === "Pagos y deducciones" && this.countAfter === 0) {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getPaymentsAndDeductionsExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          window.open(info.url);
        });
      }
    });

    this.queriesService.getPaymentsDeductions()
      .subscribe((data: any) => {
        this.objectReport.emit(data);
      },
        error => {
          console.log(error.error);
        })
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

}
