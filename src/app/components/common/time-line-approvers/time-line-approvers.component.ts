import { Component, OnInit, OnDestroy } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { EmployeeRequets } from '../../../models/common/requests-rh/timeline-approver';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';
import { JoyrideService, StepActionType } from '../../../utils/joyride';

@Component({
  selector: 'app-time-line-approvers',
  templateUrl: './time-line-approvers.component.html',
  styleUrls: ['./time-line-approvers.component.css'],
})
export class TimeLineApproversComponent implements OnInit, OnDestroy {
  public dataRequets: EmployeeRequets;
  public fileSupport = '';
  public dateFirts: string;
  public dateFinally: string;
  public requests_print: string;
  public is_edu: boolean = false;
  public is_logistic: boolean = false;
  public is_vtd: boolean = false;
  public subscriptions: ISubscription[] = [];
  public steps = ['step_7', 'step_8'];
  public modalOpen: boolean = false;

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
    public joyrideAppService: JoyrideAppService,
    public joyrideService: JoyrideService,
  ) {
    this.subscriptions.push(
      this.aproversRequestsService.getRequests().subscribe((data: any) => {
        $('#aprovers_requests')
          .on('shown.bs.modal', e => {
            if (data.handleNext) {
              this.joyrideService.next();
              this.modalOpen = true;
            }
          })
          .on('hidden.bs.modal', () => {
            this.modalOpen = false;
            $('#aprovers_requests').off('shown.bs.modal');
          });
        const openModal = () => {
          if (document.getElementById('aprovers_requests').className !== 'modal show') {
            document.getElementById('btn_aprovers_requests').click();
            document.getElementById('bodyGeneral').removeAttribute('style');
          }
        };
        if (data.type_request == 'requestsOnly') {
          this.requests_print = data.type_request;
          this.subscriptions.push(
            this.requestsRhService.getRequestDetailById(data.request.ticket).subscribe(detail => {
              if (detail.success) {
                this.dataRequets = detail.data[0];
                const { request } = this.dataRequets;
                this.fileSupport = request.image && request.image.url;
                const { date_begin_format, date_end_format, show_alias } = request;
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
                openModal();
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
          openModal();
        }
      }),
    );
    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(joyrideAppService.startTour({ steps: this.steps, startWith: 'step_7' }).subscribe(() => {}));
      }),
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 400);
    this.subscriptions.push(
      this.joyrideAppService.joyrideStepService.onStepChange.subscribe(({ name, actionType }) => {
        if (
          (actionType === StepActionType.NEXT && name == 'step_9') ||
          (actionType === StepActionType.PREV && name === 'step_6')
        ) {
          $('#aprovers_requests').modal('hide');
        }
        if (
          (actionType === StepActionType.PREV && name == 'step_8') ||
          (actionType === StepActionType.PREV && name == 'step_7' && !this.dataRequets.request.answers_to_json.length)
        ) {
          $('#aprovers_requests').modal('show');
        }
      }),
    );
  }

  viewSupport() {
    window.open(this.fileSupport);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
