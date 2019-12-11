import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import {
  AproverRequests,
  Requests,
} from '../../../models/common/approver-requests/approver_requests';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.css'],
})
export class ManagedComponent implements OnInit, OnDestroy {
  public managed: Requests[] = [];
  public token: boolean;
  public statusApprover: string;
  public statusCancelled: string;
  public statusInProcess: string;
  public statusPending: string;
  private subscriptions: ISubscription[];
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.approver_request.managed.${key}`;
  }

  constructor(
    public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.subscriptions = [
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
      ),
      this.approverRequestsService
        .getApprovalsRequestsManaged()
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
        }),
    ];

    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
  }

  modalAprovers(request: Requests) {
    this.aproversRequestsService.setAprovalsRequests({
      id: request.ticket,
      edit: false,
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
