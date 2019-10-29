import { Component, OnInit } from '@angular/core';
import { BackofficeService } from '../../../services/backOffice/backoffice.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-upload-colors',
  templateUrl: './upload-colors.component.html',
  styleUrls: ['./upload-colors.component.css'],
})
export class UploadColorsComponent implements OnInit {
  public color_primary: string = '';
  public color_text_primary: string = '';
  public color_body: string = '';
  public color_secundary: string = '';
  public idLog: string;
  public objectSend: any = null;

  constructor(public backofficeService: BackofficeService, public alert: AlertsService) {
    this.idLog = JSON.parse(localStorage.getItem('user')).employee_id;
  }

  ngOnInit() {}
  sendObjectColor() {
    (this.objectSend = {
      primary_color: this.color_primary,
      text_primary_color: this.color_text_primary,
      body_text: this.color_body,
      background_wrapper_color: '#f8f8f8',
    }),
      this.backofficeService.putChangeColors(this.idLog, this.objectSend).subscribe(
        (data: any) => {
          if (data.success) {
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: 'Transacción Exitosa',
                message: data.message,
                confirmation: false,
                typeConfirmation: '',
              },
            ];
            this.alert.setAlert(alertWarning[0]);
            const setProp = (a, b) => {
              document.documentElement.style.setProperty(a, b);
            };
            setProp(`--btn-primary`, this.color_primary);
            setProp(`--btn-primary-hover`, this.color_body);
            setProp(`--primary`, this.color_text_primary);
          }
        },
        (error: any) => {
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: error.json().errors.toString(),
              confirmation: false,
              typeConfirmation: '',
            },
          ];
          this.alert.setAlert(alertWarning[0]);
        },
      );
  }
}
