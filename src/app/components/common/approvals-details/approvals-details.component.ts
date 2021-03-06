import { Component, OnInit, OnDestroy } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { DetailAproverRequest } from '../../../models/common/approver-requests/approver_requests';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-approvals-details',
  templateUrl: './approvals-details.component.html',
  styleUrls: ['./approvals-details.component.css'],
})
export class ApprovalsDetailsComponent implements OnInit, OnDestroy {
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
  public validity_begin: string;
  public validity_end: string;
  public date_pay: string;
  public isLogistics: boolean;
  public isEdu: boolean;
  public isVitalDay: boolean;
  private subscriptions: ISubscription[] = [];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
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
    this.subscriptions.push(
      this.aproversRequestsService.getAprovalsRequests().subscribe((data: any) => {
        this.switch = 'on';
        this.description = '';
        this.approvals = [];
        this.edit = data.edit;
        this.approverRequestsService.getDetailApprovalsRequests(data.id).subscribe((request: any) => {
          this.approvals[0] = request.data[0].request;
          if (request.data[0].request.date_begin_format) {
            const dateBegin = request.data[0].request.date_begin_format.split('/');
            this.dateSince = dateBegin[1] + '/' + dateBegin[0] + '/' + dateBegin[2];
          }
          if (request.data[0].request.date_end_format) {
            const dateEnd = request.data[0].request.date_end_format.split('/');
            this.dateUntil = dateEnd[1] + '/' + dateEnd[0] + '/' + dateEnd[2];
          }
          switch (request.data[0].request.type_request_to_json.id_activity) {
            case 'AUX1':
            case 'AUX2':
              this.isEdu = true;
              break;
            case 'TRAN':
            case 'TRNB':
            case 'TRNT':
            case 'HOUS':
            case 'HOUT':
              this.isLogistics = true;
            case 'VITD':
              this.isVitalDay = true;
              break;
          }

          if (
            this.approvals[0].type_request_to_json.prerequisites != '' &&
            this.approvals[0].type_request_to_json.prerequisites != null
          ) {
            this.prerequisit = true;
          } else {
            this.prerequisit = false;
          }
        });
        this.isEdu = false;
        this.isLogistics = false;
        this.isVitalDay = false;

        if (document.getElementById('approvals_requests').className !== 'modal show') {
          document.getElementById('btn_approvals_requests').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }

        setTimeout(() => {
          this.stylesExplorerService.addStylesCommon();
        }, 1000);
      }),
    );
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
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
