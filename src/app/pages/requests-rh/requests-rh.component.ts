import { Component, OnInit, Output, EventEmitter, OnDestroy, ApplicationInitStatus } from '@angular/core';
import { RequestsRhService } from '../../services/requests-rh/requests-rh.service';
import { RequestsRh, ListRequests, TypesRequests, ListRequetsTypes } from '../../models/common/requests-rh/requests-rh';
import { AproversRequestsService } from '../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { FormsRequestsService } from '../../services/shared/forms-requests/forms-requests.service';
import { AlertsService } from '../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../models/common/alerts/alerts';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { FileUploadService } from '../../services/shared/common/file-upload/file-upload.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../services/joyride-app/joyride-app.service';
import { JoyrideService, StepActionType } from '../../utils/joyride';

@Component({
  selector: 'app-requests-rh',
  templateUrl: './requests-rh.component.html',
  styleUrls: ['./requests-rh.component.css'],
})
export class RequestsRhComponent implements OnInit, OnDestroy {
  public requests: RequestsRh;
  public requestStatic: ListRequests[] = [];
  public getListrequest: ListRequests;
  public listTypesFilters: ListRequetsTypes[] = [];
  private alertWarning: Alerts[];
  public idDelete = 0;
  public is_collapse: boolean = true;
  public status_approved: string;
  public status_cancelled: string;
  public status_inProcess: string;
  public status_pending: string;
  private subscriptions: ISubscription[];
  public steps = [
    'step_1@ihr/requests_rh',
    'step_2_1',
    'step_3',
    'step_4',
    'step_5',
    'step_6',
    'step_7',
    'step_8',
    'step_9',
    'step_10',
    'step_11',
  ];
  typesFilters;
  private collapse;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  groupCheck: any;
  public flagCountService = false;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.requests_rh.${key}`;
  }

  constructor(
    private requestsRhService: RequestsRhService,
    private aproversRequestsService: AproversRequestsService,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public fileUploadService: FileUploadService,
    public router: Router,
    public translate: TranslateService,
    public joyrideAppService: JoyrideAppService,
    public joyrideService: JoyrideService,
  ) {
    this.subscriptions = [
      this.tokenService.validateToken().subscribe(
        () => {
          this.token = false;
        },
        error => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString(),
          });
          document.body.setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
      this.formsRequestsService.getRestartObject().subscribe(restart => {
        if (restart) {
          this.getObjectRequests();
        }
      }),

      this.alert.getActionConfirm().subscribe((data: any) => {
        if (data === 'deletRequest') {
          this.requestsRhService.deleteRequests(this.idDelete).subscribe(
            () => {
              this.getObjectRequests();
              // tslint:disable-next-line:max-line-length
              const alertWarning: Alerts[] = [
                {
                  type: 'success',
                  title: this.t('type_alert_ts'),
                  message: this.t('message_alert_ts'),
                  confirmation: false,
                },
              ];
              this.alert.setAlert(alertWarning[0]);
            },
            (error: any) => {
              // tslint:disable-next-line:max-line-length
              const alertWarning: Alerts[] = [
                {
                  type: 'danger',
                  title: this.t('type_alert_one_ts'),
                  message: error.json().errors.toString(),
                  confirmation: false,
                },
              ];
              this.alert.setAlert(alertWarning[0]);
            },
          );
        }
      }),
    ];
    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(
          joyrideAppService.startTour({ steps: this.steps, joyrideChildren: 'request_page' }).subscribe(() => {}),
        );
      }),
    );
  }

  ngOnInit() {
    this.getObjectRequests();

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);

    this.subscriptions.push(
      this.joyrideAppService.joyrideStepService.onStepChange.subscribe(({ name, actionType }) => {
        if (
          (actionType === StepActionType.NEXT && name == 'step_11') ||
          (actionType === StepActionType.NEXT && name == 'step_10')
        ) {
          this.collapse && this.collapse.collapse('hide');
        }
      }),
    );
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.collapse = $('#collapseExample')
      .on('hide.bs.collapse, hidden.bs.collapse', () => {
        // do something...
        this.is_collapse = true;
      })
      .on('show.bs.collapse, shown.bs.collapse', () => {
        this.is_collapse = false;
      });
  }

  getObjectRequests() {
    this.subscriptions.push(
      this.requestsRhService.getAllRequests().subscribe((res: any) => {
        if (res.success) {
          const { request_types, ...rest } = res.data[0];
          this.requests = {
            ...rest,
            request_types,
          };
          this.requestStatic = this.requests.my_requests_list;
          this.listTypesFilters = this.requests.list_requets_types.filter(
            ({ id_activity }) =>
              id_activity !== 'AUX1' && id_activity !== 'AUX2' && id_activity !== 'AUX3' && id_activity !== 'VITD',
          );

          this.typesFilters = this.requests.request_types.filter(
            ({ id_activity }) =>
              id_activity !== 'AUX1' && id_activity !== 'AUX2' && id_activity !== 'AUX3' && id_activity !== 'VITD',
          );
        } else {
        }

        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 1000)
      }),
    );
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  modalAprovers(request: ListRequests, handleNext: boolean) {
    // request.flag_count = 0;
    this.aproversRequestsService.setRequests({
      request,
      handleNext,
      type_request: 'requestsOnly',
    });
  }

  newForm(typeForm: TypesRequests) {
    this.formsRequestsService.setFormRequests(typeForm);
  }

  deleteRequest(id: number) {
    this.idDelete = id;
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_one_ts'),
        message: this.t('type_alert_two_ts') + ' ' + id.toString(),
        confirmation: true,
        typeConfirmation: 'deletRequest',
      },
    ];
    this.alert.setAlert(this.alertWarning[0]);
  }

  getDataRquest() {
    this.requestsRhService.getAllRequests().subscribe((data: any) => {
      this.getListrequest = data.data[0];
    });
  }

  selectedRequest(infoRequest: ListRequetsTypes) {
    this.requests.my_requests_list = [];

    if (infoRequest.active) {
      infoRequest.active = false;
    } else {
      infoRequest.active = true;
    }

    this.listTypesFilters.forEach(groupCheck => {
      if (groupCheck.active) {
        this.requestStatic
          .filter(data => data.type_requests_id === groupCheck.id)
          .forEach(element => {
            this.requests.my_requests_list.push(element);
          });
      }
    });

    if (this.listTypesFilters.filter(data => data.active === true).length === 0) {
      this.requests.my_requests_list = this.requestStatic;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.collapse && this.collapse.off();
  }
}
