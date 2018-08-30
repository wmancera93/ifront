import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Http, ResponseContentType } from '@angular/http';
import { Travel, Travel_managements } from '../../../../models/common/travels_management/travel/travel';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { element } from 'protractor';

@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.css']
})
export class EditTravelComponent implements OnInit {

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public showPdf: boolean = false;
  public showSizeTable: boolean = false;
  public planningTravel: any[] = [];
  public travel_types: any[] = [];
  public transport_types: any[] = [];
  public legal_travels: any[] = [];
  public trips_specific: any[] = [];
  public trips_activities: any[] = [];
  public costs_travels: any[] = [];
  public center_costs_travels: any[] = [];
  public countries: any[] = [];
  public countriesto: any[] = [];
  public cityLocations: any[] = [];
  public cityLocationsto: any[] = [];
  public stateLocations: any[] = [];
  public stateLocationsto: any[] = [];
  public terminalLocations: any[] = [];
  public terminalLocationsto: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  public send: boolean = false;
  public hotels: any[] = [];
  public formTravelManagement: any;
  public formTravelManagementedit: any;
  public formTravelManagementEditQuery: any;
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
  public ticket: string = "";
  public ticketDestinations: string = "";
  public objectPrint: Travel_managements = null;
  public generalViajes: Travel = null;
  public edit: boolean = true;
  public split_begin: any[] = [];
  public split_end: any[] = [];
  public idFile: number;
  public count: number = 0;
  public traverlsDestination: any[] = [];
  public file: any[] = [];
  public destination_is_edit: boolean = false;
  public id_destinations: number = 0;
  public dayResult: number;
  public dayResultE: number;
  public activate: boolean = false;
  public activate_submit: boolean = true;
  public alertWarning: any[] = [];
  public id_destination_delete: string = '';
  public showMilenage: boolean = false;
  public acctionDeleteTable: string = '';
  public validateDateHeader: any[] = [];
  public travels_wrong: any[] = [];



  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService: HotelsService, private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService, public travelsService: TravelsService,
    public http: Http, public formDataService: FormDataService,
    public alert: AlertsService) {

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueEditTravelRequests' || data === 'continueEditDestinationRequests' || data === 'continueEditDestinationRequestsValidateDates') {
        document.getElementById("btn_travel_edit").click();

      }

      if (data === 'continueEditDestinationRequestsValidateDates') {
        this.activate = false;
      }

      if (data === 'deleteDocumentSaved') {
        this.activate_submit = true;
        document.getElementById("btn_travel_edit").click();
        this.travelManagementService.deleteFile(this.idFile.toString(), this.ticket)
          .subscribe((data: any) => {
            this.generalViajes[0].travel_request_annexeds.splice(this.generalViajes[0].travel_request_annexeds.findIndex(filter => filter.id === this.idFile), 1);
          })
        document.getElementById("btn_travel_edit").click();
      }

      if (data === 'deleteDestinations') {
        this.activate_submit = true;
        if (this.acctionDeleteTable === 'deleteTravelManagement') {

          this.travelManagementService.deleteTravelByDestination(this.ticketDestinations, this.ticket).
            subscribe((resultDestination: any) => {
              this.generalViajes[0].travel_managements.data.splice(this.generalViajes[0].travel_managements.data.findIndex(filter => filter.field_0 === this.id_destination_delete), 1);
              this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destination_delete), 1);
              this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });

              document.getElementById("btn_travel_edit").click();

            })
        } else {
          this.generalViajes[0].travel_managements.data.splice(this.generalViajes[0].travel_managements.data.findIndex(filter => filter.field_0 === this.id_destination_delete), 1);
          this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destination_delete), 1);
          this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
          document.getElementById("btn_travel_edit").click();
        }

      }

      if (data === 'closeAlertdeleteDestinations') {
        document.getElementById("btn_travel_edit").click();
        this.activate_submit = true;
      }

      if (data === 'closeAlertdeleteDocumentSaved') {
        document.getElementById("btn_travel_edit").click();
        document.getElementById("btn_travel_edit").click();
        this.activate_submit = true;
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
      date_requests_begin: '',
      date_requests_end: '',
      trip_text: '',
      maintenance: '',
      id_center_travel: '',
      id_travel_costs: '',
      id_travel_legal: '',
      id_travel_specific: '',
      id_travel_activities: '',
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
      travel_mileage: '',
    });

    this.travelsService.getEditTravels().subscribe((data) => {
      this.ticket = data;
      this.activate = false;
      if (document.getElementById('travel_edit').className !== 'modal show') {
        document.getElementById("btn_travel_edit").click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      if (data) {
        this.clearFormGeneral();
        if (this.bnew || this.bedit) {
          document.getElementById("edit_funtionTravel").click();
          this.bnew = false;
          this.bedit = false;
        }
      }


      this.travelManagementService.getTravelRequestsByid(this.ticket, this.edit).subscribe((result: any) => {
        if (result.success) {
          this.generalViajes = result.data;
    
          this.objectPrint = this.generalViajes[0].travel_managements;
          this.formTravelManagement = new FormGroup({});
          this.formTravelManagement = fb.group({
            id_travel: this.generalViajes[0].travel_request.travel_type_id,
            date_requests_begin: this.generalViajes[0].travel_request.date_begin,
            date_requests_end: this.generalViajes[0].travel_request.date_end,
            trip_text: this.generalViajes[0].travel_request.observation,
            maintenance: this.generalViajes[0].travel_request.is_maintenance,
            id_center_travel: this.generalViajes[0].travel_request.travel_costs_type_id,
            id_travel_costs: this.generalViajes[0].travel_request.travel_cost_id,
            id_travel_legal: this.generalViajes[0].travel_request.legal_travels_type_id,
            id_travel_specific: this.generalViajes[0].travel_request.specific_types_trip_id,
            id_travel_activities: this.generalViajes[0].travel_request.travel_activity_id,
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
            travel_mileage: '',
          });
          setTimeout(() => {
            this.searchCostsCenter(this.formTravelManagement.value, '')
            this.objectReport.emit({ success: true, data: [this.objectPrint] });
          }, 50);
        }

      });

    })

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {

      this.ticketDestinations = data.id;

      if ((data.action_method === "updateTravelManagement")) {
        this.activate_submit = false;
        if (!this.bedit) {
          if (!this.bnew) {
            document.getElementById("edit_funtionTravel").click();

            setTimeout(() => {
              document.getElementById('travel_edit').scrollTo(0, 1300);
            }, 300);

            this.bedit = true;
          } else {
            this.bnew = false
            this.bedit = true;
          }
        }

        if ((this.bedit === true)) {
          this.travelManagementService.getDestinationsById(this.ticketDestinations, this.ticket).subscribe((resutlDestinations: any) => {

            this.split_begin = resutlDestinations.data.ori_datetime.split(' ');
            this.split_end = resutlDestinations.data.destino_datetime.split(' ');
            this.id_destinations = resutlDestinations.data.id
            if (resutlDestinations.data.total_mileage !== '') {
              this.showMilenage = true;
            } else {
              this.showMilenage = false;
            }
            this.formTravelManagementedit = {
              id_travel: this.generalViajes[0].travel_request.travel_type_id,
              date_requests_begin: this.generalViajes[0].travel_request.date_begin,
              date_requests_end: this.generalViajes[0].travel_request.date_end,
              trip_text: this.generalViajes[0].travel_request.observation,
              maintenance: this.generalViajes[0].travel_request.is_maintenance,
              id_center_travel: this.generalViajes[0].travel_request.travel_costs_type_id,
              id_travel_costs: this.generalViajes[0].travel_request.travel_cost_id,
              id_travel_legal: this.generalViajes[0].travel_request.legal_travels_type_id,
              id_travel_specific: this.generalViajes[0].travel_request.specific_types_trip_id,
              id_travel_activities: this.generalViajes[0].travel_request.travel_activity_id,
              id_transport: resutlDestinations.data.type_transport_id,
              id_city: resutlDestinations.data.origin_geographic_location_id,
              id_country: resutlDestinations.data.origin_country,
              id_state: resutlDestinations.data.origin_state,
              id_terminal: resutlDestinations.data.origin_transport_terminal_id,
              date_begin: this.split_begin[0],
              hour_begin: this.split_begin[1],
              hour_end: this.split_end[1],
              date_end: this.split_end[0],
              id_terminalto: resutlDestinations.data.destination_transport_terminal_id,
              id_cityto: resutlDestinations.data.destination_geographic_location_id,
              id_stateto: resutlDestinations.data.destination_state,
              id_countryto: resutlDestinations.data.destination_country,
              id_hotels: resutlDestinations.data.hotel_id,
              travel_mileage: resutlDestinations.data.total_mileage,
            };

          })
          setTimeout(() => {
            this.editTravels(this.formTravelManagementedit);
          }, 500);

          this.destination_is_edit = true;
        }
      }
      if ((data.action_method === "deleteTravelManagement")) {
        document.getElementById("btn_travel_edit").click();
        this.deleteDestinations(data)
      }
      if ((data.action_method === "deleteTravels")) {
        document.getElementById("btn_travel_edit").click();
        this.deleteDestinations(data)
      }
      this.acctionDeleteTable = data.action_method;
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
        this.legal_travels = data.data.legal_travels_types;
        this.trips_specific = data.data.specific_types_trips;
        this.trips_activities = data.data.travel_activities;
        this.center_costs_travels = data.data.travel_costs_types;

      })
  }
  deleteUpload(param: any) {
    this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === param.file.name), 1);

  }
  deleteUploadSaved(param: any) {
    this.idFile = param.id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el archivo #' + this.idFile.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteDocumentSaved'
    }];
    this.alert.setAlert(this.alertWarning[0]);

  }
  deleteDestinations(param: any) {
    this.id_destination_delete = param.id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el destino con ticket #' + this.id_destination_delete.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteDestinations'
    }];
    this.alert.setAlert(this.alertWarning[0]);
  }
  newEditTravel(model) {
    this.showSubmit = false;
    this.send = true;

    const modelFromdata = new FormData();
    modelFromdata.append('travel_request_type_id', '1');
    modelFromdata.append('is_maintenance', model.maintenance);
    modelFromdata.append('date_begin', model.date_requests_begin);
    modelFromdata.append('date_end', model.date_requests_end);
    modelFromdata.append('travel_types', model.id_travel);
    modelFromdata.append('observation', model.trip_text);
    modelFromdata.append('legal_travels_type_id', model.id_travel_legal);
    modelFromdata.append('specific_types_trip_id', model.id_travel_specific);
    modelFromdata.append('travel_activity_id', model.id_travel_activities);
    modelFromdata.append('travel_cost_id', model.id_travel_costs);
    modelFromdata.append('travels', JSON.stringify(this.traverlsDestination));
    modelFromdata.append('files_length', this.objectImg.length.toString())
    for (let index = 0; index < this.objectImg.length; index++) {
      modelFromdata.append('files_' + (index + 1).toString(), this.file[index]);
    }
    model = modelFromdata;

    this.formDataService.putEditTravelsFormData(this.ticket, model)
      .subscribe(
        (data: any) => {
          if (data.success) {
            document.getElementById("close_edit_travel").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Viaje modificado correctamente', confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelsService.setResultSaved(true);
          }
        },
        (error: any) => {
          document.getElementById("close_edit_travel").click();
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la edición de su solicitud de viaje?', confirmation: true, typeConfirmation: 'continueEditTravelRequests' }];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);
        }
      )


  }
  addDestination(modelPartial) {
    
    this.activate_submit = true;
    this.activate = true;
    let hotell=this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString()).length>0 ?  this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString())[0].name : '';
    this.generalViajes[0].travel_managements.data.push({
      field_0: 'temp_' + this.count + 1,
      field_1: this.transport_types.filter((data) => data.id.toString() === modelPartial.id_transport.toString())[0].name,
      field_2: this.cityLocations.filter((data) => data.id.toString() === modelPartial.id_city.toString())[0].name,
      field_3: this.terminalLocations.filter((data) => data.id.toString() === modelPartial.id_terminal.toString())[0].name,
      field_4: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      field_5: this.cityLocationsto.filter((data) => data.id.toString() === modelPartial.id_cityto.toString())[0].name,
      field_6: this.terminalLocationsto.filter((data) => data.id.toString() === modelPartial.id_terminalto.toString())[0].name,
      field_7: modelPartial.date_end + ' ' + modelPartial.hour_end,
      field_8: hotell,
      field_9: modelPartial.travel_mileage,
      // field_10: {
      //   type_method: "UPDATE",
      //   type_element: "button",
      //   icon: "fa-pencil",
      //   id: 'temp_' + this.count + 1,
      //   title: "Editar",
      //   action_method: "updateTravelManagement",
      //   disable: false
      // },
      field_11: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: 'temp_' + this.count + 1,
        title: "Eliminar",
        action_method: "deleteTravels",
        disable: false
      }
    })

    this.traverlsDestination.push({
      travel_id: 'temp_' + this.count + 1,
      transport_id: modelPartial.id_transport,
      total_mileage: modelPartial.travel_mileage,
      origin_location_id: modelPartial.id_city,
      origin_terminal_id: modelPartial.id_terminal,
      hotel_id: modelPartial.id_hotels,
      destination_location_id: modelPartial.id_cityto,
      destination_terminal_id: modelPartial.id_terminalto,
      origin_datetime: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end
    });

    this.count += 1
    this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
    this.closeTrip();
    document.getElementById("edit_funtionTravel").click();
  }
  editDestination(modelEditPartial) {
    
    this.activate_submit = true;
    this.activate = true;
    let hotell=this.hotels.filter((data) => data.id.toString() === modelEditPartial.id_hotels.toString()).length>0 ?  this.hotels.filter((data) => data.id.toString() === modelEditPartial.id_hotels.toString())[0].name : '';
    this.generalViajes[0].travel_managements.data.forEach(element => {
      if (element.field_0.toString() === this.id_destinations.toString()) {
        element.field_1 = this.transport_types.filter((data) => data.id.toString() === modelEditPartial.id_transport.toString())[0].name;
        element.field_2 = this.cityLocations.filter((data) => data.id.toString() === modelEditPartial.id_city.toString())[0].name;
        element.field_3 = this.terminalLocations.filter((data) => data.id.toString() === modelEditPartial.id_terminal.toString())[0].name;
        element.field_4 = modelEditPartial.date_begin + ' ' + modelEditPartial.hour_begin;
        element.field_5 = this.cityLocationsto.filter((data) => data.id.toString() === modelEditPartial.id_cityto.toString())[0].name;
        element.field_6 = this.terminalLocationsto.filter((data) => data.id.toString() === modelEditPartial.id_terminalto.toString())[0].name;
        element.field_7 = modelEditPartial.date_end + ' ' + modelEditPartial.hour_end;
        element.field_8 = hotell;
        element.field_9 = modelEditPartial.travel_mileage;
        element.field_11 = {
          type_method: "DELETE",
          type_element: "button",
          icon: "fa-trash",
          id: 'temp_' + this.count + 1,
          title: "Eliminar",
          action_method: "deleteTravels",
          disable: false};
      }
    });

    this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destinations), 1);

    this.traverlsDestination.push({
      id: this.id_destinations,
      travel_id: this.id_destinations,
      transport_id: modelEditPartial.id_transport,
      total_mileage: modelEditPartial.travel_mileage,
      origin_location_id: modelEditPartial.id_city,
      origin_terminal_id: modelEditPartial.id_terminal,
      hotel_id: modelEditPartial.id_hotels,
      destination_location_id: modelEditPartial.id_cityto,
      destination_terminal_id: modelEditPartial.id_terminalto,
      origin_datetime: modelEditPartial.date_begin + ' ' + modelEditPartial.hour_begin,
      destination_datetime: modelEditPartial.date_end + ' ' + modelEditPartial.hour_end
    });

    setTimeout(() => {
      this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
    }, 100);

    this.closeTrip();
    document.getElementById("edit_funtionTravel").click();
    this.id_destinations = 0;
  }
  editTravels(param: any) {

    if (param !== undefined) {

      this.formTravelManagement = new FormGroup({});
      this.formTravelManagement = this.fb.group({
        id_travel: param.id_travel,
        date_requests_begin: param.date_requests_begin,
        date_requests_end: param.date_requests_end,
        trip_text: param.trip_text,
        maintenance: param.maintenance,
        id_center_travel: param.id_center_travel,
        id_travel_costs: param.id_travel_costs,
        id_travel_legal: param.id_travel_legal,
        id_travel_specific: param.id_travel_specific,
        id_travel_activities: param.id_travel_activities,
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
        travel_mileage: param.travel_mileage,
      });
      this.searchState(param, 'edit');
      this.searchStateto(param, 'edit');
      this.searchCity(param, 'edit');
      this.searchCityto(param, 'edit');
      this.searchTerminal(param, 'edit');
      this.searchTerminalto(param, 'edit');
      this.searchHotel(param, 'edit');
      this.searchCostsCenter(param, 'edit');
    }

  }
  colapseEdit() {
    this.activate_submit = false;
    this.showMilenage = false;
    if (!this.bnew) {
      this.bnew = true
    } else {
      this.bnew = false
    }
    document.getElementById("edit_funtionTravel").click();

    setTimeout(() => {
      document.getElementById('travel_edit').scrollTo(0, 1500);
    }, 200);
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
    this.activate_submit = true;
    this.clearFormPartial();
  }
  mileageTravel(param) {

    if (param.id_transport == 2) {
      this.showMilenage = true;
    } else {
      this.showMilenage = false;
    }

  }
  searchState(form: any, acction: any) {
    this.cityLocations = [];
    this.terminalLocations = [];
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
    this.cityLocationsto = [];
    this.terminalLocationsto = [];
    this.hotels = [];

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
    this.terminalLocations = [];
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
    this.terminalLocationsto = [];
    this.hotels = [];
    this.cityLocationsto = [];
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
            this.formTravelManagement.controls['id_hotels'].setValue('');
          }
        } else {
          this.formTravelManagement.controls['id_hotels'].setValue('');
        }
      });
  }
  searchCostsCenter(form: any, acction: any) {

    this.travelManagementService.getTravelsCosts(form.id_center_travel).
      subscribe((data: any) => {
        this.costs_travels = data.data;
        if (this.costs_travels.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_travel_costs'].setValue('');
        }
      })
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
      date_requests_begin: '',
      date_requests_end: '',
      trip_text: '',
      maintenance: '',
      id_center_travel: '',
      id_travel_costs: '',
      id_travel_legal: '',
      id_travel_specific: '',
      id_travel_activities: '',
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
      travel_mileage: '',
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

    this.formTravelManagement.controls['id_transport'].setValue('1');
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
  viewCotization(param) {
    window.open(param.file.url)
  }
  downloadCotization(param: any) {

    this.http.get(param.file.url, {
      responseType: ResponseContentType.Blob
    }).map(res => {
      return {
        filename: param.name,
        data: res.blob()
      };
    })
      .subscribe(res => {
        var url = window.URL.createObjectURL(res.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }
  dateComplete(days) {
    
    if (days.date_requests_begin !== '' && days.date_requests_end !== '') {
      let dateBeginCalculate = days.date_requests_begin.toString().replace('-', '').replace('-', '');
      let dateEndCalculate = days.date_requests_end.toString().replace('-', '').replace('-', '');

      if ((dateEndCalculate - dateBeginCalculate) < 0) {
        document.getElementById("btn_travel_edit").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La fecha de inicio general de solicitud del viaje no puede ser mayor a la de finalizacion de la solicitud',
          confirmation: true,
          typeConfirmation: 'continueEditDestinationRequestsValidateDates'

        }];
        this.alert.setAlert(alertDataWrong[0]);

      } else {
        if ((days.date_begin !== '') || (days.date_end !== '')) {
          if ((days.date_begin !== '')) {
            if ((days.date_requests_begin > days.date_begin)) {

              document.getElementById("btn_travel_edit").click();

              const alertDataWrong: Alerts[] = [{
                type: 'danger',
                title: 'Error',
                message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje',
                confirmation: true,
                typeConfirmation: 'continueEditDestinationRequests'

              }];
              this.alert.setAlert(alertDataWrong[0]);
            } else {
              if (this.generalViajes[0].travel_managements.data.length > 0) {
                document.getElementById("btn_travel_edit").click();

                this.validateDateTrayectOrigin(days);
                this.validateDateTrayectEnd(days);

                setTimeout(() => {
                  if (this.travels_wrong.length > 0) {
                    document.getElementById("btn_travel_edit").click();
                    const alertDataWrong: Alerts[] = [{
                      type: 'danger',
                      title: 'Error',
                      message: 'La fecha de los trayectos' + ' ' + this.travels_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje',
                      confirmation: true,
                      typeConfirmation: 'continueEditDestinationRequests'

                    }];
                    this.alert.setAlert(alertDataWrong[0]);
                  }
                }, 500);
              } else {
                this.activate = true;
              }
            }
          } else {
            if ((days.date_end !== '')) {
              if ((days.date_requests_end < days.date_end)) {

                document.getElementById("btn_travel_edit").click();

                const alertDataWrong: Alerts[] = [{
                  type: 'danger',
                  title: 'Error',
                  message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje',
                  confirmation: true,
                  typeConfirmation: 'continueEditDestinationRequests'

                }];
                this.alert.setAlert(alertDataWrong[0]);
              } else {
                if (this.generalViajes[0].travel_managements.data.length > 0) {
                  document.getElementById("btn_travel_edit").click();

                  this.validateDateTrayectOrigin(days);
                  this.validateDateTrayectEnd(days);
                  setTimeout(() => {
                    if (this.travels_wrong.length > 0) {
                      document.getElementById("btn_travel_edit").click();
                      const alertDataWrong: Alerts[] = [{
                        type: 'danger',
                        title: 'Error',
                        message: 'La fecha de los trayectos' + ' ' + this.travels_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje',
                        confirmation: true,
                        typeConfirmation: 'continueEditDestinationRequests'

                      }];
                      this.alert.setAlert(alertDataWrong[0]);
                    }
                  }, 500);
                } else {
                  this.activate = true;
                }
              }
            }
          }
        } else {
          if (this.generalViajes[0].travel_managements.data.length > 0) {
            this.validateDateHeader = [];
            this.travels_wrong = [];

            this.validateDateTrayectOrigin(days);
            this.validateDateTrayectEnd(days);
            setTimeout(() => {
              if (this.travels_wrong.length > 0) {
                document.getElementById("btn_travel_edit").click();
                const alertDataWrong: Alerts[] = [{
                  type: 'danger',
                  title: 'Error',
                  message: 'La fecha de los trayectos' + ' ' + this.travels_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje',
                  confirmation: true,
                  typeConfirmation: 'continueEditDestinationRequests'

                }];
                this.alert.setAlert(alertDataWrong[0]);
              }
            }, 500);
          } else {
            this.activate = true;
          }
        }

      }
    }
    else {
      this.activate = false;
    }

  }
  dateValidateTrayect(dateTrayect) {
    let dateBeginRequestCalculate = dateTrayect.date_requests_begin.toString().replace('-', '').replace('-', '');
    let dateEndRequestCalculate = dateTrayect.date_requests_end.toString().replace('-', '').replace('-', '');

    if (dateTrayect.date_begin !== '') {
      let date = dateTrayect.date_begin.toString().replace('-', '').replace('-', '');
      if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
        this.formTravelManagement.controls['date_begin'].setValue('');
        document.getElementById("btn_travel_edit").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La fecha de origen del trayecto no se encuentra en el rango de fecha de la solicitud general',
          confirmation: true,
          typeConfirmation: 'continueEditDestinationRequests'
        }];
        this.alert.setAlert(alertDataWrong[0])
      }
    }

    if (dateTrayect.date_end !== '') {
      let date = dateTrayect.date_end.toString().replace('-', '').replace('-', '');
      if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
        this.formTravelManagement.controls['date_end'].setValue('');
        document.getElementById("btn_travel_edit").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La fecha de finalizacion del trayecto no se encuentra en el rango de fecha de la solicitud general',
          confirmation: true,
          typeConfirmation: 'continueEditDestinationRequests'
        }];
        this.alert.setAlert(alertDataWrong[0])
      }
    }

    if (dateTrayect.date_begin !== '' && dateTrayect.date_end !== '') {
      let dateBeginCalculate = dateTrayect.date_begin.toString().replace('-', '').replace('-', '');
      let dateEndCalculate = dateTrayect.date_end.toString().replace('-', '').replace('-', '');

      if ((dateEndCalculate - dateBeginCalculate) < 0) {
        this.formTravelManagement.controls['date_begin'].setValue('');
        this.formTravelManagement.controls['date_end'].setValue('');
        document.getElementById("btn_travel_edit").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La fecha de origen del trayecto no puede ser mayor a la de destino.',
          confirmation: true,
          typeConfirmation: 'continueEditDestinationRequests'
        }];
        this.alert.setAlert(alertDataWrong[0])
      }
    }
  }
  hourValidationsEdit(hourTrayect) {
    
    if (hourTrayect.date_begin === hourTrayect.date_end) {
      let hourBeginTrayect = hourTrayect.hour_begin.toString().replace(':', '');
      let hourEndTrayect = hourTrayect.hour_end.toString().replace(':', '');

      if (hourEndTrayect - hourBeginTrayect <= 0) {
        this.formTravelManagement.controls['hour_begin'].setValue('');
        this.formTravelManagement.controls['hour_end'].setValue('');
        document.getElementById("btn_travel_edit").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'El trayecto se realizara el mismo día, la hora de llegada no puede ser menor a la de partida',
          confirmation: true,
          typeConfirmation: 'continueEditDestinationRequests'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      }

    }

  }
  validateDateTrayectOrigin(days) {
    
    this.validateDateHeader = [];
    this.generalViajes[0].travel_managements.data.forEach(element => {
      
      if (days.date_requests_begin > element.field_4.split(' ')[0]) {
        this.validateDateHeader.push({
          id_travel_wrong: element.field_0
        });
      }
    });

    for (let index = 0; index < this.validateDateHeader.length; index++) {
      const element = this.validateDateHeader[index].id_travel_wrong.toString();
      this.travels_wrong.push(element);
    }
  }
  validateDateTrayectEnd(days) {
    
    this.validateDateHeader = [];

    this.generalViajes[0].travel_managements.data.forEach(element => {
      
      if (days.date_requests_end < element.field_7.split(' ')[0]) {
        this.validateDateHeader.push({
          id_travel_wrong: element.field_0
        });
      }
    });

    for (let index = 0; index < this.validateDateHeader.length; index++) {
      const element = this.validateDateHeader[index].id_travel_wrong.toString();
      this.travels_wrong.push(element);
    }
  }
}
