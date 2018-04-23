import { Component, OnInit } from '@angular/core';
import { FormsRequestsService } from '../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../models/common/requests-rh/requests-rh';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';

@Component({
  selector: 'app-forms-requests',
  templateUrl: './forms-requests.component.html',
  styleUrls: ['./forms-requests.component.css']
})
export class FormsRequestsComponent implements OnInit {
  public formRequests: TypesRequests = null;

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor(private requestsRhService: RequestsRhService, public formsRequestsService: FormsRequestsService) {
    this.formsRequestsService.getFormRequests().subscribe((data: TypesRequests) => {
      this.formRequests = data;
      this.model = {};
      this.fields = [];
      console.log(this.formRequests.id_activity);
      switch (this.formRequests.id_activity) {
        case 'VACA':
          this.model = { request_type_id: this.formRequests.id, date_begin: '', date_end: '', observation_request: '' };
          this.fields = [{
            key: 'date_begin',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Fecha Inicial',
              cols: 12,
              required: true,
            }
          },
          {
            key: 'date_end',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Fecha Final',
              cols: 12,
              required: true,
            }
          },
          {
            key: 'observation_request',
            type: 'textarea',
            templateOptions: {
              type: 'text',
              label: 'Observaciones',
              cols: 12,
              required: true,
            }
          }];
          break;
        case 'VCCP':
          this.model = { request_type_id: this.formRequests.id, days_request: '', observation_request: '' };
          this.fields = [{
            key: 'days_request',
            type: 'number',
            templateOptions: {
              type: 'number',
              label: 'Dias a solicitar',
              cols: 12,
              required: true,
            }
          },
          {
            key: 'observation_request',
            type: 'textarea',
            templateOptions: {
              type: 'date',
              label: 'Observaciones',
              cols: 12,
              required: true,
            }
          }];
          break;
        case 'PERM':
          this.model = { request_type_id: this.formRequests.id, date_begin: '', date_end: '', file_support: '', observation_request: '' };
          this.fields = [{
            key: 'date_begin',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Fecha Inicial',
              cols: 12,
              required: true,
            }
          },
          {
            key: 'date_end',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Fecha Final',
              cols: 12,
              required: true,
            }
          },
          {
            key: 'file_support',
            type: 'file',
            templateOptions: {
              type: 'file',
              label: 'Adjuntar archivo de soporte',
              cols: 12,
              required: true,
            }
          },
          {
            key: 'observation_request',
            type: 'textarea',
            templateOptions: {
              type: 'date',
              label: 'Observaciones',
              cols: 12,
              required: true,
            }
          }];
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



  submit(model) {
    console.log(model);
    this.requestsRhService.postRequests(model)
      .subscribe((data: any) => {
        console.log(data)
      });
  }


}
