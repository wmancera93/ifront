import { Component, OnInit } from '@angular/core';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { User } from '../../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { error, Alert } from 'selenium-webdriver';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../../models/general/enterprise';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  private dataUser: User = null;
  title: string = 'Mis datos';
  public dataEnterprise: Enterprise;
  public logoHeader: string;
  public showMenu: boolean = true;

  private alertWarning: Alerts[];

  constructor(private userSharedService: UserSharedService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public alert: AlertsService) {
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });

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
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    this.logoHeader = this.dataEnterprise.logo_inside.url;
  }

  LogOut() {
    this.tokenService.signOut().subscribe(
      (res: any) => {
        let userData: User;
        this.userSharedService.setUser(userData);
        localStorage.setItem("user", '');
        this.router.navigate(['/Pages/Login']);
      },
      (error: any) => {
        let resultError: any;
        let typeAlert: string = 'confirmation';

        resultError = error.json();
        this.alertWarning = [{
          type: 'confirmation',
          title: 'Confirmación',
          message: resultError.errors[0],
          confirmation: true,
          redirect: { url: '/Pages/Login' }
        }];

        this.alert.setAlert(this.alertWarning[0]);
      });
  }

  clickHideMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `-310px`);
    this.showMenu = false;
  }

  clickShowMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `0px`);
    this.showMenu = true;
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

}
