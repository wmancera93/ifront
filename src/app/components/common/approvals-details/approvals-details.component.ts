import { Component, OnInit } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { DetailAproverRequest } from '../../../models/common/approver-requests/approver_requests';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-approvals-details',
  templateUrl: './approvals-details.component.html',
  styleUrls: ['./approvals-details.component.css'],
})
export class ApprovalsDetailsComponent implements OnInit {
  public approvals: DetailAproverRequest[] = [];
  public edit = false;

  public showSubmit = true;
  public last_approver: boolean = false;
  public prerequisit = true;
  public switch = 'on';
  public description = '';
  public dateSince: string;
  public dateUntil: string;
  public close: string;
  public validity_begin:string;
  public validity_end:string;
  public date_pay:string;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `components.common.approvals_details.${key}`;
  }

  constructor(
    public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService,
    public alert: AlertsService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.aproversRequestsService.getAprovalsRequests().subscribe((data: any) => {
      this.switch = 'on';
      this.description = '';
      this.approvals = [];
      this.edit = data.edit;
      this.approverRequestsService.getDetailApprovalsRequests(data.id).subscribe((request: any) => {
        debugger
        this.approvals[0] = request.data[0].request;
        const dateBegin = request.data[0].request.date_begin_format.split('/');
        this.dateSince = dateBegin[1] + '/' + dateBegin[0] + '/' + dateBegin[2];
        const dateEnd = request.data[0].request.date_end_format.split('/');
        this.dateUntil = dateEnd[1] + '/' + dateEnd[0] + '/' + dateEnd[2];

        if (
          this.approvals[0].type_request_to_json.prerequisites != '' &&
          this.approvals[0].type_request_to_json.prerequisites != null
        ) {
          this.prerequisit = true;
        } else {
          this.prerequisit = false;
        }
      });

      if (document.getElementById('approvals_requests').className !== 'modal show') {
        document.getElementById('btn_approvals_requests').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }

      setTimeout(() => {
        this.stylesExplorerService.addStylesCommon();
      }, 1000);
    });
  }

  ngOnInit() {}

  aceptPrerequisit() {
    this.prerequisit = false;
  }

  onAprovlas() {
    this.switch = 'on';
  }

  offAprovlas() {
    this.switch = 'off';
  }

  saveApproval() {
    this.showSubmit = false;
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.approverRequestsService
      .postApprovalsRequest({
        request_id: this.approvals[0].ticket,
        answer: this.switch,
        description: this.description,
      })
      .subscribe(
        (data: any) => {
          this.aproversRequestsService.setConfirmApproval('true');
          this.showSubmit = true;
        },
        (error: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonApprovalsRequests')[0]).click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_ts'),
              message: error.json().errors.toString(),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 1000)
        },
      );
  }

  viewSupport() {
    window.open(this.approvals[0].image.url);
  }
}
