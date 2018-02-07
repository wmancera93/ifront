// component
import { Component } from '@angular/core';

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

  constructor(public router: Router, private mainService: MainService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/Pages/Login' || 
        event.urlAfterRedirects === '/Pages/ResetAccount' || 
        event.urlAfterRedirects === '/Pages/LockedScreen' ||
        event.urlAfterRedirects.split('?')[0] === '/Pages/ConfirmResetAccount') {
          this.showComponents = false;
        } else {
          this.showComponents = true;
        }
      }
    });
  }

  ngOnInit() {
    this.mainService.getDataEnterprise()
      .subscribe((result: any) => {
        this.dataEnterprise = result.data;
        document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
        document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
        document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
        document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
        localStorage.setItem("enterprise", JSON.stringify(result.data));        
      })
  }




}
