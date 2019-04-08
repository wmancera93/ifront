import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router, RoutesRecognized } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { Toast } from 'angular2-toaster';
import { filter } from 'rxjs/operators';
import { MainService } from '../../services/main/main.service';
import 'rxjs/add/operator/pairwise';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;
  public authdata: any;
  public roleEmployee = true;
  public showServiceManagement: boolean;
  public showButtonDashManagement = true;
  public validateRoleManagement: string;
  public isAdmin: boolean;
  public token: boolean;
  public previousUrl: string;
  public urlBeforeMyteam = '';
  public urlBeforePending = '';
  public urlBeforeReports = '';
  public toast: Toast;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  @Output() objectToast: EventEmitter<Toast> = new EventEmitter();

  parseT(key) {
    return `pages.dashboard.${key}`;
  }

  constructor(
    public userSharedService: UserSharedService,
    public router: Router,
    public companieService: MainService,
    private tokenService: Angular2TokenService,
    public translate: TranslateService
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));

    this.router.events
      .pipe(filter(e => e instanceof RoutesRecognized))
      .pairwise()
      .subscribe((event: any[]) => {
        if (
          this.userAuthenticated === null ||
          this.userAuthenticated === undefined
        ) {
          if (event[0].urlAfterRedirects === '/ihr/login') {
            setTimeout(() => {
              this.toast = {
                type: 'success',
                title: this.userAuthenticated.employee.short_name,
                body: 'Bienvenido'
              };
            }, 100);

            setTimeout(() => {
              if (document.getElementsByClassName('toast').length === 0) {
                this.objectToast.emit(this.toast);
              }
            }, 100);
          }
        }

        setTimeout(() => {
          this.urlBeforeMyteam = event[0].urlAfterRedirects.toString();
          if (this.urlBeforeMyteam === '/ihr/my_team') {
            document.getElementById('buttonDashEmployee').click();
          }
        }, 100);

        setTimeout(() => {
          this.urlBeforeReports = event[0].urlAfterRedirects.toString();
          if (this.urlBeforeMyteam === '/ihr/reports_requests') {
            document.getElementById('buttonDashEmployee').click();
          }
        }, 100);

        setTimeout(() => {
          this.urlBeforePending = event[0].urlAfterRedirects.toString();
          if (this.urlBeforePending === '/ihr/pending_approvers') {
            document.getElementById('buttonDashEmployee').click();
          }
        }, 100);

        setTimeout(() => {
          this.urlBeforePending = event[0].urlAfterRedirects.toString();
          if (this.urlBeforePending === '/ihr/users_permisions') {
            document.getElementById('buttonDashEmployee').click();
          }
        }, 100);

        setTimeout(() => {
          this.urlBeforePending = event[0].urlAfterRedirects.toString();
          if (this.urlBeforePending === '/ihr/hour_extras') {
            document.getElementById('buttonDashEmployee').click();
          }
        }, 100);
      });

    this.tokenService.validateToken().subscribe(
      () => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString()
        });
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      }
    );
  }

  getDataLocalStorage() {
    document
      .getElementsByTagName('body')[0]
      .setAttribute('style', 'overflow-y:block');
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {
    this.getDataLocalStorage();
    if (
      this.userAuthenticated !== null ||
      this.userAuthenticated !== undefined
    ) {
      this.validateRoleManagement = this.userAuthenticated.employee.see_rpgen;
    }

    const url = window.location.href;
    let ambient;

    if (url.split('localhost').length === 1) {
      if (url.split('-').length > 1) {
        ambient = url.split('-')[0].split('/')[
          url.split('-')[0].split('/').length - 1
        ];
      } else {
        ambient = 'production';
      }
    } else {
      ambient = 'development';
    }

    this.companieService.getDataEnterprise(ambient).subscribe((data: any) => {
      this.showServiceManagement = data.data.show_services_management;

      if (this.showServiceManagement == true) {
        if (this.validateRoleManagement === 'true') {
          this.showButtonDashManagement = true;
        } else {
          this.showButtonDashManagement = false;
        }
      } else {
        this.showButtonDashManagement = false;
      }
    });
  }

  vieweDashboardEmployee() {
    this.roleEmployee = false;
  }
  vieweDashboardManager() {
    this.roleEmployee = true;
  }
}
