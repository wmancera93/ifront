import { Component, OnInit } from '@angular/core';
import { DashboardSharedService } from '../../services/shared/dashboard/dashboard-shared.service';
import { User } from '../../models/user';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;

  constructor(private tokenService: Angular2TokenService,
    public dashboardShared: DashboardSharedService,
    public router: Router) {
    this.dashboardShared.getUser().subscribe((data) => {
      this.userAuthenticated = data;
      if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
      }
      if (this.userAuthenticated !== null || this.userAuthenticated !== undefined) {
        console.log(this.userAuthenticated);
      }
    })
  }

  ngOnInit() {
    // this.tokenService.validateToken()
    // .subscribe((res) => {console.log(res)}, (error) => {console.log(error)})
  }

}
