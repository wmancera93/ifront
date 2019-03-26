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
  public translate: Translate = null;

  constructor(private userSharedService: UserSharedService,
    public tooltipSharedService: TooltipSharedService, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();
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
          title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_travel_ts,
          icon_primary: "fa fa-globe",
          icon_secundary: "fa fa-plane",
          tooltipText:this.translate.app.frontEnd.pages.travel_management.message_wiget_travel_ts,
          route: "/ihr/travels"
        },
        {
          title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_advance_ts,
          icon_primary: "fa fa-money",
          icon_secundary: "",
          tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_advance_ts,
          route: "/ihr/advances"
        },
        {
          title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_allowance_ts,
          icon_primary: "fa fa-circle-thin",
          icon_secundary: "fa fa-usd",
          tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_allowance_ts,
          route: "/ihr/spend"
        },
        {
          title:this.translate.app.frontEnd.pages.travel_management.titlle_wiget_approver_ts,
          icon_primary: "fa fa fa-square-o",
          icon_secundary: "fa fa-clock-o",
          tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_approver_ts,
          route: "/ihr/pending_travel"
        },
        {
          title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_pendinga_ts,
          icon_primary: "fa fa fa-square-o",
          icon_secundary: "fa fa-check",
          tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_pendinga_ts,
          route: "/ihr/management_travel"
        },
        {
          title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_report_ts,
          icon_primary: "fa fa-table",
          icon_secundary: "fa fa-search",
          tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_report_ts,
          route: "/ihr/travel_report"
        },
        {
          title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_hotel_ts,
          icon_primary: "fa fa-circle-thin",
          icon_secundary: "fa fa-bed",
          tooltipText: this.translate.app.frontEnd.pages.travel_management. message_wiget_hotel_ts,
          route: "/ihr/hotels"
        },
      ];
    } else {
      if (this.dataUserTravels.employee.is_travel_approver) {

        this.buttonInfo = [
          {
            title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_travel_ts,
            icon_primary: "fa fa-globe",
            icon_secundary: "fa fa-plane",
            tooltipText:this.translate.app.frontEnd.pages.travel_management.message_wiget_travel_ts,
            route: "/ihr/travels"
          },
          {
            title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_advance_ts,
            icon_primary: "fa fa-money",
            icon_secundary: "",
            tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_advance_ts,
            route: "/ihr/advances"
          },
          {
            title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_allowance_ts,
            icon_primary: "fa fa-circle-thin",
            icon_secundary: "fa fa-usd",
            tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_allowance_ts,
            route: "/ihr/spend"
          },
          {
            title:this.translate.app.frontEnd.pages.travel_management.titlle_wiget_approver_ts,
            icon_primary: "fa fa fa-square-o",
            icon_secundary: "fa fa-clock-o",
            tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_approver_ts,
            route: "/ihr/pending_travel"
          },
          {
            title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_pendinga_ts,
            icon_primary: "fa fa fa-square-o",
            icon_secundary: "fa fa-check",
            tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_pendinga_ts,
            route: "/ihr/management_travel"
          },
          {
            title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_report_ts,
            icon_primary: "fa fa-table",
            icon_secundary: "fa fa-search",
            tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_report_ts,
            route: "/ihr/travel_report"
          },
          {
            title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_hotel_ts,
            icon_primary: "fa fa-circle-thin",
            icon_secundary: "fa fa-bed",
            tooltipText: this.translate.app.frontEnd.pages.travel_management. message_wiget_hotel_ts,
            route: "/ihr/hotels"
          },
        ]
      } else {
        if (this.dataUserTravels.employee.is_travel_manager) {
          this.buttonInfo = [
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_travel_ts,
              icon_primary: "fa fa-globe",
              icon_secundary: "fa fa-plane",
              tooltipText:this.translate.app.frontEnd.pages.travel_management.message_wiget_travel_ts,
              route: "/ihr/travels"
            },
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_advance_ts,
              icon_primary: "fa fa-money",
              icon_secundary: "",
              tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_advance_ts,
              route: "/ihr/advances"
            },
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_allowance_ts,
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-usd",
              tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_allowance_ts,
              route: "/ihr/spend"
            },
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_report_ts,
              icon_primary: "fa fa-table",
              icon_secundary: "fa fa-search",
              tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_report_ts,
              route: "/ihr/travel_report"
            },
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_hotel_ts,
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-bed",
              tooltipText: this.translate.app.frontEnd.pages.travel_management. message_wiget_hotel_ts,
              route: "/ihr/hotels"
            },
          ];
        }
        else {
          this.buttonInfo = [
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_travel_ts,
              icon_primary: "fa fa-globe",
              icon_secundary: "fa fa-plane",
              tooltipText:this.translate.app.frontEnd.pages.travel_management.message_wiget_travel_ts,
              route: "/ihr/travels"
            },
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_advance_ts,
              icon_primary: "fa fa-money",
              icon_secundary: "",
              tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_advance_ts,
              route: "/ihr/advances"
            },
            {
              title: this.translate.app.frontEnd.pages.travel_management.titlle_wiget_allowance_ts,
              icon_primary: "fa fa-circle-thin",
              icon_secundary: "fa fa-usd",
              tooltipText: this.translate.app.frontEnd.pages.travel_management.message_wiget_allowance_ts,
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
