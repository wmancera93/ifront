import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { HotelsService } from '../../../services/travel-management/hotels/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  public objectHotels: any[] = []
  constructor(public hotelsService: HotelsService) {
    this.hotelsService.getHotelsByCompany().subscribe(data => {
      if(data.success){
        this.objectHotels = data.data[0];
        console.log(this.objectHotels)
      }      
    });
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

  }

  returnBackPage(){

  }

  viewHotels(test){

  }


}
