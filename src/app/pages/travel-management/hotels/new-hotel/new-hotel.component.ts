import { Component, OnInit } from '@angular/core';
import { HotelsSharedService } from '../../../../services/shared/hotels-shared/hotels-shared.service';
import { FormBuilder, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrls: ['./new-hotel.component.css'],
})
export class NewHotelComponent implements OnInit {
  public formHotels: any;
  public countries: any[] = [];
  public stateLocations: any[] = [];
  public cityLocations: any[] = [];
  public showSubmit = true;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.hotels.new_hotel.${key}`;
  }

  constructor(public hotelsSharedService: HotelsSharedService, private fb: FormBuilder, public travelManagementService: TravelService, public hotelsService: HotelsService, public alert: AlertsService, public translate: TranslateService) {
    this.hotelsSharedService.getNewHotel().subscribe(() => {
      if (document.getElementById('hotel_new').className !== 'modal show') {
        this.stateLocations = [];
        this.cityLocations = [];
        this.formHotels = new FormGroup({});
        this.formHotels = this.fb.group({
          id_country: '-1',
          id_city: '',
          id_state: '',
          name_hotel: '',
        });
        document.getElementById('btn_hotel_new').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
    });
  }

  ngOnInit() {
    this.formHotels = new FormGroup({});
    this.formHotels = this.fb.group({
      id_country: '-1',
      id_city: '',
      id_state: '',
      name_hotel: '',
    });

    this.travelManagementService.getplanningTravelRequests().subscribe((data: any) => {
      this.countries = data.data.countries;
    });
  }

  searchState(form: any) {
    this.stateLocations = [];
    this.cityLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_country).subscribe((data: any) => {
      this.stateLocations = data.data;
      setTimeout(() => {
        this.formHotels.controls['id_state'].setValue('-1');
      }, 100);
    });
  }

  searchCity(form: any) {
    this.cityLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_state).subscribe((data: any) => {
      this.cityLocations = data.data;
      setTimeout(() => {
        this.formHotels.controls['id_city'].setValue('-1');
      }, 100);
    });
  }

  newHotel(param: any) {
    const hotel = {
      hotels: [
        {
          geographic_location_id: param.id_country,
          name: param.name_hotel,
        },
      ],
    };

    this.hotelsService.postHotelsByCompany(hotel).subscribe(
      (data: any) => {
        if (data.success) {
          document.getElementById('closeHotels').click();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_one_ts'),
              message: this.t('message_alert'),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.hotelsSharedService.setViewHotels(true);
        }
      },
      (error: any) => {
        document.getElementById('closeHotels').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_two_ts'),
            message: error.json().errors.toString(),
            confirmation: false,
          },
        ];
        this.showSubmit = true;
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }
}
