import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';

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
  public transport_types: any[] = [];
  public countries: any[] = [];
  public cityLocations: any[] = [];
  public stateLocations: any[] = [];
  public terminalLocations: any[] = [];
  public formTravelManagement: any;
  public showSubmit: boolean = true;

  constructor(public travelManagementService: TravelService,
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
      id_travel: 1,
      trip_text: '',
      id_transport: 1,
      id_city: '',
      id_country: '-1',
      id_state: '',
      id_terminal:'',
      date_begin:'',
      hour_begin:'',
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
        this.transport_types = data.data.transport_types;
        this.countries = data.data.countries;
        console.log(this.countries)
      })
  }

  newTrip(model) {
    this.showSubmit = false;
  }
  originTrip() {

  }
  searchState(form: any) {
    this.stateLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_country).
      subscribe((data: any) => {
        this.stateLocations = data.data;
        if (this.stateLocations.length > 0) {
          this.formTravelManagement.controls['id_state'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_state'].setValue('');
        }
      });
  }
  searchCity(form: any) {
    this.cityLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_state).
      subscribe((data: any) => {
        this.cityLocations = data.data;
        if (this.cityLocations.length > 0) {
          this.formTravelManagement.controls['id_city'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_city'].setValue('');
        }
      });
  }
  searchTerminal(form: any){
    this.terminalLocations = [];
    this.travelManagementService.gettransportTerminals(form.id_city).
      subscribe((data: any) => {
        this.terminalLocations = data.data;
        if (this.terminalLocations.length > 0) {
          this.formTravelManagement.controls['id_terminal'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_terminal'].setValue('');
        }
      });
  }
}
