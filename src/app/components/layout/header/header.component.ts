import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { User } from '../../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../../models/general/enterprise';
import { TranslateService } from '@ngx-translate/core';
import { DemographicSharedService } from '../../../services/shared/common/demographic/demographic-shared.service';
import { JoyrideService } from 'ngx-joyride';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onStartTour: EventEmitter<void> = new EventEmitter();

  private dataUser: User = null;
  public dataEnterprise: Enterprise;
  public logoHeader: string;
  public showMenu = false;
  public showMenuLanguaje = false;
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
    public stylesExplorerService: StylesExplorerService,
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
    this.stylesExplorerService.showMenu.subscribe(value => {});
    document.onreadystatechange = () => {
      this.getDataLocalStorage();
      this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
      this.logoHeader = this.dataEnterprise.logo_inside.url;
      /* this.onResize(); */
      window.addEventListener('resize', this.onResize);
      window.$ &&
        window.$('#dropdownEllipsis').on('hide.bs.dropdown', function(e) {
          if (!!$('#dropdown-ignore').has(e.clickEvent.target).length) {
            e.stopPropagation();
            e.preventDefault();
          }
        });
    };
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  handleMenu(state: boolean) {
    this.stylesExplorerService.handleMenu(state);
  }

  onResize = () => {
    const heigthContentGeneral = document.getElementsByClassName('heigth-content-general')[1] as HTMLInputElement;
    if (window.getComputedStyle(document.getElementById('btnMobile'), null).getPropertyValue('display') === 'none') {
      this.handleMenu(false);
      this.showMenu = false;
      this.clickHideMenuMobile();
      heigthContentGeneral.style.display = 'block';
      document.getElementById('footer_general').style.display = 'block';
    } else {
      if (this.showMenu === true) {
        heigthContentGeneral.style.display = 'none';
        document.getElementById('footer_general').style.display = 'none';
      }
      this.handleMenu(true);
      this.showMenu = true;
    }
  };

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

  startTour() {
    this.onStartTour.emit();
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
    this.handleMenu(false);
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
    this.handleMenu(true);
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
