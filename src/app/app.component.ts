// component
import { Component } from '@angular/core';

// common
import { Router, NavigationEnd } from '@angular/router';
import { Enterprise } from './models/general/enterprise';
import { MainService } from './services/main/main.service';
import { User } from './models/general/user';
import { UserSharedService } from './services/shared/common/user/user-shared.service';
import { environment } from '../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showComponents = false;
  public dataEnterprise: Enterprise;
  public pageWrapper: string;
  public heightContenGeneral = 0;
  public dataUser: User = null;
  public isExplorer: boolean;

  public baseUrl: string;

  constructor(
    public router: Router,
    public mainService: MainService,
    public userSharedService: UserSharedService,
    public tokenService: Angular2TokenService,
    public translate: TranslateService
  ) {
    const languaje = localStorage.getItem('lang') || translate.getBrowserLang();
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    translate.onLangChange.subscribe(({ lang }: LangChangeEvent) => {
      localStorage.setItem('lang', lang);
      this.tokenServiceInit(lang);
      this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

      this.router.navigateByUrl(this.router.url + '?')
        .then(() => {
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        });
    });

    translate.use(languaje.match(/es|en/) ? languaje : 'es');

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

    switch (ambient) {
      case 'development':
        this.baseUrl = environment.apiBaseHr_development;
        break;
      case 'dev':
        this.baseUrl = environment.apiBaseHr_development;
        break;
      case 'staging':
        this.baseUrl = environment.apiBaseHr_staging;
        break;
      case 'demo':
        this.baseUrl = environment.apiBaseHr_staging;
        break;

      default:
        this.baseUrl = environment.apiBaseHr_production;
        break;
    }

    this.tokenServiceInit(languaje);

    this.userSharedService.getUser().subscribe(data => {
      this.dataUser = data;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (
          event.urlAfterRedirects === '/ihr/login' ||
          event.urlAfterRedirects === '/ihr/reset_account' ||
          event.urlAfterRedirects === '/ihr/locked_screen' ||
          event.urlAfterRedirects.split('?')[0] ===
            '/ihr/confirm_reset_account' ||
          event.urlAfterRedirects === '/ihr/error'
        ) {
          this.showComponents = false;
          this.pageWrapper = '';
        } else {
          this.showComponents = true;
          this.pageWrapper = 'page-wrapper';

          if (this.dataUser === null || this.dataUser === undefined) {
            this.dataUser = JSON.parse(localStorage.getItem('user'));
            if (this.dataUser === null) {
              this.router.navigate(['/ihr/error']);
            }
          }
        }
      }
    });
  }

  tokenServiceInit(languaje){
    this.tokenService.init({
      apiBase: this.baseUrl,
      apiPath: 'api/v2/' + languaje,
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
          Accept: 'application/json'
        }
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('enterprise') !== null) {
      this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
      document.documentElement.style.setProperty(
        `--img-header-login`,
        `url(` + this.dataEnterprise.background_login.url + `)`
      );
      document.documentElement.style.setProperty(
        `--btn-primary`,
        this.dataEnterprise.primary_color
      );
      document.documentElement.style.setProperty(
        `--btn-primary-hover`,
        this.dataEnterprise.body_text
      );
      document.documentElement.style.setProperty(
        `--primary`,
        this.dataEnterprise.primary_color
      );

      const link = document.createElement('link'),
        oldLink = document.getElementById('fa_icon');
      link.id = 'fa_icon';
      link.rel = 'shortcut icon';
      link.href = this.dataEnterprise.logo_inside.url.toString();
      if (oldLink) {
        document.head.removeChild(oldLink);
      }
      document.head.appendChild(link);
    }
    this.validateBrowser();
  }

  validateBrowser() {
    this.isExplorer = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (this.isExplorer){
      alert("Recuerde que para una mejor funcionalidad del portal se deben utilizar navegadores como Google Chrome, Mozilla Firefox y Safari")
    }
  }
}
