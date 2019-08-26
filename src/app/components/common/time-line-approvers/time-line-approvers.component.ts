import { Component, OnInit, OnDestroy } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-line-approvers',
  templateUrl: './time-line-approvers.component.html',
  styleUrls: ['./time-line-approvers.component.css'],
})
export class TimeLineApproversComponent implements OnInit, OnDestroy {
  public dataRequets: any = {};
  public fileSupport = '';
  public viewModal = false;
  public dateFirts: string;
  public dateFinally: string;
  public requests_print: string;
  public is_edu: boolean = false;
  public is_logistic: boolean = false;
  public is_vtd: boolean = false;
  public subscriptions: Subscription[] = [];

  get detailRequest() {
    return this.dataRequets.details_request;
  }
  get detailVitalDay() {
    return this.dataRequets.request.days_request_details;
  }
  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.time_line_approvers.${key}`;
  }

  constructor(
    private aproversRequestsService: AproversRequestsService,
    private requestsRhService: RequestsRhService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.subscriptions.push(
      this.aproversRequestsService.getRequests().subscribe((data: any) => {
        if (data.type_request == 'requestsOnly') {
          this.requests_print = data.type_request;
          this.subscriptions.push(
            this.requestsRhService.getRequestDetailById(data.request.ticket).subscribe((detail: any) => {
              this.dataRequets = [];
              if (detail.success) {
                this.dataRequets = detail.data[0];
                this.fileSupport = this.dataRequets.request.image.url;
                const { date_begin_format, date_end_format, show_alias } = this.dataRequets.request;
                switch (show_alias) {
                  case 'EDUS':
                  case 'EDUI':
                  case 'EDUB':
                  case 'EDUU':
                  case 'AUXL':
                    this.is_edu = true;
                    break;
                  case 'HOUS':
                  case 'HOUB':
                  case 'HOUT':
                  case 'TRNB':
                  case 'TRAN':
                  case 'TRNT':
                    this.is_logistic = true;
                    break;
                  case 'VITD':
                    this.is_vtd = true;
                    break;
                  default:
                }

                this.dateFirts = date_begin_format;
                this.dateFinally = date_end_format;

                if (document.getElementById('aprovers_requests').className !== 'modal show') {
                  document.getElementById('btn_aprovers_requests').click();
                  document.getElementById('bodyGeneral').removeAttribute('style');
                }
                this.viewModal = true;
              }
            }),
          );
          this.is_edu = false;
          this.is_logistic = false;
          this.is_vtd = false;
        }
        if (data.type_request == 'requestsTravels') {
          const {
            date_begin,
            date_end,
            pending_level_approver,
            observation,
            created_date,
            answers_to_json,
            employee_applicant_to_json,
            travel_requests_type_name,
            ticket,
          } = data.request;
          this.requests_print = data.type_request;
          this.dataRequets = {
            message_pending_level_approver: null,
            pending_level_approver: pending_level_approver,
            request: {
              date_begin_format: date_begin,
              date_end_format: date_end,
              days_request: null,
              observation_request: observation,
              created_date: created_date,
              answers_to_json: answers_to_json,
              employee_applicant_to_json: employee_applicant_to_json,
              image: {
                url: '',
              },
              type_requests_name: travel_requests_type_name,
            },
            title: this.t('detail_requests') + ticket,
          };

          this.dateFirts = date_begin;
          this.dateFinally = date_end;
          this.fileSupport = null;

          if (document.getElementById('aprovers_requests').className !== 'modal show') {
            document.getElementById('btn_aprovers_requests').click();
            document.getElementById('bodyGeneral').removeAttribute('style');
          }
          this.viewModal = true;
        }
      }),
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 400);
  }

  viewSupport() {
    window.open(this.fileSupport);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
