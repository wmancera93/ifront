import { Component, OnInit } from '@angular/core';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { User } from '../../../models/general/user';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  private dataUser: User = null;
  title: string = 'Mis datos';
  constructor(private userSharedService: UserSharedService) {
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });   
  }


  ngOnInit() {
    this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

}
