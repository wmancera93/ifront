import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { AproverRequests, Requests } from '../../../models/common/approver-requests/approver_requests';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '../../../services/common/translate/translate.service';
import { Translate } from '../../../models/common/translate/translate';

@Component({
  selector: 'app-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.css']
})
export class ManagedComponent implements OnInit {
  public managed: Requests[] = [];
  public translate: Translate = null;
  public token: boolean;
  public statusApprover: string;
  public statusCancelled: string;
  public statusInProcess: string;
  public statusPending: string;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    this.statusApprover = this.translate.app.frontEnd.pages.approver_request.managed.status_approver;
    this.statusCancelled = this.translate.app.frontEnd.pages.approver_request.managed.status_cancelled;
    this.statusInProcess = this.translate.app.frontEnd.pages.approver_request.managed.status_in_Process;
    this.statusPending = this.translate.app.frontEnd.pages.approver_request.managed.status_pending;

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

    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.approverRequestsService.getApprovalsRequestsManaged()
      .subscribe((data: any) => {
        if (data.success) {
          this.managed = data.data[0].requests;
        }

        setTimeout(() => {
          this.stylesExplorerService.addStylesCommon();
        }, 3000);

        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 1000)
      });
  }

  modalAprovers(request: Requests) {
    this.aproversRequestsService.setAprovalsRequests({ id: request.ticket, edit: false });
  }

}
