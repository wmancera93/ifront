import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsRequestsService } from '../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests, TypesRequest } from '../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
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
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public forms: FormGroup;
  public detectLetter = ' ';
  public today: any;
  public showTime = true;
  public showDate = false;
  public modalState = true;
  public is_payment = false;
  public temporal: any = null;
  public sumatoria: number = 0;
  public isfull: boolean = false;
  public ambiente: string;
  public isGDV: boolean = false;

  diffDays: number;
  lowerDate: boolean;

  public allForms = new FormState({
    cases: {
      VITD: {
        days_available: true,
        date_begin: false,
        date_end: false,
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
        prepayment: true,
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

  get taken_vital_days(): any {
    if (this.forms) return this.forms!.controls!.taken_vital_days;
    return null;
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
        this.file = object.file;
      }),
    );
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueVtd') {
        this.modalState = true;
        this.forms.controls.vitalDate.setValue('');
      }
    });

    this.subscriptions.push(
      this.formsRequestsService.getFormRequests().subscribe((data: TypesRequests) => {
        this.formRequests = data;
        this.sumatoria = 0;
        this.isfull = false;
        const { alias, minimum_days, maximum_days } = data;
        this.allForms.setCaseForm(alias);

        const url = window.location.href;
        if (url.split('localhost').length === 1) {
          if (url.split('-').length > 1) {
            this.ambiente = url.split('-')[0].split('/')[url.split('-')[0].split('/').length - 1];
          }
        } else {
          this.ambiente = 'development';
        }
        
        switch (this.ambiente) {
          case 'development':
          case 'dev':
            if (
              JSON.parse(localStorage.getItem('enterprise')).id === 11 ||
              JSON.parse(localStorage.getItem('enterprise')).id === 4
            ) {
              this.is_payment = true;
            }
            if (
              JSON.parse(localStorage.getItem('enterprise')).id === 34 ||
              JSON.parse(localStorage.getItem('enterprise')).id === 4
            ) {
              this.isGDV = true;
            }

            break;
          case 'staging':
            if (JSON.parse(localStorage.getItem('enterprise')).id === 12) {
              this.is_payment = true;
            }
            break;

          default:
            if (JSON.parse(localStorage.getItem('enterprise')).id === 32) {
              this.is_payment = true;
            }
            if (JSON.parse(localStorage.getItem('enterprise')).id === 34) {
              this.isGDV = true;
            }
            break;
        }

        const formBuild = (forms: string[], formsDefault: Object = {}): Object => {
          forms.forEach(form => {
            formsDefault = {
              ...formsDefault,
              [form]: ['', (control: AbstractControl) => (this.formState(form) ? Validators.required(control) : null)],
            };
          });
          return formsDefault;
        };
        this.forms = fb.group({
          request_type_id: this.formRequests.id,
          ...formBuild(['date_begin', 'days_request', 'file_support', 'start_time', 'end_time', 'vitalDay', 'vitalJourney']),
          taken_vital_days: [],
          prepayment: false,
          date_end: [
            '',
            (control: AbstractControl) => {
              const date_end: boolean = this.formState('date_end');
              if (date_end) {
                if (this.case !== 'PRSC') return Validators.required(control);
                else {
                  if (this.showDate && this.case === 'PRSC') {
                    return Validators.required(control);
                  }
                }
              }
              return null;
            },
          ],
          vitalDate: [
            '',
            ({ value }: AbstractControl) => {
              let exist = false;
              try {
                exist = this.taken_vital_days!.value!.find(taken_vital_day => taken_vital_day.day_taken == value);
              } catch (error) {
                exist = false;
              }
              if ((new Date(value).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) < 0) {
                return { isInvalid: true };
              }
              if (exist) {
                return { existed: true };
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

  ngOnInit() {
    this.requestsRhService.getListVitalDays().subscribe((data: any) => {
      this.temporal = data.data;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  downLoadAttach(param: string) {
    switch (param) {
      case 'VACA':
        window.open('https://only-gdv.s3.amazonaws.com/FO-M8-P1-06+V01+Solicitud+de+Vacaciones.doc');
        break;
      case 'PERM':
        window.open('https://only-gdv.s3.amazonaws.com/FO-M8-P1-05+V01+Solicitud+de+Permisos.doc');
        break;
    }
  }

  addVtd() {
    const { vitalDay, vitalDate, vitalJourney, taken_vital_days } = this.forms.controls;
    taken_vital_days.setValue([
      {
        day_taken: vitalDate.value,
        workdays_type: vitalJourney.value,
        extra: {
          vitalDay: vitalDay.value,
          day_taken: vitalDate.value,
          workdays_type: this.temporal.find(result => result.id == vitalJourney.value).label,
        },
      },
      ...(taken_vital_days.value || []),
    ]);

    this.sumatoria =
      parseFloat(this.temporal.find(result => result.id == vitalJourney.value).quantity) + (this.sumatoria! ? this.sumatoria : 0);
    if (this.sumatoria >= 2) {
      this.isfull = true;
    } else {
      this.isfull = false;
    }
    if (this.sumatoria > 2) {
      this.modalState = false;
      this.alert.setAlert({
        type: 'danger',
        title: 'Error',
        message: 'Excede el numero de dias vitales',
        confirmation: true,
        typeConfirmation: 'continueVtd',
      } as Alerts);

      this.deleteVitalDay(taken_vital_days[length - 1], taken_vital_days.value[0]);
    }
    vitalDay.setValue('');
    vitalDate.setValue('');
    vitalJourney.setValue('');
  }

  setJourney(param) {
    if (param == 'Día') {
      this.forms.controls.vitalJourney.setValue('3');
    }
  }

  deleteVitalDay(i: number, object: any) {
    const array: any[] = this.taken_vital_days.value;
    array.splice(i, 1);
    this.isfull = false;
    this.sumatoria =
      this.sumatoria - parseFloat(this.temporal.find(result => result.label == object.extra.workdays_type).quantity);
  }
  newRequest(model) {
    this.sumatoria = 0;
    // document.getElementById("loginId").style.display = 'block';
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;
    switch (this.formRequests.alias.toUpperCase()) {
      case 'EDUB':
      case 'EDUU':
      case 'EDUI':
      case 'EDUS':
      case 'AUXL':
      case 'PERM':
      case 'INCA':
      case 'HOUT':
      case 'TRNT':
        const modelFromdata = new FormData();
        Object.keys(model).forEach(field => {
          if (field === 'file') {
            model[field].forEach(file => {
              modelFromdata.append(`${field}[]`, file);
            });
          } else {
            modelFromdata.append(field, model[field]);
          }
        });
        modelFromdata.append('file_support', this.file);

        this.formDataService.postRequestsFormData(modelFromdata).subscribe(
          (data: any) => {
            this.modalActions.close();
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_ts'),
                message: this.t('message_alert_ts') + data.data[0].id.toString(),
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

        break;

      default:
        this.requestsRhService.postRequests(model).subscribe(
          (data: any) => {
            this.modalActions.close();
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_ts'),
                message: this.t('message_alert_ts') + data.json().data[0].id.toString(),
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
        break;
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

    let dateBegin = date_begin.value === ' ' ? null : new Date(date_begin.value);
    let dateEnd = date_end.value === ' ' ? null : new Date(date_end.value);

    if (new Date(date_begin.value) > new Date(date_end.value)) {
      this.modalActions.close();
      this.lowerDate = true;
      const alertDataWrong: Alerts[] = [
        {
          type: 'danger',
          title: 'Error',
          message: this.t('message_alert_one_ts'),
          confirmation: false,
        },
      ];
      this.alert.setAlert(alertDataWrong[0]);
      ['date_begin', 'date_end', 'start_time', 'end_time', 'observation_request'].forEach(form => {
        this.forms.controls[form].setValue('');
      });
      dateBegin = null;
      dateEnd = null;
    }
    // if (this.diffDays < 6) {
    //   this.modalActions.close();
    //   this.alert.setAlert({
    //     type: 'warning',
    //     title: 'Advertencia',
    //     message: 'No es posible solicitar menos de seis (6) dias de vacaciones',
    //     confirmation: false,
    //     typeConfirmation: '',
    //   } as Alerts);
    // }
    if (dateBegin !== null && this.formRequests.maximum_days === 1) {
      date_end.setValue(date_begin.value);
    }
    if (dateBegin !== null || dateEnd !== null) {
      if (date_begin.value === date_end.value) {
        this.showTime = true;
      } else {
        this.showTime = false;
      }
    }
  }

  vitalValidate() {
    if (this.forms.controls.vitalDate.invalid) {
      this.modalState = false;
      const { existed, isInvalid } = this.forms.controls.vitalDate.errors;
      let message;
      if (existed) {
        message = 'No es posible solicitar el mismo día';
      }
      if (isInvalid) {
        message = 'La fecha del dia vital no puede ser igual o menor que la actual';
      }
      this.alert.setAlert({
        type: 'danger',
        title: 'Error',
        message,
        confirmation: true,
        typeConfirmation: 'continueVtd',
      } as Alerts);
    }
  }
}
