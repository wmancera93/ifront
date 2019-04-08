import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { Requests } from '../../../models/common/approver-requests/approver_requests';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router, RoutesRecognized } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit, OnDestroy {
  public pendings: Requests[] = [];
  public urlBefore = '';
  public showButtonBack = false;
  private subscriptions: ISubscription[];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.approver_request.pendings.${key}`;
  }

  constructor(
    public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService,
    public alert: AlertsService,
    public router: Router,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService
  ) {
    this.subscriptions = [
      this.aproversRequestsService
        .getConfirmApproval()
        .subscribe((data: any) => {
          if (data === 'true') {
            (<HTMLInputElement>(
              document.getElementsByClassName('buttonApprovalsRequests')[0]
            )).click();
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('msg_sf_transaction_ts'),
                message: this.t('msg_cf_transaction_ts'),
                confirmation: false
              }
            ];
            this.alert.setAlert(alertWarning[0]);
            this.getApprovals();
          }
        })
    ];
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.subscriptions = [
      ...this.subscriptions,
      this.router.events
        .pipe(filter(data => data instanceof RoutesRecognized))
        .pairwise()
        .subscribe((event: any[]) => {
          setTimeout(() => {
            if (event[0].urlAfterRedirects.toString() === '/ihr/index') {
              this.showButtonBack = true;
            }
          }, 100);
        })
    ];
    this.getApprovals();
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  getApprovals() {
    this.subscriptions = [
      ...this.subscriptions,
      this.approverRequestsService
        .getApprovalsRequestsPending()
        .subscribe((data: any) => {
          if (data.success) {
            this.pendings = data.data[0].requests;
          }
        })
    ];
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  modalAprovers(request: Requests) {
    this.aproversRequestsService.setAprovalsRequests({
      id: request.ticket,
      edit: true
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
