// component
import { Component, HostListener } from '@angular/core';

// common
import { Router, NavigationEnd } from '@angular/router';
import { Enterprise } from './models/general/enterprise';
import { MainService } from './services/main/main.service';

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

  constructor(public router: Router, private mainService: MainService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/ihr/login' ||
          event.urlAfterRedirects === '/ihr/reset_account' ||
          event.urlAfterRedirects === '/ihr/locked_screen' ||
          event.urlAfterRedirects.split('?')[0] === '/ihr/confirm_reset_account') {
          this.showComponents = false;
          this.pageWrapper = '';
        } else {
          this.showComponents = true;
          this.pageWrapper = 'page-wrapper';
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
    }
  }

  @HostListener('window:scroll') onScroll() {
    if (document.getElementById("navMenu").clientHeight > 0) {
      if(document.getElementById("navMenu").clientHeight > 800 && document.getElementById("navMenu").clientHeight <= 879) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight + 161;
      }
      if(document.getElementById("navMenu").clientHeight > 880 && document.getElementById("navMenu").clientHeight <= 1000) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight + 280;
      }
      if(document.getElementById("navMenu").clientHeight > 1000) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight - 15;
      }
      if(document.getElementById("navMenu").clientHeight < 800) {
        this.heightContenGeneral = document.getElementById("navMenu").clientHeight - 15;
      }  
      if (window.getComputedStyle(document.getElementById("btnMobile"), null).getPropertyValue('display') === 'block') {
        if(document.getElementById("navMenu").clientHeight > 900 && document.getElementById("navMenu").clientHeight < 1000) {
          this.heightContenGeneral = document.getElementById("navMenu").clientHeight - 15;
        } 
      }
    }
    else {
      if (this.heightContenGeneral !== document.getElementById("page-wrapper").clientHeight) {
        this.heightContenGeneral = document.getElementById("page-wrapper").clientHeight - this.heightContenGeneral;
      }
    }

    document.documentElement.style.setProperty(`--heigth-content-general`, this.heightContenGeneral + 'px');
  }

}
