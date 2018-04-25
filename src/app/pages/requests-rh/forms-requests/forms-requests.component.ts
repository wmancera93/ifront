import { Component, OnInit } from '@angular/core';
import { FormsRequestsService } from '../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';

@Component({
  selector: 'app-forms-requests',
  templateUrl: './forms-requests.component.html',
  styleUrls: ['./forms-requests.component.css']
})
export class FormsRequestsComponent implements OnInit {
  public formRequests: TypesRequests = null;

  public file: any;
  public filePermisionMarriage: string = 'fileMarriage';

  formVaca: any;
  formVacaComp: any;
  formPerm: any;

  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor(private requestsRhService: RequestsRhService,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public fileUploadService: FileUploadService) {

    this.fileUploadService.getObjetFile()
      .subscribe((object) => {
        this.file = object;
        console.log(this.file)
      })

    this.formsRequestsService.getFormRequests().subscribe((data: TypesRequests) => {
      this.formVaca = new FormGroup({});
      this.formVacaComp = new FormGroup({});
      this.formPerm = new FormGroup({});

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
        case 'CESA':

          break;
        case 'INCA':

          break;
        default:
          break;
      }

      document.getElementById('btn_form_requests').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    });
  }

  ngOnInit() {

  }

  newRequest(model) {
    if (this.formRequests.id_activity === 'PERM') {
      let modelFromdata = new FormData();
      modelFromdata.append('request_type_id', model.request_type_id);
      modelFromdata.append('date_begin', model.date_begin);
      modelFromdata.append('date_end', model.date_end);
      modelFromdata.append('file_support', this.file);
      modelFromdata.append('observation_request', model.observation_request);
      model = modelFromdata;
    }
    this.requestsRhService.postRequests(model)
      .subscribe(
        (data: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseRequest')[0]).click();
          const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud generada correctamente, ticket #' + data.data[0].id.toString(), confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.formsRequestsService.setRestartObject(true);
        },
        (error: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseRequest')[0]).click();
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.error.errors.toString(), confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
        },
    );
  }


}
