import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';

@Component({
  selector: 'app-hotels-journey',
  templateUrl: './hotels-journey.component.html',
  styleUrls: ['./hotels-journey.component.css']
})
export class HotelsJourneyComponent implements OnInit {
  public objectHotelJourney: any = null;
  public arrayHotel: any[] = [];

  constructor(public travelService: TravelService,
    public travelsSharedService: TravelsService) {
    this.travelsSharedService.getHotelsByJourney().subscribe(
      (data: any) => {
        debugger
        this.objectHotelJourney = data;
        if(this.objectHotelJourney.acction){
          document.getElementById('closeTravelsNew').click();
        }else{
          document.getElementById('close_edit_travel').click();          
        }
      

        setTimeout(() => {
          if (document.getElementById('hoteljourney_edit').className !== 'modal show') {
            document.getElementById('btn_hoteljourney_edit').click();
            document.getElementById('bodyGeneral').removeAttribute('style');
          }

          this.travelService.getHotelsByJourney(data.id_journey, data.id_travel).subscribe(
            (show: any) => {
              this.arrayHotel = show.data;

            }, (error: any) => {
              console.log(error)
            }
          );
        }, 100);


      });
  }

  ngOnInit() {

  }

  removeHotel(object) {

  }

  returnTravel() {
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
}
