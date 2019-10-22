import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css'],
})
export class BackofficeComponent implements OnInit, DoCheck {
  public backOffice: any[] = [];
  public name: '';
  public icon: '';
  public showForm: number = 1;
  public activeClass: string = 'd-flex';
  constructor() {
    this.backOffice = [
      { code: 1, name: 'Desbloqueo de usuarios', icon: 'fa-users' },
      { code: 2, name: 'Cargue de imagenes', icon: 'fa-file-image-o' },
      { code: 3, name: 'Cargue de colores', icon: 'fa-upload' },
    ];
  }

  ngOnInit() {
    this.name = this.backOffice[0].name;
    this.icon = this.backOffice[0].icon;
  }
  ngDoCheck() {
    if (screen.width < 770) {
      this.activeClass = '';
    } else {
      this.activeClass = 'd-flex';
    }
  }
  acctionBotton(object) {
    this.showForm = object.code;
    this.name = object.name;
    this.icon = object.icon;
  }
}
