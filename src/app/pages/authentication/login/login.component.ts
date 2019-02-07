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
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

declare const ga: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public txtEmail: string = '';
  public txtPassword: string = '';
  public dataEnterprise: Enterprise[] = [];
  public heightContenGeneral: number = 0;
  public translate: Translate = null;

  constructor(private tokenService: Angular2TokenService,
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertsService,
    public userSharedService: UserSharedService,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    public stylesExplorerService: StylesExplorerService, public translateService: TranslateService) {
    
    this.translate = this.translateService.getTranslate();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    let rememeberObject = JSON.parse(localStorage.getItem("remember"));

    this.txtEmail = rememeberObject == null ? '' : rememeberObject[0].email;
    this.txtPassword = rememeberObject == null ? '' : rememeberObject[0].password;

    if (this.txtEmail !== '' && this.txtPassword !== '') {
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById('chk_remember')).checked = true;
      }, 200);
    }

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
        if (!this.stylesExplorerService.validateBrowser()) {
          document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise[0].background_login.url + `)`);
          document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise[0].primary_color);
          document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise[0].body_text);
          document.documentElement.style.setProperty(`--primary`, this.dataEnterprise[0].primary_color);
        } else {
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
        }

        var link = document.createElement('link'),
          oldLink = document.getElementById('fa_icon');
        link.id = 'fa_icon';
        link.rel = 'shortcut icon';
        link.href = this.dataEnterprise[0].logo_inside.url.toString();
        if (oldLink) {
          document.head.removeChild(oldLink);
        }
        document.head.appendChild(link)

        localStorage.setItem("enterprise", JSON.stringify(result.data));
      })
    if (this.dataEnterprise.length > 0) {
      this.heightContenGeneral = document.getElementById("headerLogin").clientHeight - this.heightContenGeneral;
    }
  }

  singInSession() {
    if (this.txtEmail.length !== 0 && this.txtPassword.length !== 0) {
      let expressionRegular
      let validatePasword
      if (this.dataEnterprise[0].login_ldap) {
        expressionRegular = true;
        validatePasword = expressionRegular;
      } else {
        expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
        validatePasword = expressionRegular.test(this.txtPassword);
      }

      if (validatePasword) {
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
            const alertWarning: Alerts[] = [{ type: typeAlert, title: this.translate.app.frontEnd.pages.authentication.login.title_warning_ts_one, message: resultError.errors[0] }];
            this.alert.setAlert(alertWarning[0]);
            this.googleAnalyticsEventsService.emitEvent("login", "errorSingInSession", "Error sing in session", 1);
          }
        )
      } else {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: this.translate.app.frontEnd.pages.authentication.login.title_warning_ts_one,
          message: this.translate.app.frontEnd.pages.authentication.login.msg_characters_minimum_ts,
        }];
        this.alert.setAlert(alertWarning[0]);
      }
    } else {
      const alertWarning: Alerts[] = [{
        type: 'warning',
        title: this.translate.app.frontEnd.pages.authentication.login.title_warning_ts_one,
        message: this.translate.app.frontEnd.pages.authentication.login.msg_email_is_required_ts,
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
          title: this.translate.app.frontEnd.pages.authentication.login.title_warning_ts_one,
          message: this.translate.app.frontEnd.pages.authentication.login.msg_tincorrect_format_ts,
        }];
        this.alert.setAlert(alertWarning[0]);
        this.txtEmail = '';
      }
    }
  }

  rememberMe() {
    if (this.txtEmail !== '' && this.txtPassword !== '') {
      let objectRemember: any[] = []
      if ((<HTMLInputElement>document.getElementById('chk_remember')).checked) {
        objectRemember.push({ email: this.txtEmail, password: this.txtPassword })
      } else {
        objectRemember.push({ email: '', password: '' })
      }

      localStorage.setItem("remember", JSON.stringify(objectRemember));
    } else {
      const alertWarning: Alerts[] = [{
        type: 'warning',
        title: this.translate.app.frontEnd.pages.authentication.login.title_warning_ts_one,
        message: this.translate.app.frontEnd.pages.authentication.login.msg_enter_your_data_ts,
      }];
      this.alert.setAlert(alertWarning[0]);
      (<HTMLInputElement>document.getElementById('chk_remember')).checked = false;
    }
  }

}