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

  constructor(public router: Router, private mainService: MainService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/Pages/Login' ||
          event.urlAfterRedirects === '/Pages/ResetAccount' ||
          event.urlAfterRedirects === '/Pages/LockedScreen' ||
          event.urlAfterRedirects.split('?')[0] === '/Pages/ConfirmResetAccount') {
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
    // this.mainService.getDataEnterprise()
    //   .subscribe((result: any) => {
    //     this.dataEnterprise = result.data;
    //     document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
    //     document.documentElement.style.setProperty(`--btn-primary`, this.dataEnterprise.primary_color);
    //     document.documentElement.style.setProperty(`--btn-primary-hover`, this.dataEnterprise.body_text);
    //     document.documentElement.style.setProperty(`--primary`, this.dataEnterprise.primary_color);
    //     localStorage.setItem("enterprise", JSON.stringify(result.data));
    //   })

    document.documentElement.style.setProperty(`--top-content-type`, '1366px');
  }
  public heightContenGeneral: number = 0;
  @HostListener('window:scroll') onScroll() {
    if(document.getElementById("navMenu").clientHeight > 0){
      this.heightContenGeneral = document.getElementById("navMenu").clientHeight - 15;
    }
    else{
      if(this.heightContenGeneral !== document.getElementById("page-wrapper").clientHeight){
        this.heightContenGeneral = document.getElementById("page-wrapper").clientHeight - this.heightContenGeneral;
      }
    }

    document.documentElement.style.setProperty(`--heigth-content-general`, this.heightContenGeneral + 'px');
  }

}
