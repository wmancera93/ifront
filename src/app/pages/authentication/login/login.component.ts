import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

// services
import { Angular2TokenService } from 'angular2-token';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { User } from '../../../models/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';

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
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertsService,
    public userSharedService: UserSharedService) {
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

  }

  singInSession() {

    if (this.txtEmail.length !== 0 && this.txtPassword.length !== 0) {
      this.tokenService.signIn({
        email: this.txtEmail,
        password: this.txtPassword
      }).subscribe(
        res => {
          let result: User;
          if (res.status === 200) {
            result = res.json().data;           
            this.userSharedService.setUser(result);  
            localStorage.setItem("user", JSON.stringify(result));
            this.router.navigate(['/Pages/Dashboard']);         
          }
        },
        error => {
          let resultError: any;
          let typeAlert: string = 'danger';
          if (error.status === 401) {
            typeAlert = 'warning';
          }
          resultError = error.json();
          const alertWarning: Alerts[] = [{ type: typeAlert, title: 'Advertencia', message: resultError.errors[0] }];
          this.alert.setAlert(alertWarning[0]);
        }
        )
    } else {
      const alertWarning: Alerts[] = [{ type: 'warning', title: 'Advertencia', message: 'El email y contraseña son obligatorios.' }];
      this.alert.setAlert(alertWarning[0]);
    }
  }
}
