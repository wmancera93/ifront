import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-iva-employee',
  templateUrl: './iva-employee.component.html',
  styleUrls: ['./iva-employee.component.css']
})
export class IvaEmployeeComponent implements OnInit {

  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Movimientos de Iva';
  public token: boolean;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(private tokenService: Angular2TokenService,
    public queriesService:QueriesService) {
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
    this.queriesService.getIvaEmployee()
      .subscribe((data: any) => {
        this.objectReport.emit(data);

      });
  }
}
