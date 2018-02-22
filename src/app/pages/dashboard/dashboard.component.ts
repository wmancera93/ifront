import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Employee } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;
  public authdata: any;
  public roleEmployee: boolean = true;

  constructor(private tokenService: Angular2TokenService,
    public userSharedService: UserSharedService,
    public router: Router) {
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
        resetPasswordPath: 'auth/password',
        globalOptions: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      }
    );
    this.userSharedService.getUser().subscribe((data) => {
      this.userAuthenticated = data;
      if (this.userAuthenticated !== null || this.userAuthenticated !== undefined) {
        this.getDataLocalStorage();
      }
    })

  }

  getDataLocalStorage() {
    if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
      this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
  }

  vieweDashboardEmployee() {
    this.roleEmployee = false;
  }
  vieweDashboardManager() {
    this.roleEmployee = true;
  }
}
