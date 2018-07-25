import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';

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
  public travelProof: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  public send: boolean = false;
  public hotels: any[] = [];
  public formTravelManagement: any;
  public formTravelManagementedit: any;
  public showSubmit: boolean = true;
  public bedit: boolean = false;
  public bnew: boolean = false;
  public is_collapse: boolean = false;
  public nameReport: string = 'Gestión de viajes'
  public filequotation = 'fileQuotationTravel';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  public filterState: any = [];
  public filterStateto: any = [];
  public filterCountry: any = [];
  public filterCountryto: any=[];
  public filterCity: any=[];
  public filterCityto: any=[];
  public filterTerminal: any=[];
  public filterTerminalto: any=[];
  public filterHotels: any=[];

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService: HotelsService, private accionDataTableService: DataDableSharedService) {

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
      id_terminal: '',
      date_begin: '',
      hour_begin: '',
      hour_end: '',
      date_end: '',
      id_terminalto: '',
      id_cityto: '',
      id_stateto: '',
      id_countryto: '-1',
      id_hotels: '-1',
    });
    this.travelProof.push({
      success: true,
      data: [{
        title: "Viajes solicitados. Laura Beltran silvina",
        title_table: "Viajes solicitados. Laura Beltran silvina",
        labels: {
          field_0: {
            value: "Ticket",
            type: "string",
            sortable: false,
          },
          field_1: {
            value: "Transporte",
            type: "string",
            sortable: false,
          },
          field_2: {
            value: "Motivo de viaje",
            type: "string",
            sortable: false,
          },

          field_3: {
            value: "Ciudad origen",
            type: "string",
            sortable: false,
          },
          field_4: {
            value: "Terminal de origen",
            type: "string",
            sortable: false,
          },
          field_5: {
            value: "Fecha de partida",
            type: "string",
            sortable: false,
          },
          field_6: {
            value: "Ciudad destino",
            type: "string",
            sortable: false,
          },
          field_7: {
            value: "Terminal destino",
            type: "string",
            sortable: false,
          },
          field_8: {
            value: "Fecha de llegada",
            type: "string",
            sortable: false,
          },
          field_9: {
            value: "Hotel",
            type: "string",
            sortable: false,
          },
          field_10: {
            value: "Editar",
            type: "string",
            sortable: false,
          },
          field_11: {
            value: "Eliminar",
            type: "string",
            sortable: false,
          }
        },
        data: [
          {
            id: 1,
            field_0: 123,
            field_1: "Aereo",
            field_2: "Consultoria SAP",
            field_3: "Bogota",
            field_4: "Aeropuerto Internacional el dorado",
            field_5: "2018-08-11  12:00:00",
            field_6: "Medellin",
            field_7: "Aeropuerto Henrique Olaya Herrera",
            field_8: "2018-08-11  18:00:00",
            field_9: "Alcazar Real",
            field_10: {
              type_method: "UPDATE",
              type_element: "button",
              icon: "fa-pencil",
              id: 1,
              title: "Editar",
              action_method: "updateTravels",
              disable: false
            },
            field_11: {
              type_method: "DELETE",
              type_element: "button",
              icon: "fa-trash",
              id: 1,
              title: "Eliminar",
              action_method: "deleteTravels",
              disable: false
            }
          },
          {
            id: 1,
            field_0: 124,
            field_1: "Terrestre",
            field_2: "Capacitaciones iHR",
            field_3: "Bogota",
            field_4: "Terminal del sur",
            field_5: "2018-08-28  7:30:00",
            field_6: "Villavicencio",
            field_7: "Terminal central",
            field_8: "2018-08-28  10:15:00",
            field_9: "El Delfin Rosado",
            field_10: {
              type_method: "UPDATE",
              type_element: "button",
              icon: "fa-pencil",
              id: 1,
              title: "Editar",
              action_method: "updateTravels",
              disable: false
            },
            field_11: {
              type_method: "DELETE",
              type_element: "button",
              icon: "fa-trash",
              id: 1,
              title: "Eliminar",
              action_method: "deleteTravels",
              disable: false
            }
          }]
      }]

    });

    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 200);

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {

      if (!this.bedit) {
        if (!this.bnew) {
          document.getElementById("funtionTravel").click();
          this.bedit = true;
        } else {
          this.bnew = false
          this.bedit = true;
        }
      }

      if ((data.action_method === "updateTravels") && (this.bedit === true)) {

        // this.formTravelManagementedit = new FormGroup({});
        this.formTravelManagementedit = {
          id_travel: 2,
          trip_text: 'Evaluaciones de avances',
          id_transport: 2,
          id_city: '3',
          id_country: '1',
          id_state: '2',
          id_terminal: '1',
          date_begin: '2018-07-28',
          hour_begin: '03:00:00',
          hour_end: '18:00:00',
          date_end: '2018-07-29',
          id_terminalto: '1',
          id_cityto: '5',
          id_stateto: '2',
          id_countryto: '1',
          id_hotels: '3',
        };
        this.editTravels(this.formTravelManagementedit);
      }


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

  newTravel(model) {

    this.showSubmit = false;
    this.send = true;

  }
  editTravels(param: any) {

    if (this.bedit === true) {
      this.filterCountry = this.countries.filter((list: any) => list.id == param.id_country);
      this.filterCountryto = this.countriesto.filter((listto: any) => listto.id == param.id_countryto);
      this.searchState(param);
      this.searchStateto(param);
      this.searchCity(param);
      this.searchCityto(param);
      this.searchTerminal(param);
      this.searchTerminalto(param);
      this.filterHotels = this.hotels.filter((hotels: any) => hotels.id == param.id_hotels);
    }

  }
  colapseNew() {
    if (!this.bnew) {
      this.bnew = true
    } else {
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
    this.send = false;
    this.formTravelManagement = this.fb.group({
      id_travel: 1,
      trip_text: '',
      id_transport: 1,
      id_city: '',
      id_country: '-1',
      id_state: '',
      id_terminal: '',
      date_begin: '',
      hour_begin: '',
      hour_end: '',
      date_end: '',
      id_terminalto: '',
      id_cityto: '',
      id_stateto: '',
      id_countryto: '-1',
      id_hotels: '-1',
    });
  }

  searchState(form: any) {
    this.stateLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_country).
      subscribe((data: any) => {
        this.stateLocations = data.data;
        this.filterState = this.stateLocations.filter((states: any) => states.id == form.id_state);
        if ((this.stateLocations.length > 0) && (this.bedit)) {

          this.formTravelManagement.controls['id_state'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_state'].setValue('form.id_state');
        }
      });
  }
  searchStateto(form: any) {

    this.stateLocationsto = [];
    this.travelManagementService.getgeographicLocations(form.id_countryto).
      subscribe((data: any) => {
        this.stateLocationsto = data.data;
        this.filterStateto = this.stateLocationsto.filter((statesto: any) => statesto.id == form.id_stateto);
        if (this.stateLocationsto.length > 0) {
          this.formTravelManagement.controls['id_stateto'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_stateto'].setValue('form.id_stateto');
        }
      });
  }

  searchCity(form: any) {
    this.cityLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_state).
      subscribe((data: any) => {
        this.cityLocations = data.data;
        this.filterCity = this.cityLocations.filter((cities: any) => cities.id == form.id_city);
        if (this.cityLocations.length > 0) {
          this.formTravelManagement.controls['id_city'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_city'].setValue('form.id_city');
        }
      });
  }
  searchCityto(form: any) {
    this.cityLocationsto = [];
    this.travelManagementService.getgeographicLocations(form.id_stateto).
      subscribe((data: any) => {
        this.cityLocationsto = data.data;
        this.filterCityto = this.cityLocationsto.filter((citiesto: any) => citiesto.id == form.id_cityto);
        if (this.cityLocationsto.length > 0) {
          this.formTravelManagement.controls['id_cityto'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_cityto'].setValue('form.id_cityto');
        }
      });
  }
  searchTerminal(form: any) {
    this.terminalLocations = [];
    this.travelManagementService.gettransportTerminals(form.id_city).
      subscribe((data: any) => {
        this.terminalLocations = data.data;
        this.filterTerminal = this.terminalLocations.filter((terminals: any) => terminals.id == form.id_terminal);
        if (this.terminalLocations.length > 0) {
          this.formTravelManagement.controls['id_terminal'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_terminal'].setValue('form.id_terminal');
        }
      });
  }
  searchTerminalto(form: any) {
    this.terminalLocationsto = [];
    this.travelManagementService.gettransportTerminals(form.id_cityto).
      subscribe((data: any) => {
        this.terminalLocationsto = data.data;
        this.filterTerminalto = this.terminalLocationsto.filter((terminalsto: any) => terminalsto.id == form.id_terminalto);
        if (this.terminalLocationsto.length > 0) {
          this.formTravelManagement.controls['id_terminalto'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_terminalto'].setValue('form.id_terminalto');
        }
      });
  }
  searchHotel(form: any) {

    this.hotels = [];
    this.hotelsService.getshowHotels(form.id_cityto).
      subscribe((data: any) => {
        this.hotels = data.data;
        console.log(this.hotels)
        if (this.hotels.length > 0) {
          this.formTravelManagement.controls['id_hotels'].setValue('-1');
        } else {
          this.formTravelManagement.controls['id_hotels'].setValue('form.id_hotels');
        }
      });
  }


}
