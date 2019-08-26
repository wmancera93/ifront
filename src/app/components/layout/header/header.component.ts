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
  public isMobile = false;
  public showMenu = false;
  public showMenuLanguaje = false;
  public showCollapse = '';
  public heightContenGeneral: number;
  public showContactsList = false;
  public isInitial = true;
  private alertWarning: Alerts[];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
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

    stylesExplorerService.handleMobile.subscribe(state => {
      this.isMobile = state;
      if (state) {
        this.clickHideMenuMobile(false);
      }
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
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
    this.logoHeader = this.dataEnterprise.logo_inside.url;
    this.isMobile = this.stylesExplorerService.isMobile;
    if (this.isMobile) {
      this.clickHideMenuMobile();
    }
    document.onreadystatechange = () => {
      window.$ &&
        window.$('#dropdownEllipsis').on('hide.bs.dropdown', function(e) {
          if (!!$('#dropdown-ignore').has(e.clickEvent && e.clickEvent.target).length) {
            e.stopPropagation();
            e.preventDefault();
          }
        });
    };
  }

  ngOnDestroy() {}

  handleMenu(state: boolean) {
    this.stylesExplorerService.handleMenuNavigation.emit(state);
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

  startTour() {
    this.onStartTour.emit();
  }

  clickPartnersIcon() {
    if (this.stylesExplorerService.isMobile) {
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

  clickHideMenuMobile(emit = true) {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `-310px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-310px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-310px`);
    this.showMenu = false;
    if (emit) this.handleMenu(false);
    (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'block';
    document.getElementById('footer_general').style.display = 'block';
    this.demographicSharedService.setEventUploa(true);
  }

  clickShowMenuMobile(emit = true) {
    document.documentElement.style.setProperty(`--margin-left-mobile`, `0px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-310px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-310px`);
    this.showMenu = true;
    if (emit) this.handleMenu(true);
    setTimeout(() => {
      (<HTMLInputElement>document.getElementsByClassName('heigth-content-general')[1]).style.display = 'block';
      document.getElementById('footer_general').style.display = 'block';
    }, 300);

    if (this.stylesExplorerService.isMobile) {
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
