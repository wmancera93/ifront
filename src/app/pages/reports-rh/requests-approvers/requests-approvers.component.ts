import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { Router } from '@angular/router';
import { RequestsRh } from '../../../models/common/requests-rh/requests-rh';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';

@Component({
  selector: 'app-requests-approvers',
  templateUrl: './requests-approvers.component.html',
  styleUrls: ['./requests-approvers.component.css']
})
export class RequestsApproversComponent implements OnInit {

  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Aprobadores de solicitudes';
  public token: boolean;
  public type_requests: string = "VACA";
  public newtype_requests: any[] = [];
  public approver: string = "0";
  public platform: string = "I";
  public requests: RequestsRh;
  public viewContainer: boolean = false;
  public is_collapse: boolean = false;
  public approver_selected: string = "Con aprobador";
  public platform_selected: string = "IHR";
  public type_selected: string = "VACA";


  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public reportsHrService: ReportsHrService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public requestsRhService: RequestsRhService) {
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

    this.reportsHrService.getSelectRequestsByType()
      .subscribe((data: any) => {
        this.newtype_requests = data.data;
        console.log(this.newtype_requests)

      });

    this.getObjectRequests()
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
  getObjectRequests() {
    this.reportsHrService.getRequestsApprovers(this.type_requests, this.approver, this.platform)
      .subscribe((data: any) => {
        this.objectReport.emit(data);
      });
  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  filterRequests(param: string, value: string, name: string) {
    switch (param) {
      case "approver":
        this.approver_selected = name;
        this.approver = value;
        break;
      case "platform":
        this.platform = value;
        this.platform_selected = name;
        break;
      case "selectType":
        this.type_requests = value;
        this.type_selected = name;
        break;
    }
    this.getObjectRequests()

  }

}
