import { Component, OnInit } from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { AproverRequests, Requests } from '../../../models/common/approver-requests/approver_requests';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit {
  public pendings: Requests[] = [];

  constructor(public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService,
    public alert: AlertsService,) {
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");

    this.aproversRequestsService.getConfirmApproval()
      .subscribe((data: any) => {
        if (data === "true") {
          (<HTMLInputElement>document.getElementsByClassName('buttonApprovalsRequests')[0]).click();
          const alertWarning: Alerts[] = [{ type: 'success', title: 'Transacción Exitosa', message: 'Solicitud generada correctamente', confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.getApprovals();
        }
      })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.getApprovals();
  }

  getApprovals() {
    this.approverRequestsService.getApprovalsRequestsPending()
      .subscribe((data: any) => {
        if (data.success) {
          this.pendings = data.data[0].requests;
        }

        setTimeout(() => {
          document.getElementById("loginId").style.display = 'none'
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        }, 1000)
      });
  }

  modalAprovers(request: Requests) {
    this.aproversRequestsService.setAprovalsRequests({ id: request.ticket, edit: true });
  }

}
