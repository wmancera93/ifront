import { Component, OnInit, Output, EventEmitter, Directive, HostListener, OnDestroy } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { Http, ResponseContentType } from '@angular/http';
import { Travel, Travel_managements } from '../../../../models/common/travels_management/travel/travel';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { User } from '../../../../models/general/user';
import { EmployeeService } from '../../../../services/common/employee/employee.service';

@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.css']
})
export class EditTravelComponent implements OnInit, OnDestroy {

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
  public editEditTrip: any[] = [];
  public grahp: any[] = [];
  public operations: any[] = [];

  public searchByLetter: string;
  public nameEmployee: string = '';
  public searchEmployee: any[] = [];
  public showListAutoC: boolean = false;
  public eployee_selected: any = null;
  public eployee_selected_current: any = null;
  public userAuthenticated: User = null;

  public kostl: boolean = false;
  public nplnr: boolean = false;

  public viewSendAprovals: boolean = true;

  public countAfter: number = 0;

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService: HotelsService, private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService, public travelsService: TravelsService,
    public http: Http, public formDataService: FormDataService,
    public alert: AlertsService, public employeeService: EmployeeService, public router: Router) {

    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'goSpendsEditTravel') {
        let url = window.location.href;
        let travel = url.split('/')[url.split('/').length - 1];
        let spend = url.split('/')[url.split('/').length - 2];
        this.router.navigate(['/ihr/spend', travel, spend, 'travel']);
      }
      if (data === 'continueEditTravelRequests' || data === 'continueEditDestinationRequests' || data === 'continueEditDestinationRequestsValidateDates' || data === 'sendApprobalAlert') {
        document.getElementById("btn_travel_edit").click();
      }

      if (data === 'closeAlertcontinueEditDestinationRequestsValidateDates' || data === 'closeAlertcontinueEditTravelRequests' || data === 'closeAlertcontinueEditDestinationRequests') {
        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:auto');
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
              setTimeout(() => {
                this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
              }, 1000);

              document.getElementById("btn_travel_edit").click();

            })
        } else {
          this.generalViajes[0].travel_managements.data.splice(this.generalViajes[0].travel_managements.data.findIndex(filter => filter.field_0 === this.id_destination_delete), 1);
          this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destination_delete), 1);
          setTimeout(() => {
            this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
          }, 1000);

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
      type_travel: '',
      date_requests_begin: '',
      date_requests_end: '',
      trip_text: '',
      maintenance: '',
      id_element_imputation: '',
      id_travel_costs: '',
      id_grahp: '',
      id_operations: '',
      id_travel_legal: '',
      id_travel_specific: '',
      id_travel_activities: '',
      id_transport: '',
      id_city: '',
      id_country: '',
      id_state: '',
      id_terminal: '',
      date_begin: '',
      hour_begin: '',
      hour_end: '',
      date_end: '',
      id_terminalto: '',
      id_cityto: '',
      id_stateto: '',
      id_countryto: '',
      id_hotels: '',
      date_hotel_in: '',
      date_hotel_out: '',
      travel_mileage: '',
    });

    this.travelsService.getEditTravels().subscribe((data) => {
      if (this.countAfter === 0) {
        this.ticket = data.id_travel;
        this.viewSendAprovals = data.send_travel;
        this.travelManagementService.getplanningTravelRequests().
          subscribe((tavelManagement: any) => {
            this.planningTravel = tavelManagement;

            this.travel_types = this.sortByAphabet(tavelManagement.data.travel_types);
            this.transport_types = this.sortByAphabet(tavelManagement.data.transport_types);
            this.countries = this.sortByAphabet(tavelManagement.data.countries);
            this.countriesto = this.sortByAphabet(tavelManagement.data.countries);
            this.legal_travels = this.sortByAphabet(tavelManagement.data.legal_travels_types);
            this.trips_specific = this.sortByAphabet(tavelManagement.data.specific_types_trips);
            this.trips_activities = this.sortByAphabet(tavelManagement.data.travel_activities);
            this.center_costs_travels = this.sortByAphabet(tavelManagement.data.travel_costs_types);
            this.costs_travels = [];

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

            if (this.center_costs_travels[0].travel_cost_type_code === "KOSTL") {
              this.kostl = true;
              this.nplnr = false;
            } else {
              this.kostl = false;
              this.nplnr = true;
            }

            this.travelManagementService.getTravelRequestsByid(this.ticket, this.edit).subscribe((result: any) => {
              if (result.success) {
                this.generalViajes = result.data;

                this.objectPrint = this.generalViajes[0].travel_managements;
                this.formTravelManagement = new FormGroup({});
                this.formTravelManagement = fb.group({
                  type_travel: this.generalViajes[0].travel_request.travel_type_id,
                  date_requests_begin: this.generalViajes[0].travel_request.date_begin,
                  date_requests_end: this.generalViajes[0].travel_request.date_end,
                  trip_text: this.generalViajes[0].travel_request.observation,
                  maintenance: this.generalViajes[0].travel_request.is_maintenance,
                  id_element_imputation: this.generalViajes[0].travel_request.travel_costs_type_id,
                  id_grahp: this.generalViajes[0].travel_request.travel_graph_code,
                  id_operations: this.generalViajes[0].travel_request.travel_operation_id,
                  id_travel_costs: this.generalViajes[0].travel_request.travel_cost_id,
                  id_travel_legal: this.generalViajes[0].travel_request.legal_travels_type_id,
                  id_travel_specific: this.generalViajes[0].travel_request.specific_types_trip_id,
                  id_travel_activities: this.generalViajes[0].travel_request.travel_activity_id,
                  id_transport: '',
                  id_city: '',
                  id_country: '',
                  id_state: '',
                  id_terminal: '',
                  date_begin: '',
                  hour_begin: '',
                  hour_end: '',
                  date_end: '',
                  id_terminalto: '',
                  id_cityto: '',
                  id_stateto: '',
                  id_countryto: '',
                  id_hotels: '',
                  date_hotel_in: '',
                  date_hotel_out: '',
                  travel_mileage: '',
                });

                if (result.data[0].travel_request.employee_applicant_to_json !== null) {
                  this.eployee_selected_current = {
                    id: result.data[0].travel_request.employee_applicant_to_json.personal_code,
                    image: result.data[0].travel_request.employee_applicant_to_json.image,
                    name_complete: result.data[0].travel_request.employee_applicant_to_json.short_name,
                    posicion: result.data[0].travel_request.employee_applicant_to_json.position
                  }
                } else {
                  this.eployee_selected_current = null;
                }

                setTimeout(() => {
                  this.searchCostsCenterAndGrahp(this.formTravelManagement.value, '')
                  this.objectReport.emit({ success: true, data: [this.objectPrint] });
                  if (this.generalViajes[0].travel_request.travel_graph_code !== null) {
                    this.searchOperationsGrahp(this.formTravelManagement.value, '')
                  }
                }, 1000);

              }

            });
          });
      }
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      this.ticketDestinations = data.id;

      if ((data.action_method === "updateTravelManagement")) {
        debugger
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
            debugger
            this.split_begin = resutlDestinations.data.ori_datetime.split(' ');
            this.split_end = resutlDestinations.data.destino_datetime.split(' ');
            this.id_destinations = resutlDestinations.data.id
            if (resutlDestinations.data.total_mileage !== '') {
              this.showMilenage = true;
            } else {
              this.showMilenage = false;
            }
            this.formTravelManagementedit = {
              type_travel: this.generalViajes[0].travel_request.travel_type_id,
              date_requests_begin: this.generalViajes[0].travel_request.date_begin,
              date_requests_end: this.generalViajes[0].travel_request.date_end,
              trip_text: this.generalViajes[0].travel_request.observation,
              maintenance: this.generalViajes[0].travel_request.is_maintenance,
              id_element_imputation: this.generalViajes[0].travel_request.travel_costs_type_id,
              id_grahp: this.generalViajes[0].travel_request.travel_graph_code,
              id_operations: this.generalViajes[0].travel_request.travel_operation_id,
              id_travel_costs: this.generalViajes[0].travel_request.travel_cost_id,
              id_travel_legal: this.generalViajes[0].travel_request.legal_travels_type_id,
              id_travel_specific: this.generalViajes[0].travel_request.specific_types_trip_id,
              id_travel_activities: this.generalViajes[0].travel_request.travel_activity_id,
              id_transport: resutlDestinations.data.travel_transport_id,
              id_city: resutlDestinations.data.origin_location_text,
              id_country: resutlDestinations.data.origin_country,
              id_state: resutlDestinations.data.origin_state,
              id_terminal: resutlDestinations.data.origin_transport_terminal_id,
              date_begin: this.split_begin[0],
              hour_begin: this.split_begin[1],
              hour_end: this.split_end[1],
              date_end: this.split_end[0],
              id_terminalto: resutlDestinations.data.destination_transport_terminal_id,
              id_cityto: resutlDestinations.data.destination_location_text,
              id_stateto: resutlDestinations.data.destination_state,
              id_countryto: resutlDestinations.data.destination_country,
              id_hotels: resutlDestinations.data.hotel_id,
              date_hotel_in: resutlDestinations.data.hotel_date_begin,
              date_hotel_out: resutlDestinations.data.hotel_date_end,
              travel_mileage: resutlDestinations.data.total_mileage,
            };

          })
          setTimeout(() => {
            this.editTravels(this.formTravelManagementedit);
          }, 1000);

          this.destination_is_edit = true;
        }
      }

      if ((data.action_method === "updateTrayectManagement")) {
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

          let object: any = this.editEditTrip.filter((result) => result.id_travel.toString() === data.id.toString())

          this.editTravels(object[0]);
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

  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

  enterNameEmployee() {
    this.nameEmployee = this.searchByLetter;
    if (this.nameEmployee !== null) {
      this.employeeService.getEmployeeTravelsById(this.nameEmployee)
        .subscribe((data: any) => {
          if (data.data.length > 0) {
            this.searchEmployee = data.data;
            this.showListAutoC = true;
          } else {
            this.searchEmployee = [];
            this.showListAutoC = true;
          }
        })
    }

  }

  returnObjectSearch(ObjectSearch: any) {
    this.eployee_selected = ObjectSearch;
    this.searchByLetter = null;
    this.searchEmployee = [];
  }

  deleteEmployeeThird() {
    this.eployee_selected = null;
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function (a, b) {
      const nameA: String = a.name.toLowerCase();
      const nameB: String = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });

    return dataBySort;
  }

  delete(date_param) {

    switch (date_param) {
      case 'date_begin_header':
        this.formTravelManagement.controls['date_requests_begin'].setValue(this.generalViajes[0].travel_request.date_begin);
        break;
      case 'date_end_header':
        this.formTravelManagement.controls['date_requests_end'].setValue(this.generalViajes[0].travel_request.date_end);
        break;
      case 'date_begin_body':
        this.formTravelManagement.controls['date_begin'].setValue('');
        break;
      case 'date_end_body':
        this.formTravelManagement.controls['date_end'].setValue('');
        break;
      case 'hour_begin':
        this.formTravelManagement.controls['hour_begin'].setValue('');
        break;
      case 'hour_end':
        this.formTravelManagement.controls['hour_end'].setValue('');
        break;

      default:
        break;
    }
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
    document.getElementById("btn_travel_edit").click();
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
    modelFromdata.append('travel_types', model.type_travel);
    modelFromdata.append('is_maintenance', model.maintenance == '' ? 'false' : 'true');
    modelFromdata.append('legal_travels_type_id', model.id_travel_legal == '-1' ? '' : model.id_travel_legal);
    modelFromdata.append('specific_types_trip_id', model.id_travel_specific == '-1' ? '' : model.id_travel_specific);
    modelFromdata.append('travel_activity_id', model.id_travel_activities == '-1' ? '' : model.id_travel_activities);
    modelFromdata.append('travel_cost_id', model.id_travel_costs == '-1' ? '' : model.id_travel_costs);
    modelFromdata.append('date_begin', model.date_requests_begin == '-1' ? '' : model.date_requests_begin);
    modelFromdata.append('date_end', model.date_requests_end == '-1' ? '' : model.date_requests_end);
    modelFromdata.append('observation', model.trip_text);
    modelFromdata.append('travel_graph_id', model.id_grahp);
    modelFromdata.append('travel_operation_id', model.id_operations);
    modelFromdata.append('employee_id', this.eployee_selected == null ? '' : this.eployee_selected.id.toString());
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
            if (this.viewSendAprovals) {
              const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Viaje modificado correctamente', confirmation: false }];
              this.alert.setAlert(alertWarning[0]);
              this.showSubmit = true;
              this.travelsService.setResultSaved(true);
            } else {
              const alertWarning: Alerts[] = [{
                type: 'success',
                title: 'Solicitud Exitosa',
                message: 'Viaje modificado correctamente - ¿Desea volver a la solicitud de gasto?',
                confirmation: true,
                typeConfirmation: 'goSpendsEditTravel'
              }];
              this.alert.setAlert(alertWarning[0]);
              this.showSubmit = true;
              this.travelsService.setResultSaved(true);
            }

          }
        },
        (error: any) => {
          if (this.viewSendAprovals) {
            document.getElementById("close_edit_travel").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la edición de su solicitud de viaje?', confirmation: true, typeConfirmation: 'continueEditTravelRequests' }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
          } else {
            document.getElementById("close_edit_travel").click();
            const alertWarning: Alerts[] = [{
              type: 'danger',
              title: 'Solicitud Denegada',
              message: error.json().errors.toString() + ' - ¿Desea volver a la solicitud de gasto?',
              confirmation: true,
              typeConfirmation: 'goSpendsEditTravel'
            }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
          }
        }
      )

  }
  addDestination(modelPartial) {

    modelPartial.id_travel = 'temp_' + this.count + 1;
    this.activate_submit = true;
    this.activate = true;
    this.editEditTrip.push(modelPartial);
    let hotell = this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString()).length > 0 ? this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString())[0].name : '';
    this.generalViajes[0].travel_managements.data.push({
      field_0: modelPartial.id_travel,
      field_1: modelPartial.id_transport.toString() !== '' ? this.transport_types.filter((data) => data.id.toString() === modelPartial.id_transport.toString())[0].name : '',
      field_2: modelPartial.id_city,
      field_3: this.terminalLocations.filter((data) => data.id.toString() === modelPartial.id_terminal.toString())[0].name,
      field_4: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      field_5: modelPartial.id_cityto,
      field_6: this.terminalLocationsto.filter((data) => data.id.toString() === modelPartial.id_terminalto.toString())[0].name,
      field_7: modelPartial.date_end + ' ' + modelPartial.hour_end,
      field_8: hotell,
      field_9: modelPartial.date_hotel_in,
      field_10: modelPartial.date_hotel_out,
      field_11: modelPartial.travel_mileage,
      field_12: {
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: modelPartial.id_travel,
        title: "Editar",
        action_method: "updateTrayectManagement",
        disable: false
      },
      field_13: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: modelPartial.id_travel,
        title: "Eliminar",
        action_method: "deleteTravels",
        disable: false
      }
    })

    this.traverlsDestination.push({
      travel_id: modelPartial.id_travel,
      transport_id: modelPartial.id_transport,
      total_mileage: modelPartial.travel_mileage,
      origin_location_id: modelPartial.id_state,
      origin_location_text: modelPartial.id_city,
      origin_terminal_id: modelPartial.id_terminal,
      hotel_id: modelPartial.id_hotels,
      destination_location_id: modelPartial.id_stateto,
      destination_location_text: modelPartial.id_cityto,
      destination_terminal_id: modelPartial.id_terminalto,
      origin_datetime: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end,
      hotel_date_begin: modelPartial.date_hotel_in,
      hotel_date_end: modelPartial.date_hotel_out,
    });

    this.count += 1
    setTimeout(() => {
      this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
    }, 1000);

    this.closeTrip();
    document.getElementById("edit_funtionTravel").click();
  }
  editDestination(modelEditPartial) {

    this.activate_submit = true;
    this.activate = true;
    let hotell = this.hotels.filter((data) => data.id.toString() === modelEditPartial.id_hotels.toString()).length > 0 ? this.hotels.filter((data) => data.id.toString() === modelEditPartial.id_hotels.toString())[0].name : '';
    this.generalViajes[0].travel_managements.data.forEach(element => {
      if (element.field_0.toString() === this.id_destinations.toString()) {
        element.field_1 = modelEditPartial.id_transport.toString() !== '' ? this.transport_types.filter((data) => data.id.toString() === modelEditPartial.id_transport.toString())[0].name : '',
        element.field_2 = modelEditPartial.id_city,
        element.field_3 = this.terminalLocations.filter((data) => data.id.toString() === modelEditPartial.id_terminal.toString())[0].name;
        element.field_4 = modelEditPartial.date_begin + ' ' + modelEditPartial.hour_begin;
        element.field_5 = modelEditPartial.id_cityto,
        element.field_6 = this.terminalLocationsto.filter((data) => data.id.toString() === modelEditPartial.id_terminalto.toString())[0].name;
        element.field_7 = modelEditPartial.date_end + ' ' + modelEditPartial.hour_end;
        element.field_8 = hotell;
        element.field_9 = modelEditPartial.date_hotel_in,
        element.field_10 = modelEditPartial.date_hotel_out,
        element.field_11 = modelEditPartial.travel_mileage;
        element.field_12 = {
          type_method: "UPDATE",
          type_element: "button",
          icon: "fa-pencil",
          id: this.id_destinations,
          title: "Editar",
          action_method: "updateTrayectManagement",
          disable: false
        },
          element.field_13 = {
            type_method: "DELETE",
            type_element: "button",
            icon: "fa-trash",
            id: this.id_destinations,
            title: "Eliminar",
            action_method: "deleteTravels",
            disable: false
          };
      }
    });

    this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destinations), 1);

    this.traverlsDestination.push({
      id: this.id_destinations,
      travel_id: this.id_destinations,
      transport_id: modelEditPartial.id_transport,
      total_mileage: modelEditPartial.travel_mileage,
      origin_location_id: modelEditPartial.id_state,
      origin_location_text: modelEditPartial.id_city,
      origin_terminal_id: modelEditPartial.id_terminal,
      hotel_id: modelEditPartial.id_hotels,
      destination_location_id: modelEditPartial.id_stateto,
      destination_location_text: modelEditPartial.id_cityto,
      destination_terminal_id: modelEditPartial.id_terminalto,
      origin_datetime: modelEditPartial.date_begin + ' ' + modelEditPartial.hour_begin,
      destination_datetime: modelEditPartial.date_end + ' ' + modelEditPartial.hour_end,
      hotel_date_begin: modelEditPartial.date_hotel_in,
      hotel_date_end: modelEditPartial.date_hotel_out,
    });

    setTimeout(() => {
      this.objectReport.emit({ success: true, data: [this.generalViajes[0].travel_managements] });
    }, 1500);

    this.closeTrip();
    document.getElementById("edit_funtionTravel").click();
    this.id_destinations = 0;
  }
  editTravels(param: any) {
    debugger
    if (param !== undefined) {

      this.formTravelManagement = new FormGroup({});
      this.formTravelManagement = this.fb.group({
        type_travel: param.type_travel,
        date_requests_begin: param.date_requests_begin,
        date_requests_end: param.date_requests_end,
        trip_text: param.trip_text,
        maintenance: param.maintenance,
        id_center_travel: param.id_center_travel,
        id_element_imputation: param.id_element_imputation,
        id_travel_costs: param.id_travel_costs,
        id_grahp: param.id_grahp,
        id_operations: param.id_operations,
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
        date_hotel_in: param.date_hotel_in,
        date_hotel_out:param.date_hotel_out,
        travel_mileage: param.travel_mileage,
      });
      this.searchState(param, 'edit');
      this.searchStateto(param, 'edit');
      this.searchTerminal(param, 'edit');
      this.searchTerminalto(param, 'edit');
      this.searchHotel(param, 'edit');
      this.searchCostsCenterAndGrahp(param, 'edit');

      if (param.id_grahp !== null) {
        this.searchOperationsGrahp(param, 'edit');
      }
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

    if (this.transport_types.filter((data) => data.id.toString() === param.id_transport.toString())[0].cttype == 'T') {
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
    this.searchTerminal(form, 'edit');
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
    this.searchTerminalto(form, 'edit');
    this.searchHotel(form, 'edit');
  }

  searchTerminal(form: any, acction: any) {
    this.terminalLocations = [];
    this.travelManagementService.gettransportTerminals(form.id_country).
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
    this.travelManagementService.gettransportTerminals(form.id_countryto).
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
    this.hotelsService.getshowHotels(form.id_countryto).
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
  searchCostsCenterAndGrahp(form: any, acction: any) {

    if (this.center_costs_travels.filter((data) => data.id.toString() === form.id_element_imputation.toString())[0].code === 'KOSTL') {
      this.kostl = true;
      this.nplnr = false;

      this.travelManagementService.getTravelsCosts(form.id_element_imputation).
        subscribe((data: any) => {
          this.costs_travels = this.sortByAphabet(data.data);
          if (this.costs_travels.length > 0) {
            if (acction === 'new') {
              this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
            }
          } else {
            this.formTravelManagement.controls['id_travel_costs'].setValue('');
          }
        })

    } else {
      this.kostl = false;
    }
    if (this.center_costs_travels.filter((data) => data.id.toString() === form.id_element_imputation.toString())[0].code === 'NPLNR') {
      this.kostl = false;
      this.nplnr = true;
      this.travelManagementService.getTravelsGrahp(form.id_element_imputation).
        subscribe((data: any) => {
          this.grahp = this.sortByAphabet(data.data);
          if (this.grahp.length > 0) {
            if (acction === 'new') {
              this.formTravelManagement.controls['id_grahp'].setValue('-1');
            }
          } else {
            this.formTravelManagement.controls['id_grahp'].setValue('');
          }
        })
    } else {
      this.nplnr = false;
    }

  }

  searchOperationsGrahp(form: any, acction: any) {
    this.travelManagementService.getTravelsOperations(form.id_grahp).
      subscribe((data: any) => {
        this.operations = data.data;
        if (this.operations.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_operations'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_operations'].setValue('');
        }
      });
  }

  // changeTypeTravel(param) {
  //   if (this.travel_types.filter(data => data.id.toString() === param.id_travel)[0].code.toString() === '03') {
  //     this.formTravelManagement.controls['id_travel_legal'].setValue(this.legal_travels.filter(data => data.code === 'P')[0].id.toString());
  //     this.changeTravelLegal('P');

  //   }

  // }

  // changeTravelLegal(travelLegal: any) {
  //   if (travelLegal === 'P') {
  //     this.formTravelManagement.controls['id_element_imputation'].setValue(this.center_costs_travels.filter(data => data.code === 'NPLNR')[0].id.toString());

  //     this.kostl = false;
  //     this.nplnr = true;
  //     this.travelManagementService.getTravelsGrahp(this.center_costs_travels.filter(data => data.code === 'NPLNR')[0].id.toString()).
  //       subscribe((data: any) => {
  //         this.grahp = this.sortByAphabet(data.data);
  //       });
  //   }
  // }

  clearFormGeneral() {
    this.activate = false;
    this.activate_submit = true;
    this.showSubmit = true;
    this.stateLocations = [];
    this.stateLocationsto = [];
    this.cityLocations = [];
    this.cityLocationsto = [];
    this.terminalLocations = [];
    this.terminalLocationsto = [];
    this.hotels = [];
    this.objectImg = [];
    this.costs_travels = [];

    this.formTravelManagement = new FormGroup({});
    this.formTravelManagement = this.fb.group({
      type_travel: '',
      date_requests_begin: '',
      date_requests_end: '',
      trip_text: '',
      maintenance: '',
      id_center_travel: '',
      id_travel_costs: '',
      id_travel_legal: '',
      id_travel_specific: '',
      id_travel_activities: '',
      id_transport: '',
      id_city: '',
      id_country: '',
      id_state: '',
      id_terminal: '',
      date_begin: '',
      hour_begin: '',
      hour_end: '',
      date_end: '',
      id_terminalto: '',
      id_cityto: '',
      id_stateto: '',
      id_countryto: '',
      id_hotels: '',
      date_hotel_in: '',
      date_hotel_out: '',
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

    this.formTravelManagement.controls['type_travel'].setValue('');
    this.formTravelManagement.controls['id_transport'].setValue('');
    this.formTravelManagement.controls['id_city'].setValue('');
    this.formTravelManagement.controls['id_country'].setValue('');
    this.formTravelManagement.controls['id_state'].setValue('');
    this.formTravelManagement.controls['id_terminal'].setValue('');
    this.formTravelManagement.controls['date_begin'].setValue('');
    this.formTravelManagement.controls['hour_begin'].setValue('');
    this.formTravelManagement.controls['hour_end'].setValue('');
    this.formTravelManagement.controls['date_end'].setValue('');
    this.formTravelManagement.controls['id_terminalto'].setValue('');
    this.formTravelManagement.controls['id_cityto'].setValue('');
    this.formTravelManagement.controls['id_stateto'].setValue('');
    this.formTravelManagement.controls['id_countryto'].setValue('');
    this.formTravelManagement.controls['id_hotels'].setValue('');
    this.formTravelManagement.controls['date_hotel_in'].setValue('');
    this.formTravelManagement.controls['date_hotel_out'].setValue('');
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

      this.travelManagementService.validateDatesTravelRequests(dateBeginCalculate, dateEndCalculate, '0')
        .subscribe(data => {
          if ((dateEndCalculate - dateBeginCalculate) < 0 && data) {
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
        }, error => {
          this.formTravelManagement.controls['date_requests_begin'].setValue(this.generalViajes[0].travel_request.date_begin);
          this.formTravelManagement.controls['date_requests_end'].setValue(this.generalViajes[0].travel_request.date_end);

          document.getElementById("btn_travel_edit").click();
          const alertDataWrong: Alerts[] = [{
            type: 'danger',
            title: 'Error',
            message: error.json().errors.toString() + ', modifiquela para continuar. ¿Desea continuar con la solicitud?',
            confirmation: true,
            typeConfirmation: 'continueEditDestinationRequestsValidateDates'
          }];
          this.alert.setAlert(alertDataWrong[0])
        });


    }
    else {
      this.activate = false;
    }
  }
  dateValidateTrayect(dateTrayect) {
    setTimeout(() => {
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
    }, 100);

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

  dateValidateHotelEdit(daysHotel) {

    let dateEndRequestCalculate = daysHotel.date_requests_end.toString().replace('-', '').replace('-', '');
    let dateEndTrayectCalculate = daysHotel.date_end.toString().replace('-', '').replace('-', '');
    let dateInHotelCalculate = daysHotel.date_hotel_in.toString().replace('-', '').replace('-', '');
    let dateOutHotelCalculate = daysHotel.date_hotel_out.toString().replace('-', '').replace('-', '');

    if (dateEndTrayectCalculate !== '') {
      if ((dateInHotelCalculate !== '') && (dateInHotelCalculate < dateEndTrayectCalculate )){
        this.formTravelManagement.controls['date_hotel_in'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'El ingreso al hotel no puede ser menor a la fecha de llegada del destino, ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationHotel'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      };
      if ((dateInHotelCalculate !== '') && (dateInHotelCalculate > dateEndRequestCalculate)){
        this.formTravelManagement.controls['date_hotel_in'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'El ingreso al hotel no puede ser mayor a la fecha de final de la solicitud, ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationHotel'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      }
      if(dateOutHotelCalculate !== ''){
        if( dateInHotelCalculate > dateOutHotelCalculate){
          this.formTravelManagement.controls['date_hotel_in'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'El ingreso al hotel no puede ser mayor a la fecha de salida del hotel, ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationHotel'

        }];
        this.alert.setAlert(alertDataWrong[0]);
        }
      }
    }

    if(dateOutHotelCalculate !== ''){
      if((dateOutHotelCalculate < dateEndTrayectCalculate)){
        this.formTravelManagement.controls['date_hotel_out'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La salida del hotel no puede ser menor a la fecha de llegada al destino, ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationHotel'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      };
      if((dateOutHotelCalculate > dateEndRequestCalculate)){
        this.formTravelManagement.controls['date_hotel_out'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La salida del hotel no puede superar la fecha de finalizacion de la solicitud, ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationHotel'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      }
      if((dateInHotelCalculate !== '') && (dateOutHotelCalculate < dateInHotelCalculate)){
        this.formTravelManagement.controls['date_hotel_out'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La salida del hotel no puede ser menor a la fecha de ingreso al hotel, ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationHotel'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      }
    }
  }


  sedRequestsTravel() {

    this.travelManagementService.putSendRequestsTravels(this.ticket).subscribe((data: any) => {
      if (data) {
        document.getElementById("btn_travel_edit").click();
        const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud de viajes enviada a primer aprobador', confirmation: false, typeConfirmation: 'sendApprobalAlert' }];
        this.alert.setAlert(alertWarning[0]);
      }
      this.travelsService.setResultSaved({ success: true, third: this.eployee_selected == null ? true : false });
    },
      (error: any) => {
        document.getElementById("btn_travel_edit").click();
        const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString(), confirmation: false, typeConfirmation: 'sendApprobalAlert' }];
        this.alert.setAlert(alertWarning[0]);

      });

  }
}

