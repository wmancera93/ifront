import { Component, OnInit } from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { AproverRequests, Requests } from '../../../models/common/approver-requests/approver_requests';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router, RoutesRecognized } from '@angular/router';
import { debug } from 'util';
import { ButtonReturnService } from '../../../services/shared/common/managerial-data/button-return/button-return.service';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit {
  public pendings: Requests[] = [];
  public urlBefore: string = "";
  public showButtonBack: boolean = false;
  constructor(public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService,
    public alert: AlertsService, public router: Router) {


    this.aproversRequestsService.getConfirmApproval()
      .subscribe((data: any) => {
        if (data === "true") {
          (<HTMLInputElement>document.getElementsByClassName('buttonApprovalsRequests')[0]).click();
          const alertWarning: Alerts[] = [{ type: 'success', title: 'Transacción Exitosa', message: 'Solicitud generada correctamente', confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.getApprovals();
        }
      });
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.router.events.filter(data => data instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {
        setTimeout(() => {
          if (event[0].urlAfterRedirects.toString() === '/ihr/index') {
            this.showButtonBack = true;
          }
        }, 100);
      });
    this.getApprovals();
  }

  getApprovals() {
    this.approverRequestsService.getApprovalsRequestsPending()
      .subscribe((data: any) => {
        if (data.success) {
          this.pendings = data.data[0].requests;
        }

      });
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  modalAprovers(request: Requests) {
    this.aproversRequestsService.setAprovalsRequests({ id: request.ticket, edit: true });
  }

}
