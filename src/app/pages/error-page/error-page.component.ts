import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main/main.service';
import { Enterprise } from '../../models/general/enterprise';
import { Router } from '@angular/router';
import { Translate } from '../../models/common/translate/translate';
import { TranslateService } from '../../services/common/translate/translate.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public dataEnterprise: Enterprise;
  public translate: Translate = null;

  constructor(private mainService: MainService, public router: Router, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    if (localStorage.getItem("enterprise") === null) {

      let url = window.location.href;
      let ambient;

      if (url.split("localhost").length === 1) {
        if (url.split("-").length > 1) {
          ambient = url.split("-")[0].split("/")[url.split("-")[0].split("/").length - 1];
        } else {
          ambient = 'production';
        }
      } else {
        ambient = 'development';
      }

      this.mainService.getDataEnterprise(ambient)
        .subscribe((result: any) => {
          this.dataEnterprise = result.data;
          document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
        })
    }
    else {
      this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
      document.documentElement.style.setProperty(`--img-header-login`, `url(` + this.dataEnterprise.background_login.url + `)`);
    }
  }
  RedirectInit() {
    this.router.navigate(['/ihr/login']);
  }

}
