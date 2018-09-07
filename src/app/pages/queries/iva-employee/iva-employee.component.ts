import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-iva-employee',
  templateUrl: './iva-employee.component.html',
  styleUrls: ['./iva-employee.component.css']
})
export class IvaEmployeeComponent implements OnInit {

  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Movimientos de Iva';
  public token: boolean;
  public showExcel: boolean = true;
  public userAuthenticated:User;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(private tokenService: Angular2TokenService,
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
  ) {
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
      if (data === "Movimientos de Iva") {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getIvaMovementsExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          let urlSplit = info.url.split('/')[info.url.split('/').length - 2] + '/' + info.url.split('/')[info.url.split('/').length - 1];
          this.tokenService.get(urlSplit).subscribe((url: any) => {
            window.open(url.url);
          });
        })
      }
    });
    this.queriesService.getIvaEmployee()
      .subscribe((data: any) => {
        this.objectReport.emit(data);

      });
  }
}
