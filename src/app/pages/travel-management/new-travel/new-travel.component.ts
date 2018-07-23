import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelManagementService } from '../../../services/travel-management/travel-management.service';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-travel',
  templateUrl: './new-travel.component.html',
  styleUrls: ['./new-travel.component.css']
})
export class NewTravelComponent implements OnInit {

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public planningTravel: any[] = [];
  public travel_types: any[] = [];
  public formTravelManagement: any;
  public showSubmit: boolean = true;

  constructor(public travelManagementService: TravelManagementService,
    private tokenService: Angular2TokenService, private fb: FormBuilder) {

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");

    this.formTravelManagement = new FormGroup({});
    this.formTravelManagement = fb.group({
      id_countries: 1,
      trip_text:'',
    });


  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.travelManagementService.getplanningTravelRequests().
      subscribe((data: any) => {
        this.planningTravel = data;
        this.travel_types = data.data.travel_types;

      })
  }
  newTrip(model) {
    this.showSubmit = false;
    console.log(model)
  }

}
