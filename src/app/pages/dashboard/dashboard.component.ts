import { Component, OnInit } from '@angular/core';
import { User } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userAuthenticated: User = null;

  constructor(private tokenService: Angular2TokenService,
    public userSharedService: UserSharedService,
    public router: Router) {
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
    this.getDataLocalStorage();
    // this.tokenService.validateToken().subscribe(
    //   res => console.log(res),
    //   error => console.log(error)
    // );
  }

}
