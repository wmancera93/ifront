import { Component, OnInit } from '@angular/core';
import { Alerts } from '../../../models/common/alerts/alerts';

// service
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Router,NavigationEnd } from '@angular/router';
import { GoogleAnalyticsEventsService } from '../../../services/google-analytics-events.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { MainService } from '../../../services/main/main.service';
import { Enterprise } from '../../../models/general/enterprise';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

declare const ga: any;

@Component({
  selector: 'app-locked-screen',
  templateUrl: './locked-screen.component.html',
  styleUrls: ['./locked-screen.component.css']
})
export class LockedScreenComponent implements OnInit {
  public userAuthenticated: User = null;
  public txtPassword: string = '';
  public dataEnterprise: Enterprise[] = [];
  public translate: Translate = null;

  constructor(private tokenService: Angular2TokenService,
    public alert: AlertsService,
    public userSharedService: UserSharedService,
    public router: Router,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    public stylesExplorerService: StylesExplorerService, public translateService: TranslateService
  ) {
    this.translate = this.translateService.getTranslate();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.getDataLocalStorage();
    
    if (this.stylesExplorerService.validateBrowser()) {
      let url = window.location.href;
      let ambient;

      if (url.split("localhost").length === 1) {
        if (url.split("-").length > 1) {
          ambient = url.split("-")[0].split("/")[url.split("-")[0].split("/").length - 1];
        }
      } else {
        ambient = 'development';
      }
      this.mainService.getDataEnterprise(ambient)
        .subscribe((result: any) => {
          this.dataEnterprise[0] = result.data;

          document.getElementsByClassName('gray-bg')[0].removeAttribute('style');
          setTimeout(() => {
            this.stylesExplorerService.stylesInExplorerOrEdge(
              this.dataEnterprise[0].background_login.url,
              this.dataEnterprise[0].primary_color,
              this.dataEnterprise[0].primary_color,
              this.dataEnterprise[0].body_text, '', '',
              '0 0 0 0', '0px', 'none', '-1px', '-12px', '', ''
            )
          }, 200);
        });
    }
  }

  getDataLocalStorage() {
    if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
      this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
    }
  }

  singInSession() {
    let expressionRegular
    let validatePasword
    if(this.dataEnterprise[0].login_ldap){
      expressionRegular = true;
      validatePasword = expressionRegular;
    } else {
      expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
      validatePasword = expressionRegular.test(this.txtPassword)
    }
    
    if (validatePasword) {
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
              this.googleAnalyticsEventsService.emitEvent("authentication", "RestartSession", "Restart Session", 1);
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
            const alertWarning: Alerts[] = [{ type: typeAlert, title: this.translate.app.frontEnd.pages.authentication.locket_screen.title_warning_ts, message: resultError.errors[0] }];
            this.alert.setAlert(alertWarning[0]);
          }
          )
      } else {
        const alertWarning: Alerts[] = [{ type: 'warning', title: this.translate.app.frontEnd.pages.authentication.locket_screen.title_warning_ts, message: 'La contraseña es obligatoria.' }];
        this.alert.setAlert(alertWarning[0]);
      }
    } else {
      const alertWarning: Alerts[] = [{
        type: 'danger',
        title: this.translate.app.frontEnd.pages.authentication.locket_screen.title_warning_ts,
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