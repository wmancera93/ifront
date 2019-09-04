import { Component, OnInit } from '@angular/core';
import { User, PermitsUser } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Enterprise } from '../../../models/general/enterprise';
import { MainService } from '../../../services/main/main.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { DemographicSharedService } from '../../../services/shared/common/demographic/demographic-shared.service';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css'],
})
export class MenuNavigationComponent implements OnInit {
  public dataUser: User = null;
  public dataEnterprise: Enterprise = null;
  public showMenu = true;
  public isMobile = false;
  public liActive = 'liIndex';
  public aActive = 'aIndex';
  public showCollapse = '';
  public heightContenGeneral = 0;
  public PermitsUser = PermitsUser;

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.layout.menu_navigation.${key}`;
  }

  constructor(
    private userSharedService: UserSharedService,
    public companieService: MainService,
    public stylesExplorerService: StylesExplorerService,
    public demographicSharedService: DemographicSharedService,
  ) {
    this.userSharedService.getUser().subscribe(data => {
      this.dataUser = data;
    });
  }

  get documentStyles() {
    return document.documentElement.style;
  }

  handleMenu(state: boolean) {
    this.stylesExplorerService.handleHeader.emit(state);
  }

  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
    const commonFunction = (state: boolean) => {
      if (state) {
        this.clickHideMenu(false);
      } else {
        this.clickShowMenu(false);
      }
    };
    this.isMobile = this.stylesExplorerService.isMobile;
    commonFunction(this.isMobile);
    this.stylesExplorerService.handleMenuNavigation.subscribe(state => commonFunction(!state));
    this.stylesExplorerService.handleMobile.subscribe(state => {
      this.isMobile = state;
      if (state) this.clickHideMenu();
    });

    if (!this.stylesExplorerService.validateBrowser()) {
      this.documentStyles.setProperty(`--img-header-menu`, `url(` + this.dataEnterprise.background_header_menu.url + `)`);
      this.documentStyles.setProperty(`--width-nav-menu`, `220px`);
      this.documentStyles.setProperty(`--width-page-wrapper`, `0 0 0 220px`);
      this.documentStyles.setProperty(`--left-hide-menu`, `219px`);
      this.documentStyles.setProperty(`--left-hide-menu-hover`, `218px`);
    } else {
      setTimeout(() => {
        this.stylesExplorerService.stylesInExplorerOrEdge(
          '',
          this.dataEnterprise.primary_color,
          this.dataEnterprise.primary_color,
          this.dataEnterprise.body_text,
          '',
          this.dataEnterprise.background_header_menu.url,
          '0 0 0 220px',
          '220px',
          'block',
          '-20px',
          '219px',
          '',
          '',
        );
      }, 400);
    }
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  clickHideMenu(emit = true) {
    if (emit) this.handleMenu(false);
    this.showMenu = false;
    if (!this.stylesExplorerService.validateBrowser()) {
      this.documentStyles.setProperty(`--width-page-wrapper`, `0 0 0 0`);
      this.documentStyles.setProperty(`--width-nav-menu`, `0px`);
      this.documentStyles.setProperty(`--left-hide-menu`, `-12px`);
      this.documentStyles.setProperty(`--left-hide-menu-hover`, `-12px`);
    } else {
      this.stylesExplorerService.stylesInExplorerOrEdge(
        '',
        this.dataEnterprise.primary_color,
        this.dataEnterprise.primary_color,
        this.dataEnterprise.body_text,
        '',
        this.dataEnterprise.background_header_menu.url,
        '0 0 0 0',
        '0px',
        'none',
        '-1px',
        '-12px',
        '',
        '',
      );
    }
    this.demographicSharedService.setEventUploa(true);
  }

  clickShowMenu(emit = true) {
    if (emit) this.handleMenu(true);
    this.showMenu = true;
    this.demographicSharedService.setEventUploa(true);
    if (!this.stylesExplorerService.validateBrowser()) {
      this.documentStyles.setProperty(`--margin-left-mobile`, `0px`);
      this.documentStyles.setProperty(`--left-hide-menu`, `-310px`);
      this.documentStyles.setProperty(`--left-hide-menu-hover`, `-310px`);
      this.documentStyles.setProperty(`--width-page-wrapper`, `0 0 0 220px`);
      this.documentStyles.setProperty(`--width-nav-menu`, `220px`);
      setTimeout(() => {
        this.documentStyles.setProperty(`--left-hide-menu`, `219px`);
        this.documentStyles.setProperty(`--left-hide-menu-hover`, `218px`);
      }, 400);
    } else {
      this.stylesExplorerService.stylesInExplorerOrEdge(
        '',
        this.dataEnterprise.primary_color,
        this.dataEnterprise.primary_color,
        this.dataEnterprise.body_text,
        '',
        this.dataEnterprise.background_header_menu.url,
        '0 0 0 220px',
        '220px',
        'block',
        '-20px',
        '219px',
        '',
        '',
      );
    }
  }

  clickOptionMenu(li: string, a: string, toggle: string) {
    document.getElementById(this.liActive).classList.remove('active');
    document.getElementById(li).className = 'active';
    this.liActive = li;

    if (this.showCollapse !== toggle) {
      if (document.getElementById(this.showCollapse) !== null) {
        document.getElementById(this.showCollapse).classList.remove('show');
      }
      this.showCollapse = toggle;
    }
    if (a.split('-')[0].toString() !== 'toggle') {
      if (document.getElementById(this.aActive) !== null) {
        document.getElementById(this.aActive).classList.remove('active');
      }
      document.getElementById(a).className = 'nav-link bg-menu active';
      this.aActive = a;
      if (this.stylesExplorerService.isMobile) {
        document.getElementById('btnHideMenu').click();
      }
    }
  }
}
