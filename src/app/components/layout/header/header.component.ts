import { Component, OnInit } from '@angular/core';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { User } from '../../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { error } from 'selenium-webdriver';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../../models/general/enterprise';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  private dataUser: User = null;
  title: string = 'Mis datos';
  public dataEnterprise: Enterprise;
  public logoHeader: string;

  constructor(private userSharedService: UserSharedService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public alert: AlertsService) {
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });

    this.tokenService.init(
      {
        apiBase: environment.apiBaseHr,
        apiPath: 'api/v2',
        signInPath: 'auth/sign_in',
        signOutPath: 'auth/sign_out',
        validateTokenPath: 'auth/validate_token',
        signOutFailedValidate: false,
        registerAccountPath: 'auth/password/new',
        updatePasswordPath: 'auth/password',
        resetPasswordPath: 'auth/password/edit',
        globalOptions: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      }
    );

  }


  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    this.logoHeader = this.dataEnterprise.logo_inside.url;
  }

  LogOut() {
    this.tokenService.signOut().subscribe(
      (res: any) => {
        let userData: User;
        this.userSharedService.setUser(userData);
        localStorage.setItem("user", '');
        this.router.navigate(['/Pages/Login']);
      },
      (error: any) => {
        let resultError: any;
        resultError = error.json();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: resultError.errors[0]
        }];
        //this.alert.setAlert(alertWarning[0]);
        this.router.navigate(['/Pages/Login']);
      });
  }


  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

}
