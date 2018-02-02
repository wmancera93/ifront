// component
import { Component } from '@angular/core';

// common
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showComponents: boolean = false;

  constructor(public router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(event.urlAfterRedirects === '/Pages/Login' || event.urlAfterRedirects === '/Pages/ResetAccount' || event.urlAfterRedirects === '/Pages/LockedScreen'){
          this.showComponents = false;
        } else {
          this.showComponents = true;
        }   
      }
    });
  }

  ngOnInit() {
    document.documentElement.style.setProperty(`--color`, `#5B5A4A`);
    document.documentElement.style.setProperty(`--background-color`, `#F5ED0A`);
  }



  
}
