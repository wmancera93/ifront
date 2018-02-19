import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main/main.service';
import { Enterprise } from '../../models/general/enterprise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public dataEnterprise: Enterprise;
  

  constructor(   private mainService: MainService,  public router: Router) {
    
   }

  ngOnInit() {
    if(localStorage.getItem("enterprise") === null){
      this.mainService.getDataEnterprise()
      .subscribe((result:any)=>{
        this.dataEnterprise =result.data;
        document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
      })      
    }
    else
    {
      this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
      document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
    }
  }
  RedirectInit()
  {
   this.router.navigate(['/ihr/login']);
  }

}
