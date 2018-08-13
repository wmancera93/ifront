import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { HotelsService } from '../../../services/travel-management/hotels/hotels.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { HotelsSharedService } from '../../../services/shared/hotels-shared/hotels-shared.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  public objectHotels: any[] = [];
  public alertWarning: any[] = [];
  public hotel_id: string;

  constructor(public hotelsService: HotelsService, 
    public alert: AlertsService, 
    public hotelsSharedService: HotelsSharedService,
    public router: Router) {
      
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deletHotel') {
        let hotels: any;
        hotels = { hotels: [{ id: this.hotel_id }] }
        debugger
        this.hotelsService.deleteHotelsByCompany(JSON.stringify(hotels)).subscribe(
          (data: any) => {            
          this.getHotels();
        })
      }
    })

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.getHotels();
  }

  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

  viewHotels(test) {

  }

  getHotels() {
    this.hotelsService.getHotelsByCompany().subscribe(data => {
      if (data.success) {
        this.objectHotels = data.data;
      }
    });
  }

  newHotel(){
    this.hotelsSharedService.setNewHotel(true);
  }

  deleteHotels(hotel: any) {
    this.hotel_id = hotel.id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el hotel con código #' + hotel.id.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deletHotel'
    }];
    this.alert.setAlert(this.alertWarning[0]);
  }
}
