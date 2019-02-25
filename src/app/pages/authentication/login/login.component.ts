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
  public languaje: string = 'es';
  public passwordLogin: string;
  public checkedLocal: string;


  constructor(private tokenService: Angular2TokenService,
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertsService,
    public userSharedService: UserSharedService,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    public stylesExplorerService: StylesExplorerService, public translateService: TranslateService) {


    this.translate = this.translateService.getTranslate();

    if (this.translate === null) {
      this.translateService.changeLanguajeFirst(this.languaje).subscribe((data: any) => {
        this.translate = JSON.parse(data.data[0].data[0].language_json_file);
        this.passwordLogin = this.translate.app.frontEnd.pages.authentication.login.password;
      });
    } else {
      this.checkedLocal = JSON.parse(localStorage.getItem("treeLanguaje")).data[0].data[0].code_language.toLowerCase();
      this.languaje = this.checkedLocal;
      this.passwordLogin = this.translate.app.frontEnd.pages.authentication.login.password;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });


  }

  changeLanguaje(param: string) {
    this.languaje = param;
    this.translateService.changeLanguajeFirst(this.languaje).subscribe((data: any) => {
      this.translate = JSON.parse(data.data[0].data[0].language_json_file);
      this.passwordLogin = this.translate.app.frontEnd.pages.authentication.login.password;
    });
    this.tokenService.atOptions.apiPath = 'api/v2/' + this.languaje;
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
        const {
          background_login,
          primary_color,
          body_text,
        } = this.dataEnterprise[0]
        if (!this.stylesExplorerService.validateBrowser()) {
          const setProp = (a, b) => {
            document.documentElement.style.setProperty(a, b)
          }
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
              body_text, '', '',
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

    this.changeLanguaje(this.languaje);

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