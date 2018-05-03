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
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });    
    if(localStorage.getItem("enterprise") === null){

      let url = window.location.href;
      let splitTwoPoint = url.split("localhost");
      let ambient;
      let splitLine;
  
      if (splitTwoPoint.length === 1) {
        splitLine = url.split("-");
        if (splitLine.length > 0) {
          ambient = splitLine[0];
        } else {
          ambient = 'production'
        }
      } else {
        ambient = 'development'
      }

      this.mainService.getDataEnterprise(ambient)
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
