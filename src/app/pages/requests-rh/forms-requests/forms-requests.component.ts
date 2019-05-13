import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsRequestsService } from '../../../services/shared/forms-requests/forms-requests.service';
import {
  TypesRequests,
  TypesRequest,
} from '../../../models/common/requests-rh/requests-rh';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { FormState } from '../../../components/common/dynamic-form/utils/form.state';

@Component({
  selector: 'app-forms-requests',
  templateUrl: './forms-requests.component.html',
  styleUrls: ['./forms-requests.component.css'],
})
export class FormsRequestsComponent implements OnInit, OnDestroy {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  modalActions: { close: Function } = { close: () => {} };

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public file: any;
  public filePermisionMarriage = 'fileMarriage';
  public fileInability = 'fileInability';
  public extensions =
    '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  public forms: any;
  public detectLetter = ' ';

  public showTime = true;
  public showDate = false;
  public modalState = true;

  diffDays: number;
  lowerDate: boolean;

  public allForms = new FormState({
    cases: {
      VITD: {
        days_available: true,
      },
      PRSC: { start_time: true, end_time: true },
      INCA: { file_sopport: true },
      PERM: {},
      VCCP: {
        date_begin: false,
        date_end: false,
        days_available: true,
        days_request: true,
      },
      VACA: {
        days_available: true,
      },
    } as TypesRequest,
    allCases: {
      observation_request: true,
      date_begin: true,
      date_end: true,
    },
  });

  formState(formState: string) {
    return this.allForms.run(formState);
  }

  get validateForms(): boolean {
    return this.forms.valid;
  }

  get case(): string {
    return this.formRequests.alias;

  }

  private subscriptions: ISubscription[] = [];

  t(key): string {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key): string {
    return `pages.requests_rh.forms_requests.${key}`;
  }

  constructor(
    private requestsRhService: RequestsRhService,
    private modalService: NgbModal,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public formDataService: FormDataService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.subscriptions.push(
      this.fileUploadService.getObjetFile().subscribe(object => {
        this.file = object;
      }),
    );

    this.subscriptions.push(
      this.formsRequestsService
        .getFormRequests()
        .subscribe((data: TypesRequests) => {
          this.formRequests = data;

          const { alias, minimum_days, maximum_days } = data;
          this.allForms.setCaseForm(alias);
          const formBuild = (
            forms: string[],
            formsDefault: Object = {},
          ): Object => {
            forms.forEach(form => {
              formsDefault = {
                ...formsDefault,
                [form]: [
                  '',
                  (control: AbstractControl) =>
                    this.formState(form)
                      ? Validators.required(control)
                      : null,
                ],
              };
            });
            return formsDefault;
          };
          this.forms = fb.group({
            request_type_id: this.formRequests.id,
            ...formBuild([
              'date_begin',
              'days_request',
              'file_support',
              'start_time',
              'end_time',
            ]),
            date_end: [
              '',
              (control: AbstractControl) => {
                const date_end: boolean = this.formState('date_end');
                if (date_end) {
                  if (this.case !== 'PRSC')
                    return Validators.required(control);
                  else {
                    if (this.showDate && this.case === 'PRSC') {
                      return Validators.required(control);
                    }
                  }
                }
                return null;
              },
            ],
            observation_request: '',
          });

          switch (alias) {
            case 'PERM':
              this.fileUploadService.setCleanUpload(true);
              break;
            case 'PRSC':
              if (minimum_days === 1 && maximum_days === 1) {
                this.showTime = true;
                this.showDate = false;
              } else {
                this.showTime = false;
                this.showDate = true;
              }
              break;
            case 'INCA':
              this.fileUploadService.setCleanUpload(true);
              break;
            default:
              break;
          }
          setTimeout(() => {
            this.stylesExplorerService.addStylesCommon();
          }, 300);
          const modal = this.modalService.open(this.modalTemplate, {
            size: 'lg',
            windowClass: 'modal-md-personalized modal-dialog-scroll',
            centered: true,
          });
          this.modalActions.close = () => {
            modal.close();
          };
          document.body.removeAttribute('style');
        }),
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe(),
    );
  }

  newRequest(model) {
    console.log(model);
    // document.getElementById("loginId").style.display = 'block';
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;
    if (
      this.formRequests.alias === 'PERM' ||
      this.formRequests.alias === 'INCA'
    ) {
      const modelFromdata = new FormData();
      modelFromdata.append('request_type_id', model.request_type_id);
      modelFromdata.append('date_begin', model.date_begin);
      modelFromdata.append('date_end', model.date_end);
      modelFromdata.append('file_support', this.file);
      modelFromdata.append(
        'observation_request',
        model.observation_request,
      );
      model = modelFromdata;

      this.formDataService.postRequestsFormData(model).subscribe(
        (data: any) => {
          this.modalActions.close();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_ts'),
              message:
                this.t('message_alert_ts') +
                data.data[0].id.toString(),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
          this.formsRequestsService.setRestartObject(true);

          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 2000)
        },
        (error: any) => {
          this.modalActions.close();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_one_ts'),
              message: error.json().errors.toString(),
              confirmation: false,
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);

          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 1000)
        },
      );
    } else {
      this.requestsRhService.postRequests(model).subscribe(
        (data: any) => {
          this.modalActions.close();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_ts'),
              message:
                this.t('message_alert_ts') +
                data.json().data[0].id.toString(),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
          this.formsRequestsService.setRestartObject(true);

          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 2000)
        },
        (error: any) => {
          this.modalActions.close();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_one_ts'),
              message: error.json().errors.toString(),
              confirmation: false,
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);

          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 1000)
        },
      );
    }
  }

  setModalState(state: boolean) {
    this.modalState = state;
  }

  noAcceptMinus() {
    if (this.detectLetter == null) {
      ['days_request', 'observation_request'].forEach(form => {
        this.forms.controls[form].setValue('');
      });
    }
  }

  calculateDay() {
    const { date_begin, date_end } = this.forms.controls;

    let dateBegin =
      date_begin.value === ' ' ? null : new Date(date_begin.value);
    let dateEnd =
      date_end.value === ' ' ? null : new Date(date_end.value);

    if ((dateBegin || dateEnd) !== null) {
      this.diffDays = dateEnd.getDate() - dateBegin.getDate();
    }
    if (this.diffDays < 0) {
      this.lowerDate = true;
      const alertDataWrong: Alerts[] = [
        {
          type: 'danger',
          title: 'Error',
          message: this.t('message_alert_two_ts'),
          confirmation: false,
        },
      ];
      this.alert.setAlert(alertDataWrong[0]);
      [
        'date_begin',
        'date_end',
        'start_time',
        'end_time',
        'observation_request',
      ].forEach(form => {
        this.forms.controls[form].setValue('');
      });
      dateBegin = null;
      dateEnd = null;
    }
    if (dateBegin !== null && this.formRequests.maximum_days === 1) {
      date_end.value = date_begin.value;
    }
    if (dateBegin !== null || dateEnd !== null) {
      if (date_begin.value === date_end.value) {
        this.showTime = true;
      } else {
        this.showTime = false;
      }
    }
  }
}
