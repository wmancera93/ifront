import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../../../../models/general/user';

@Injectable()
export class UserSharedService {
  exportDataUser: Subject<any> = new Subject<any>();
  constructor() { }

  getUser() {            
    return this.exportDataUser;
  }

  setUser(UserAuthenticated: User) {
    return this.exportDataUser.next(UserAuthenticated);    
  }

}
