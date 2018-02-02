import { Component, OnInit } from '@angular/core';

// services
import { AlertsService } from '../../../services/shared/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { Alerts } from '../../../models/common/alerts/alerts';

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent implements OnInit {
  public txtEmail: string = '';

  constructor(public alert: AlertsService, private tokenService: Angular2TokenService) { }

  ngOnInit() {
  }

  restartSession() {
    if (this.txtEmail.length !== 0) {
      this.tokenService.resetPassword({
        email: this.txtEmail
      }).subscribe(
        res => {
          console.log(res)
        },
        error => {
          const alertError: Alerts[] = [{ type: 'danger', title: 'Advertencia', message: 'Identidad o contraseña no válida.' }];
          this.alert.setAlert(alertError[0]);
        });
    } else {
      const alertWarning: Alerts[] = [{ type: 'warning', title: 'Advertencia', message: 'El email es obligatorio.' }];
      this.alert.setAlert(alertWarning[0]);
    }
  }

}
