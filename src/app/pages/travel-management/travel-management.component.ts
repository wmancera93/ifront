import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonImage } from '../../models/common/button-image/buttonImage';
import { timeout } from '../../../../node_modules/rxjs/operators';
import { debug } from 'util';
import { TooltipSharedService } from '../../services/shared/common/tooltip/tooltip-shared.service';
import { User } from '../../models/general/user';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';

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
  public dataUserTravels: User = null;

  constructor(private userSharedService: UserSharedService,
    public tooltipSharedService: TooltipSharedService) {
  }

  ngOnInit() {
    this.getDataUserPermissions();
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    if ((this.dataUserTravels.employee.is_travel_manager == true) && (this.dataUserTravels.employee.is_approver == true)) {
      this.buttonInfo = [
        {
          title: "Viajes",
          icon_primary: "fa fa-globe",
          icon_secundary: "fa fa-plane",
          tooltipText: "Haga clic aquí para solicitar trayectos, pasajes y hotel",
          route: "/ihr/travels"
        },
        {
          title: "Anticipos",
          icon_primary: "fa fa-money",
          icon_secundary: "",
          tooltipText: "Haga clic aquí para solicitar anticipos del viaje",
          route: "/ihr/advances"
        },
        {
          title: "Gastos",
          icon_primary: "fa fa-circle-thin",
          icon_secundary: "fa fa-usd",
          tooltipText: "Haga clic aquí para legalizar los gastos de viaje",
          route: "/ihr/spend"
        },
        {
          title: "Aprobaciones Pendientes",
          icon_primary: "fa fa fa-square-o",
          icon_secundary: "fa fa-clock-o",
          tooltipText: "Haga clic aquí para aprobar trayectos, anticipos o gastos de viajes",
          route: "/ihr/pending_travel"
        },
        {
          title: "Aprobaciones Gestionadas",
          icon_primary: "fa fa fa-square-o",
          icon_secundary: "fa fa-check",
          tooltipText: "Haga clic aquí para ver las solictudes de viajes aprobadas por usted",
          route: "/ihr/management_travel"
        },
        // {
        //   title: "Reportes",
        //   icon_primary: "fa fa-table",
        //   icon_secundary: "fa fa-search",
        //   tooltipText: "Haga clic aquí para ver los reportes",
        //   route: "/ihr/travel_report"
        // },
        {
          title: "Asignación de hoteles",
          icon_primary: "fa fa-circle-thin",
          icon_secundary: "fa fa-bed",
          tooltipText: "Haga clic aquí para crear hoteles",
          route: "/ihr/hotels"
        },
      ];
    } else {
      if (this.dataUserTravels.employee.is_travel_approver) {
        this.buttonInfo = [
          {
            title: "Viajes",
            icon_primary: "fa fa-globe",
            icon_secundary: "fa fa-plane",
            tooltipText: "Haga clic aquí para solicitar trayectos, pasajes y hotel",
            route: "/ihr/travels"
          },
          {
            title: "Anticipos",
            icon_primary: "fa fa-money",
            icon_secundary: "",
            tooltipText: "Haga clic aquí para solicitar anticipos del viaje",
            route: "/ihr/advances"
          },
          {
            title: "Gastos",
            icon_primary: "fa fa-circle-thin",
            icon_secundary: "fa fa-usd",
            tooltipText: "Haga clic aquí para legalizar los gastos de viaje",
            route: "/ihr/spend"
          },
          {
            title: "Aprobaciones Pendientes",
            icon_primary: "fa fa fa-square-o",
            icon_secundary: "fa fa-clock-o",
            tooltipText: "Haga clic aquí para aprobar trayectos, anticipos o gastos de viajes",
            route: "/ihr/pending_travel"
          },
          {
            title: "Aprobaciones Gestionadas",
            icon_primary: "fa fa fa-square-o",
            icon_secundary: "fa fa-check",
            tooltipText: "Haga clic aquí para ver las solictudes de viajes aprobadas por usted",
            route: "/ihr/management_travel"
          },
          // {
          //   title: "Reportes",
          //   icon_primary: "fa fa-table",
          //   icon_secundary: "fa fa-search",
          //   tooltipText: "Haga clic aquí para ver los reportes",
          //   route: "/ihr/travel_report"
          // }
        ]
      } else{
        if (this.dataUserTravels.employee.is_travel_manager){
          this.buttonInfo = [
            {
              title: "Viajes",
              icon_primary: "fa fa-globe",
              icon_secundary: "fa fa-plane",
              tooltipText: "Haga clic aquí para solicitar trayectos, pasajes y hotel",
              route: "/ihr/travels"
            },
            {
              title: "Anticipos",
              icon_primary: "fa fa-money",
              icon_secundary: "",
              tooltipText: "Haga clic aquí para solicitar anticipos del viaje",
              route: "/ihr/advances"
            },
            {
              title: "Gastos",
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-usd",
              tooltipText: "Haga clic aquí para legalizar los gastos de viaje",
              route: "/ihr/spend"
            },
            // {
            //   title: "Reportes",
            //   icon_primary: "fa fa-table",
            //   icon_secundary: "fa fa-search",
            //   tooltipText: "Haga clic aquí para ver los reportes",
            //   route: "/ihr/travel_report"
            // },
            {
              title: "Asignación de hoteles",
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-bed",
              tooltipText: "Haga clic aquí para crear hoteles",
              route: "/ihr/hotels"
            },
          ];
        }
        else {
          this.buttonInfo = [
            {
              title: "Viajes",
              icon_primary: "fa fa-globe",
              icon_secundary: "fa fa-plane",
              tooltipText: "Haga clic aquí para solicitar trayectos, pasajes y hotel",
              route: "/ihr/travels"
            },
            {
              title: "Anticipos",
              icon_primary: "fa fa-money",
              icon_secundary: "",
              tooltipText: "Haga clic aquí para solicitar anticipos del viaje",
              route: "/ihr/advances"
            },
            {
              title: "Gastos",
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-usd",
              tooltipText: "Haga clic aquí para legalizar los gastos de viaje",
              route: "/ihr/spend"
            }
          ]
        }
      }
    }

  }

  getDataUserPermissions() {
    if (this.dataUserTravels === null || this.dataUserTravels === undefined) {
      this.dataUserTravels = JSON.parse(localStorage.getItem('user'));
    }

  }
  showTooltip(event: any, data: any) {
    this.flagShowTooltip = true;
    this.eventPosition = {
      positionX: event.clientX,
      positionY: event.clientY
    }
    setTimeout(() => {
      this.tooltipSharedService.setDataTooltip({ text: data, show: this.flagShowTooltip, position: this.eventPosition });
    }, 100);

  }

  closeTooltip() {
    this.flagShowTooltip = false;
    this.tooltipSharedService.setDataTooltip({ text: "", show: this.flagShowTooltip, position: "" });
  }
}
