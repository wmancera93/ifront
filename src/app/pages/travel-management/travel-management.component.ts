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
      image: {

       url: "../assets/themes/images-demo/litera.png"
      },
      tooltipText: "haga Clic aquí para asignar hoteles",
      route: "/ihr/hotels"
    },
    {
      title: "Viajes",
      image: {
        url: "../assets/themes/images-demo/mundo.png"
      },
      tooltipText: "haga Clic aquí para asignar viajes",
      route: "/ihr/travels"
    },
    {
      title: "Anticipos",
      image: {
        url: "../assets/themes/images-demo/dinero.png"
      },
      tooltipText: "haga Clic aquí para asignar la programación",
      route: ""
    },
    {
      title: "Gastos",
      image: {
        url: "../assets/themes/images-demo/etiqueta-del-precio.png"
      },
      tooltipText: "haga Clic aquí para asignar la programación",
      route: ""
    },
    {
      title: "Arpobaciones",
      image: {
        url: "../assets/themes/images-demo/lista.png"
      },
      tooltipText: "haga Clic aquí para asignar la programación",
      route: ""
    }
    ];
  }
  showTooltip(data) {
    this.flagShowTooltip = true; 
  }
}
