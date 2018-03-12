import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Employee } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router, NavigationEnd } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { environment } from '../../../environments/environment';
import { Toast } from 'angular2-toaster';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;
  public authdata: any;
  public roleEmployee: boolean = true;

  @Output() objectToast: EventEmitter<Toast> = new EventEmitter();

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

  }

  getDataLocalStorage() {
    if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
      this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
      let toast: Toast = {
        type: 'success',
        title: this.userAuthenticated.employee.short_name,
        body: 'Bienvenido'
      };
      setTimeout(() => {
        this.objectToast.emit(toast)
      }, 200);
    }
  }

  ngOnInit() {
    this.getDataLocalStorage();
  }

  vieweDashboardEmployee() {
    this.roleEmployee = false;
  }
  vieweDashboardManager() {
    this.roleEmployee = true;
  }
}
