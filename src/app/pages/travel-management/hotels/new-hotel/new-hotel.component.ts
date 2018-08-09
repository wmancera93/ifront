import { Component, OnInit } from '@angular/core';
import { HotelsSharedService } from '../../../../services/shared/hotels-shared/hotels-shared.service';
import { FormBuilder, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrls: ['./new-hotel.component.css']
})
export class NewHotelComponent implements OnInit {
  public formHotels: any;
  public countries: any[] = [];
  public stateLocations: any[] = [];
  public cityLocations: any[] = [];
  
  constructor(public hotelsSharedService: HotelsSharedService,
    private fb: FormBuilder,
    public travelManagementService: TravelService) {

    this.hotelsSharedService.getNewHotel().subscribe(
      (data: any) => {
        if (document.getElementById('hotel_new').className !== 'modal show') {
          document.getElementById('btn_hotel_new').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
          this.travelManagementService.getplanningTravelRequests().
          subscribe((data: any) => {
            this.countries = data.data.countries;
          })
        }
      })
  }

  ngOnInit() {
    this.formHotels = new FormGroup({});
    this.formHotels = this.fb.group({
      id_country: '-1',
      id_city: '',
      id_state: '',
      name_hotel: '',
    });
  }

  searchState(form: any, acction: any) {
    this.stateLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_country).
      subscribe((data: any) => {
        this.formHotels.controls['id_state'].setValue('-1');
        this.stateLocations = data.data;
      });
  }

  searchCity(form: any, acction: any) {
    this.cityLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_state).
      subscribe((data: any) => {
        this.formHotels.controls['id_city'].setValue('-1');
        this.cityLocations = data.data;        
      });
  }

}
