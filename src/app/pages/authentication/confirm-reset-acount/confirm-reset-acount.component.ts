import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-confirm-reset-acount',
  templateUrl: './confirm-reset-acount.component.html',
  styleUrls: ['./confirm-reset-acount.component.css']
})
export class ConfirmResetAcountComponent implements OnInit {
  public txtPassword: string = '';
  public txtConfirmPassword: string = '';
  public dataEnterprise: Enterprise;

  constructor(public alert: AlertsService) { }

  ngOnInit() {
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
  }

  restartPassword(){
    if (this.txtPassword !== this.txtConfirmPassword) {
      const alertWarning: Alerts[] = [{
        type: 'danger',
        title: 'Advertencia',
        message: 'Ingrese la nueva contraseña para poder confirmarla.'
      }];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
    }
  }

  // events
  overEyePassword(input) {
    (<HTMLInputElement>document.getElementById(input)).type = 'text';
  }

  leaveEyePassword(input) {
    (<HTMLInputElement>document.getElementById(input)).type = 'password';
  }

  blurConfirmPasword() {

  }

  keyupConfirmPassword() {
    if (this.txtPassword === '') {
      const alertWarning: Alerts[] = [{
        type: 'warning',
        title: 'Advertencia',
        message: 'Ingrese la nueva contraseña para poder confirmarla.'
      }];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
    } 
  }
}
