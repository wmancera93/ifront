import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Enterprise } from '../../../models/general/enterprise';
import { MainService } from '../../../services/main/main.service';
import { truncate } from 'fs';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '../../../services/common/translate/translate.service';
import { Translate } from '../../../models/common/translate/translate';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {
  public dataUser: User = null;
  public dataEnterprise: Enterprise = null;
  public showMenu = true;
  public liActive = 'liIndex';
  public aActive = 'aIndex';
  public showCollapse = '';
  public heightContenGeneral = 0;
  public translate: Translate = null;

  constructor(private userSharedService: UserSharedService,
    public companieService: MainService,
    public stylesExplorerService: StylesExplorerService, public translateService: TranslateService) {

      setTimeout(() => {
        this.translate = this.translateService.getTranslate();
        console.log(this.translate)
      }, 500);
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });
  }

  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
    if (!this.stylesExplorerService.validateBrowser()) {
      document.documentElement.style.setProperty(`--img-header-menu`, `url(` + this.dataEnterprise.background_header_menu.url + `)`);
      document.documentElement.style.setProperty(`--width-nav-menu`, `220px`);
      document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 220px`);
      document.documentElement.style.setProperty(`--left-hide-menu`, `219px`);
      document.documentElement.style.setProperty(`--left-hide-menu-hover`, `218px`);
      document.documentElement.style.setProperty(`--visible-menu`, `block`);
      document.documentElement.style.setProperty(`--left-show-menu-hover`, `-20px`);
      document.documentElement.style.setProperty(`--left-show-menu`, `-20px`);
    } else {
      setTimeout(() => {
        this.stylesExplorerService.stylesInExplorerOrEdge(
          '',
          this.dataEnterprise.primary_color,
          this.dataEnterprise.primary_color,
          this.dataEnterprise.body_text,
          '',
          this.dataEnterprise.background_header_menu.url
          , '0 0 0 220px', '220px', 'block', '-20px', '219px', '', ''
        );
      }, 400);

    }

  }

  getDataLocalStorage() {
    debugger
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  clickHideMenu() {
    if (!this.stylesExplorerService.validateBrowser()) {
      document.documentElement.style.setProperty(`--visible-menu`, `none`);
      document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 0`);
      document.documentElement.style.setProperty(`--width-nav-menu`, `0px`);
      document.documentElement.style.setProperty(`--left-hide-menu`, `-12px`);
      document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-12px`);
      setTimeout(() => {
        document.documentElement.style.setProperty(`--left-show-menu`, `-1px`);
        document.documentElement.style.setProperty(`--left-show-menu-hover`, `0px`);
      }, 400);
    } else {
      this.stylesExplorerService.stylesInExplorerOrEdge(
        '',
        this.dataEnterprise.primary_color,
        this.dataEnterprise.primary_color,
        this.dataEnterprise.body_text,
        '',
        this.dataEnterprise.background_header_menu.url
        , '0 0 0 0', '0px', 'none', '-1px', '-12px', '', ''
      );
    }
  }

  clickShowMenu() {
    if (!this.stylesExplorerService.validateBrowser()) {
      document.documentElement.style.setProperty(`--left-show-menu-hover`, `-20px`);
      document.documentElement.style.setProperty(`--left-show-menu`, `-20px`);
      document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 220px`);
      document.documentElement.style.setProperty(`--width-nav-menu`, `220px`);
      setTimeout(() => {
        document.documentElement.style.setProperty(`--visible-menu`, `block`);
        document.documentElement.style.setProperty(`--left-hide-menu`, `219px`);
        document.documentElement.style.setProperty(`--left-hide-menu-hover`, `218px`);
      }, 400);
    } else {
      this.stylesExplorerService.stylesInExplorerOrEdge(
        '',
        this.dataEnterprise.primary_color,
        this.dataEnterprise.primary_color,
        this.dataEnterprise.body_text,
        '',
        this.dataEnterprise.background_header_menu.url
        , '0 0 0 220px', '220px', 'block', '-20px', '219px', '', ''
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
      if (window.getComputedStyle(document.getElementById('btnMobile'), null).getPropertyValue('display') === 'block') {
        document.getElementById('btnHideMenu').click();

      }
    }
  }

}
