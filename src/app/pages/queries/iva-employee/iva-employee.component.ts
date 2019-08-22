import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-iva-employee',
  templateUrl: './iva-employee.component.html',
  styleUrls: ['./iva-employee.component.css'],
})
export class IvaEmployeeComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public token: boolean;
  public showExcel = true;
  public userAuthenticated: User;
  public countAfter = 0;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  parseT(key) {
    return `pages.queries.iva_employee.${key}`;
  }

  constructor(
    private tokenService: Angular2TokenService,
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
  ) {
    this.tokenService.validateToken().subscribe(
      res => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString(),
        });
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      },
    );
  }

  ngOnInit() {
    this.accionDataTableService.getActionDataTable().subscribe(data => {
      if (data === this.nameReport && this.countAfter === 0) {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getIvaMovementsExcel(this.userAuthenticated.employee_id.toString())
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }
    });
    this.queriesService.getIvaEmployee().subscribe((data: any) => {
      this.objectReport.emit(data);
    });
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
