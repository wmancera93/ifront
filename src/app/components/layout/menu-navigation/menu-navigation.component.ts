import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Enterprise } from '../../../models/general/enterprise';
import { MainService } from '../../../services/main/main.service';
import { truncate } from 'fs';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {
  public dataUser: User = null;
  public dataEnterprise: Enterprise = null;
  public showMenu: boolean = true;
  public liActive: string = 'liIndex';
  public aActive: string = 'aIndex';
  public showCollapse: string = '';
  public heightContenGeneral: number = 0;

  constructor(private userSharedService: UserSharedService,
    public companieService: MainService) {
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });
  }

  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    document.documentElement.style.setProperty(`--img-header-menu`, `url(` + this.dataEnterprise.background_header_menu.url + `)`);
    document.documentElement.style.setProperty(`--width-nav-menu`, `220px`);
    document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 220px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `219px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `218px`);
    document.documentElement.style.setProperty(`--visible-menu`, `block`);
    document.documentElement.style.setProperty(`--left-show-menu-hover`, `-20px`);
    document.documentElement.style.setProperty(`--left-show-menu`, `-20px`);

  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

  clickHideMenu() {
    document.documentElement.style.setProperty(`--visible-menu`, `none`);
    document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 0`);
    document.documentElement.style.setProperty(`--width-nav-menu`, `0px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-12px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-12px`);
    setTimeout(() => {
      document.documentElement.style.setProperty(`--left-show-menu`, `-1px`);
      document.documentElement.style.setProperty(`--left-show-menu-hover`, `0px`);
    }, 400);
  }

  clickShowMenu() {
    document.documentElement.style.setProperty(`--left-show-menu-hover`, `-20px`);
    document.documentElement.style.setProperty(`--left-show-menu`, `-20px`);
    document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 220px`);;
    document.documentElement.style.setProperty(`--width-nav-menu`, `220px`);
    setTimeout(() => {
      document.documentElement.style.setProperty(`--visible-menu`, `block`);
      document.documentElement.style.setProperty(`--left-hide-menu`, `219px`);
      document.documentElement.style.setProperty(`--left-hide-menu-hover`, `218px`);
    }, 400);
  }

  clickOptionMenu(li: string, a: string, toggle: string) {
    document.getElementById(this.liActive).classList.remove('active');
    document.getElementById(li).className = 'active';
    this.liActive = li;

    if (this.showCollapse !== toggle) {
      if (document.getElementById(this.showCollapse) !== null) {
        document.getElementById(this.showCollapse).classList.remove('show');
      }
      this.showCollapse = toggle
    }
    if (a.split('-')[0].toString() !== 'toggle') {
      if (document.getElementById(this.aActive) !== null) {
        document.getElementById(this.aActive).classList.remove('active');
      }
      document.getElementById(a).className = 'nav-link bg-menu active';
      this.aActive = a;
      if (window.getComputedStyle(document.getElementById("btnMobile"), null).getPropertyValue('display') === 'block') {
        document.getElementById('btnHideMenu').click()

      }
    }
  }

}
