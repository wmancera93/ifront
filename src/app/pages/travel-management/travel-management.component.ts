import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonImage } from '../../models/common/button-image/buttonImage';
import { timeout } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-travel-management',
  templateUrl: './travel-management.component.html',
  styleUrls: ['./travel-management.component.css']
})
export class TravelManagementComponent implements OnInit {


  public buttonInfo: ButtonImage[] = [];
  public flagShowTooltip: boolean = false;

  constructor() { }

  ngOnInit() {
    this.buttonInfo = [{
      title: "Asignación de hoteles",
      icon_primary:"fa fa-circle-thin" ,
      icon_secundary: "fa fa-bed",
      tooltipText: "haga Clic aquí para asignar hoteles",
      route: "/ihr/hotels"
    },
    {
      title: "Viajes",
      icon_primary:"fa fa-globe" ,
      icon_secundary: "fa fa-plane",
      tooltipText: "haga Clic aquí para asignar viajes",
      route: "/ihr/travels"
    },
    {
      title: "Anticipos",
      icon_primary:"fa fa-money" ,
      icon_secundary: "",
      tooltipText: "haga Clic aquí para asignar la programación",
      route: ""
    },
    {
      title: "Gastos",
      icon_primary:"fa fa-circle-thin" ,
      icon_secundary: "fa fa-usd",
      tooltipText: "haga Clic aquí para asignar la programación",
      route: ""
    },
    {
      title: "Arpobaciones",
      icon_primary:"fa fa-circle-thin" ,
      icon_secundary: "fa fa-bed",
      tooltipText: "haga Clic aquí para asignar la programación",
      route: ""
    }
    ];
  }
  showTooltip(data) {
    this.flagShowTooltip = true; 
  }
}
