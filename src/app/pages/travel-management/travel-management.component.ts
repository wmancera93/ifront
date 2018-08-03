import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonImage } from '../../models/common/button-image/buttonImage';
import { timeout } from '../../../../node_modules/rxjs/operators';
import { debug } from 'util';
import { TooltipSharedService } from '../../services/shared/common/tooltip/tooltip-shared.service';

@Component({
  selector: 'app-travel-management',
  templateUrl: './travel-management.component.html',
  styleUrls: ['./travel-management.component.css']
})
export class TravelManagementComponent implements OnInit {
  @Output() tooltipData: EventEmitter<any> = new EventEmitter();
  public buttonInfo: ButtonImage[] = [];
  public flagShowTooltip: boolean = false;
  public eventPosition: any = [];
  token

  constructor(public tooltipSharedService: TooltipSharedService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.buttonInfo = [{
      title: "Asignación de hoteles",
      icon_primary: "fa fa-circle-thin",
      icon_secundary: "fa fa-bed",
      tooltipText: "Haga clic aquí para asignar hoteles",
      route: "/ihr/hotels"
    },
    {
      title: "Viajes",
      icon_primary: "fa fa-globe",
      icon_secundary: "fa fa-plane",
      tooltipText: "Haga clic aquí para asignar viajes",
      route: "/ihr/travels"
    },
    {
      title: "Anticipos",
      icon_primary: "fa fa-money",
      icon_secundary: "",
      tooltipText: "Haga clic aquí para asignar anticipos",
      route: ""
    },
    {
      title: "Gastos",
      icon_primary: "fa fa-circle-thin",
      icon_secundary: "fa fa-usd",
      tooltipText: "Haga clic aquí para asignar gastos",
      route: ""
    },
    {
      title: "Aprobaciones",
      icon_primary: "fa fa fa-square-o",
      icon_secundary: "fa fa-check",
      tooltipText: "Haga clic aquí para asignar aprobaciones",
      route: ""
    }
    ];
  }

  showTooltip(event: any, data: any) {

    // this.flagShowTooltip = true;
    this.eventPosition = {
      positionX: event.clientX,
      positionY: event.clientY
    }

    this.tooltipSharedService.setDataTooltip({ text: data.tooltipText, show: this.flagShowTooltip, position: this.eventPosition });

  }

  closeTooltip() {
    // this.flagShowTooltip = false;
    this.tooltipSharedService.setDataTooltip({ text: "", show: this.flagShowTooltip, position: "" });
  }
}
