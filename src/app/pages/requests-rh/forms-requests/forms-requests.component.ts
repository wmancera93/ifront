import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-forms-requests',
  templateUrl: './forms-requests.component.html',
  styleUrls: ['./forms-requests.component.css']
})
export class FormsRequestsComponent implements OnInit {
  public formRequests: TypesRequests = null;
  public showSubmit = true;

  public file: any;
  public filePermisionMarriage = 'fileMarriage';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  public formVaca: any;
  public formVacaComp: any;
  public formPerm: any;
  public formPres: any;

  public detectLetter = ' ';
  public captureDate = ' ';

  public model = {};
  public fields: FormlyFieldConfig[] = [];

  // tslint:disable-next-line:no-inferrable-types
  public showTime: boolean = false;
  // public diffDays: number;

  constructor(private requestsRhService: RequestsRhService,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public formDataService: FormDataService,
    public stylesExplorerService: StylesExplorerService) {

    this.fileUploadService.getObjetFile()
      .subscribe((object) => {
        this.file = object;
      });

    this.formsRequestsService.getFormRequests().subscribe((data: TypesRequests) => {
      this.formVaca = new FormGroup({});
      this.formVacaComp = new FormGroup({});
      this.formPerm = new FormGroup({});
      this.formPres = new FormGroup({});

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
            this.showTime = true;
          } else {
            this.showTime = false;
          }

          break;
        case 'CESA':

          break;
        case 'INCA':

          break;
        default:
          break;
      }

      if (document.getElementById('form_requests').className !== 'modal show') {
        document.getElementById('btn_form_requests').click();
        document.getElementById('bodyGeneral').removeAttribute('style');

        setTimeout(() => {
          this.stylesExplorerService.addStylesCommon();
        }, 300);
      }

    });
  }

  ngOnInit() {

  }

  newRequest(model) {
    // document.getElementById("loginId").style.display = 'block';
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;
    if (this.formRequests.id_activity === 'PERM') {
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
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseRequest')[0]).click();
            const alertWarning: Alerts[] = [{
              type: 'success',
              title: 'Solicitud Exitosa',
              message: 'Solicitud generada correctamente, ticket #' + data.json().data[0].id.toString(),
              confirmation: false
            }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.formsRequestsService.setRestartObject(true);

            // setTimeout(() => {
            //   document.getElementById("loginId").style.display = 'none'
            //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            // }, 2000)
          },
          (error: any) => {
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseRequest')[0]).click();
            const alertWarning: Alerts[] = [{
              type: 'danger',
              title: 'Solicitud Denegada',
              message: error.json().errors.toString(),
              confirmation: false
            }];
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
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseRequest')[0]).click();
            const alertWarning: Alerts[] = [{
              type: 'success',
              title: 'Solicitud Exitosa',
              message: 'Solicitud generada correctamente, ticket #' + data.json().data[0].id.toString(),
              confirmation: false
            }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.formsRequestsService.setRestartObject(true);

            // setTimeout(() => {
            //   document.getElementById("loginId").style.display = 'none'
            //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            // }, 2000)
          },
          (error: any) => {
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseRequest')[0]).click();
            const alertWarning: Alerts[] = [{
              type: 'danger',
              title: 'Solicitud Denegada',
              message: error.json().errors.toString(), confirmation: false
            }];
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

    if (this.captureDate !== null && this.formRequests.maximum_days === 1 ) {
      this.formPres.controls.date_end.value = this.formPres.controls.date_begin.value;
      console.log(this.formPres.controls.date_end.value);
      }
     if (this.formPres.controls.date_begin.value === this.formPres.controls.date_end.value) {
      this.showTime = true;
    } else {
      this.showTime = false;
    }
  }

  /* calculate dates */
  // const dateBegin = new Date(this.formPres.controls.date_begin.value);
  // const dateEnd = new Date(this.formPres.controls.date_end.value);
  // if (dateBegin || dateEnd != null) {
  //   const diffDays = dateEnd.getDate() - dateBegin.getDate() ;
  // }




}
