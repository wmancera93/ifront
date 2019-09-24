import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { Router } from '@angular/router';
import { RequestsRh } from '../../../models/common/requests-rh/requests-rh';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';

@Component({
  selector: 'app-requests-approvers',
  templateUrl: './requests-approvers.component.html',
  styleUrls: ['./requests-approvers.component.css'],
})
export class RequestsApproversComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public token: boolean;
  public type_requests = 'VACA';
  public newtype_requests: any[] = [];
  public approver = '0';
  public platform = 'I';
  public requests: RequestsRh;
  public viewContainer = false;
  public is_collapse = false;
  public approver_selected: string;
  public platform_selected = 'IHR';
  public type_selected = 'VACA';
  private subscriptions: ISubscription[] = [];
  private steps = ['step_1', 'step_2', 'step_3', 'step_4'];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.reports_rh.requests_approvers.${key}`;
  }

  constructor(
    public reportsHrService: ReportsHrService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public requestsRhService: RequestsRhService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.approver_selected = this.parseT('approver_with');
    this.tokenService.validateToken().subscribe(
      () => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString(),
        });
        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      },
    );
    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(joyrideAppService.startTour({ steps: this.steps }));
      }),
    );
  }

  ngOnInit() {
    this.reportsHrService.getSelectRequestsByType().subscribe((data: any) => {
      this.newtype_requests = data.data;
    });

    this.getObjectRequests();
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
  getObjectRequests() {
    this.reportsHrService.getRequestsApprovers(this.type_requests, this.approver, this.platform).subscribe((data: any) => {
      this.objectReport.emit(data);
    });
  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  filterRequests(param: string, value: string, name: string) {
    switch (param) {
      case 'approver':
        this.approver_selected = name;
        this.approver = value;
        break;
      case 'platform':
        this.platform = value;
        this.platform_selected = name;
        break;
      case 'selectType':
        this.type_requests = value;
        this.type_selected = name;
        break;
    }
    this.getObjectRequests();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
