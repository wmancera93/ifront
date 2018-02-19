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
  public showCollapse: string = '';
  public heightContenGeneral: number;

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

    this.alert.getActionConfirm().subscribe(
      (data: any) => { 
        if (data === "logout") {
          localStorage.setItem('user',null);   
          this.userSharedService.setUser(null);
          this.router.navigate(['/ihr/login']);          
        }
      }
    )

  }


  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    this.logoHeader = this.dataEnterprise.logo_inside.url;
   
    if (window.getComputedStyle(document.getElementById("btnMobile"), null).getPropertyValue('display') === 'none') {
      (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'block';
    } else {
      if (this.showMenu === true) {
        (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'none';
      }
    }

    if (document.getElementById("navMenu").clientHeight > 0) {
      if (document.getElementById("navMenu").clientHeight > 800 && document.getElementById("navMenu").clientHeight <= 879) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight + 161;
      }
      if (document.getElementById("navMenu").clientHeight > 880) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight + 280;
      }
      if (document.getElementById("navMenu").clientHeight < 800) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight - 15;
      }
    }
    else {
      if (this.heightContenGeneral !== document.getElementById("page-wrapper").clientHeight) {
        this.heightContenGeneral = document.getElementById("page-wrapper").clientHeight - this.heightContenGeneral;
      }
    }

    document.documentElement.style.setProperty(`--heigth-content-general`, this.heightContenGeneral + 'px');
  }

  LogOut() {

    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea cerrar la sesión?',
      confirmation: true,
      typeConfirmation: 'logout'
    }];

    this.alert.setAlert(this.alertWarning[0]);
    
  }

  clickPartnersIcon(toggle: string) {

    if (window.getComputedStyle(document.getElementById("btnMobile"), null).getPropertyValue('display') !== 'none') {
      if (this.showCollapse !== toggle) {
        this.clickHideMenuMobile();
      }
    }

  }

  clickHideMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `-310px`);
    this.showMenu = false;
    (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'block';
  }

  clickShowMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `0px`);
    this.showMenu = true;
    (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'none';
    document.documentElement.style.setProperty(`--heigth-content-general`, document.getElementById("navMenu").clientHeight - 15 + 'px');

    if (window.getComputedStyle(document.getElementById("btnMobile"), null).getPropertyValue('display') === 'block') {
      if (document.getElementById('contactList').classList[1] === 'show') {
        document.getElementById('contactList').classList.remove('show')
      }

    }
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

}
