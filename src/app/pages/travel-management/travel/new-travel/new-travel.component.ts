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
import { DebugContext } from '@angular/core/src/view';
import { debug } from 'util';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TagModelClass } from 'ngx-chips/core/accessor';
import { EmployeeService } from '../../../../services/common/employee/employee.service';
import { User } from '../../../../models/general/user';

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
  public activate: boolean = false;
  public activate_submit: boolean = true;
  public showMilenage: boolean = false;
  public disabledDatesHeader: boolean = false;
  public deleteDocumenFile: string;
  public deleteDestination: string;
  public validateDateHeader: any[] = [];
  public array_wrong: any[] = [];
  public ticket_advance: number;
  public editTrip: any[] = [];
  public prueba: any[] = [];
  public grahp: any[] = [];
  public operations: any[] = [];
  public idGrahpTravel: string = '';

  public searchByLetter: string;
  public nameEmployee: string = '';
  public searchEmployee: any[] = [];
  public showListAutoC: boolean = false;
  public eployee_selected: any = null;
  public userAuthenticated: User = null;

  public kostl: boolean = false;
  public nplnr: boolean = false;
  public today: any;

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService, private fb: FormBuilder,
    public hotelsService: HotelsService, private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService, public travelsService: TravelsService, public formDataService: FormDataService,
    public alert: AlertsService, public advanceSharedService: AdvanceSharedService
    , public router: Router, public employeeService: EmployeeService) {

    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));

    this.travelProof = [{
      success: true,
      data: [{ data: [] }]
    }];
    this.alert.getActionConfirm().subscribe((data: any) => {

      if (data === 'continueTravelAlowances') {
        this.router.navigate(['/ihr/spend', this.ticket_advance]);
      }

      if (data === 'continueTravelAdvances') {
        this.router.navigate(['/ihr/advances', this.ticket_advance]);
      }

      if (data === 'continueTravelRequests' || data === 'continueDestinationRequests' || data === 'continueDestinationRequestsValidateDates') {
        document.getElementById("btn_travel_new").click();
      }

      if (data === 'continueDestinationRequestsValidateDates') {
        this.activate_submit = true;
        this.activate = false;
        this.bnew = false;
        this.traverlsDestination = [];

      }
      if (data === 'deleteNewDocumentSaved') {

        this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === this.deleteDocumenFile), 1);
        this.file.splice(this.file.findIndex(filter => filter.name === this.deleteDocumenFile), 1);
        document.getElementById("btn_travel_new").click();
      }
      if (data === 'deleteNewDestinations') {
        document.getElementById("btn_travel_new").click();
        this.travelProof[0].data[0].data.splice(this.travelProof[0].data[0].data.findIndex(filter => filter.field_0 === this.deleteDestination), 1);
        this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === this.deleteDestination), 1);
        setTimeout(() => {
          this.objectReport.emit(this.travelProof[0]);
        }, 1000);
        this.activate_submit = true;
      }

      if (data === 'closeAlertdeleteNewDocument' || data === 'closeAlertdeleteNewDestinations') {

        document.getElementById("btn_travel_new").click();
        this.activate_submit = true;
      }
      if (data === 'closeAlertcontinueDestinationRequestsValidateDates' || data === 'closeAlertcontinueTravelRequests' || data === 'closeAlertcontinueDestinationRequests' || data === 'closeAlertcontinueTravelAdvances') {
        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:auto');
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
      travel_mileage: '',
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {

      if (data.action_method === 'deleteNewTravels') {
        this.deleteDestinations(data);
      }
      if (data.action_method === 'editNewTravel') {

        this.activate_submit = false;
        if (!this.bedit) {
          if (!this.bnew) {
            document.getElementById("funtionTravel").click();

            setTimeout(() => {
              document.getElementById('travel_new').scrollTo(0, 1300);
            }, 300);

            this.bedit = true;
          } else {
            this.bnew = false
            this.bedit = true;
          }
        }

        if ((this.bedit === true)) {

          let object: any = this.editTrip.filter((result) => result.id_travel.toString() === data.id.toString())

          this.formTravelManagement = new FormGroup({});
          this.formTravelManagement = this.fb.group({

            type_travel: object[0].type_travel,
            date_requests_begin: object[0].date_requests_begin,
            date_requests_end: object[0].date_requests_end,
            trip_text: object[0].trip_text,
            maintenance: object[0].maintenance,
            id_element_imputation: object[0].id_element_imputation,
            id_travel_costs: object[0].id_travel_costs,
            id_grahp: object[0].id_grahp,
            id_operations: object[0].id_operations,
            id_travel_legal: object[0].id_travel_legal,
            id_travel_specific: object[0].id_travel_specific,
            id_travel_activities: object[0].id_travel_activities,
            id_transport: object[0].id_transport,
            id_city: object[0].id_city,
            id_country: object[0].id_country,
            id_state: object[0].id_state,
            id_terminal: object[0].id_terminal,
            date_begin: object[0].date_begin,
            hour_begin: object[0].hour_begin,
            hour_end: object[0].hour_end,
            date_end: object[0].date_end,
            id_terminalto: object[0].id_terminalto,
            id_cityto: object[0].id_cityto,
            id_stateto: object[0].id_stateto,
            id_countryto: object[0].id_countryto,
            id_hotels: object[0].id_hotels,
            travel_mileage: object[0].travel_mileage,
          });
          this.searchState(this.formTravelManagement.value, 'edit');
          this.searchStateto(this.formTravelManagement.value, 'edit');
          this.searchTerminal(this.formTravelManagement.value, 'edit');
          this.searchTerminalto(this.formTravelManagement.value, 'edit');
          this.searchHotel(this.formTravelManagement.value, 'edit');
          this.searchCostsCenterAndGrahp(this.formTravelManagement.value, 'edit');
          this.searchOperationsGrahp(this.formTravelManagement.value, 'edit');
        }
      }
    });

    this.travelsService.getNewTravels().subscribe((data: any) => {

      if (document.getElementById('travel_new').className !== 'modal show') {
        this.eployee_selected = null;
        document.getElementById("btn_travel_new").click();
        if (data) {
          this.clearFormGeneral();
          if (this.bnew) {
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
        this.travel_types = this.sortByAphabet(data.data.travel_types);
        this.transport_types = this.sortByAphabet(data.data.transport_types);
        this.countries = this.sortByAphabet(data.data.countries);
        this.countriesto = this.sortByAphabet(data.data.countries);
        this.legal_travels = this.sortByAphabet(data.data.legal_travels_types);
        this.trips_specific = this.sortByAphabet(data.data.specific_types_trips);
        this.trips_activities = this.sortByAphabet(data.data.travel_activities);
        this.center_costs_travels = this.sortByAphabet(data.data.travel_costs_types);
        this.costs_travels = [];
      })

    let fecha = new Date();
    this.today = fecha.getFullYear().toString() + (fecha.getMonth() + 1).toString() + fecha.getDate().toString();

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

  delete(date_param) {
    switch (date_param) {
      case 'date_begin_header':
        this.formTravelManagement.controls['date_requests_begin'].setValue('');
        break;
      case 'date_end_header':
        this.formTravelManagement.controls['date_requests_end'].setValue('');
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

  deleteUpload(param: any) {
    document.getElementById("btn_travel_new").click();
    this.deleteDocumenFile = param.file.name;
    let alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el archivo ' + param.file.name.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteNewDocumentSaved'
    }];
    this.alert.setAlert(alertWarning[0]);

  }
  deleteDestinations(param: any) {
    document.getElementById("btn_travel_new").click();
    this.deleteDestination = param.id;
    let alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el destino con ticket #' + this.deleteDestination.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteNewDestinations'
    }];
    this.alert.setAlert(alertWarning[0]);
  }

  newTravel(model) {
    this.showSubmit = false;
    this.send = true;

    const modelFromdata = new FormData();
    modelFromdata.append('travel_types', model.type_travel);
    modelFromdata.append('is_maintenance', model.maintenance == '' ? 'false' : 'true');
    modelFromdata.append('legal_travels_type_id', model.id_travel_legal);
    modelFromdata.append('specific_types_trip_id', model.id_travel_specific);
    modelFromdata.append('travel_activity_id', model.id_travel_activities);
    modelFromdata.append('travel_cost_id', model.id_travel_costs);
    modelFromdata.append('date_begin', model.date_requests_begin);
    modelFromdata.append('date_end', model.date_requests_end);
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

    this.formDataService.postNewTravel(model)
      .subscribe(
        (data: any) => {
          let validate = parseInt(data.data[0].travel_request.date_end.replace('-', '').replace('-', '')) - this.today;
          this.ticket_advance = data.data[0].travel_request.ticket;
          if (validate > 0) {
            if (data.success) {

              document.getElementById("closeTravels").click();
              const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Viaje generado correctamente. ¿Desea crear una solicitud de anticipos para el viaje #' + this.ticket_advance + ' ?', confirmation: true, typeConfirmation: 'continueTravelAdvances' }];
              this.alert.setAlert(alertWarning[0]);
              this.showSubmit = true;
              this.travelsService.setResultSaved({ success: true, third: this.eployee_selected == null ? false : true });
              this.eployee_selected = null;
            }
          } else {
            if (data.success) {

              document.getElementById("closeTravels").click();
              const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Viaje generado correctamente. ¿Desea crear una solicitud de gastos para el viaje #' + this.ticket_advance + ' ?', confirmation: true, typeConfirmation: 'continueTravelAlowances' }];
              this.alert.setAlert(alertWarning[0]);
              this.showSubmit = true;
              this.travelsService.setResultSaved({ success: true, third: this.eployee_selected == null ? false : true });
              this.eployee_selected = null;
            }
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
    modelPartial.id_travel = this.count + 1;
    this.editTrip.push(modelPartial);
    this.activate_submit = true;
    let hotell = this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString()).length > 0 ? this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString())[0].name : '';
    this.travelProof[0].data[0].data.push({
      field_0: modelPartial.id_travel,
      field_1: modelPartial.id_transport.toString() !== '' ? this.transport_types.filter((data) => data.id.toString() === modelPartial.id_transport.toString())[0].name : '',
      field_2: modelPartial.id_city,
      field_3: this.terminalLocations.filter((data) => data.id.toString() === modelPartial.id_terminal.toString())[0].name,
      field_4: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      field_5: modelPartial.id_cityto,
      field_6: this.terminalLocationsto.filter((data) => data.id.toString() === modelPartial.id_terminalto.toString())[0].name,
      field_7: modelPartial.date_end + ' ' + modelPartial.hour_end,
      field_8: hotell,
      field_9: modelPartial.travel_mileage,
      field_10: {
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: modelPartial.id_travel,
        title: "Editar",
        action_method: "editNewTravel",
        disable: false
      },
      field_11: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: modelPartial.id_travel,
        title: "Eliminar",
        action_method: "deleteNewTravels",
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
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end
    });

    this.count += 1

    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 1500);

    this.closeTrip();
    this.activate_submit = true;
  }

  addDestinationEdit(modelEditPartial) {
    this.travelProof[0].data[0].data.splice(this.travelProof[0].data[0].data.findIndex(filter => filter.field_0 === modelEditPartial.id_travel), 1);
    this.traverlsDestination.splice(this.traverlsDestination.findIndex(filter => filter.travel_id === modelEditPartial.id_travel), 1);
    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 1000);

    this.addDestination(modelEditPartial);

  }
  colapseNew() {
    this.activate_submit = false;
    this.showMilenage = false;
    if (!this.bnew) {
      this.bnew = true
    } else {
      this.bnew = false
    }
    document.getElementById("funtionTravel").click();

    setTimeout(() => {
      document.getElementById('travel_new').scrollTo(0, 1000);
    }, 200);

  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }
  closeTrip() {
    this.is_collapse = false;
    this.showSubmit = true;
    this.activate_submit = true;
    this.bnew = false;
    this.bedit = false;
    this.send = false;
    document.getElementById("funtionTravel").click();
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
              this.formTravelManagement.controls['id_grahp'].setValue('');
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
        this.operations = this.sortByAphabet(data.data);
        if (this.operations.length > 0) {
          if (acction === 'new') {
            this.formTravelManagement.controls['id_operations'].setValue('-1');
          }
        } else {
          this.formTravelManagement.controls['id_operations'].setValue('');
        }
      })
  }
  changeTypeTravel(param) {
    if (param.type_travel === '27') {
      this.formTravelManagement.controls['id_travel_legal'].setValue(this.legal_travels.filter(data => data.code === 'P')[0].id.toString());
      this.changeTravelLegal('P');
    } else {
      this.changeTravelLegal('');

    }

  }

  changeTravelLegal(travelLegal: any) {
    if (travelLegal === 'P') {
      this.formTravelManagement.controls['id_element_imputation'].setValue(this.center_costs_travels.filter(data => data.code === 'NPLNR')[0].id.toString());
      this.kostl = false;
      this.nplnr = true;
      this.travelManagementService.getTravelsGrahp(this.center_costs_travels.filter(data => data.code === 'NPLNR')[0].id.toString()).
        subscribe((data: any) => {
          this.grahp = this.sortByAphabet(data.data);
        });
    } else {
      this.formTravelManagement.controls['id_element_imputation'].setValue(this.center_costs_travels.filter(data => data.code === 'KOSTL')[0].id.toString());
      this.kostl = true;
      this.nplnr = false;

      this.travelManagementService.getTravelsCosts(this.center_costs_travels.filter(data => data.code === 'KOSTL')[0].id.toString()).
        subscribe((data: any) => {
          this.costs_travels = this.sortByAphabet(data.data);
        })
    }
  }
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
    this.travelProof = [];
    this.traverlsDestination = [];
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
          field_9: {
            value: "Kilometraje",
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
        ]
      }]

    });
    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 1000);

    this.formTravelManagement = new FormGroup({});
    this.formTravelManagement = this.fb.group({
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
      travel_mileage: '',
    });

  }
  dateComplete(days) {
    if (days.date_requests_begin !== '' && days.date_requests_end !== '') {

      let dateBeginCalculate = days.date_requests_begin.toString().replace('-', '').replace('-', '');
      let dateEndCalculate = days.date_requests_end.toString().replace('-', '').replace('-', '');

      if ((dateEndCalculate - dateBeginCalculate) < 0) {

        this.formTravelManagement.controls['date_requests_begin'].setValue('');
        this.formTravelManagement.controls['date_requests_end'].setValue('');

        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La fecha de inicio general de solicitud del viaje no puede ser mayor a la de finalizacion de la solicitud ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationRequestsValidateDates'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      } else {
        if ((days.date_begin !== '') || (days.date_end !== '')) {
          if ((days.date_begin !== '')) {
            if ((days.date_requests_begin > days.date_begin)) {
              document.getElementById("btn_travel_new").click();
              const alertDataWrong: Alerts[] = [{
                type: 'danger',
                title: 'Error',
                message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje ¿Desea continuar con la solicitud?',
                confirmation: true,
                typeConfirmation: 'continueDestinationRequests'

              }];
              this.alert.setAlert(alertDataWrong[0]);
            } else {
              if (this.travelProof[0].data[0].data.length > 0) {
                document.getElementById("btn_travel_new").click();

                this.dateBeginValidate(days);
                this.dateEndValidate(days);
                setTimeout(() => {
                  if (this.array_wrong.length > 0) {
                    document.getElementById("btn_travel_new").click();
                    const alertDataWrong: Alerts[] = [{
                      type: 'danger',
                      title: 'Error',
                      message: 'La fecha de los trayectos' + ' ' + this.array_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje ¿Desea continuar con la solicitud?',
                      confirmation: true,
                      typeConfirmation: 'continueDestinationRequests'

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
                document.getElementById("btn_travel_new").click();
                const alertDataWrong: Alerts[] = [{
                  type: 'danger',
                  title: 'Error',
                  message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje ¿Desea continuar con la solicitud?',
                  confirmation: true,
                  typeConfirmation: 'continueDestinationRequests'

                }];
                this.alert.setAlert(alertDataWrong[0]);
              } else {
                if (this.travelProof[0].data[0].data.length > 0) {
                  document.getElementById("btn_travel_new").click();

                  this.dateBeginValidate(days);
                  this.dateEndValidate(days);
                  setTimeout(() => {
                    if (this.array_wrong.length > 0) {

                      document.getElementById("btn_travel_new").click();
                      const alertDataWrong: Alerts[] = [{
                        type: 'danger',
                        title: 'Error',
                        message: 'La fecha de los trayectos' + ' ' + this.array_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje ¿Desea continuar con la solicitud?',
                        confirmation: true,
                        typeConfirmation: 'continueDestinationRequests'

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
          if (this.travelProof[0].data[0].data.length > 0) {
            this.validateDateHeader = [];
            this.array_wrong = [];

            this.dateBeginValidate(days);
            this.dateEndValidate(days);
            setTimeout(() => {
              if (this.array_wrong.length > 0) {
                document.getElementById("btn_travel_new").click();
                const alertDataWrong: Alerts[] = [{
                  type: 'danger',
                  title: 'Error',
                  message: 'La fecha de los trayectos' + ' ' + this.array_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje ¿Desea continuar con la solicitud?',
                  confirmation: true,
                  typeConfirmation: 'continueDestinationRequests'

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

    if (dateTrayect.date_begin !== '' && dateTrayect.date_end !== '') {
      let dateBeginCalculate = dateTrayect.date_begin.toString().replace('-', '').replace('-', '');
      let dateEndCalculate = dateTrayect.date_end.toString().replace('-', '').replace('-', '');

      if ((dateEndCalculate - dateBeginCalculate) < 0) {
        this.formTravelManagement.controls['date_begin'].setValue('');
        this.formTravelManagement.controls['date_end'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'La fecha de origen del trayecto no puede ser mayor a la de destino. ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationRequests'
        }];
        this.alert.setAlert(alertDataWrong[0])
      }

    } else {

      if (dateTrayect.date_begin !== '') {
        let date = dateTrayect.date_begin.toString().replace('-', '').replace('-', '');
        if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
          this.formTravelManagement.controls['date_begin'].setValue('');
          document.getElementById("btn_travel_new").click();
          const alertDataWrong: Alerts[] = [{
            type: 'danger',
            title: 'Error',
            message: 'La fecha de origen del trayecto no se encuentra en el rango de fecha de la solicitud general ¿Desea continuar con la solicitud?',
            confirmation: true,
            typeConfirmation: 'continueDestinationRequests'
          }];
          this.alert.setAlert(alertDataWrong[0])
        }
      }

      if (dateTrayect.date_end !== '') {
        let date = dateTrayect.date_end.toString().replace('-', '').replace('-', '');
        if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
          this.formTravelManagement.controls['date_end'].setValue('');
          document.getElementById("btn_travel_new").click();
          const alertDataWrong: Alerts[] = [{
            type: 'danger',
            title: 'Error',
            message: 'La fecha de finalizacion del trayecto no se encuentra en el rango de fecha de la solicitud general. ¿Desea continuar con la solicitud?',
            confirmation: true,
            typeConfirmation: 'continueDestinationRequests'
          }];
          this.alert.setAlert(alertDataWrong[0])
        }
      }
    }


  }
  hourvalidations(hourTrayect) {

    if (hourTrayect.date_begin === hourTrayect.date_end) {
      let hourBeginTrayect = hourTrayect.hour_begin.toString().replace(':', '');
      let hourEndTrayect = hourTrayect.hour_end.toString().replace(':', '');

      if (hourEndTrayect - hourBeginTrayect <= 0) {
        this.formTravelManagement.controls['hour_begin'].setValue('');
        this.formTravelManagement.controls['hour_end'].setValue('');
        document.getElementById("btn_travel_new").click();
        const alertDataWrong: Alerts[] = [{
          type: 'danger',
          title: 'Error',
          message: 'El trayecto se realizara el mismo día, la hora de llegada no puede ser menor a la de partida ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueDestinationRequests'

        }];
        this.alert.setAlert(alertDataWrong[0]);
      }

    }

  }
  clearFormPartial() {
    this.stateLocations = [];
    this.stateLocationsto = [];
    this.cityLocations = [];
    this.cityLocationsto = [];
    this.terminalLocations = [];
    this.terminalLocationsto = [];
    this.hotels = [];

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
    this.formTravelManagement.controls['travel_mileage'].setValue('');
  }
  dateBeginValidate(days) {

    this.validateDateHeader = [];
    this.travelProof[0].data[0].data.forEach(element => {

      if (days.date_requests_begin > element.field_4.split(' ')[0]) {
        this.validateDateHeader.push({
          id_travel_wrong: element.field_0
        });
      }
    });

    for (let index = 0; index < this.validateDateHeader.length; index++) {

      const element = this.validateDateHeader[index].id_travel_wrong.toString();
      this.array_wrong.push(element);
    }
  }
  dateEndValidate(days) {

    this.validateDateHeader = [];

    this.travelProof[0].data[0].data.forEach(element => {

      if (days.date_requests_end < element.field_7.split(' ')[0]) {
        this.validateDateHeader.push({
          id_travel_wrong: element.field_0
        });
      }
    });

    for (let index = 0; index < this.validateDateHeader.length; index++) {

      const element = this.validateDateHeader[index].id_travel_wrong.toString();
      this.array_wrong.push(element);
    }
  }
}
