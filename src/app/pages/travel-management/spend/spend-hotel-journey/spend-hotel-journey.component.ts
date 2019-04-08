import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-spend-hotel-journey',
  templateUrl: './spend-hotel-journey.component.html',
  styleUrls: ['./spend-hotel-journey.component.css']
})
export class SpendHotelJourneyComponent implements OnInit {
  public objectHotelJourney: any = null;
  public arrayHotel: any[] = [];
  public translate: Translate = null;

  constructor(public travelService: TravelService,
    public travelsSharedService: TravelsService, public translateService: TranslateService) {

      this.translate = this.translateService.getTranslate();
      this.travelsSharedService.getHotelsByJourney().subscribe(
        (data: any) => {
          this.objectHotelJourney = data;

          document.getElementById('closeModalViewSpend').click();

          setTimeout(() => {
            if (document.getElementById('spendsHoteljourney_edit').className !== 'modal show') {
              document.getElementById('btn_spendsHoteljourney_edit').click();
              document.getElementById('bodyGeneral').removeAttribute('style');
            }

            this.travelService.getHotelsByJourney(data.id_journey, data.id_travel).subscribe(
              (show: any) => {
                this.arrayHotel = show.data.hotels;

              }, (error: any) => {
                console.log(error);
              }
            );
          }, 100);


        });
    }

  ngOnInit() {
  }

  returnSpend() {
    if (document.getElementById('modal_viewSpends').className !== 'modal show') {
        document.getElementById('close_spendsHotel_journey').click();
        setTimeout(() => {
          document.getElementById('btn-viewSpends').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.objectHotelJourney = null;
        this.arrayHotel = [];
      }
  }

}
