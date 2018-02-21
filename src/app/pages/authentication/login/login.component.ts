import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

// services
import { Angular2TokenService } from 'angular2-token';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { MainService } from '../../../services/main/main.service';

// models
import { Alerts } from '../../../models/common/alerts/alerts';
import { User } from '../../../models/general/user';
import { Enterprise } from '../../../models/general/enterprise';
import { GoogleAnalyticsEventsService } from '../../../services/google-analytics-events.service';

declare const ga: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public txtEmail: string = '';
  public txtPassword: string = '';
  public dataEnterprise: Enterprise;
  public heightContenGeneral: number = 0;

  constructor(private tokenService: Angular2TokenService,
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertsService,
    public userSharedService: UserSharedService,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
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
        resetPasswordPath: 'auth/password',
        globalOptions: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      }
    );

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.mainService.getDataEnterprise()
      .subscribe((result: any) => {
        this.dataEnterprise = result.data;
        document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
        document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
        document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
        document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
        localStorage.setItem("enterprise", JSON.stringify(result.data));
      })

    this.heightContenGeneral = document.getElementById("headerLogin").clientHeight - this.heightContenGeneral;
    document.documentElement.style.setProperty(`--heigth-content-general`, this.heightContenGeneral + 'px');
  }

  singInSession() {
    if (this.txtEmail.length !== 0 && this.txtPassword.length !== 0) {
      let expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
      if (expressionRegular.test(this.txtPassword)) {
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
              this.router.navigate(['/ihr/index']);
              this.googleAnalyticsEventsService.emitEvent("authentication", "singInSession", "Sing in session", 1);
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
            this.googleAnalyticsEventsService.emitEvent("login", "errorSingInSession", "Error sing in session", 1);
          }
        )
      } else {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: 'La contraseña debe contener minimo 8 caracteres, una letra minuscula, una letra mayuscula y almenos un número.'
        }];
        this.alert.setAlert(alertWarning[0]);
      }
    } else {
      const alertWarning: Alerts[] = [{
        type: 'warning',
        title: 'Advertencia',
        message: 'El email y contraseña son obligatorios.'
      }];
      this.alert.setAlert(alertWarning[0]);
    }
  }


  // events
  overEyePassword() {
    (<HTMLInputElement>document.getElementById('password')).type = 'text';
  }

  leaveEyePassword() {
    (<HTMLInputElement>document.getElementById('password')).type = 'password';
  }

  lowercaseEmail() {
    this.txtEmail = this.txtEmail.toLowerCase();
  }

  blurEmail() {
    let expressionRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (this.txtEmail !== '') {
      if (!expressionRegular.test(this.txtEmail)) {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: 'El formato del email es incorrecto, Ej: ejemplo@xxxx.xx'
        }];
        this.alert.setAlert(alertWarning[0]);
        this.txtEmail = '';
      }
    }
  }
}
