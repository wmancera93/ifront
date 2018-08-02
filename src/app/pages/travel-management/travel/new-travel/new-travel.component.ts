import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';

@Component({
  selector: 'app-new-travel',
  templateUrl: './new-travel.component.html',
  styleUrls: ['./new-travel.component.css']
})
export class NewTravelComponent implements OnInit {

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public showPdf: boolean = false;
  public showSizeTable: boolean = false;
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
  public traverlsDestination: any[] = [];
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
  public objectImg: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument: string = '';
  public is_upload: boolean = false;
  public count: number = 0;


  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService: HotelsService, private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService, public travelsService: TravelsService, public formDataService: FormDataService) {

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

    this.fileUploadService.getObjetFile().subscribe((data) => {
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
        setTimeout(() => {
          this.iconUpload = data.name.split('.');
          this.iconDocument = this.iconUpload[this.iconUpload.length - 1];
          this.is_upload = true;
          this.objectImg.push({ file: data, extension: this.iconDocument });

        }, 200);
      }, 1000);
    });



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
      id_hotels: '',
    });

    this.travelProof.push({
      success: true,
      data: [{
        title: "Viajes solicitados. Laura Beltran silvina",
        title_table: "Viajes solicitados. Laura Beltran silvina",
        labels: {
          field_0: {
            value: "Id",
            type: "string",
            sortable: false,
          },
          field_1: {
            value: "Tipo de Transporte",
            type: "string",
            sortable: false,
          },
          field_2: {
            value: "Origen",
            type: "string",
            sortable: false,
          },

          field_3: {
            value: "Terminal de Origen",
            type: "string",
            sortable: false,
          },
          field_4: {
            value: "Fecha y Hora Origen",
            type: "string",
            sortable: false,
          },
          field_5: {
            value: "Destino",
            type: "string",
            sortable: false,
          },
          field_6: {
            value: "Terminal destino",
            type: "string",
            sortable: false,
          },
          field_7: {
            value: "Fecha y Hora Destino",
            type: "string",
            sortable: false,
          },
          field_8: {
            value: "Hotel",
            type: "string",
            sortable: false,
          },
          field_9: {
            value: "Editar",
            type: "string",
            sortable: false,
          },
          field_10: {
            value: "Eliminar",
            type: "string",
            sortable: false,
          }
        },
        data: [
        ]
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
          id_terminalto: '3',
          id_cityto: '5',
          id_stateto: '2',
          id_countryto: '1',
          id_hotels: '5',
        };
        this.editTravels(this.formTravelManagementedit);
      }


    });

    this.travelsService.getNewTravels().subscribe((data: any) => {

      document.getElementById("btn_travel_new").click();
      if (data) {
        this.clearFormGeneral();
        if (this.bnew || this.bedit) {
          document.getElementById("funtionTravel").click();
          this.bnew = false;
          this.bedit = false;
        }
      }

    })

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

  deleteUpload(param: any) {
    this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === param.file.name), 1);
  }
  newTravel(model) {
    console.log(model)
    this.showSubmit = false;
    this.send = true;

    const modelFromdata = new FormData();
    modelFromdata.append('travel_request_type_id', '1');
    modelFromdata.append('travel_types', model.id_travel);
    modelFromdata.append('observation', model.trip_text);
    modelFromdata.append('travels', JSON.stringify(this.traverlsDestination));
    modelFromdata.append('files_length', this.objectImg.length.toString())
    for (let index = 0; index < this.objectImg.length; index++) {
      modelFromdata.append('files_' + (index + 1).toString(), this.objectImg[index]);
    }
    model = modelFromdata;

    this.formDataService.postNewTravel(model)
      .subscribe(
        (data: any) => {
          console.log(data)
        });
  }

  addDestination(modelPartial) {
    this.travelProof[0].data[0].data.push({
      field_0: this.count + 1,
      field_1: this.transport_types.filter((data) => data.id.toString() === modelPartial.id_transport.toString())[0].name,
      field_2: this.cityLocations.filter((data) => data.id.toString() === modelPartial.id_city.toString())[0].name,
      field_3: this.terminalLocations.filter((data) => data.id.toString() === modelPartial.id_terminal.toString())[0].name,
      field_4: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      field_5: this.cityLocationsto.filter((data) => data.id.toString() === modelPartial.id_cityto.toString())[0].name,
      field_6: this.terminalLocationsto.filter((data) => data.id.toString() === modelPartial.id_terminalto.toString())[0].name,
      field_7:  modelPartial.date_end + ' ' + modelPartial.hour_end,
      field_8: this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString())[0].name,
      field_9: {
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: this.count + 1,
        title: "Editar",
        action_method: "updateTravels",
        disable: false
      },
      field_10: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: this.count + 1,
        title: "Eliminar",
        action_method: "deleteTravels",
        disable: false
      }
    })

    this.count += 1

    this.traverlsDestination.push({
      transport_id: modelPartial.id_transport, 
      origin_location_id: modelPartial.id_city, 
      origin_terminal_id: modelPartial.id_terminal, 
      hotel_id: modelPartial.id_hotels, 
      destination_location_id: modelPartial.id_cityto, 
      destination_terminal_id: modelPartial.id_terminalto, 
      origin_datetime: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end
    });

    this.objectReport.emit(this.travelProof[0]);

  }
  editTravels(param: any) {
    this.formTravelManagement = new FormGroup({});
    this.formTravelManagement = this.fb.group({
      id_travel: param.id_travel,
      trip_text: param.trip_text,
      id_transport: param.id_transport,
      id_city: param.id_city,
      id_country: param.id_country,
      id_state: param.id_state,
      id_terminal: param.id_terminal,
      date_begin: param.date_begin,
      hour_begin: param.hour_begin,
      hour_end: param.hour_end,
      date_end: param.date_end,
      id_terminalto: param.id_terminalto,
      id_cityto: param.id_cityto,
      id_stateto: param.id_stateto,
      id_countryto: param.id_countryto,
      id_hotels: param.id_hotels,
    });
    this.searchState(param, 'edit');
    this.searchStateto(param, 'edit');
    this.searchCity(param, 'edit');
    this.searchCityto(param, 'edit');
    this.searchTerminal(param, 'edit');
    this.searchTerminalto(param, 'edit');
    this.searchHotel(param, 'edit');
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
    this.clearFormPartial();
  }

  searchState(form: any, acction: any) {
    this.stateLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_country).
      subscribe((data: any) => {
        this.stateLocations = data.data;
        if ((this.stateLocations.length > 0)) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_state'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_state'].setValue('');
        }
      });
  }
  searchStateto(form: any, acction: any) {
    this.stateLocationsto = [];
    this.travelManagementService.getgeographicLocations(form.id_countryto).
      subscribe((data: any) => {
        this.stateLocationsto = data.data;
        if (this.stateLocationsto.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_stateto'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_stateto'].setValue('');
        }
      });
  }
  searchCity(form: any, acction: any) {
    this.cityLocations = [];
    this.travelManagementService.getgeographicLocations(form.id_state).
      subscribe((data: any) => {
        this.cityLocations = data.data;
        if (this.cityLocations.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_city'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_city'].setValue('');
        }
      });
  }
  searchCityto(form: any, acction: any) {
    this.travelManagementService.getgeographicLocations(form.id_stateto).
      subscribe((data: any) => {
        this.cityLocationsto = data.data;
        if (this.cityLocationsto.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_cityto'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_cityto'].setValue('');
        }
      });
  }
  searchTerminal(form: any, acction: any) {
    this.terminalLocations = [];
    this.travelManagementService.gettransportTerminals(form.id_city).
      subscribe((data: any) => {
        this.terminalLocations = data.data;
        if (this.terminalLocations.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_terminal'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_terminal'].setValue('');
        }
      });
  }
  searchTerminalto(form: any, acction: any) {
    this.terminalLocationsto = [];
    this.travelManagementService.gettransportTerminals(form.id_cityto).
      subscribe((data: any) => {
        this.terminalLocationsto = data.data;
        if (this.terminalLocationsto.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_terminalto'].setValue('-1');
          }

        } else {
          this.formTravelManagement.controls['id_terminalto'].setValue('');
        }
      });
  }
  searchHotel(form: any, acction: any) {
    this.hotels = [];
    this.hotelsService.getshowHotels(form.id_cityto).
      subscribe((data: any) => {
        this.hotels = data.data;
        if (this.hotels.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_hotels'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_hotels'].setValue('');
        }
      });
  }

  clearFormGeneral() {
    this.stateLocations = [];
    this.stateLocationsto = [];
    this.cityLocations = [];
    this.cityLocationsto = [];
    this.terminalLocations = [];
    this.terminalLocationsto = [];
    this.hotels = [];
    this.objectImg = [];

    this.formTravelManagement = new FormGroup({});
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
      id_hotels: '',
    });

  }

  clearFormPartial() {
    this.stateLocations = [];
    this.stateLocationsto = [];
    this.cityLocations = [];
    this.cityLocationsto = [];
    this.terminalLocations = [];
    this.terminalLocationsto = [];
    this.hotels = [];

    this.formTravelManagement.controls['id_city'].setValue('');
    this.formTravelManagement.controls['id_country'].setValue('-1');
    this.formTravelManagement.controls['id_state'].setValue('');
    this.formTravelManagement.controls['id_terminal'].setValue('');
    this.formTravelManagement.controls['date_begin'].setValue('');
    this.formTravelManagement.controls['hour_begin'].setValue('');
    this.formTravelManagement.controls['hour_end'].setValue('');
    this.formTravelManagement.controls['date_end'].setValue('');
    this.formTravelManagement.controls['id_terminalto'].setValue('');
    this.formTravelManagement.controls['id_cityto'].setValue('');
    this.formTravelManagement.controls['id_stateto'].setValue('');
    this.formTravelManagement.controls['id_countryto'].setValue('-1');
    this.formTravelManagement.controls['id_hotels'].setValue('');
  }



}
