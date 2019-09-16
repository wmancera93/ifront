import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../../services/travel-management/hotels/hotels.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { HotelsSharedService } from '../../../services/shared/hotels-shared/hotels-shared.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  public objectHotels: any[] = [];
  public alertWarning: any[] = [];
  public hotel_id: string;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.hotels.${key}`;
  }

  constructor(
    public hotelsService: HotelsService,
    public alert: AlertsService,
    public hotelsSharedService: HotelsSharedService,
    public router: Router,
    public translate: TranslateService,
  ) {
    this.hotelsSharedService.getViewHotels().subscribe((data: any) => {
      if (data) {
        this.getHotels();
      }
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deletHotel') {
        this.hotelsService
          .deleteHotelsByCompany(this.hotel_id)
          .subscribe(() => {
            this.getHotels();
            this.alertWarning = [
              {
                type: 'danger',
                title: this.t('tittle_alert'),
                message: this.t('message_alert'),
                confirmation: false,
              },
            ];
            this.alert.setAlert(this.alertWarning[0]);
          });
      }
    });
  }

  ngOnInit() {
    this.getHotels();
  }

  returnBackPage() {
    this.router.navigate(['ihr/travel_management/index']);
  }

  viewHotels() {}

  getHotels() {
    this.hotelsService.getHotelsByCompany().subscribe(data => {
      if (data.success) {
        this.objectHotels = data.data;
      }
    });
  }

  newHotel() {
    this.hotelsSharedService.setNewHotel(true);
  }

  deleteHotels(hotel: any) {
    this.hotel_id = hotel.id;
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('tittle_alert_one_ts'),
        message: this.t('message_alert_two_ts') + hotel.id.toString(),
        confirmation: true,
        typeConfirmation: 'deletHotel',
      },
    ];
    this.alert.setAlert(this.alertWarning[0]);
  }
}
