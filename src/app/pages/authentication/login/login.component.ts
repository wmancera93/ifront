import { Component, OnInit } from '@angular/core';

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
import { TranslateService } from '@ngx-translate/core';
import { baseUrl } from '../../../../environments/environment';

declare const ga: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public txtEmail = '';
  public txtPassword = '';
  public dataEnterprise: Enterprise[] = [];
  public heightContenGeneral = 0;
  public passwordLogin: string;
  public checkedLocal: string;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.authentication.login.${key}`;
  }

  constructor(
    private tokenService: Angular2TokenService,
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertsService,
    public userSharedService: UserSharedService,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.initApp();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  initApp() {
    const laguaje = localStorage.getItem('lang') || this.translate.getBrowserLang();
    this.tokenService.init({
      apiBase: baseUrl(),
      apiPath: `api/v2/${laguaje.match(/es|en/) ? laguaje : 'es'}`,
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
          Accept: 'application/json',
        },
      },
    });
  }

  changeLanguaje(param: string) {
    this.translate.use(param);
    this.initApp();
  }

  ngOnInit() {
    const rememeberObject = JSON.parse(localStorage.getItem('remember'));

    this.txtEmail = rememeberObject == null ? '' : rememeberObject[0].email;
    this.txtPassword = rememeberObject == null ? '' : rememeberObject[0].password;

    if (this.txtEmail !== '' && this.txtPassword !== '') {
      setTimeout(() => {
        (<HTMLInputElement>document.getElementById('chk_remember')).checked = true;
      }, 200);
    }

    const url = window.location.href;
    let ambient;

    if (url.split('localhost').length === 1) {
      if (url.split('-').length > 1) {
        ambient = url.split('-')[0].split('/')[url.split('-')[0].split('/').length - 1];
      }
    } else {
      ambient = 'development';
    }

    this.mainService.getDataEnterprise(ambient).subscribe((result: any) => {
      this.dataEnterprise[0] = result.data;
      const { background_login, primary_color, body_text } = this.dataEnterprise[0];
      if (!this.stylesExplorerService.validateBrowser()) {
        const setProp = (a, b) => {
          document.documentElement.style.setProperty(a, b);
        };
        setProp(`--img-header-login`, `url(${background_login.url})`);
        setProp(`--btn-primary`, primary_color);
        setProp(`--btn-primary-hover`, body_text);
        setProp(`--primary`, primary_color);
      } else {
        document.getElementsByClassName('gray-bg')[0].removeAttribute('style');
        setTimeout(() => {
          this.stylesExplorerService.stylesInExplorerOrEdge(
            background_login.url,
            primary_color,
            primary_color,
            body_text,
            '',
            '',
            '0 0 0 0',
            '0px',
            'none',
            '-1px',
            '-12px',
            '',
            '',
          );
        }, 200);
      }

      const link = document.createElement('link'),
        oldLink = document.getElementById('fa_icon');
      link.id = 'fa_icon';
      link.rel = 'shortcut icon';
      link.href = this.dataEnterprise[0].logo_inside.url.toString();
      if (oldLink) {
        document.head.removeChild(oldLink);
      }
      document.head.appendChild(link);

      localStorage.setItem('enterprise', JSON.stringify(result.data));
    });
    if (this.dataEnterprise.length > 0) {
      this.heightContenGeneral = document.getElementById('headerLogin').clientHeight - this.heightContenGeneral;
    }
  }

  singInSession() {
    if (this.txtEmail.length !== 0 && this.txtPassword.length !== 0) {
      let expressionRegular;
      let validatePasword;
      if (this.dataEnterprise[0].login_ldap) {
        expressionRegular = true;
        validatePasword = expressionRegular;
      } else {
        expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
        validatePasword = expressionRegular.test(this.txtPassword);
      }

      if (validatePasword) {
        this.tokenService
          .signIn({
            email: this.txtEmail,
            password: this.txtPassword,
          })
          .subscribe(
            res => {
              let result: User;
              if (res.status === 200) {
                result = res.json().data;
                this.userSharedService.setUser(result);
                localStorage.setItem('user', JSON.stringify(result));
                this.router.navigate(['/ihr/index']);
                this.googleAnalyticsEventsService.emitEvent('authentication', 'singInSession', 'Sing in session', 1);
              }
            },
            error => {
              let resultError: any;
              let typeAlert = 'danger';
              if (error.status === 401) {
                typeAlert = 'warning';
              }
              localStorage.setItem('user', JSON.stringify(''));
              resultError = error.json();
              const alertWarning: Alerts[] = [
                {
                  type: typeAlert,
                  title: this.t('title_warning_ts_one'),
                  message: resultError.errors[0],
                },
              ];
              this.alert.setAlert(alertWarning[0]);
              this.googleAnalyticsEventsService.emitEvent('login', 'errorSingInSession', 'Error sing in session', 1);
            },
          );
      } else {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('title_warning_ts_one'),
            message: this.t('msg_characters_minimum_ts'),
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      }
    } else {
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: this.t('title_warning_ts_one'),
          message: this.t('msg_email_is_required_ts'),
        },
      ];
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
    const expressionRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (this.txtEmail !== '') {
      if (!expressionRegular.test(this.txtEmail)) {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('title_warning_ts_one'),
            message: this.t('msg_tincorrect_format_ts'),
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.txtEmail = '';
      }
    }
  }

  rememberMe() {
    if (this.txtEmail !== '' && this.txtPassword !== '') {
      const objectRemember: any[] = [];
      if ((<HTMLInputElement>document.getElementById('chk_remember')).checked) {
        objectRemember.push({
          email: this.txtEmail,
          password: this.txtPassword,
        });
      } else {
        objectRemember.push({ email: '', password: '' });
      }

      localStorage.setItem('remember', JSON.stringify(objectRemember));
    } else {
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: this.t('title_warning_ts_one'),
          message: this.t('msg_enter_your_data_ts'),
        },
      ];
      this.alert.setAlert(alertWarning[0]);
      (<HTMLInputElement>document.getElementById('chk_remember')).checked = false;
    }
  }
}
