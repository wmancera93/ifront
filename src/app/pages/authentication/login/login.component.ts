import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

// services
import { Angular2TokenService } from 'angular2-token';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../services/shared/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';

// models


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public txtEmail: string = '';
  public txtPassword: string = '';

  constructor(private tokenService: Angular2TokenService,
    router: Router,
    route: ActivatedRoute,
    public alert: AlertsService) {
    this.tokenService.init(
      {
        apiBase: environment.apiBaseHr,
        apiPath: 'api/v2',

        signInPath: 'auth/sign_in',
        // signInRedirect: null,
        // signInStoredUrlStorageKey: null,

        signOutPath: 'auth/sign_out',
        validateTokenPath: 'auth/validate_token',
        signOutFailedValidate: false,

        registerAccountPath: 'auth/password/new',
        // deleteAccountPath: 'auth',
        // registerAccountCallback: window.location.href,

        updatePasswordPath: 'auth/password',
        resetPasswordPath: 'auth/password/edit',
        // resetPasswordCallback: window.location.href,

        // oAuthBase: window.location.origin,
        // oAuthPaths: {
        //   github: 'auth/github'
        // },
        // oAuthCallbackPath: 'oauth_callback',
        // oAuthWindowType: 'newWindow',
        // oAuthWindowOptions: null,

        // userTypes: null,

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

  }

  singInSession() {
    if (this.txtEmail.length !== 0 && this.txtPassword.length !== 0) {
      this.tokenService.signIn({
        email: this.txtEmail,
        password: this.txtPassword
      }).subscribe(
        res => {
          console.log(res)
        },
        error => {
          const alertError: Alerts[] = [{ type: 'danger', title: 'Advertencia', message: 'Identidad o contraseña no válida.' }];
          this.alert.setAlert(alertError[0]);
        });
    } else {
      const alertWarning: Alerts[] = [{ type: 'warning', title: 'Advertencia', message: 'El email y contraseña son obligatorios.' }];
      this.alert.setAlert(alertWarning[0]);
    }
  }
}
