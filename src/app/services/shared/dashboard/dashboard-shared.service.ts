import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class DashboardSharedService {
  exportDataUser: Subject<any> = new Subject<any>();

  constructor(public router: Router) { }

  getUser() {        
    //this.router.navigate(['/Pages/Dashboard']);
    return this.exportDataUser;
  }

  setUser(UserAuthenticated: User) {
    return this.exportDataUser.next(UserAuthenticated);    
  }

}
