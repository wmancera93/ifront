import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MainService } from '../../../services/main/main.service';
import { GoogleAnalyticsEventsService } from '../../../services/google-analytics-events.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

declare const ga: any;

@Component({
  selector: 'app-confirm-reset-acount',
  templateUrl: './confirm-reset-acount.component.html',
  styleUrls: ['./confirm-reset-acount.component.css']
})
export class ConfirmResetAcountComponent implements OnInit {
  public txtPassword: string = '';
  public txtConfirmPassword: string = '';
  public dataEnterprise: Enterprise;
  public eyePasswordVisible: boolean = false;
  public urlTokenPassword: string = '';
  public translate: Translate = null;

  constructor(public alert: AlertsService,
    private tokenService: Angular2TokenService,
    private route: ActivatedRoute,
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
    if (localStorage.getItem("enterprise") === null) {
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
          this.dataEnterprise = result.data;
          if (!this.stylesExplorerService.validateBrowser()) {
            document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
            document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
            document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
            document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
          } else {
            setTimeout(() => {
              this.stylesExplorerService.stylesInExplorerOrEdge(
                this.dataEnterprise.background_login.url,
                this.dataEnterprise.primary_color,
                this.dataEnterprise.primary_color,
                this.dataEnterprise.body_text, '', '',
                '0 0 0 0', '0px', 'none', '-1px', '-12px', '', ''
              )
            }, 200);
          }
          localStorage.setItem("enterprise", JSON.stringify(result.data));
        })
    } else {
      this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
      if (!this.stylesExplorerService.validateBrowser()) {
        document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
        document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
        document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
        document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
      } else {
        setTimeout(() => {
          this.stylesExplorerService.stylesInExplorerOrEdge(
            this.dataEnterprise.background_login.url,
            this.dataEnterprise.primary_color,
            this.dataEnterprise.primary_color,
            this.dataEnterprise.body_text,
            '0 0 0 0', '0px', 'none', '-1px', '-12px', '', ''
          )
        }, 200);
      }
    }
    this.route.queryParams.subscribe(params => {
      this.urlTokenPassword = params.reset_password_token;
    });
  }

  restartPassword() {
    if (this.txtPassword !== this.txtConfirmPassword) {
      const alertWarning: Alerts[] = [{
        type: 'danger',
        title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
        message: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.msg_new_password_ts,
      }];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
    }
  }

  restartPasword() {
    let resultError: any;
    if (this.txtPassword !== '' && this.txtConfirmPassword !== '') {
      this.tokenService.updatePassword({
        password: this.txtPassword,
        passwordConfirmation: this.txtConfirmPassword,
        resetPasswordToken: this.urlTokenPassword
      }).subscribe(
        (res) => {
          if (res.status === 200) {
            const alertWarning: Alerts[] = [{
              type: 'success',
              title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
              message: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.msg_new_password_ts,
            }];
            this.alert.setAlert(alertWarning[0]);
            this.txtPassword = '';
            this.txtConfirmPassword = '';
            setTimeout(() => {
              document.getElementById('closeModal').click();
              this.router.navigate(['/ihr/login']);
            }, 2000);
            this.googleAnalyticsEventsService.emitEvent("authentication", "ConfirmResetPassword", "Reset Password Account", 1);
          }
        },
        (error) => {
          resultError = error.json()
          const alertWarning: Alerts[] = [{
            type: 'danger',
            title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
            message: resultError.errors[0]
          }];
          this.alert.setAlert(alertWarning[0]);
          this.txtPassword = '';
          this.txtConfirmPassword = '';
        }
      );
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
      let expressionRegular
      let validatePasword
      if(this.dataEnterprise.login_ldap){
        expressionRegular = true;
        validatePasword = expressionRegular;
      } else {
        expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
        validatePasword = expressionRegular.test(this.txtPassword)
      }
      
      if (!validatePasword) {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
          message: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.msg_characters_minimum_ts,
        }];
        this.alert.setAlert(alertWarning[0]);
        this.txtPassword = '';
      }
    }
  }

  blurConfirmPasword() {
    if (this.txtPassword !== '' && this.txtConfirmPassword !== '') {
      if (this.txtPassword !== this.txtConfirmPassword) {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
          message: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.msg_not_match_ts,
        }];
        this.alert.setAlert(alertWarning[0]);
        this.txtPassword = '';
        this.txtConfirmPassword = '';
      }
    }
  }

  keyupPassword() {
    if (this.txtPassword === '' && this.txtConfirmPassword !== '') {
      const alertWarning: Alerts[] = [{
        type: 'warning',
        title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
        message: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.msg_enter_again_ts,
      }];
      this.alert.setAlert(alertWarning[0]);
      this.txtConfirmPassword = '';
    }
    if (this.txtPassword !== '') {
      this.eyePasswordVisible = true;
    }
  }

  keyupConfirmPassword() {
    if (this.txtPassword === '') {
      const alertWarning: Alerts[] = [{
        type: 'warning',
        title: this.translate.app.frontEnd.pages.authentication.confirm_reset_account.title_warning_ts,
        message:this.translate.app.frontEnd.pages.authentication.confirm_reset_account.msg_enter_again_ts,
      }];
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