import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { Alert } from '../../../../../../node_modules/@types/selenium-webdriver';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

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
  public file: any[] = [];



  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService: HotelsService, private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService, public travelsService: TravelsService, public formDataService: FormDataService,
    public alert: AlertsService) {

    this.travelProof = [{
      success: true,
      data: [{ data: [] }]
    }];
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueTravelRequests') {
        document.getElementById("btn_travel_new").click();
      }
    })

    this.fileUploadService.getObjetFile().subscribe((data) => {
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
        setTimeout(() => {
          this.iconUpload = data.name.split('.');
          this.iconDocument = this.iconUpload[this.iconUpload.length - 1];
          this.is_upload = true;
          this.file.push(data);
          this.objectImg.push({ file: data, extension: this.iconDocument });

        }, 200);
      }, 1000);
    });

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

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === 'deleteTravels') {
        this.deleteDestinations(data);
      }
    });

    this.travelsService.getNewTravels().subscribe((data: any) => {
      if (document.getElementById('travel_new').className !== 'modal show') {
        document.getElementById("btn_travel_new").click();
        if (data) {
          this.clearFormGeneral();
          if (this.bnew || this.bedit) {
            document.getElementById("funtionTravel").click();
            this.bnew = false;
            this.bedit = false;
          }
        }


        document.getElementById('bodyGeneral').removeAttribute('style');
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
    this.file.splice(this.file.findIndex(filter => filter.file.name === param.file.name), 1);
  }
  deleteDestinations(param: any) {
    this.travelProof[0].data[0].data.splice(this.travelProof[0].data[0].data.findIndex(filter => filter.field_0 === param.id), 1);
    this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === param.id), 1);
    this.objectReport.emit(this.travelProof[0]);
  }

  newTravel(model) {
    this.showSubmit = false;
    this.send = true;


    const modelFromdata = new FormData();
    modelFromdata.append('travel_request_type_id', '1');
    modelFromdata.append('travel_types', model.id_travel);
    modelFromdata.append('observation', model.trip_text);
    modelFromdata.append('travels', JSON.stringify(this.traverlsDestination));
    modelFromdata.append('files_length', this.objectImg.length.toString())
    for (let index = 0; index < this.objectImg.length; index++) {
      modelFromdata.append('files_' + (index + 1).toString(), this.file[index]);
    }
    model = modelFromdata;

    this.formDataService.postNewTravel(model)
      .subscribe(
        (data: any) => {
          if (data.success) {
            document.getElementById("closeTravels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Viaje generado correctamente', confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.travelsService.setResultSaved(true);
          }
        },
        (error: any) => {
          document.getElementById("closeTravels").click();
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con su solicitud de viaje?', confirmation: true, typeConfirmation: 'continueTravelRequests' }];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);
        }
      )



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
      field_7: modelPartial.date_end + ' ' + modelPartial.hour_end,
      field_8: this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString())[0].name,
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

    this.traverlsDestination.push({
      travel_id: this.count + 1,
      transport_id: modelPartial.id_transport,
      origin_location_id: modelPartial.id_city,
      origin_terminal_id: modelPartial.id_terminal,
      hotel_id: modelPartial.id_hotels,
      destination_location_id: modelPartial.id_cityto,
      destination_terminal_id: modelPartial.id_terminalto,
      origin_datetime: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end
    });

    this.count += 1

    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 500);
    
    this.closeTrip();

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
    document.getElementById("funtionTravel").click();
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
    this.showSubmit = true;
    this.stateLocations = [];
    this.stateLocationsto = [];
    this.cityLocations = [];
    this.cityLocationsto = [];
    this.terminalLocations = [];
    this.terminalLocationsto = [];
    this.hotels = [];
    this.objectImg = [];
    this.travelProof = [];
    this.travelProof.push({
      success: true,
      data: [{
        title: "Viajes solicitados. Laura Beltran silvina",
        title_table: "Viajes solicitados. Laura Beltran silvina",
        labels: {
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
    }, 100);

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
