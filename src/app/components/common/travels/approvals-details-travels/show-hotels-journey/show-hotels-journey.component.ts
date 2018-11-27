import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../../../services/travel-management/travels/travel.service';
import { TravelsService } from '../../../../../services/shared/travels/travels.service';

@Component({
  selector: 'app-show-hotels-journey',
  templateUrl: './show-hotels-journey.component.html',
  styleUrls: ['./show-hotels-journey.component.css']
})
export class ShowHotelsJourneyComponent implements OnInit {
  public objectHotelJourney: any = null;
  public arrayHotel: any[] = [];

  constructor(public travelService: TravelService,
    public travelsSharedService: TravelsService) { 
      this.travelsSharedService.getHotelsByJourney().subscribe(
        (data: any) => {
          this.objectHotelJourney = data;
          
          document.getElementById('btn_close_aprovalstravels').click();
          
          setTimeout(() => {
            if (document.getElementById('approvalHoteljourney_edit').className !== 'modal show') {
              document.getElementById('btn_approvalHoteljourney_edit').click();
              document.getElementById('bodyGeneral').removeAttribute('style');
            }
  
            this.travelService.getHotelsByJourney(data.id_journey, data.id_travel).subscribe(
              (show: any) => {
                this.arrayHotel = show.data.hotels;

              }, (error: any) => {
                console.log(error)
              }
            );
          }, 100);
  
  
        });
    }

  ngOnInit() {
  }

  returnTravel() {
    if (document.getElementById('approvals_requests_travels').className !== 'modal show') {
        document.getElementById("close_approvalHotel_journey").click();
        setTimeout(() => {
          document.getElementById("btn_approvals_requests_travels").click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.objectHotelJourney = null;
        this.arrayHotel = [];
      }
  }


}
