import { Component, OnInit } from '@angular/core';
import { Alerts } from '../../../models/common/alerts/alerts';

// service
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locked-screen',
  templateUrl: './locked-screen.component.html',
  styleUrls: ['./locked-screen.component.css']
})
export class LockedScreenComponent implements OnInit {
  public userAuthenticated: User = null;
  public txtPassword: string = '';

  constructor(private tokenService: Angular2TokenService,
    public alert: AlertsService,
    public userSharedService: UserSharedService,
    public router: Router) {
    this.tokenService.init(
      {
        apiBase: environment.apiBaseHr,
        apiPath: 'api/v2',
        signInPath: 'auth/sign_in',
        signOutPath: 'auth/sign_out',
        validateTokenPath: 'auth/validate_token',
        signOutFailedValidate: false,
        registerAccountPath: 'auth/password/new',
        updatePasswordPath: 'auth/password',
        resetPasswordPath: 'auth/password/edit',
        globalOptions: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      }
    );
  }

  ngOnInit() {
    this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
      this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
    }
  }

  singInSession() {
    let expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
    if (expressionRegular.test(this.txtPassword)) {
      if (this.txtPassword.length !== 0) {
        this.tokenService.signIn({
          email: this.userAuthenticated.email,
          password: this.txtPassword
        }).subscribe(
          res => {
            let result: User;
            if (res.status === 200) {
              result = res.json().data;
              this.userSharedService.setUser(result);
              localStorage.setItem("user", JSON.stringify(result));
              this.router.navigate(['/ihr/index']);
            }
          },
          error => {
            let resultError: any;
            let typeAlert: string = 'danger';
            if (error.status === 401) {
              typeAlert = 'warning';
            }
            localStorage.setItem("user", JSON.stringify(''));
            resultError = error.json();
            const alertWarning: Alerts[] = [{ type: typeAlert, title: 'Advertencia', message: resultError.errors[0] }];
            this.alert.setAlert(alertWarning[0]);
          }
          )
      } else {
        const alertWarning: Alerts[] = [{ type: 'warning', title: 'Advertencia', message: 'La contraseña es obligatoria.' }];
        this.alert.setAlert(alertWarning[0]);
      }
    } else {
      const alertWarning: Alerts[] = [{
        type: 'danger',
        title: 'Advertencia',
        message: 'La contraseña debe contener minimo 8 caracteres, una letra minuscula, una letra mayuscula y almenos un número.'
      }];
      this.alert.setAlert(alertWarning[0]);
    }
  }

  // events
  overEyePassword() {
    (<HTMLInputElement>document.getElementById('passwordLocked')).type = 'text';
  }

  leaveEyePassword() {
    (<HTMLInputElement>document.getElementById('passwordLocked')).type = 'password';
  }
}
