import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { Toast } from 'angular2-toaster';
import { filter } from 'rxjs/operators';
import { MainService } from '../../services/main/main.service';
import 'rxjs/add/operator/pairwise';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideAppService } from '../../services/joyride-app/joyride-app.service';
import { ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;
  @ViewChild('prendido') public prendido: ElementRef;
  @ViewChild('apagado') public apagado: ElementRef;
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
  public steps = [
    'step_1',
    'step_2',
    'step_3',
    'step_4',
    'step_5',
    'step_6',
    'step_7',
    'step_8',
  ];
  public joyrideSubscription: Subscription;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  @Output() objectToast: EventEmitter<Toast> = new EventEmitter();

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.dashboard.${key}`;
  }

  constructor(
    public userSharedService: UserSharedService,
    public router: Router,
    public companieService: MainService,
    private tokenService: Angular2TokenService,
    public translate: TranslateService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
    this.router.events
      .pipe(filter(e => e instanceof RoutesRecognized))
      .pairwise()
      .subscribe((event: any[]) => {
        if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
          if (event[0].urlAfterRedirects === '/ihr/login') {
            setTimeout(() => {
              this.toast = {
                type: 'success',
                title: this.userAuthenticated.employee.short_name,
                body: 'Bienvenido',
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
          message: error.json().errors[0].toString(),
        });
        document.body.setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      },
    );

    let routerSuscribe: Subscription;
    this.joyrideSubscription = joyrideAppService.onStartTour.subscribe(() => {
      joyrideAppService.startTour({ steps: this.steps, stepDefaultPosition: 'step_15' }).subscribe(({ name, actionType }) => {
        /* if (name === 'step_17' && actionType === 'PREV' && !routerSuscribe) {
          setTimeout(() => {
            this.vieweDashboardManager();
            this.prendido.nativeElement.checked = false;
            this.apagado.nativeElement.checked = true;
            this.joyrideAppService.reloadStep();
            routerSuscribe = undefined;
          }, 2000);
        } */
      });
    });
  }

  getDataLocalStorage() {
    document.body.setAttribute('style', 'overflow-y:block');
  }

  ngOnInit() {
    this.getDataLocalStorage();
    if (this.userAuthenticated !== null || this.userAuthenticated !== undefined) {
      this.validateRoleManagement = this.userAuthenticated.employee.see_rpgen;
    }

    const url = window.location.href;
    let ambient;

    if (url.split('localhost').length === 1) {
      if (url.split('-').length > 1) {
        ambient = url.split('-')[0].split('/')[url.split('-')[0].split('/').length - 1];
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

  ngOnDestroy(): void {
    this.joyrideSubscription.unsubscribe();
  }
}
