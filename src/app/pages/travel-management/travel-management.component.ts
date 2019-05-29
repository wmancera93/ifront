import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonImage } from '../../models/common/button-image/buttonImage';
import { TooltipSharedService } from '../../services/shared/common/tooltip/tooltip-shared.service';
import { User } from '../../models/general/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-travel-management',
  templateUrl: './travel-management.component.html',
  styleUrls: ['./travel-management.component.css'],
})
export class TravelManagementComponent implements OnInit {
  @Output() tooltipData: EventEmitter<any> = new EventEmitter();
  public buttonInfo: ButtonImage[] = [];
  public flagShowTooltip = false;
  token;
  public dataUserTravels: User = null;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.travel_management.${key}`;
  }

  constructor(
    public tooltipSharedService: TooltipSharedService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.getDataUserPermissions();
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth',
    });

    const commonButtons = [
      {
        title: 'titlle_wiget_travel_ts',
        icon_primary: 'fa fa-globe',
        icon_secundary: 'fa fa-plane',
        tooltipText: 'message_wiget_travel_ts',
        route: '/ihr/travels',
      },
      {
        title: 'titlle_wiget_advance_ts',
        icon_primary: 'fa fa-money',
        icon_secundary: '',
        tooltipText: 'message_wiget_advance_ts',
        route: '/ihr/advances',
      },
      {
        title: 'titlle_wiget_allowance_ts',
        icon_primary: 'fa fa-circle-thin',
        icon_secundary: 'fa fa-usd',
        tooltipText: 'message_wiget_allowance_ts',
        route: '/ihr/spend',
      },
      {
        title: 'Gestión de alojamientos',
        translate: false,
        icon_primary: 'fa fa-circle-thin',
        icon_secundary: 'fa fa-bed',
        tooltipText: 'Aqui puede crear campamentos',
        route: '/ihr/housing',
      },
      {
        title: 'Gestión de Transporte',
        translate: false,
        icon_primary: 'fa fa-bus',
        icon_secundary: 'fa fa-users',
        tooltipText: 'Aqui puede organizar flotas',
        route: '/ihr/logistics_transportations',
      },
      {
        title: 'Reporte de Flotas',
        translate: false,
        icon_primary: 'fa fa-table',
        icon_secundary: 'fa fa-bus',
        tooltipText: 'Aqui puede ver los cupos de viaje',
        route: '/ihr/logistics_reports',
      },
    ];

    const { employee } = this.dataUserTravels;
    if (employee.is_travel_manager && employee.is_approver) {
      this.buttonInfo = [
        ...commonButtons,
        {
          title: 'titlle_wiget_approver_ts',
          icon_primary: 'fa fa fa-square-o',
          icon_secundary: 'fa fa-clock-o',
          tooltipText: 'message_wiget_approver_ts',
          route: '/ihr/pending_travel',
        },
        {
          title: 'titlle_wiget_pendinga_ts',
          icon_primary: 'fa fa fa-square-o',
          icon_secundary: 'fa fa-check',
          tooltipText: 'message_wiget_pendinga_ts',
          route: '/ihr/management_travel',
        },
        {
          title: 'titlle_wiget_report_ts',
          icon_primary: 'fa fa-table',
          icon_secundary: 'fa fa-search',
          tooltipText: 'message_wiget_report_ts',
          route: '/ihr/travel_report',
        },
        {
          title: 'titlle_wiget_hotel_ts',
          icon_primary: 'fa fa-circle-thin',
          icon_secundary: 'fa fa-bed',
          tooltipText: 'message_wiget_hotel_ts',
          route: '/ihr/hotels',
        },
      ];
    } else {
      if (employee.is_travel_approver) {
        this.buttonInfo = [
          ...commonButtons,
          {
            title: 'titlle_wiget_approver_ts',
            icon_primary: 'fa fa fa-square-o',
            icon_secundary: 'fa fa-clock-o',
            tooltipText: 'message_wiget_approver_ts',
            route: '/ihr/pending_travel',
          },
          {
            title: 'titlle_wiget_pendinga_ts',
            icon_primary: 'fa fa fa-square-o',
            icon_secundary: 'fa fa-check',
            tooltipText: 'message_wiget_pendinga_ts',
            route: '/ihr/management_travel',
          },
          {
            title: 'titlle_wiget_report_ts',
            icon_primary: 'fa fa-table',
            icon_secundary: 'fa fa-search',
            tooltipText: 'message_wiget_report_ts',
            route: '/ihr/travel_report',
          },
        ];
      } else {
        if (employee.is_travel_manager) {
          this.buttonInfo = [
            ...commonButtons,
            {
              title: 'titlle_wiget_report_ts',
              icon_primary: 'fa fa-table',
              icon_secundary: 'fa fa-search',
              tooltipText: 'message_wiget_report_ts',
              route: '/ihr/travel_report',
            },
            {
              title: 'titlle_wiget_hotel_ts',
              icon_primary: 'fa fa-circle-thin',
              icon_secundary: 'fa fa-bed',
              tooltipText: 'message_wiget_hotel_ts',
              route: '/ihr/hotels',
            },
          ];
        } else {
          this.buttonInfo = [...commonButtons];
        }
      }
    }
    // switch (this.dataUserTravels.company_id) {
    //   case 12:
    //     if (employee.is_travel_manager) {
    //       this.buttonInfo = [
    //         {
    //           title: 'Gestión de alojamientos',
    //           translate: false,
    //           icon_primary: 'fa fa-circle-thin',
    //           icon_secundary: 'fa fa-bed',
    //           tooltipText: 'Aqui puede crear campamentos',
    //           route: '/ihr/housing',
    //         },
    //         {
    //           title: 'Gestión de Transporte',
    //           translate: false,
    //           icon_primary: 'fa fa-bus',
    //           icon_secundary: 'fa fa-users',
    //           tooltipText: 'Aqui puede organizar flotas',
    //           route: '/ihr/logistics_transportations',
    //         },
    //         {
    //           title: 'Reporte de Flotas',
    //           translate: false,
    //           icon_primary: 'fa fa-table',
    //           icon_secundary: 'fa fa-bus',
    //           tooltipText: 'Aqui puede ver los cupos de viaje',
    //           route: '/ihr/logistics_reports',
    //         },
    //       ];
    //     }
    //     break;
    //   case 4:
    //     if (!employee.is_travel_manager) {
    //       this.buttonInfo = [
    //         ...this.buttonInfo,
    //         {
    //           title: 'Gestión de alojamientos',
    //           translate: false,
    //           icon_primary: 'fa fa-circle-thin',
    //           icon_secundary: 'fa fa-bed',
    //           tooltipText: 'Aqui puede crear campamentos',
    //           route: '/ihr/housing',
    //         },
    //         {
    //           title: 'Gestión de Transporte',
    //           translate: false,
    //           icon_primary: 'fa fa-bus z-index-10',
    //           icon_secundary: 'fa fa-users z-index-1',
    //           tooltipText: 'Aqui puede organizar flotas',
    //           route: '/ihr/logistics_transportations',
    //         },
    //         {
    //           title: 'Reporte de Flotas',
    //           translate: false,
    //           icon_primary: 'fa fa-table',
    //           icon_secundary: 'fa fa-bus',
    //           tooltipText: 'Aqui puede ver los cupos de viaje',
    //           route: '/ihr/housing_reports',
    //         },
    //       ];
    //     }
    //     break;

    //   default:
    //     break;
    // }
  }

  getDataUserPermissions() {
    if (this.dataUserTravels === null || this.dataUserTravels === undefined) {
      this.dataUserTravels = JSON.parse(localStorage.getItem('user'));
    }
  }
  showTooltip(event: any, { tooltipText, translate }: any) {
    this.flagShowTooltip = true;
    this.tooltipSharedService.setDataTooltip({
      text: {
        tooltipText: translate === false ? tooltipText : this.t(tooltipText),
      },
      show: this.flagShowTooltip,
      position: {
        positionX: event.clientX - event.target.clientWidth / 2,
        positionY: event.clientY,
      },
    });
  }

  closeTooltip() {
    this.flagShowTooltip = false;
    setTimeout(() => {
      if (!this.flagShowTooltip) {
        this.tooltipSharedService.setDataTooltip({
          text: '',
          show: this.flagShowTooltip,
          position: '',
        });
      }
    }, 1000);
  }
}
