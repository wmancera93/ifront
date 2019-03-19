import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsRequestsService } from '../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';
import { ISubscription } from 'rxjs/Subscription';
import { FormBenefistComponent } from '../form-benefist/form-benefist.component';


@Component({
  selector: 'app-forms-requests',
  templateUrl: './forms-requests.component.html',
  styleUrls: ['./forms-requests.component.css']
})
export class FormsRequestsComponent implements OnInit, OnDestroy {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  modalActions: { close: Function } = { close: () => { } };

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public translate: Translate = null;
  public file: any;
  public filePermisionMarriage = 'fileMarriage';
  public fileInability = 'fileInability';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  public formVaca: any;
  public formVacaComp: any;
  public formPerm: any;
  public formPres: any;
  public formInca: any;

  public detectLetter = ' ';

  public model = {};
  public fields: FormlyFieldConfig[] = [];

  public showTime = true;
  public showDate = false;
  public modalState = true;

  diffDays: number;
  lowerDate: boolean;

  private subscription: ISubscription;


  constructor(
    private requestsRhService: RequestsRhService,
    private modalService: NgbModal,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public formDataService: FormDataService,
    public stylesExplorerService: StylesExplorerService,
    public translateService: TranslateService
  ) {
    this.translate = this.translateService.getTranslate();

    this.fileUploadService.getObjetFile()
      .subscribe((object) => {
        this.file = object;
      });
    this.subscription = this.formsRequestsService.getFormRequests().subscribe((data: TypesRequests) => {
      this.formVaca = new FormGroup({});
      this.formVacaComp = new FormGroup({});
      this.formPerm = new FormGroup({});
      this.formPres = new FormGroup({});
      this.formInca = new FormGroup({});

      this.formRequests = data;
      this.model = {};
      this.fields = [];

      switch (this.formRequests.id_activity) {
        case 'VACA':
          this.formVaca = fb.group({
            request_type_id: this.formRequests.id,
            date_begin: '',
            date_end: '',
            observation_request: '',
          });

          break;
        case 'VCCP':
          this.formVacaComp = fb.group({
            request_type_id: this.formRequests.id,
            days_request: '',
            observation_request: '',
          });

          break;
        case 'PERM':
          this.fileUploadService.setCleanUpload(true);
          this.formPerm = fb.group({
            request_type_id: this.formRequests.id,
            date_begin: '',
            date_end: '',
            file_support: '',
            observation_request: '',
          });
          break;
        case 'PRSC':
          this.formPres = fb.group({
            request_type_id: this.formRequests.id,
            date_begin: '',
            date_end: '',
            start_time: '',
            end_time: '',
            observation_request: '',
          });
          if (this.formRequests.minimum_days === 1 && this.formRequests.maximum_days === 1) {
            this.showDate = false;
          } else {
            this.showDate = true;
          }
          if (this.formRequests.minimum_days === 1 && this.formRequests.maximum_days === 1) {
            this.showTime = true;
          } else {
            this.showTime = false;
          }
          break;
        case 'CESA':

          break;
        case 'INCA':
          this.fileUploadService.setCleanUpload(true);
          this.formInca = fb.group({
            request_type_id: this.formRequests.id,
            date_begin: '',
            date_end: '',
            file_sopport: '',
            observation_request: '',

          });
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.stylesExplorerService.addStylesCommon();
      }, 300);
      const modal = this.modalService.open(this.modalTemplate, { size: 'lg', windowClass: 'modal-md-personalized modal-dialog-scroll', centered: true });
      this.modalActions.close = () => { modal.close(); };
      document.getElementById('bodyGeneral').removeAttribute('style');
      /* if (document.getElementById('form_requests').className !== 'modal show') {
        document.getElementById('btn_form_requests').click();
      } */

    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  newRequest(model) {
    console.log(model);
    // document.getElementById("loginId").style.display = 'block';
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;
    if (this.formRequests.id_activity === 'PERM' || this.formRequests.id_activity === 'INCA') {
      const modelFromdata = new FormData();
      modelFromdata.append('request_type_id', model.request_type_id);
      modelFromdata.append('date_begin', model.date_begin);
      modelFromdata.append('date_end', model.date_end);
      modelFromdata.append('file_support', this.file);
      modelFromdata.append('observation_request', model.observation_request);
      model = modelFromdata;

      this.formDataService.postRequestsFormData(model)
        .subscribe(
          (data: any) => {

            this.modalActions.close();
            const alertWarning: Alerts[] = [{ type: 'success', title: this.translate.app.frontEnd.pages.requests_rh.forms_requests.type_alert_ts, message: this.translate.app.frontEnd.pages.requests_rh.forms_requests.message_alert_ts + data.data[0].id.toString(), confirmation: false }];
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
            const alertWarning: Alerts[] = [{ type: 'danger', title: this.translate.app.frontEnd.pages.requests_rh.forms_requests.type_alert_one_ts, message: error.json().errors.toString(), confirmation: false }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);

            // setTimeout(() => {
            //   document.getElementById("loginId").style.display = 'none'
            //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            // }, 1000)
          });
    } else {
      this.requestsRhService.postRequests(model)
        .subscribe(
          (data: any) => {
            this.modalActions.close();
            const alertWarning: Alerts[] = [{ type: 'success', title: this.translate.app.frontEnd.pages.requests_rh.forms_requests.type_alert_ts, message: this.translate.app.frontEnd.pages.requests_rh.forms_requests.message_alert_ts + data.json().data[0].id.toString(), confirmation: false }];
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
            const alertWarning: Alerts[] = [{ type: 'danger', title: this.translate.app.frontEnd.pages.requests_rh.forms_requests.type_alert_one_ts, message: error.json().errors.toString(), confirmation: false }];
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
      this.formVacaComp = this.fb.group({
        request_type_id: this.formRequests.id,
        days_request: '',
        observation_request: '',
      });
    }
  }

  calculateDay() {
    const { date_begin, date_end } = this.formPres.controls;

    let dateBegin = date_begin.value === ' ' ? null : new Date(date_begin.value);
    let dateEnd = date_end.value === ' ' ? null : new Date(date_end.value);

    if ((dateBegin || dateEnd) !== null) {
      this.diffDays = dateEnd.getDate() - dateBegin.getDate();
    }
    if (this.diffDays < 0) {
      this.lowerDate = true;
      const alertDataWrong: Alerts[] = [{
        type: 'danger',
        title: 'Error',
        message: this.translate.app.frontEnd.pages.requests_rh.forms_requests.message_alert_two_ts,
        confirmation: false
      }];
      this.alert.setAlert(alertDataWrong[0]);
      this.formPres = this.fb.group({
        request_type_id: this.formRequests.id,
        date_begin: '',
        date_end: '',
        start_time: '',
        end_time: '',
        observation_request: '',
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
