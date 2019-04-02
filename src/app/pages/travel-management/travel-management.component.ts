import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonImage } from '../../models/common/button-image/buttonImage';
import { timeout } from '../../../../node_modules/rxjs/operators';
import { debug } from 'util';
import { TooltipSharedService } from '../../services/shared/common/tooltip/tooltip-shared.service';
import { User } from '../../models/general/user';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { Translate } from '../../models/common/translate/translate';
import { TranslateService } from '../../services/common/translate/translate.service';

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
  public translate: any = null;

  constructor(private userSharedService: UserSharedService,
    public tooltipSharedService: TooltipSharedService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate().app.frontEnd.pages.travel_management;
  }

  ngOnInit() {
    this.getDataUserPermissions();
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    const {
      titlle_wiget_travel_ts,
      message_wiget_travel_ts,
      titlle_wiget_advance_ts,
      message_wiget_advance_ts,
      titlle_wiget_allowance_ts,
      message_wiget_allowance_ts,
      titlle_wiget_approver_ts,
      message_wiget_approver_ts,
      titlle_wiget_pendinga_ts,
      message_wiget_pendinga_ts,
      titlle_wiget_report_ts,
      message_wiget_report_ts,
      titlle_wiget_hotel_ts,
      message_wiget_hotel_ts,
    } = this.translate

    const commonButtons = [{
      title: titlle_wiget_travel_ts,
      icon_primary: "fa fa-globe",
      icon_secundary: "fa fa-plane",
      tooltipText: message_wiget_travel_ts,
      route: "/ihr/travels"
    },
    {
      title: titlle_wiget_advance_ts,
      icon_primary: "fa fa-money",
      icon_secundary: "",
      tooltipText: message_wiget_advance_ts,
      route: "/ihr/advances"
    },
    {
      title: titlle_wiget_allowance_ts,
      icon_primary: "fa fa-circle-thin",
      icon_secundary: "fa fa-usd",
      tooltipText: message_wiget_allowance_ts,
      route: "/ihr/spend"
    }
    ];

    const { employee } = this.dataUserTravels;
    if ((employee.is_travel_manager) && (employee.is_approver)) {
      this.buttonInfo = [
        ...commonButtons,
        {
          title: titlle_wiget_approver_ts,
          icon_primary: "fa fa fa-square-o",
          icon_secundary: "fa fa-clock-o",
          tooltipText: message_wiget_approver_ts,
          route: "/ihr/pending_travel"
        },
        {
          title: titlle_wiget_pendinga_ts,
          icon_primary: "fa fa fa-square-o",
          icon_secundary: "fa fa-check",
          tooltipText: message_wiget_pendinga_ts,
          route: "/ihr/management_travel"
        },
        {
          title: titlle_wiget_report_ts,
          icon_primary: "fa fa-table",
          icon_secundary: "fa fa-search",
          tooltipText: message_wiget_report_ts,
          route: "/ihr/travel_report"
        },
        {
          title: titlle_wiget_hotel_ts,
          icon_primary: "fa fa-circle-thin",
          icon_secundary: "fa fa-bed",
          tooltipText: message_wiget_hotel_ts,
          route: "/ihr/hotels"
        },
      ];
    } else {
      if (employee.is_travel_approver) {

        this.buttonInfo = [
          ...commonButtons,
          {
            title: titlle_wiget_approver_ts,
            icon_primary: "fa fa fa-square-o",
            icon_secundary: "fa fa-clock-o",
            tooltipText: message_wiget_approver_ts,
            route: "/ihr/pending_travel"
          },
          {
            title: titlle_wiget_pendinga_ts,
            icon_primary: "fa fa fa-square-o",
            icon_secundary: "fa fa-check",
            tooltipText: message_wiget_pendinga_ts,
            route: "/ihr/management_travel"
          },
          {
            title: titlle_wiget_report_ts,
            icon_primary: "fa fa-table",
            icon_secundary: "fa fa-search",
            tooltipText: message_wiget_report_ts,
            route: "/ihr/travel_report"
          },
        ]
      } else {
        if (employee.is_travel_manager) {
          this.buttonInfo = [
            ...commonButtons,
            {
              title: titlle_wiget_report_ts,
              icon_primary: "fa fa-table",
              icon_secundary: "fa fa-search",
              tooltipText: message_wiget_report_ts,
              route: "/ihr/travel_report"
            },
            {
              title: titlle_wiget_hotel_ts,
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-bed",
              tooltipText: message_wiget_hotel_ts,
              route: "/ihr/hotels"
            },
          ];
        }
        else {
          this.buttonInfo = [
            ...commonButtons,
          ]
        }
      }
    }
    switch (this.dataUserTravels.company_id) {
      case 38:
        if (employee.is_travel_manager) {
          this.buttonInfo = [
            {
              title: 'Gestión de alojamientos',
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-bed",
              tooltipText: 'Aqui puede crear campamentos',
              route: "/ihr/housing"
            },
            {
              title: 'Gestión de Transporte',
              icon_primary: "fa fa-bus",
              icon_secundary: "fa fa-users",
              tooltipText: 'Aqui puede organizar flotas',
              route: "/ihr/logistics_transportations"
            },
            {
              title: 'Reporte de Flotas',
              icon_primary: "fa fa-table",
              icon_secundary: "fa fa-bus",
              tooltipText: 'Aqui puede ver los cupos de viaje',
              route: "/ihr/logistics_transportations"
            }
          ]
        }
        break;
      case 4:
        if (!employee.is_travel_manager) {
          this.buttonInfo = [...this.buttonInfo, {
            title: 'Gestión de alojamientos',
            icon_primary: "fa fa-circle-thin",
            icon_secundary: "fa fa-bed",
            tooltipText: 'Aqui puede crear campamentos',
            route: "/ihr/housing"
          },
          {
            title: 'Gestión de Transporte',
            icon_primary: "fa fa-bus z-index-10",
            icon_secundary: "fa fa-users z-index-1",
            tooltipText: 'Aqui puede organizar flotas',
            route: "/ihr/logistics_transportations"
          },
          {
            title: 'Reporte de Flotas',
            icon_primary: "fa fa-table",
            icon_secundary: "fa fa-bus",
            tooltipText: 'Aqui puede ver los cupos de viaje',
            route: "/ihr/logistics_transportations"
          }]
        }
        break;

      default:
        break;
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
    console.log(this.eventPosition);

    setTimeout(() => {
      this.tooltipSharedService.setDataTooltip({ text: data, show: this.flagShowTooltip, position: this.eventPosition });
    }, 100);

  }

  closeTooltip() {
    this.flagShowTooltip = false;
    this.tooltipSharedService.setDataTooltip({ text: "", show: this.flagShowTooltip, position: "" });
  }
}
