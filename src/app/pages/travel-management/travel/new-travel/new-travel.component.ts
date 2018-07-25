import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';

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
  public countriesto: any[] = [];
  public cityLocations: any[] = [];
  public cityLocationsto: any[] = [];
  public stateLocations: any[] = [];
  public stateLocationsto: any[] = [];
  public terminalLocations: any[] = [];
  public terminalLocationsto: any[] = [];
  public send: boolean= false;
  public hotels:any[]=[];
  public formTravelManagement: any;
  public showSubmit: boolean = true;
  public bedit: boolean = false;
  public bnew: boolean = false;
  public is_collapse: boolean = false;
  public filequotation = 'fileQuotationTravel';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService:HotelsService) {

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
      hour_end:'',
      date_end:'',
      id_terminalto:'',
      id_cityto:'',
      id_stateto:'',
      id_countryto:'-1',
      id_hotels:'-1',
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
        this.countriesto = data.data.countries;
      })
  }

  newTrip(model) {
    this.showSubmit = false;
    this.send=true;
  }
  colapseNew(){
    if(!this.bnew){
      this.bnew = true
    }else{
      this.bnew = false
    }
    document.getElementById("funtionTravel").click();
  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }
  closeTrip() {
    this.is_collapse = false;
    this.showSubmit = true;
    this.bedit = false;
    this.bnew = false;
    this.send=false;
    this.formTravelManagement = this.fb.group({
      id_travel: 1,
      trip_text: '',
      id_transport: 1,
      id_city: '',
      id_country: '-1',
      id_state: '',
      id_terminal:'',
      date_begin:'',
      hour_begin:'',
      hour_end:'',
      date_end:'',
      id_terminalto:'',
      id_cityto:'',
      id_stateto:'',
      id_countryto:'-1',
      id_hotels:'-1',
    });
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
  searchStateto(form: any) {
    
    this.stateLocationsto = [];
    this.travelManagementService.getgeographicLocations(form.id_countryto).
      subscribe((data: any) => {
        this.stateLocationsto = data.data;
        if (this.stateLocationsto.length > 0) {
          this.formTravelManagement.controls['id_stateto'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_stateto'].setValue('');
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
  searchCityto(form: any) {
    this.cityLocationsto = [];
    this.travelManagementService.getgeographicLocations(form.id_stateto).
      subscribe((data: any) => {
        this.cityLocationsto = data.data;
        if (this.cityLocationsto.length > 0) {
          this.formTravelManagement.controls['id_cityto'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_cityto'].setValue('');
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
  searchTerminalto(form: any){
    this.terminalLocationsto = [];
    this.travelManagementService.gettransportTerminals(form.id_cityto).
      subscribe((data: any) => {
        this.terminalLocationsto = data.data;
        if (this.terminalLocationsto.length > 0) {
          this.formTravelManagement.controls['id_terminalto'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_terminalto'].setValue('');
        }
      });
  }
  searchHotel(form: any){
   
    this.hotels = [];
    this.hotelsService.getshowHotels(form.id_cityto).
      subscribe((data: any) => {
        this.hotels = data.data;
        if (this.hotels.length > 0) {
          this.formTravelManagement.controls['id_hotels'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_hotels'].setValue('');
        }
      });
  }
}
