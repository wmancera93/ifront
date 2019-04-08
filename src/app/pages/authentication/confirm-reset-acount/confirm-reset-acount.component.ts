import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MainService } from '../../../services/main/main.service';
import { GoogleAnalyticsEventsService } from '../../../services/google-analytics-events.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';

declare const ga: any;

@Component({
  selector: 'app-confirm-reset-acount',
  templateUrl: './confirm-reset-acount.component.html',
  styleUrls: ['./confirm-reset-acount.component.css']
})
export class ConfirmResetAcountComponent implements OnInit {
  public txtPassword = '';
  public txtConfirmPassword = '';
  public dataEnterprise: Enterprise;
  public eyePasswordVisible = false;
  public urlTokenPassword = '';

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.authentication.confirm_reset_account.${key}`;
  }

  constructor(
    public alert: AlertsService,
    private tokenService: Angular2TokenService,
    private route: ActivatedRoute,
    public router: Router,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('enterprise') === null) {
      const url = window.location.href;
      let ambient;

      if (url.split('localhost').length === 1) {
        if (url.split('-').length > 1) {
          ambient = url.split('-')[0].split('/')[
            url.split('-')[0].split('/').length - 1
          ];
        }
      } else {
        ambient = 'development';
      }

      this.mainService.getDataEnterprise(ambient).subscribe((result: any) => {
        this.dataEnterprise = result.data;
        const {
          background_login,
          primary_color,
          body_text
        } = this.dataEnterprise;
        this.defineSyles({
          background_login,
          primary_color,
          body_text
        });
        localStorage.setItem('enterprise', JSON.stringify(result.data));
      });
    } else {
      this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
      const {
        background_login,
        primary_color,
        body_text
      } = this.dataEnterprise;
      this.defineSyles({
        background_login,
        primary_color,
        body_text
      });
    }
    this.route.queryParams.subscribe(params => {
      this.urlTokenPassword = params.reset_password_token;
    });
  }

  restartPassword() {
    if (this.txtPassword !== this.txtConfirmPassword) {
      const alertWarning: Alerts[] = [
        {
          type: 'danger',
          title: this.t('title_warning_ts'),
          message: this.t('msg_new_password_ts')
        }
      ];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
    }
  }

  restartPasword() {
    let resultError: any;
    if (this.txtPassword !== '' && this.txtConfirmPassword !== '') {
      this.tokenService
        .updatePassword({
          password: this.txtPassword,
          passwordConfirmation: this.txtConfirmPassword,
          resetPasswordToken: this.urlTokenPassword
        })
        .subscribe(
          res => {
            if (res.status === 200) {
              const alertWarning: Alerts[] = [
                {
                  type: 'success',
                  title: this.t('title_warning_ts'),
                  message: this.t('msg_new_password_ts')
                }
              ];
              this.alert.setAlert(alertWarning[0]);
              this.txtPassword = '';
              this.txtConfirmPassword = '';
              setTimeout(() => {
                document.getElementById('closeModal').click();
                this.router.navigate(['/ihr/login']);
              }, 2000);
              this.googleAnalyticsEventsService.emitEvent(
                'authentication',
                'ConfirmResetPassword',
                'Reset Password Account',
                1
              );
            }
          },
          error => {
            resultError = error.json();
            const alertWarning: Alerts[] = [
              {
                type: 'danger',
                title: this.t('title_warning_ts'),
                message: resultError.errors[0]
              }
            ];
            this.alert.setAlert(alertWarning[0]);
            this.txtPassword = '';
            this.txtConfirmPassword = '';
          }
        );
    }
  }

  defineSyles({ background_login, primary_color, body_text }) {
    const element = document.documentElement;
    if (!this.stylesExplorerService.validateBrowser()) {
      element.style.setProperty(
        `--img-header-login`,
        `url(` + background_login.url + `)`
      );
      element.style.setProperty(`--btn-primary`, primary_color);
      element.style.setProperty(`--btn-primary-hover`, body_text);
      element.style.setProperty(`--primary`, primary_color);
    } else {
      setTimeout(() => {
        this.stylesExplorerService.stylesInExplorerOrEdge(
          background_login.url,
          primary_color,
          primary_color,
          body_text,
          '0 0 0 0',
          '0px',
          'none',
          '-1px',
          '-12px',
          '',
          ''
        );
      });
    }
  }

  // events
  overEyePassword(input: string) {
    (<HTMLInputElement>document.getElementById(input)).type = 'text';
  }

  leaveEyePassword(input: string) {
    (<HTMLInputElement>document.getElementById(input)).type = 'password';
  }

  blurPasword() {
    if (this.txtPassword !== '') {
      let expressionRegular;
      let validatePasword;
      if (this.dataEnterprise.login_ldap) {
        expressionRegular = true;
        validatePasword = expressionRegular;
      } else {
        expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
        validatePasword = expressionRegular.test(this.txtPassword);
      }

      if (!validatePasword) {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('title_warning_ts'),
            message: this.t('msg_characters_minimum_ts')
          }
        ];
        this.alert.setAlert(alertWarning[0]);
        this.txtPassword = '';
      }
    }
  }

  blurConfirmPasword() {
    if (this.txtPassword !== '' && this.txtConfirmPassword !== '') {
      if (this.txtPassword !== this.txtConfirmPassword) {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('title_warning_ts'),
            message: this.t('msg_not_match_ts')
          }
        ];
        this.alert.setAlert(alertWarning[0]);
        this.txtPassword = '';
        this.txtConfirmPassword = '';
      }
    }
  }

  keyupPassword() {
    if (this.txtPassword === '' && this.txtConfirmPassword !== '') {
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: this.t('title_warning_ts'),
          message: this.t('msg_enter_again_ts')
        }
      ];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
    }
    if (this.txtPassword !== '') {
      this.eyePasswordVisible = true;
    }
  }

  keyupConfirmPassword() {
    if (this.txtPassword === '') {
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: this.t('title_warning_ts'),
          message: this.t('msg_enter_again_ts')
        }
      ];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
      this.eyePasswordVisible = false;
    } else {
      if (this.txtConfirmPassword !== '') {
        this.eyePasswordVisible = false;
      } else {
        this.eyePasswordVisible = true;
      }
    }
  }
}
