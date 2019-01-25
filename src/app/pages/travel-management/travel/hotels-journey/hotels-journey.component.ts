import { Component, OnInit, OnDestroy } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-hotels-journey',
  templateUrl: './hotels-journey.component.html',
  styleUrls: ['./hotels-journey.component.css']
})
export class HotelsJourneyComponent implements OnInit, OnDestroy {
  public objectHotelJourney: any = null;
  public objectHotel: any = null;
  public arrayHotel: any[] = [];
  public formHotelsJourney: any;
  public hotels: any[] = [];
  public countAfter: number = 0;
  public countAfterAlert: number = 0;

  constructor(public travelService: TravelService,
    private fb: FormBuilder,
    public travelsSharedService: TravelsService,
    public hotelsService: HotelsService, public alert: AlertsService) {

    this.formHotelsJourney = new FormGroup({});
    this.formHotelsJourney = this.fb.group({
      date_hotel_out: '',
      id_hotels: '',
      date_hotel_in: '',
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      debugger
      if (this.countAfter === 0) {
        if (this.countAfterAlert === 0) {
          if (data === 'continueHotelsJourney') {
            this.formHotelsJourney.controls['id_hotels'].setValue('');
            this.formHotelsJourney.controls['date_hotel_out'].setValue('');
            this.formHotelsJourney.controls['date_hotel_in'].setValue('');
            if (document.getElementById('hoteljourney_edit').className !== 'modal show') {

              document.getElementById("btn_hoteljourney_edit").click();
              this.countAfterAlert += 1;
            }
          }
        }
        if (data === 'closeAlertcontinueHotelsJourney') {
          this.formHotelsJourney.controls['id_hotels'].setValue('');
          this.formHotelsJourney.controls['date_hotel_out'].setValue('');
          this.formHotelsJourney.controls['date_hotel_in'].setValue('');
          if (document.getElementById('travel_edit').className !== 'modal show') {
            document.getElementById("btn_travel_edit").click();
            document.getElementById('bodyGeneral').removeAttribute('style');
            this.objectHotelJourney = null;
            this.arrayHotel = [];
          }
        }
      }
      this.countAfterAlert = 0;
    });



    this.travelsSharedService.getHotelsByJourney().subscribe(
      (data: any) => {
        if (this.countAfter === 0) {
          this.objectHotelJourney = data;
          if (this.objectHotelJourney.acction) {
            document.getElementById('closeTravelsNew').click();
          } else {
            document.getElementById('close_edit_travel').click();
          }


          setTimeout(() => {
            if (document.getElementById('hoteljourney_edit').className !== 'modal show') {
              document.getElementById('btn_hoteljourney_edit').click();
              document.getElementById('bodyGeneral').removeAttribute('style');
            }

            this.travelService.getHotelsByJourney(data.id_journey, data.id_travel).subscribe(
              (show: any) => {
                this.objectHotel = show.data;
                this.arrayHotel = this.objectHotel.hotels;
                this.hotels = [];
                this.hotelsService.getshowHotels(this.objectHotel.country_id.toString()).subscribe(
                  (data: any) => {
                    this.hotels = data.data;
                  });

              }, (error: any) => {
                console.log(error)
              }
            );
          }, 100);

        }
      });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    debugger
    this.countAfter += 1;
    this.countAfterAlert += 1;
  }

  removeHotel(object) {
    this.travelService.deleteHotelsByJourney(object.id, this.objectHotelJourney.id_journey, this.objectHotelJourney.id_travel).subscribe(
      (data: any) => {
        this.travelService.getHotelsByJourney(this.objectHotelJourney.id_journey, this.objectHotelJourney.id_travel).subscribe(
          (show: any) => {
            this.arrayHotel = [];
            this.arrayHotel = show.data.hotels;

          }, (error: any) => {
          }
        );
      },
      (error: any) => {
        console.log(error)
      });
  }

  returnTravel() {
    debugger
    if (this.objectHotelJourney.acction) {
      if (document.getElementById('travel_view').className !== 'modal show') {
        document.getElementById("close_hotel_journey").click();
        setTimeout(() => {
          document.getElementById("btn_travel_view").click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.objectHotelJourney = null;
        this.arrayHotel = [];
      }
    } else {

      if (document.getElementById('travel_edit').className !== 'modal show') {
        document.getElementById("close_hotel_journey").click();
        setTimeout(() => {
          document.getElementById("btn_travel_edit").click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.objectHotelJourney = null;
        this.arrayHotel = [];
      }

    }
  }

  addHotel(param) {
    let object = {
      travel_management_id: this.objectHotelJourney.id_journey,
      travel_request_id: this.objectHotelJourney.id_travel,
      hotel_id: param.id_hotels,
      date_begin: param.date_hotel_in,
      date_end: param.date_hotel_out
    };

    this.travelService.postHotelNyJourney(object, this.objectHotelJourney.id_journey, this.objectHotelJourney.id_travel).subscribe(
      (data: any) => {
        this.travelService.getHotelsByJourney(this.objectHotelJourney.id_journey, this.objectHotelJourney.id_travel).subscribe(
          (show: any) => {
            this.arrayHotel = [];
            this.arrayHotel = show.data.hotels;
            this.formHotelsJourney.controls['id_hotels'].setValue("");
            this.formHotelsJourney.controls['date_hotel_in'].setValue("");
            this.formHotelsJourney.controls['date_hotel_out'].setValue("");
          }, (error: any) => {
          }
        );
      }, (error: any) => {
        document.getElementById("close_hotel_journey").click();
        const alertWarning: Alerts[] = [{
          type: 'danger', title: 'Solicitud Denegada', message: 'No es posible solicitar hoteles con la fecha de entrada igual a la de salida. ¿Desea regresar a la solicitud de hoteles?',
          confirmation: true, typeConfirmation: 'continueHotelsJourney'
        }];
        this.alert.setAlert(alertWarning[0]);
      });
  }
}
