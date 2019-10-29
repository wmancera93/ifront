import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.css'],
})
export class EditTravelComponent implements OnInit, OnDestroy {
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public showPdf = false;
  public showSizeTable = false;
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
  public send = false;
  public hotels: any[] = [];
  public formTravelManagement: any;
  public formTravelManagementedit: any;
  public formTravelManagementEditQuery: any;
  public showSubmit = true;
  public bedit = false;
  public bnew = false;
  public is_collapse = false;
  public filequotation = 'fileQuotationTravel';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public objectImg: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public ticket = '';
  public ticketDestinations = '';
  public objectPrint: Travel_managements = null;
  public generalViajes: Travel = null;
  public edit = true;
  public split_begin: any[] = [];
  public split_end: any[] = [];
  public idFile: number;
  public count = 0;
  public traverlsDestination: any[] = [];
  public file: any[] = [];
  public destination_is_edit = false;
  public id_destinations = 0;
  public dayResult: number;
  public dayResultE: number;
  public activate = false;
  public activate_submit = true;
  public alertWarning: any[] = [];
  public id_destination_delete = '';
  public showMilenage = false;
  public acctionDeleteTable = '';
  public validateDateHeader: any[] = [];
  public travels_wrong: any[] = [];
  public editEditTrip: any[] = [];
  public grahp: any[] = [];
  public operations: any[] = [];
  public ticket_sap: string;
  public showListAutoCost = false;
  public comentaryPlus: string;

  public searchByLetter: string;
  public nameEmployee = '';
  public searchEmployee: any[] = [];
  public showListAutoC = false;
  public showListAutoGraph = false;
  public showListAutoOrder = false;
  public eployee_selected: any = null;
  public eployee_selected_current: any = null;
  public userAuthenticated: User = null;
  public order_travels: any = null;

  public kostl = false;
  public nplnr = false;
  public aufnr = false;

  public viewSendAprovals = true;
  public countAfter = 0;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.travel.edit_travel.${key}`;
  }

  constructor(
    public travelManagementService: TravelService,
    private fb: FormBuilder,
    public hotelsService: HotelsService,
    private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService,
    public travelsService: TravelsService,
    public http: Http,
    public formDataService: FormDataService,
    public alert: AlertsService,
    public employeeService: EmployeeService,
    public router: Router,
    public translate: TranslateService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'goSpendsEditTravel') {
        const url = window.location.href;
        const travel = url.split('/')[url.split('/').length - 1];
        const spend = url.split('/')[url.split('/').length - 2];
        this.router.navigate(['/ihr/travel_management/spend', travel, spend, 'travel']);
      }
      if (
        data === 'continueEditTravelRequests' ||
        data === 'continueEditDestinationRequests' ||
        data === 'continueEditDestinationRequestsValidateDates' ||
        data === 'sendApprobalAlert'
      ) {
        document.getElementById('btn_travel_edit').click();
      }

      if (
        data === 'closeAlertcontinueEditDestinationRequestsValidateDates' ||
        data === 'closeAlertcontinueEditTravelRequests' ||
        data === 'closeAlertcontinueEditDestinationRequests'
      ) {
        document.body.setAttribute('style', 'overflow-y:auto');
      }
      if (data === 'continueEditDestinationRequestsValidateDates') {
        this.activate = false;
      }

      if (data === 'deleteDocumentSaved') {
        this.activate_submit = true;
        document.getElementById('btn_travel_edit').click();
        this.travelManagementService.deleteFile(this.idFile.toString(), this.ticket).subscribe(() => {
          this.generalViajes[0].travel_request_annexeds.splice(
            this.generalViajes[0].travel_request_annexeds.findIndex(filter => filter.id === this.idFile),
            1,
          );
        });
        document.getElementById('btn_travel_edit').click();
      }

      if (data === 'deleteDestinations') {
        this.activate_submit = true;
        if (this.acctionDeleteTable === 'deleteTravelManagement') {
          this.travelManagementService.deleteTravelByDestination(this.ticketDestinations, this.ticket).subscribe(() => {
            this.generalViajes[0].travel_managements.data.splice(
              this.generalViajes[0].travel_managements.data.findIndex(filter => filter.field_0 === this.id_destination_delete),
              1,
            );
            this.traverlsDestination.splice(
              this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destination_delete),
              1,
            );
            setTimeout(() => {
              this.objectReport.emit({
                success: true,
                data: [this.generalViajes[0].travel_managements],
              });
            }, 1000);

            document.getElementById('btn_travel_edit').click();
          });
        } else {
          this.generalViajes[0].travel_managements.data.splice(
            this.generalViajes[0].travel_managements.data.findIndex(filter => filter.field_0 === this.id_destination_delete),
            1,
          );
          this.traverlsDestination.splice(
            this.traverlsDestination.findIndex(filter => filter.travel_id === this.id_destination_delete),
            1,
          );
          setTimeout(() => {
            this.objectReport.emit({
              success: true,
              data: [this.generalViajes[0].travel_managements],
            });
          }, 1000);

          document.getElementById('btn_travel_edit').click();
        }
      }

      if (data === 'closeAlertdeleteDestinations') {
        document.getElementById('btn_travel_edit').click();
        this.activate_submit = true;
      }

      if (data === 'closeAlertdeleteDocumentSaved') {
        document.getElementById('btn_travel_edit').click();
        document.getElementById('btn_travel_edit').click();
        this.activate_submit = true;
      }
    });

    this.fileUploadService.getObjetFile().subscribe(data => {
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
        setTimeout(() => {
          this.iconUpload = data.name.split('.');
          this.iconDocument = this.iconUpload[this.iconUpload.length - 1];
          this.is_upload = true;
          this.file.push(data);
          this.objectImg.push({
            file: data,
            extension: this.iconDocument,
          });
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
      name_travel_costs: '',
      name_travel_graph: '',
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
      name_travel_order: '',
      id_order: '',
    });

    this.travelsService.getEditTravels().subscribe(data => {
      if (this.countAfter === 0) {
        this.ticket = data.id_travel;
        this.viewSendAprovals = data.send_travel;

        this.travelManagementService.getplanningTravelRequests().subscribe((tavelManagement: any) => {
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
            document.getElementById('btn_travel_edit').click();
            document.getElementById('bodyGeneral').removeAttribute('style');
          }
          if (data) {
            this.clearFormGeneral();
            if (this.bnew || this.bedit) {
              document.getElementById('edit_funtionTravel').click();
              this.bnew = false;
              this.bedit = false;
            }
          }
          this.travelManagementService.getTravelRequestsByid(this.ticket, this.edit).subscribe((result: any) => {
            if (result.success) {
              this.generalViajes = result.data;
              this.comentaryPlus =
                result.data[0].travel_request.commentary !== null ? result.data[0].travel_request.commentary : '';

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
                name_travel_graph:
                  this.generalViajes[0].travel_request.travel_graph_code === null
                    ? ''
                    : this.generalViajes[0].travel_request.travel_graph_code +
                      ' - ' +
                      this.generalViajes[0].travel_request.travel_graph_name,
                name_travel_costs:
                  this.generalViajes[0].travel_request.travel_cost_code === null
                    ? ''
                    : this.generalViajes[0].travel_request.travel_cost_code +
                      ' - ' +
                      this.generalViajes[0].travel_request.travel_cost_name,
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
                name_travel_order:
                  this.generalViajes[0].travel_request.travel_order_code === null
                    ? ''
                    : this.generalViajes[0].travel_request.travel_order_code +
                      ' - ' +
                      this.generalViajes[0].travel_request.travel_order_name,
                id_order: this.generalViajes[0].travel_request.travel_maintenance_order_id,
              });

              if (result.data[0].travel_request.employee_applicant_to_json !== null) {
                this.eployee_selected_current = {
                  id: result.data[0].travel_request.employee_applicant_to_json.personal_code,
                  image: result.data[0].travel_request.employee_applicant_to_json.image,
                  name_complete: result.data[0].travel_request.employee_applicant_to_json.short_name,
                  posicion: result.data[0].travel_request.employee_applicant_to_json.position,
                };
              } else {
                this.eployee_selected_current = null;
              }

              setTimeout(() => {
                // this.searchCostsCenterAndGrahp(this.formTravelManagement.value, '')
                this.objectReport.emit({
                  success: true,
                  data: [this.objectPrint],
                });
                if (this.generalViajes[0].travel_request.travel_graph_code !== null) {
                  this.searchOperationsGrahp(this.formTravelManagement.value.id_grahp, '');
                }
              }, 1000);

              if (this.generalViajes[0].travel_request.travel_costs_type_code === 'KOSTL') {
                this.kostl = true;
                this.nplnr = false;
                this.aufnr = false;
              }
              if (this.generalViajes[0].travel_request.travel_costs_type_code === 'NPLNR') {
                this.kostl = false;
                this.nplnr = true;
                this.aufnr = false;
              }
              if (this.generalViajes[0].travel_request.travel_costs_type_code === 'AUFNR') {
                this.kostl = false;
                this.nplnr = false;
                this.aufnr = true;
              }
            }
          });
        });
      }
      setTimeout(() => {
        const element = document.querySelector('.cke_top.cke_reset_all');
        if (element) {
          element.remove();
        }
      }, 2000);
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      this.ticketDestinations = data.id;

      if (data.action_method === 'updateHotels') {
        const date_requests_begin = this.generalViajes[0].travel_request.date_begin;
        const date_requests_end = this.generalViajes[0].travel_request.date_end;

        this.travelsService.setHotelsByJourney({
          acction: false,
          id_journey: data.id.toString(),
          id_travel: this.ticket,
          date_travel_begin: date_requests_begin,
          date_travel_end: date_requests_end,
        });
      }

      if (data.action_method === 'updateTravelManagement') {
        this.activate_submit = false;
        if (!this.bedit) {
          if (!this.bnew) {
            document.getElementById('edit_funtionTravel').click();

            setTimeout(() => {
              document.getElementById('travel_edit').scrollTo(0, 1300);
            }, 300);

            this.bedit = true;
          } else {
            this.bnew = false;
            this.bedit = true;
          }
        }

        if (this.bedit === true) {
          this.travelManagementService
            .getDestinationsById(this.ticketDestinations, this.ticket)
            .subscribe((resutlDestinations: any) => {
              this.split_begin = resutlDestinations.data.ori_datetime.split(' ');
              this.split_end = resutlDestinations.data.destino_datetime.split(' ');
              this.id_destinations = resutlDestinations.data.id;
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
                name_travel_graph:
                  this.generalViajes[0].travel_request.travel_graph_code +
                  ' - ' +
                  this.generalViajes[0].travel_request.travel_graph_name,
                name_travel_costs:
                  this.generalViajes[0].travel_request.travel_cost_code +
                  ' - ' +
                  this.generalViajes[0].travel_request.travel_cost_name,
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
                // id_hotels: resutlDestinations.data.hotel_id,
                // date_hotel_in: resutlDestinations.data.hotel_date_begin,
                // date_hotel_out: resutlDestinations.data.hotel_date_end,
                travel_mileage: resutlDestinations.data.total_mileage,
                name_travel_order:
                  this.generalViajes[0].travel_request.travel_order_code === null
                    ? ''
                    : this.generalViajes[0].travel_request.travel_order_code +
                      ' - ' +
                      this.generalViajes[0].travel_request.travel_order_name,
                id_order: this.generalViajes[0].travel_request.travel_maintenance_order_id,
              };
            });
          setTimeout(() => {
            this.editTravels(this.formTravelManagementedit);
          }, 1000);

          this.destination_is_edit = true;
        }
      }

      if (data.action_method === 'updateTrayectManagement') {
        this.activate_submit = false;
        if (!this.bedit) {
          if (!this.bnew) {
            document.getElementById('edit_funtionTravel').click();

            setTimeout(() => {
              document.getElementById('travel_edit').scrollTo(0, 1300);
            }, 300);

            this.bedit = true;
          } else {
            this.bnew = false;
            this.bedit = true;
          }
        }
        if (this.bedit === true) {
          const object: any = this.editEditTrip.filter(result => result.id_travel.toString() === data.id.toString());

          this.editTravels(object[0]);
        }
      }

      if (data.action_method === 'deleteTravelManagement') {
        document.getElementById('btn_travel_edit').click();
        this.deleteDestinations(data);
      }
      if (data.action_method === 'deleteTravels') {
        document.getElementById('btn_travel_edit').click();
        this.deleteDestinations(data);
      }
      this.acctionDeleteTable = data.action_method;
    });
  }

  ngOnInit() {
  }

  addHourEnd(value) {
    const begin = parseFloat(value.hour_begin.split(':')[0]);
    const end = parseFloat(value.hour_begin.split(':')[1]) + 1;
    const calculate_minutes = end.toString().length === 1 ? '0' + end.toString() : end > 59 ? '00' : end.toString();
    const calculate_hour =
      calculate_minutes === '00'
        ? (begin + 1).toString().length === 1
          ? '0' + (begin + 1).toString()
          : begin + 1 > 23
          ? '00'
          : begin + 1
        : begin.toString().length === 1
        ? '0' + begin.toString()
        : begin;
    this.formTravelManagement.controls['hour_end'].setValue(calculate_hour + ':' + calculate_minutes);
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

  enterNameEmployee() {
    this.nameEmployee = this.searchByLetter;
    if (this.nameEmployee !== null) {
      this.employeeService.getEmployeeTravelsById(this.nameEmployee).subscribe((data: any) => {
        if (data.data.length > 0) {
          this.searchEmployee = data.data;
          this.showListAutoC = true;
        } else {
          this.searchEmployee = [];
          this.showListAutoC = true;
        }
      });
    }
  }

  enterCost(form) {
    this.travelManagementService
      .getFilterTravelCost(form.id_element_imputation, form.name_travel_costs)
      .subscribe((data: any) => {
        this.costs_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = true;
        this.showListAutoGraph = false;
        this.showListAutoOrder = false;
      });
  }

  enterGraph(form) {
    this.travelManagementService.getFilterGraphs(form.id_element_imputation, form.name_travel_graph).subscribe((data: any) => {
      this.grahp = this.sortByAphabet(data.data);
      this.showListAutoCost = false;
      this.showListAutoGraph = true;
      this.showListAutoOrder = false;
    });
  }
  enterOrder(form) {
    this.travelManagementService.getFilterTravelOrders(form.name_travel_order.toUpperCase()).subscribe((orders: any) => {
      this.order_travels = this.sortByAphabet(orders.data);
      this.showListAutoCost = false;
      this.showListAutoGraph = false;
      this.showListAutoOrder = true;
    });
  }
  returnObjectSearch(ObjectSearch: any) {
    this.eployee_selected = ObjectSearch;
    this.searchByLetter = null;
    this.searchEmployee = [];

    this.formTravelManagement.controls['id_element_imputation'].setValue('');
    this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
    this.formTravelManagement.controls['name_travel_costs'].setValue('');
    this.kostl = false;
    this.nplnr = false;
    this.aufnr = false;
    this.costs_travels = [];
  }
  returnCostSearch(cost: any) {
    this.formTravelManagement.controls['id_travel_costs'].setValue(cost.id);
    this.formTravelManagement.controls['name_travel_costs'].setValue(cost.code + ' - ' + cost.name);
    this.costs_travels = [];
  }

  returnGraphSearch(graph) {
    this.formTravelManagement.controls['id_grahp'].setValue(graph.code);
    this.formTravelManagement.controls['name_travel_graph'].setValue(graph.code + ' - ' + graph.name);
    this.operations = [];
    this.formTravelManagement.controls['id_operations'].setValue('');
    this.grahp = [];
    this.searchOperationsGrahp(graph.code, 'edit');
  }
  returnOrderSearch(order) {
    this.formTravelManagement.controls['id_order'].setValue(order.id);
    this.formTravelManagement.controls['name_travel_order'].setValue(order.code + ' - ' + order.name);
    this.order_travels = [];
  }

  deleteEmployeeThird() {
    this.eployee_selected = null;
    this.formTravelManagement.controls['id_element_imputation'].setValue('');
    this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
    this.formTravelManagement.controls['name_travel_costs'].setValue('');
    this.kostl = false;
    this.nplnr = false;
    this.aufnr = false;
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function(a, b) {
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
    const controls = this.formTravelManagement.controls;
    switch (date_param) {
      case 'date_begin_header':
        controls['date_requests_begin'].setValue(this.generalViajes[0].travel_request.date_begin);
        break;
      case 'date_end_header':
        controls['date_requests_end'].setValue(this.generalViajes[0].travel_request.date_end);
        break;
      case 'date_begin_body':
        controls['date_begin'].setValue('');
        break;
      case 'date_end_body':
        controls['date_end'].setValue('');
        break;
      case 'hour_begin':
        controls['hour_begin'].setValue('');
        break;
      case 'hour_end':
        controls['hour_end'].setValue('');
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
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_ts'),
        message: '¿' + this.t('message_alert_ts') + this.idFile.toString() + '?',
        confirmation: true,
        typeConfirmation: 'deleteDocumentSaved',
      },
    ];
    this.alert.setAlert(this.alertWarning[0]);
  }
  deleteDestinations(param: any) {
    document.getElementById('btn_travel_edit').click();
    this.id_destination_delete = param.id;
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_ts'),
        message: '¿' + this.t('message_alert_one_ts') + this.id_destination_delete.toString() + '?',
        confirmation: true,
        typeConfirmation: 'deleteDestinations',
      },
    ];
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
    modelFromdata.append('commentary', this.comentaryPlus);
    modelFromdata.append('travel_maintenance_order_id', model.id_order == '-1' ? '' : model.id_order);
    modelFromdata.append('employee_id', this.eployee_selected == null ? '' : this.eployee_selected.id.toString());
    modelFromdata.append('travels', JSON.stringify(this.traverlsDestination));
    modelFromdata.append('files_length', this.objectImg.length.toString());
    for (let index = 0; index < this.objectImg.length; index++) {
      modelFromdata.append('files_' + (index + 1).toString(), this.file[index]);
    }
    model = modelFromdata;

    this.formDataService.putEditTravelsFormData(this.ticket, model).subscribe(
      (data: any) => {
        if (data.success) {
          document.getElementById('close_edit_travel').click();
          if (this.viewSendAprovals) {
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_one_ts'),
                message: this.t('message_alert_two_ts'),
                confirmation: false,
              },
            ];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelsService.setResultSaved(true);
          } else {
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_one_ts'),
                message: this.t('message_alert_tree_ts'),
                confirmation: true,
                typeConfirmation: 'goSpendsEditTravel',
              },
            ];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelsService.setResultSaved(true);
          }
        }
      },
      (error: any) => {
        if (this.viewSendAprovals) {
          document.getElementById('close_edit_travel').click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_two_ts'),
              message: error.json().errors.toString() + this.t('message_alert_four_ts'),
              confirmation: true,
              typeConfirmation: 'continueEditTravelRequests',
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);
        } else {
          document.getElementById('close_edit_travel').click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_two_ts'),
              message: error.json().errors.toString() + this.t('message_alert_five_ts'),
              confirmation: true,
              typeConfirmation: 'goSpendsEditTravel',
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
        }
      },
    );
  }
  addDestination(modelPartial) {
    modelPartial.id_travel = 'temp_' + this.count + 1;
    this.activate_submit = true;
    this.activate = true;

    const dateIn = modelPartial.date_begin.split('-');
    const dateBeginIn = dateIn[2] + '/' + dateIn[1] + '/' + dateIn[0];
    const dateOut = modelPartial.date_end.split('-');
    const dateEndOut = dateOut[2] + '/' + dateOut[1] + '/' + dateOut[0];
    // let dateInHotel = modelPartial.date_hotel_in.split('-');
    // let dateBeginHotel = dateInHotel[2] + '/' + dateInHotel[1] + '/' + dateInHotel[0];
    // let dateOutHotel = modelPartial.date_hotel_out.split('-');
    // let dateEndOutHotel = dateOutHotel[2] + '/' + dateOutHotel[1] + '/' + dateOutHotel[0];

    this.editEditTrip.push(modelPartial);
    // let hotell = this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString()).length > 0 ? this.hotels.filter((data) => data.id.toString() === modelPartial.id_hotels.toString())[0].name : '';
    this.generalViajes[0].travel_managements.data.push({
      field_0: modelPartial.id_travel,
      field_1:
        modelPartial.id_transport.toString() !== ''
          ? this.transport_types.filter(data => data.id.toString() === modelPartial.id_transport.toString())[0].name
          : '',
      field_2: modelPartial.id_city,
      field_3: this.terminalLocations.filter(data => data.id.toString() === modelPartial.id_terminal.toString())[0].name,
      field_4: dateBeginIn + ' ' + modelPartial.hour_begin,
      field_5: modelPartial.id_cityto,
      field_6: this.terminalLocationsto.filter(data => data.id.toString() === modelPartial.id_terminalto.toString())[0].name,
      field_7: dateEndOut + ' ' + modelPartial.hour_end,
      field_8: modelPartial.travel_mileage,
      field_12: {
        type_method: 'HIDE',
        type_element: 'button',
        icon: 'fa-pencil',
        id: modelPartial.id_travel,
        title: 'Editar',
        action_method: 'updateTrayectManagement',
        disable: false,
      },
      field_10: {
        type_method: 'UPDATE',
        type_element: 'button',
        icon: 'fa-pencil',
        id: modelPartial.id_travel,
        title: 'Editar',
        action_method: 'updateTrayectManagement',
        disable: false,
      },
      field_11: {
        type_method: 'DELETE',
        type_element: 'button',
        icon: 'fa-trash',
        id: modelPartial.id_travel,
        title: 'Eliminar',
        action_method: 'deleteTravels',
        disable: false,
      },
    });

    this.traverlsDestination.push({
      travel_id: modelPartial.id_travel,
      transport_id: modelPartial.id_transport,
      total_mileage: modelPartial.travel_mileage,
      origin_location_id: modelPartial.id_state,
      origin_location_text: modelPartial.id_city,
      origin_terminal_id: modelPartial.id_terminal,
      // hotel_id: modelPartial.id_hotels,
      destination_location_id: modelPartial.id_stateto,
      destination_location_text: modelPartial.id_cityto,
      destination_terminal_id: modelPartial.id_terminalto,
      origin_datetime: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end,
      // hotel_date_begin: modelPartial.date_hotel_in,
      // hotel_date_end: modelPartial.date_hotel_out,
    });

    this.count += 1;
    setTimeout(() => {
      this.objectReport.emit({
        success: true,
        data: [this.generalViajes[0].travel_managements],
      });
    }, 1000);

    this.closeTrip();
    document.getElementById('edit_funtionTravel').click();
  }
  editDestination(modelEditPartial) {
    this.activate_submit = true;
    this.activate = true;
    const dateIn = modelEditPartial.date_begin.split('-');
    const dateBeginIn = dateIn[2] + '/' + dateIn[1] + '/' + dateIn[0];
    const dateOut = modelEditPartial.date_end.split('-');
    const dateEndOut = dateOut[2] + '/' + dateOut[1] + '/' + dateOut[0];
    // let dateInHotel = modelEditPartial.date_hotel_in.split('-');
    // let dateBeginHotel = dateInHotel[2] + '/' + dateInHotel[1] + '/' + dateInHotel[0];
    // let dateOutHotel = modelEditPartial.date_hotel_out.split('-');
    // let dateEndOutHotel = dateOutHotel[2] + '/' + dateOutHotel[1] + '/' + dateOutHotel[0];

    // let hotell = '';
    // if (modelEditPartial.id_hotels !== null) {
    //   hotell = this.hotels.filter((data) => data.id.toString() === modelEditPartial.id_hotels.toString()).length > 0 ? this.hotels.filter((data) => data.id.toString() === modelEditPartial.id_hotels.toString())[0].name : '';
    // } else {
    //   hotell = '';
    // }
    this.generalViajes[0].travel_managements.data.forEach(element => {
      if (element.field_0.toString() === this.id_destinations.toString()) {
        (element.field_1 =
          modelEditPartial.id_transport.toString() !== ''
            ? this.transport_types.filter(data => data.id.toString() === modelEditPartial.id_transport.toString())[0].name
            : ''),
          (element.field_2 = modelEditPartial.id_city),
          (element.field_3 = this.terminalLocations.filter(
            data => data.id.toString() === modelEditPartial.id_terminal.toString(),
          )[0].name);
        element.field_4 = dateBeginIn + ' ' + modelEditPartial.hour_begin;
        (element.field_5 = modelEditPartial.id_cityto),
          (element.field_6 = this.terminalLocationsto.filter(
            data => data.id.toString() === modelEditPartial.id_terminalto.toString(),
          )[0].name);
        element.field_7 = dateEndOut + ' ' + modelEditPartial.hour_end;
        element.field_8 = modelEditPartial.travel_mileage;
        (element.field_10 = {
          type_method: 'EDITHOTEL',
          type_element: 'button',
          icon: '',
          id: this.id_destinations,
          title: '',
          action_method: 'editHotelTrayectManagement',
          disable: false,
        }),
          (element.field_11 = {
            type_method: 'UPDATE',
            type_element: 'button',
            icon: 'fa-pencil',
            id: this.id_destinations,
            title: 'Editar',
            action_method: 'updateTrayectManagement',
            disable: false,
          }),
          (element.field_12 = {
            type_method: 'DELETE',
            type_element: 'button',
            icon: 'fa-trash',
            id: this.id_destinations,
            title: 'Eliminar',
            action_method: 'deleteTravels',
            disable: false,
          });
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
      // hotel_id: modelEditPartial.id_hotels,
      destination_location_id: modelEditPartial.id_stateto,
      destination_location_text: modelEditPartial.id_cityto,
      destination_terminal_id: modelEditPartial.id_terminalto,
      origin_datetime: modelEditPartial.date_begin + ' ' + modelEditPartial.hour_begin,
      destination_datetime: modelEditPartial.date_end + ' ' + modelEditPartial.hour_end,
      // hotel_date_begin: modelEditPartial.date_hotel_in,
      // hotel_date_end: modelEditPartial.date_hotel_out,
    });

    setTimeout(() => {
      this.objectReport.emit({
        success: true,
        data: [this.generalViajes[0].travel_managements],
      });
    }, 1500);

    this.closeTrip();
    document.getElementById('edit_funtionTravel').click();
    this.id_destinations = 0;
  }
  editTravels(param: any) {
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
        name_travel_graph: param.name_travel_graph,
        name_travel_costs: param.name_travel_costs,
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
        // id_hotels: param.id_hotels,
        // date_hotel_in: param.date_hotel_in,
        // date_hotel_out: param.date_hotel_out,
        travel_mileage: param.travel_mileage,
        name_travel_order: param.name_travel_order,
        id_order: param.id_order,
      });
      this.searchState(param, 'edit');
      this.searchStateto(param, 'edit');
      this.searchTerminal(param, 'edit');
      this.searchTerminalto(param, 'edit');
      // this.searchHotel(param, 'edit');
      // this.searchCostsCenterAndGrahp(param, 'edit');

      if (param.id_grahp !== null) {
        this.searchOperationsGrahp(param, 'edit');
      }
    }
  }
  colapseEdit() {
    this.activate_submit = false;
    this.showMilenage = false;
    if (!this.bnew) {
      this.bnew = true;
    } else {
      this.bnew = false;
    }
    document.getElementById('edit_funtionTravel').click();

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
    if (this.transport_types.filter(data => data.id.toString() === param.id_transport.toString())[0].cttype == 'T') {
      this.showMilenage = true;
    } else {
      this.showMilenage = false;
    }
  }
  searchState(form: any, acction: any) {
    this.cityLocations = [];
    this.terminalLocations = [];
    this.stateLocations = [];

    this.travelManagementService.getgeographicLocations(form.id_country).subscribe((data: any) => {
      this.stateLocations = data.data;
      if (this.stateLocations.length > 0) {
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
    this.travelManagementService.getgeographicLocations(form.id_countryto).subscribe((data: any) => {
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
    // this.searchHotel(form, 'edit');
  }

  searchTerminal(form: any, acction: any) {
    this.terminalLocations = [];
    this.travelManagementService.gettransportTerminals(form.id_country).subscribe((data: any) => {
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
    this.travelManagementService.gettransportTerminals(form.id_countryto).subscribe((data: any) => {
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
  // searchHotel(form: any, acction: any) {
  //   this.hotels = [];
  //   this.hotelsService.getshowHotels(form.id_countryto).
  //     subscribe((data: any) => {
  //       this.hotels = data.data;
  //       if (this.hotels.length > 0) {
  //         if (acction === 'new') {
  //           this.formTravelManagement.controls['id_hotels'].setValue('');
  //         }
  //       } else {
  //         this.formTravelManagement.controls['id_hotels'].setValue('');
  //       }
  //     });
  // }
  searchCostsCenterAndGrahp(form: any) {
    if (
      this.center_costs_travels.filter(data => data.id.toString() === form.id_element_imputation.toString())[0].code === 'KOSTL'
    ) {
      this.kostl = true;
      this.nplnr = false;
      this.aufnr = false;

      this.formTravelManagement.controls['id_grahp'].setValue('-1');
      this.formTravelManagement.controls['id_operations'].setValue('-1');
      this.formTravelManagement.controls['id_order'].setValue('-1');

      const employee_center_coast =
        this.eployee_selected === null ? this.userAuthenticated.employee.cost_center : this.eployee_selected.cost_center;

      // let employee_center_coast = this.eployee_selected === null ? 'GACM00000N' : 'SSAD0GR00N';

      if (employee_center_coast !== null) {
        this.travelManagementService
          .getFilterTravelCost(form.id_element_imputation, employee_center_coast)
          .subscribe((data: any) => {
            this.returnCostSearch(data.data[0]);
          });
      }
      // this.travelManagementService.getTravelsCosts(form.id_element_imputation).
      //   subscribe((data: any) => {
      //     this.costs_travels = this.sortByAphabet(data.data);
      //     if (this.costs_travels.length > 0) {
      //       if (acction === 'new') {
      //         this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
      //       }
      //     } else {
      //       this.formTravelManagement.controls['id_travel_costs'].setValue('');
      //     }
      //   })
    }
    if (
      this.center_costs_travels.filter(data => data.id.toString() === form.id_element_imputation.toString())[0].code === 'NPLNR'
    ) {
      this.kostl = false;
      this.nplnr = true;
      this.aufnr = false;
      this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
      this.formTravelManagement.controls['id_order'].setValue('-1');
      // this.travelManagementService.getTravelsGrahp(form.id_element_imputation).
      //   subscribe((data: any) => {
      //     this.grahp = this.sortByAphabet(data.data);
      //     if (this.grahp.length > 0) {
      //       if (acction === 'new') {
      //         this.formTravelManagement.controls['id_grahp'].setValue('-1');
      //       }
      //     } else {
      //       this.formTravelManagement.controls['id_grahp'].setValue('');
      //     }
      //   })
    }
    if (
      this.center_costs_travels.filter(data => data.id.toString() === form.id_element_imputation.toString())[0].code === 'AUFNR'
    ) {
      this.kostl = false;
      this.nplnr = false;
      this.aufnr = true;
      this.formTravelManagement.controls['id_grahp'].setValue('-1');
      this.formTravelManagement.controls['id_operations'].setValue('-1');
      this.formTravelManagement.controls['id_travel_costs'].setValue('-1');
      // this.travelManagementService.getTravelsGrahp(form.id_element_imputation).
      //   subscribe((data: any) => {
      //     this.grahp = this.sortByAphabet(data.data);
      //     if (this.grahp.length > 0) {
      //       if (acction === 'new') {
      //         this.formTravelManagement.controls['id_grahp'].setValue('');
      //       }
      //     } else {
      //       this.formTravelManagement.controls['id_grahp'].setValue('');
      //     }
      //   })
    }
  }

  searchOperationsGrahp(form: any, acction: any) {
    this.travelManagementService.getTravelsOperations(form).subscribe((data: any) => {
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
      name_travel_graph: '',
      name_travel_costs: '',
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
      // id_hotels: '',
      // date_hotel_in: '',
      // date_hotel_out: '',
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
    this.formTravelManagement.controls['date_hotel_in'].setValue('');
    this.formTravelManagement.controls['date_hotel_out'].setValue('');
  }
  viewCotization(param) {
    window.open(param.file_anexo.url);
  }
  downloadCotization(param: any) {
    this.http
      .get(param.file_anexo.url, {
        responseType: ResponseContentType.Blob,
      })
      .map(res => {
        return {
          filename: param.name,
          data: res.blob(),
        };
      })
      .subscribe(res => {
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement('a');
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
      const dateBeginCalculate = days.date_requests_begin
        .toString()
        .replace('-', '')
        .replace('-', '');
      const dateEndCalculate = days.date_requests_end
        .toString()
        .replace('-', '')
        .replace('-', '');

      this.travelManagementService
        .validateDatesTravelRequests(
          dateBeginCalculate,
          dateEndCalculate,
          this.eployee_selected == null ? '0' : this.eployee_selected.id.toString(),
          this.ticket,
        )
        .subscribe(
          () => {
            // if ((dateEndCalculate - dateBeginCalculate) < 0 && data) {
            //   document.getElementById("btn_travel_edit").click();
            //   const alertDataWrong: Alerts[] = [{
            //     type: 'danger',
            //     title: 'Error',
            //     message: 'La fecha de inicio general de solicitud del viaje no puede ser mayor a la de finalizacion de la solicitud',
            //     confirmation: true,
            //     typeConfirmation: 'continueEditDestinationRequestsValidateDates'

            //   }];
            //   this.alert.setAlert(alertDataWrong[0]);

            // } else {
            //   if ((days.date_begin !== '') || (days.date_end !== '')) {
            //     if ((days.date_begin !== '')) {
            //       if ((days.date_requests_begin > days.date_begin)) {

            //         document.getElementById("btn_travel_edit").click();

            //         const alertDataWrong: Alerts[] = [{
            //           type: 'danger',
            //           title: 'Error',
            //           message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje',
            //           confirmation: true,
            //           typeConfirmation: 'continueEditDestinationRequests'

            //         }];
            //         this.alert.setAlert(alertDataWrong[0]);
            //       } else {
            //         if (this.generalViajes[0].travel_managements.data.length > 0) {
            //           document.getElementById("btn_travel_edit").click();

            //           this.validateDateTrayectOrigin(days);
            //           this.validateDateTrayectEnd(days);

            //           setTimeout(() => {
            //             if (this.travels_wrong.length > 0) {
            //               document.getElementById("btn_travel_edit").click();
            //               const alertDataWrong: Alerts[] = [{
            //                 type: 'danger',
            //                 title: 'Error',
            //                 message: 'La fecha de los trayectos' + ' ' + this.travels_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje',
            //                 confirmation: true,
            //                 typeConfirmation: 'continueEditDestinationRequests'

            //               }];
            //               this.alert.setAlert(alertDataWrong[0]);
            //             }
            //           }, 500);
            //         } else {
            //           this.activate = true;
            //         }
            //       }
            //     } else {
            //       if ((days.date_end !== '')) {
            //         if ((days.date_requests_end < days.date_end)) {

            //           document.getElementById("btn_travel_edit").click();

            //           const alertDataWrong: Alerts[] = [{
            //             type: 'danger',
            //             title: 'Error',
            //             message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje',
            //             confirmation: true,
            //             typeConfirmation: 'continueEditDestinationRequests'

            //           }];
            //           this.alert.setAlert(alertDataWrong[0]);
            //         } else {
            //           if (this.generalViajes[0].travel_managements.data.length > 0) {
            //             document.getElementById("btn_travel_edit").click();

            //             this.validateDateTrayectOrigin(days);
            //             this.validateDateTrayectEnd(days);
            //             setTimeout(() => {
            //               if (this.travels_wrong.length > 0) {
            //                 document.getElementById("btn_travel_edit").click();
            //                 const alertDataWrong: Alerts[] = [{
            //                   type: 'danger',
            //                   title: 'Error',
            //                   message: 'La fecha de los trayectos' + ' ' + this.travels_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje',
            //                   confirmation: true,
            //                   typeConfirmation: 'continueEditDestinationRequests'

            //                 }];
            //                 this.alert.setAlert(alertDataWrong[0]);
            //               }
            //             }, 500);
            //           } else {
            //             this.activate = true;
            //           }
            //         }
            //       }
            //     }
            //   } else {
            //     if (this.generalViajes[0].travel_managements.data.length > 0) {
            //       this.validateDateHeader = [];
            //       this.travels_wrong = [];

            //       this.validateDateTrayectOrigin(days);
            //       this.validateDateTrayectEnd(days);
            //       setTimeout(() => {
            //         if (this.travels_wrong.length > 0) {
            //           document.getElementById("btn_travel_edit").click();
            //           const alertDataWrong: Alerts[] = [{
            //             type: 'danger',
            //             title: 'Error',
            //             message: 'La fecha de los trayectos' + ' ' + this.travels_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje',
            //             confirmation: true,
            //             typeConfirmation: 'continueEditDestinationRequests'

            //           }];
            //           this.alert.setAlert(alertDataWrong[0]);
            //         }
            //       }, 500);
            //     } else {
            //       this.activate = true;
            //     }
            //   }

            // }
            this.activate = true;
          },
          error => {
            this.activate = false;
            this.formTravelManagement.controls['date_requests_begin'].setValue(this.generalViajes[0].travel_request.date_begin);
            this.formTravelManagement.controls['date_requests_end'].setValue(this.generalViajes[0].travel_request.date_end);

            document.getElementById('btn_travel_edit').click();
            const alertDataWrong: Alerts[] = [
              {
                type: 'danger',
                title: 'Error',
                message: error.json().errors.toString() + this.t('message_alert_six_ts'),
                confirmation: true,
                typeConfirmation: 'continueEditDestinationRequestsValidateDates',
              },
            ];
            this.alert.setAlert(alertDataWrong[0]);
          },
        );
    } else {
      this.activate = false;
    }
  }
  dateValidateTrayect(dateTrayect) {
    setTimeout(() => {
      const dateBeginRequestCalculate = dateTrayect.date_requests_begin
        .toString()
        .replace('-', '')
        .replace('-', '');
      const dateEndRequestCalculate = dateTrayect.date_requests_end
        .toString()
        .replace('-', '')
        .replace('-', '');

      if (dateTrayect.date_begin !== '') {
        const date = dateTrayect.date_begin
          .toString()
          .replace('-', '')
          .replace('-', '');
        if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
          this.formTravelManagement.controls['date_begin'].setValue('');
          document.getElementById('btn_travel_edit').click();
          const alertDataWrong: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_seven_ts'),
              confirmation: true,
              typeConfirmation: 'continueEditDestinationRequests',
            },
          ];
          this.alert.setAlert(alertDataWrong[0]);
        }
      }

      if (dateTrayect.date_end !== '') {
        const date = dateTrayect.date_end
          .toString()
          .replace('-', '')
          .replace('-', '');
        if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
          this.formTravelManagement.controls['date_end'].setValue('');
          document.getElementById('btn_travel_edit').click();
          const alertDataWrong: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_eight_ts'),
              confirmation: true,
              typeConfirmation: 'continueEditDestinationRequests',
            },
          ];
          this.alert.setAlert(alertDataWrong[0]);
        }
      }

      if (dateTrayect.date_begin !== '' && dateTrayect.date_end !== '') {
        const dateBeginCalculate = dateTrayect.date_begin
          .toString()
          .replace('-', '')
          .replace('-', '');
        const dateEndCalculate = dateTrayect.date_end
          .toString()
          .replace('-', '')
          .replace('-', '');

        if (dateEndCalculate - dateBeginCalculate < 0) {
          this.formTravelManagement.controls['date_begin'].setValue('');
          this.formTravelManagement.controls['date_end'].setValue('');
          document.getElementById('btn_travel_edit').click();
          const alertDataWrong: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_nine_ts'),
              confirmation: true,
              typeConfirmation: 'continueEditDestinationRequests',
            },
          ];
          this.alert.setAlert(alertDataWrong[0]);
        }
      }
    }, 100);
  }
  hourValidationsEdit(hourTrayect) {
    if (hourTrayect.date_begin === hourTrayect.date_end) {
      const hourBeginTrayect = hourTrayect.hour_begin.toString().replace(':', '');
      const hourEndTrayect = hourTrayect.hour_end.toString().replace(':', '');

      if (hourEndTrayect - hourBeginTrayect <= 0) {
        this.formTravelManagement.controls['hour_begin'].setValue('');
        this.formTravelManagement.controls['hour_end'].setValue('');
        document.getElementById('btn_travel_edit').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_sten_ts'),
            confirmation: true,
            typeConfirmation: 'continueEditDestinationRequests',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
    }
  }
  validateDateTrayectOrigin(days) {
    this.validateDateHeader = [];
    this.generalViajes[0].travel_managements.data.forEach(element => {
      if (days.date_requests_begin > element.field_4.split(' ')[0]) {
        this.validateDateHeader.push({
          id_travel_wrong: element.field_0,
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
          id_travel_wrong: element.field_0,
        });
      }
    });

    for (let index = 0; index < this.validateDateHeader.length; index++) {
      const element = this.validateDateHeader[index].id_travel_wrong.toString();
      this.travels_wrong.push(element);
    }
  }

  dateValidateHotelEdit(daysHotel) {
    const dateEndRequestCalculate = daysHotel.date_requests_end
      .toString()
      .replace('-', '')
      .replace('-', '');
    const dateEndTrayectCalculate = daysHotel.date_end
      .toString()
      .replace('-', '')
      .replace('-', '');
    const dateInHotelCalculate = daysHotel.date_hotel_in
      .toString()
      .replace('-', '')
      .replace('-', '');
    const dateOutHotelCalculate = daysHotel.date_hotel_out
      .toString()
      .replace('-', '')
      .replace('-', '');

    if (dateEndTrayectCalculate !== '') {
      if (dateInHotelCalculate !== '' && dateInHotelCalculate < dateEndTrayectCalculate) {
        this.formTravelManagement.controls['date_hotel_in'].setValue('');
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_eleven_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationHotel',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
      if (dateInHotelCalculate !== '' && dateInHotelCalculate > dateEndRequestCalculate) {
        this.formTravelManagement.controls['date_hotel_in'].setValue('');
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_twelve_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationHotel',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
      if (dateOutHotelCalculate !== '') {
        if (dateInHotelCalculate > dateOutHotelCalculate) {
          this.formTravelManagement.controls['date_hotel_in'].setValue('');
          document.getElementById('btn_travel_new').click();
          const alertDataWrong: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_thirteen_ts'),
              confirmation: true,
              typeConfirmation: 'continueDestinationHotel',
            },
          ];
          this.alert.setAlert(alertDataWrong[0]);
        }
      }
    }

    if (dateOutHotelCalculate !== '') {
      if (dateOutHotelCalculate < dateEndTrayectCalculate) {
        this.formTravelManagement.controls['date_hotel_out'].setValue('');
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_fourteen_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationHotel',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
      if (dateOutHotelCalculate > dateEndRequestCalculate) {
        this.formTravelManagement.controls['date_hotel_out'].setValue('');
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_fiveteen_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationHotel',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
      if (dateInHotelCalculate !== '' && dateOutHotelCalculate < dateInHotelCalculate) {
        this.formTravelManagement.controls['date_hotel_out'].setValue('');
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_seventeen_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationHotel',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
    }
  }

  sedRequestsTravel() {
    this.travelManagementService.putSendRequestsTravels(this.ticket).subscribe(
      (data: any) => {
        if (data) {
          document.getElementById('btn_travel_edit').click();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_one_ts'),
              message: this.t('message_alert_eighteen_ts'),
              confirmation: false,
              typeConfirmation: 'sendApprobalAlert',
            },
          ];
          this.alert.setAlert(alertWarning[0]);
        }
        this.travelsService.setResultSaved({
          success: true,
          third: this.eployee_selected == null ? true : false,
        });
      },
      (error: any) => {
        document.getElementById('btn_travel_edit').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_two_ts'),
            message: error.json().errors.toString(),
            confirmation: false,
            typeConfirmation: 'sendApprobalAlert',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }
}
