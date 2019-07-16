import { Component, OnInit } from '@angular/core';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { User } from '../../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../../models/general/enterprise';
import { TranslateService } from '@ngx-translate/core';
import { DemographicSharedService } from '../../../services/shared/common/demographic/demographic-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private dataUser: User = null;
  public dataEnterprise: Enterprise;
  public logoHeader: string;
  public showMenu = true;
  public showCollapse = '';
  public heightContenGeneral: number;
  public showContactsList = false;
  private alertWarning: Alerts[];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `components.layout.header.${key}`;
  }

  constructor(
    private userSharedService: UserSharedService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public translate: TranslateService,
    public alert: AlertsService,
    public demographicSharedService: DemographicSharedService,
  ) {
    this.userSharedService.getUser().subscribe(data => {
      this.dataUser = data;
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'logout') {
        this.tokenService.signOut().subscribe(
          () => {
            localStorage.setItem('user', null);
            this.userSharedService.setUser(null);
            this.router.navigate(['/ihr/login']);
          },
          error => {
            console.log(error);
          },
        );
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getDataLocalStorage();
      this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
      this.logoHeader = this.dataEnterprise.logo_inside.url;

      if (window.getComputedStyle(document.getElementById('btnMobile'), null).getPropertyValue('display') === 'none') {
        this.showMenu = false;
        (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'block';
        document.getElementById('footer_general').style.display = 'block';
      } else {
        if (this.showMenu === true) {
          (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'none';
          document.getElementById('footer_general').style.display = 'none';
        }
      }
    }, 100);
  }

  LogOut() {
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_ts'),
        message: this.t('message_alert_ts'),
        confirmation: true,
        typeConfirmation: 'logout',
      },
    ];

    this.alert.setAlert(this.alertWarning[0]);
  }

  clickPartnersIcon() {
    if (window.getComputedStyle(document.getElementById('btnMobile'), null).getPropertyValue('display') !== 'none') {
      this.clickHideMenuMobile();
    }

    if (this.showContactsList) {
      this.showContactsList = false;
    } else {
      this.showContactsList = true;
    }
  }

  clickPartnersIconHide() {
    this.showContactsList = false;
  }

  clickHideMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `-310px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-310px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-310px`);
    this.showMenu = false;
    setTimeout(() => {
      (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'block';
      document.getElementById('footer_general').style.display = 'block';
    }, 300);
    this.demographicSharedService.setEventUploa(true);
  }

  clickShowMenuMobile() {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `0px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-310px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-310px`);
    this.showMenu = true;
    (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'none';
    document.getElementById('footer_general').style.display = 'none';

    if (window.getComputedStyle(document.getElementById('btnMobile'), null).getPropertyValue('display') === 'block') {
      if (this.showContactsList) {
        this.showContactsList = false;
      }
    }
    this.demographicSharedService.setEventUploa(true);
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem('user'));
    }
  }
}
