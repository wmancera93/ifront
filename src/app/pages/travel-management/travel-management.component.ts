import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonImage } from '../../models/common/button-image/buttonImage';
import { timeout } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-travel-management',
  templateUrl: './travel-management.component.html',
  styleUrls: ['./travel-management.component.css']
})
export class TravelManagementComponent implements OnInit {
  @Output() tooltipText: EventEmitter<any> = new EventEmitter();
  @Output() activeTooltip: EventEmitter<any> = new EventEmitter();
  @Output() position: EventEmitter<any> = new EventEmitter();
  public buttonInfo: ButtonImage[] = [];
  public flagShowTooltip: boolean = false;
  public eventPosition: any = [];

  constructor() { }

  ngOnInit() {
    this.buttonInfo = [{
      title: "Asignación de hoteles",
      icon_primary: "fa fa-circle-thin",
      icon_secundary: "fa fa-bed",
      tooltipText: "haga Clic aquí para asignar hoteles",
      route: "/ihr/hotels"
    },
    {
      title: "Viajes",
      icon_primary: "fa fa-globe",
      icon_secundary: "fa fa-plane",
      tooltipText: "haga Clic aquí para asignar viajes",
      route: "/ihr/travels"
    },
    {
      title: "Anticipos",
      icon_primary: "fa fa-money",
      icon_secundary: "",
      tooltipText: "haga Clic aquí para asignar anticipos",
      route: ""
    },
    {
      title: "Gastos",
      icon_primary: "fa fa-circle-thin",
      icon_secundary: "fa fa-usd",
      tooltipText: "haga Clic aquí para asignar gastos",
      route: ""
    },
    {
      title: "Aprobaciones",
      icon_primary: "fa fa fa-square-o",
      icon_secundary: "fa fa-check",
      tooltipText: "haga Clic aquí para asignar aprobaciones",
      route: ""
    }
    ];
  }

  showTooltip(event: any, data: any) {
    this.flagShowTooltip = true;
    this.eventPosition = {
      positionX: event.clientX,
      positionY: event.clientY
    }
    setTimeout(() => {
      this.tooltipText.emit(data.tooltipText);
      this.activeTooltip.emit(this.flagShowTooltip);
      this.position.emit(this.eventPosition)
    }, 100);

  }

  closeTooltip() {
    this.flagShowTooltip = false;
    this.activeTooltip.emit(this.flagShowTooltip);
  }

}
