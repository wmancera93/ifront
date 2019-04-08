import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { User } from '../../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../../models/general/enterprise';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';
import { TranslateService as TranslateServiceNgx } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private dataUser: User = null;
  public title: string;
  public dataEnterprise: Enterprise;
  public logoHeader: string;
  public showMenu = true;
  public showCollapse = '';
  public heightContenGeneral: number;
  public showContactsList = true;
  public translate: Translate = null;
  private alertWarning: Alerts[];

  constructor(
    private userSharedService: UserSharedService,
    public router: Router,
    private tokenService: Angular2TokenService,
    private translatePage: TranslateServiceNgx,
    public alert: AlertsService,
    public translateService: TranslateService
  ) {
    this.translate = this.translateService.getTranslate();
    this.title = this.translate.app.frontEnd.components.layout.header.my_data;

    this.userSharedService.getUser().subscribe(data => {
      this.dataUser = data;
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'logout') {
        this.tokenService.signOut().subscribe(
          result => {
            localStorage.setItem('user', null);
            this.userSharedService.setUser(null);
            this.router.navigate(['/ihr/login']);
            this.translateService.deleteTranslate();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getDataLocalStorage();
      this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
      this.logoHeader = this.dataEnterprise.logo_inside.url;

      if (
        window
          .getComputedStyle(document.getElementById('btnMobile'), null)
          .getPropertyValue('display') === 'none'
      ) {
        this.showMenu = false;
        (<HTMLInputElement>(
          document.getElementsByClassName('heigth-content-general')[1]
        )).style.display = 'block';
        document.getElementById('footer_general').style.display = 'block';
      } else {
        if (this.showMenu === true) {
          (<HTMLInputElement>(
            document.getElementsByClassName('heigth-content-general')[1]
          )).style.display = 'none';
          document.getElementById('footer_general').style.display = 'none';
        }
      }
    }, 100);
  }

  LogOut() {
    this.alertWarning = [
      {
        type: 'warning',
        title: this.translate.app.frontEnd.components.layout.header
          .type_alert_ts,
        message: this.translate.app.frontEnd.components.layout.header
          .message_alert_ts,
        confirmation: true,
        typeConfirmation: 'logout'
      }
    ];

    this.alert.setAlert(this.alertWarning[0]);
  }

  clickPartnersIcon() {
    if (
      window
        .getComputedStyle(document.getElementById('btnMobile'), null)
        .getPropertyValue('display') !== 'none'
    ) {
      this.clickHideMenuMobile();
    }

    if (document.getElementById('contactList').className === 'hide') {
      document.getElementById('contactList').className = 'show';
      this.showContactsList = false;
    } else {
      document.getElementById('contactList').className = 'show';
      this.showContactsList = false;
    }
  }

  clickPartnersIconHide() {
    document.getElementById('contactList').classList.remove('show');
    document.getElementById('contactList').className = 'hide';
    this.showContactsList = true;
  }

  clickHideMenuMobile() {
    document.documentElement.style.setProperty(
      `--margin-left-mobile`,
      `-310px`
    );
    document.documentElement.style.setProperty(`--left-hide-menu`, `-310px`);
    document.documentElement.style.setProperty(
      `--left-hide-menu-hover`,
      `-310px`
    );
    this.showMenu = false;
    setTimeout(() => {
      (<HTMLInputElement>(
        document.getElementsByClassName('heigth-content-general')[1]
      )).style.display = 'block';
      document.getElementById('footer_general').style.display = 'block';
    }, 300);
  }

  clickShowMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `0px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-310px`);
    document.documentElement.style.setProperty(
      `--left-hide-menu-hover`,
      `-310px`
    );
    this.showMenu = true;
    (<HTMLInputElement>(
      document.getElementsByClassName('heigth-content-general')[1]
    )).style.display = 'none';
    document.getElementById('footer_general').style.display = 'none';

    if (
      window
        .getComputedStyle(document.getElementById('btnMobile'), null)
        .getPropertyValue('display') === 'block'
    ) {
      if (document.getElementById('contactList').classList[1] === 'show') {
        document.getElementById('contactList').classList.remove('show');
      }
    }
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem('user'));
    }
  }
}
