// component
import { Component, HostListener } from '@angular/core';

// common
import { Router, NavigationEnd } from '@angular/router';
import { Enterprise } from './models/general/enterprise';
import { MainService } from './services/main/main.service';
import { User } from './models/general/user';
import { UserSharedService } from './services/shared/common/user/user-shared.service';
import { PlatformLocation } from '@angular/common';
import { environment } from '../environments/environment';
import { Angular2TokenService } from 'angular2-token';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showComponents: boolean = false;
  public dataEnterprise: Enterprise;
  public pageWrapper: string;
  public heightContenGeneral: number = 0;
  public dataUser: User = null;

  public baseUrl: string;

  constructor(public router: Router,
    public mainService: MainService,
    public userSharedService: UserSharedService,
    public tokenService: Angular2TokenService, ) {

    let url = window.location.href;
    let ambient;

    if (url.split("localhost").length === 1) {
      if (url.split("-").length > 1) {
        ambient = url.split("-")[0].split("/")[url.split("-")[0].split("/").length - 1];
      } else {
        ambient = 'production';
      }
    } else {
      ambient = 'development';
    }

    switch (ambient) {
      case 'production':
        this.baseUrl = environment.apiBaseHr_production;
        break;
      case 'development':
        this.baseUrl = environment.apiBaseHr_development;
        break;
      case 'staging':
        this.baseUrl = environment.apiBaseHr_staging;
        break;

      default:
        this.baseUrl = environment.apiBaseHr_development;
        break;
    }


    this.tokenService.init(
      {
        apiBase: this.baseUrl,
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
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (event.urlAfterRedirects === '/ihr/login' ||
          event.urlAfterRedirects === '/ihr/reset_account' ||
          event.urlAfterRedirects === '/ihr/locked_screen' ||
          event.urlAfterRedirects.split('?')[0] === '/ihr/confirm_reset_account' ||
          event.urlAfterRedirects === '/ihr/error') {
          this.showComponents = false;
          this.pageWrapper = '';

        } else {
          this.showComponents = true;
          this.pageWrapper = 'page-wrapper';



          if (this.dataUser === null || this.dataUser === undefined) {
            this.dataUser = JSON.parse(localStorage.getItem("user"));
            if (this.dataUser === null) {
              this.router.navigate(['/ihr/error']);
            }
          }
        }
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem("enterprise") !== null) {

      this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
      document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
      document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
      document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
      document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);

      var link = document.createElement('link'),
        oldLink = document.getElementById('fa_icon');
      link.id = 'fa_icon';
      link.rel = 'shortcut icon';
      link.href = this.dataEnterprise.logo_inside.url.toString();
      if (oldLink) {
        document.head.removeChild(oldLink);
      }
      document.head.appendChild(link)
    }
  }

}
