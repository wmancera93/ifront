import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../../services/main/main.service';

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

  constructor(public alert: AlertsService,
    private tokenService: Angular2TokenService,
    private route: ActivatedRoute,
    public router: Router,
    private mainService: MainService) {
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
  }

  ngOnInit() {
    if (localStorage.getItem("enterprise") === null) {
      this.mainService.getDataEnterprise()
        .subscribe((result: any) => {
          this.dataEnterprise = result.data;
          document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
          document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
          document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
          document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
          localStorage.setItem("enterprise", JSON.stringify(result.data));
        })
    } else {
      this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
      document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
      document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
      document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
      document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
    }
    this.route.queryParams.subscribe(params => {
      this.urlTokenPassword = params.reset_password_token;
    });
  }

  restartPassword() {
    if (this.txtPassword !== this.txtConfirmPassword) {
      const alertWarning: Alerts[] = [{
        type: 'danger',
        title: 'Advertencia',
        message: 'Ingrese la nueva contraseña para poder confirmarla.'
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
              title: 'Advertencia',
              message: 'Cambio de contraseña exitoso.'
            }];
            this.alert.setAlert(alertWarning[0]);
            this.txtPassword = '';
            this.txtConfirmPassword = '';
            setTimeout(() => {
              document.getElementById('closeModal').click();
              this.router.navigate(['/ihr/login']);
            }, 2000);
          }
        },
        (error) => {
          resultError = error.json()
          const alertWarning: Alerts[] = [{
            type: 'danger',
            title: 'Advertencia',
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
      let expressionRegular = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{8,}$/;
      if (!expressionRegular.test(this.txtPassword)) {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: 'La contraseña debe contener minimo 8 caracteres, una letra minuscula, una letra mayuscula y almenos un número.'
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
          title: 'Advertencia',
          message: 'Las contraseñas no coinciden, por favor vuelva a ingresarlas.'
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
        title: 'Advertencia',
        message: 'Ingrese la nueva contraseña para poder confirmarla.'
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
        title: 'Advertencia',
        message: 'Ingrese la nueva contraseña para poder confirmarla.'
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
