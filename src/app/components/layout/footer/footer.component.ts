import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private dataUser: User = null;
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
