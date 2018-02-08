import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Enterprise } from '../../../models/general/enterprise';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {
  private dataUser: User = null;
  private dataEnterprise: Enterprise = null;

  constructor(private userSharedService: UserSharedService) {
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });

  }

  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    document.documentElement.style.setProperty(`--img-header-menu`, `url(` + this.dataEnterprise.background_header_menu.url + `)`);
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

}
