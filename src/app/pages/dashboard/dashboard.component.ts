import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Employee } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { environment } from '../../../environments/environment';
import { Toast } from 'angular2-toaster';
import { MainService } from '../../services/main/main.service';
import 'rxjs/add/operator/pairwise';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;
  public authdata: any;
  public roleEmployee: boolean = true;
  public showServiceManagement: boolean;
  public showButtonDashManagement: boolean = true;
  public validateRoleManagement: string;
  public isAdmin: boolean;
  public token: boolean;
  public previousUrl: string;

  public aa: string = "";
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  @Output() objectToast: EventEmitter<Toast> = new EventEmitter();

  constructor(public userSharedService: UserSharedService,
    public router: Router, public companieService: MainService,
    private tokenService: Angular2TokenService) {

    this.router.events.filter(e => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {

        if (event[0].urlAfterRedirects === '/ihr/login') {

          let toast: Toast = {
            type: 'success',
            title: this.userAuthenticated.employee.short_name,
            body: 'Bienvenido'
          };
          setTimeout(() => {
            if (document.getElementsByClassName('toast').length === 0) {
              this.objectToast.emit(toast)
            }
          }, 100);


        }

        setTimeout(() => {
          this.aa = event[0].urlAfterRedirects.toString();
          if (this.aa === '/ihr/my_team') {
            document.getElementById('buttonDashEmployee').click();
          }
        }, 100);

      })

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })

  }

  getDataLocalStorage() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
      this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     if (event.urlAfterRedirects === '/ihr/login') {
      //       let toast: Toast = {
      //         type: 'success',
      //         title: this.userAuthenticated.employee.short_name,
      //         body: 'Bienvenido'
      //       };
      //       setTimeout(() => {
      //         this.objectToast.emit(toast)
      //       }, 100);
      //     }
      //   }
      // })
    }


  }

  ngOnInit() {


    this.getDataLocalStorage();
    this.validateRoleManagement = this.userAuthenticated.employee.see_rpgen;
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

    this.companieService.getDataEnterprise(ambient).subscribe((data: any) => {
      this.showServiceManagement = data.data.show_services_management;
      this.isAdmin = data.data.isAdmin;
      if (this.showServiceManagement == true) {
        if (this.isAdmin || this.validateRoleManagement == 'true') {

          this.showButtonDashManagement = true;
        }
      }

      else {
        this.showButtonDashManagement = false;
      }
    })
  }

  vieweDashboardEmployee() {
    this.roleEmployee = false;
  }
  vieweDashboardManager() {
    this.roleEmployee = true;
  }
}
