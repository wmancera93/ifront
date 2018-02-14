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
  private x;
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

    if(this.showMenu === true){
      (<HTMLInputElement>document.getElementById('contentGeneral')).className = 'heigth-content-general';
      (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[0]).style.display = 'none';
      // document.documentElement.style.setProperty(`--heigth-content-general`, document.getElementById("navMenu").clientHeight - 15 + 'px');
    }
  }

  LogOut() {
    this.tokenService.signOut().subscribe(
      (res: any) => {
        let userData: User;
        this.userSharedService.setUser(userData);
        localStorage.setItem("user", '');
        this.router.navigate(['/ihr/login']);
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
          redirect: { url: '/ihr/login' }
        }];

        this.alert.setAlert(this.alertWarning[0]);
      });
  }


  ContactList() {
    this.x = document.getElementById("contactList");
    if (this.x.style.display === "none") {

      this.x.style.display = "block";
    } else {
      this.x.style.display = "none";
    }

  }
  clickHideMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `-310px`);
    this.showMenu = false;   
    (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[0]).style.display = 'block';
    (<HTMLInputElement>document.getElementById('contentGeneral')).classList.remove('heigth-content-general');
  }

  clickShowMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `0px`);
    this.showMenu = true;
    (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[0]).style.display = 'none';
    (<HTMLInputElement>document.getElementById('contentGeneral')).className = 'heigth-content-general';
    document.documentElement.style.setProperty(`--heigth-content-general`, document.getElementById("navMenu").clientHeight - 15 + 'px');
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

}
