import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RequestsRh } from '../../../models/common/requests-rh/requests-rh';
import { ISubscription } from 'rxjs/Subscription';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-my-request-approvers',
  templateUrl: './my-request-approvers.component.html',
  styleUrls: ['./my-request-approvers.component.css'],
})
export class MyRequestApproversComponent implements OnInit {
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
  private steps = ['step_1', 'step_2', 'step_3', 'step_4', 'data_table_step_1', 'data_table_step_2', 'data_table_step_3'];

  public userAuthenticated: User = null;

 

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
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'))
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
    $('#collapseExample')
      .on('hidden.bs.collapse', () => {
        this.is_collapse = true;
      })
      .on('shown.bs.collapse', () => {
        this.is_collapse = false;
      });
    this.reportsHrService.getSelectRequestsByType().subscribe((data: any) => {
      this.newtype_requests = data.data;
    });

    this.getObjectRequests();
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
  getObjectRequests() {
    this.reportsHrService.getMyRequestsApprovers(this.userAuthenticated.employee.pernr).subscribe((data: any) => {
      this.objectReport.emit(data);
    });
  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
    $('#collapseExample').collapse(is_collapse ? 'show' : 'hide');
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
