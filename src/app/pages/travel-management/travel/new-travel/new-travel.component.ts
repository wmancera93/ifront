import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { HotelsService } from '../../../../services/travel-management/hotels/hotels.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../services/common/employee/employee.service';
import { User } from '../../../../models/general/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-travel',
  templateUrl: './new-travel.component.html',
  styleUrls: ['./new-travel.component.css'],
})
export class NewTravelComponent implements OnInit, OnDestroy {
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
  public traverlsDestination: any[] = [];
  public travelProof: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  public send = false;
  public hotels: any[] = [];
  public formTravelManagement: any;
  public formTravelManagementedit: any;
  public showSubmit = true;
  public bedit = false;
  public bnew = false;
  public is_collapse = false;
  public nameReport: string;
  public filequotation = 'fileQuotationTravel';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public objectImg: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public count = 0;
  public file: any[] = [];
  public activate = false;
  public activate_submit = true;
  public showMilenage = false;
  public disabledDatesHeader = false;
  public deleteDocumenFile: string;
  public deleteDestination: string;
  public validateDateHeader: any[] = [];
  public array_wrong: any[] = [];
  public ticket_advance: number;
  public editTrip: any[] = [];
  public prueba: any[] = [];
  public grahp: any[] = [];
  public operations: any[] = [];
  public idGrahpTravel = '';
  public comentaryPlus: string;

  public searchByLetter: string;
  public nameEmployee = '';
  public searchEmployee: any[] = [];
  public showListAutoC = false;
  public showListAutoCost = false;
  public showListAutoGraph = false;
  public showListAutoOrder = false;
  public eployee_selected: any = null;
  public userAuthenticated: User = null;
  public cost_selected: any = null;
  public order_travels: any = null;
  public kostl = false;
  public nplnr = false;
  public aufnr = false;
  public today: any;

  public countAfter = 0;
  public countAfterAlert = 0;
  public arrayHotel: any[] = [];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.travel_management.travel.new_travel.${key}`;
  }

  constructor(
    public travelManagementService: TravelService,
    private fb: FormBuilder,
    public hotelsService: HotelsService,
    private accionDataTableService: DataDableSharedService,
    public fileUploadService: FileUploadService,
    public travelsService: TravelsService,
    public formDataService: FormDataService,
    public alert: AlertsService,
    public advanceSharedService: AdvanceSharedService,
    public router: Router,
    public employeeService: EmployeeService,
    public translate: TranslateService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));

    this.travelProof = [
      {
        success: true,
        data: [{ data: [] }],
      },
    ];
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (this.countAfterAlert === 0) {
        if (data === 'continueTravelAlowances') {
          document.getElementById('closeTravels').click();
          this.router.navigate(['/ihr/spend', this.ticket_advance]);
        }

        if (data === 'continueTravelAdvances') {
          document.getElementById('closeTravels').click();
          this.router.navigate(['/ihr/advances', this.ticket_advance]);
        }

        if (
          data === 'continueDestinationHotel' ||
          data === 'continueTravelRequests' ||
          data === 'continueDestinationRequests1' ||
          data === 'continueDestinationRequests2' ||
          data === 'continueDestinationRequests3'
        ) {
          document.getElementById('btn_travel_new').click();
        }

        if (data === 'continueDestinationRequestsValidateDates') {
          this.activate_submit = true;
          this.activate = false;
          this.bnew = false;
          this.traverlsDestination = [];
          document.getElementById('btn_travel_new').click();
        }
        if (data === 'deleteNewDocumentSaved') {
          this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === this.deleteDocumenFile), 1);
          this.file.splice(this.file.findIndex(filter => filter.name === this.deleteDocumenFile), 1);
          document.getElementById('btn_travel_new').click();
        }
        if (data === 'deleteNewDestinations') {
          document.getElementById('btn_travel_new').click();
          this.travelProof[0].data[0].data.splice(
            this.travelProof[0].data[0].data.findIndex(filter => filter.field_0 === this.deleteDestination),
            1,
          );
          this.traverlsDestination.splice(
            this.traverlsDestination.findIndex(filter => filter.travel_id === this.deleteDestination),
            1,
          );
          setTimeout(() => {
            this.objectReport.emit(this.travelProof[0]);
          }, 1000);
          this.activate_submit = true;
        }

        if (data === 'closeAlertdeleteNewDocument' || data === 'closeAlertdeleteNewDestinations') {
          document.getElementById('btn_travel_new').click();
          this.activate_submit = true;
        }
        if (
          data === 'closeAlertcontinueDestinationRequestsValidateDates' ||
          data === 'closeAlertcontinueTravelRequests' ||
          data === 'closeAlertcontinueDestinationRequests' ||
          data === 'closeAlertcontinueTravelAdvances' ||
          data === 'closeAlertdeleteNewDocumentSaved'
        ) {
          document.getElementById('btn_travel_new').click();
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:auto');
        }
      }
    });

    this.formTravelManagement = new FormGroup({});
    this.formTravelManagement = this.fb.group({
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
      id_travel_specific: '3',
      id_travel_activities: '7',
      id_transport: '',
      id_city: '',
      id_country: '28',
      id_state: '',
      id_terminal: '',
      date_begin: '',
      hour_begin: '00:00',
      hour_end: '00:01',
      date_end: '',
      id_terminalto: '',
      id_cityto: '',
      id_stateto: '',
      id_countryto: '28',
      id_hotels: '',
      travel_mileage: '1',
      name_travel_order: '',
      id_order: '',
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

    this.accionDataTableService.getActionDataTable().subscribe((res: any) => {
      if (res.action_method === 'deleteNewTravels') {
        this.deleteDestinations(res);
      }
      if (res.action_method === 'editNewTravel') {
        this.activate_submit = false;
        if (!this.bedit) {
          if (!this.bnew) {
            document.getElementById('funtionTravel').click();

            setTimeout(() => {
              document.getElementById('travel_new').scrollTo(0, 1300);
            }, 300);

            this.bedit = true;
          } else {
            this.bnew = false;
            this.bedit = true;
          }
        }

        if (this.bedit === true) {
          const object: any = this.editTrip.filter(result => result.id_travel.toString() === res.id.toString());

          this.formTravelManagement = new FormGroup({});
          this.formTravelManagement = this.fb.group({
            id_travel: object[0].id_travel,
            type_travel: object[0].type_travel,
            date_requests_begin: object[0].date_requests_begin,
            date_requests_end: object[0].date_requests_end,
            trip_text: object[0].trip_text,
            maintenance: object[0].maintenance,
            id_element_imputation: object[0].id_element_imputation,
            name_travel_graph: object[0].name_travel_graph,
            name_travel_costs: object[0].name_travel_costs,
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
            date_hotel_in: object[0].date_hotel_in,
            date_hotel_out: object[0].date_hotel_out,
            travel_mileage:
              this.transport_types.filter(data => data.id.toString() === object[0].id_transport.toString())[0].cttype === 'T'
                ? object[0].travel_mileage
                : '',
            name_travel_order: object[0].name_travel_order,
            id_order: object[0].id_order,
          });

          if (this.transport_types.filter(data => data.id.toString() === object[0].id_transport.toString())[0].cttype === 'T') {
            this.showMilenage = true;
          } else {
            this.showMilenage = false;
          }

          this.searchState(this.formTravelManagement.value, 'edit');
          this.searchStateto(this.formTravelManagement.value, 'edit');
          this.searchTerminal(this.formTravelManagement.value, 'edit');
          this.searchTerminalto(this.formTravelManagement.value, 'edit');
          this.searchHotel(this.formTravelManagement.value, 'edit');
          this.searchCostsCenterAndGrahp(this.formTravelManagement.value);
          this.searchOperationsGrahp(this.formTravelManagement.value, 'edit');

          this.arrayHotel = this.traverlsDestination.filter(
            result => result.travel_id.toString() === res.id.toString(),
          )[0].hotels;
        }
      }
    });

    this.travelsService.getNewTravels().subscribe((data: any) => {
      if (this.countAfter === 0) {
        if (document.getElementById('travel_new').className !== 'modal show') {
          this.travelProof = [
            {
              success: true,
              data: [{ data: [] }],
            },
          ];
          this.eployee_selected = null;
          document.getElementById('btn_travel_new').click();
          if (data) {
            this.clearFormGeneral();
            if (this.bnew) {
              document.getElementById('funtionTravel').click();
              this.bnew = false;
              this.bedit = false;
            }
          }
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      }
    });
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth',
    });
    this.travelManagementService.getplanningTravelRequests().subscribe((data: any) => {
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

      setTimeout(() => {
        this.formTravelManagement = new FormGroup({});
        this.formTravelManagement = this.fb.group({
          type_travel: '',
          date_requests_begin: '',
          date_requests_end: '',
          trip_text: '',
          maintenance: '',
          id_element_imputation: '',
          name_travel_graph: '',
          name_travel_costs: '',
          id_travel_costs: '',
          id_grahp: '',
          id_operations: '',
          id_travel_legal: '',
          id_travel_specific: '3',
          id_travel_activities: '7',
          id_transport: '',
          id_city: '',
          id_country: '28',
          id_state: '',
          id_terminal: '',
          date_begin: '',
          hour_begin: '00:00',
          hour_end: '00:01',
          date_end: '',
          id_terminalto: '',
          id_cityto: '',
          id_stateto: '',
          id_countryto: '28',
          id_hotels: '',
          travel_mileage: '1',
          name_travel_order: '',
          id_order: '',
        });
        this.searchState(this.formTravelManagement.value, 'edit');
        this.searchStateto(this.formTravelManagement.value, 'edit');
      }, 100);
    });

    const fecha = new Date();
    this.today =
      fecha.getFullYear().toString() +
      '/' +
      (fecha.getMonth().toString().length == 1 ? '0' + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString()) +
      '/' +
      (fecha.getDate().toString().length == 1 ? '0' + fecha.getDate().toString() : fecha.getDate().toString());
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

  countSaveAccount = 0;
  addHotel(form) {
    this.arrayHotel.push({
      id_save_hotel: this.countSaveAccount += 1,
      hotel_id: form.id_hotels,
      name: this.hotels.filter(data => data.id.toString() === form.id_hotels)[0].name,
      date_begin: form.date_hotel_in,
      date_end: form.date_hotel_out,
    });

    this.formTravelManagement.controls['id_hotels'].setValue('');
    this.formTravelManagement.controls['date_hotel_in'].setValue('');
    this.formTravelManagement.controls['date_hotel_out'].setValue('');
  }

  removeHotel(hotel) {
    this.arrayHotel.splice(this.arrayHotel.findIndex(filter => filter.id_save_hotel === hotel.id_save_hotel), 1);
  }

  ngOnDestroy() {
    this.countAfter += 1;
    this.countAfterAlert += 1;
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
      });
  }

  enterGraph(form) {
    this.travelManagementService.getFilterGraphs(form.id_element_imputation, form.name_travel_graph).subscribe((data: any) => {
      this.grahp = this.sortByAphabet(data.data);
      this.showListAutoCost = false;
      this.showListAutoOrder = false;
      this.showListAutoGraph = true;
    });
  }
  enterOrder(form) {
    this.travelManagementService.getFilterTravelOrders(form.name_travel_order).subscribe((orders: any) => {
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
    this.formTravelManagement.controls['id_travel_costs'].setValue('');
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
    this.formTravelManagement.controls['id_travel_costs'].setValue('');
    this.formTravelManagement.controls['name_travel_costs'].setValue('');
    this.kostl = false;
    this.nplnr = false;
    this.aufnr = false;
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
      case 'date_begin_hotel':
        this.formTravelManagement.controls['date_begin_hotel'].setValue('');
        break;
      case 'date_end_hotel':
        this.formTravelManagement.controls['date_end_hotel'].setValue('');
        break;
      default:
        break;
    }
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

  deleteUpload(param: any) {
    document.getElementById('btn_travel_new').click();
    this.deleteDocumenFile = param.file.name;
    const alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_ts'),
        message: this.t('message_alert_ts') + param.file.name.toString() + '?',
        confirmation: true,
        typeConfirmation: 'deleteNewDocumentSaved',
      },
    ];
    this.alert.setAlert(alertWarning[0]);
  }
  deleteDestinations(param: any) {
    document.getElementById('btn_travel_new').click();
    this.deleteDestination = param.id;
    const alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_ts'),
        message: '¿' + this.t('message_alert_one_ts') + this.deleteDestination.toString() + '?',
        confirmation: true,
        typeConfirmation: 'deleteNewDestinations',
      },
    ];
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
    modelFromdata.append('observation', model.trip_text.toUpperCase());
    modelFromdata.append('travel_graph_id', model.id_grahp);
    modelFromdata.append('travel_operation_id', model.id_operations);
    modelFromdata.append('employee_id', this.eployee_selected == null ? '' : this.eployee_selected.id.toString());
    modelFromdata.append('commentary', this.comentaryPlus);
    modelFromdata.append('travel_maintenance_order_id', model.id_order);
    modelFromdata.append('travels', JSON.stringify(this.traverlsDestination));
    modelFromdata.append('files_length', this.objectImg.length.toString());
    for (let index = 0; index < this.objectImg.length; index++) {
      modelFromdata.append('files_' + (index + 1).toString(), this.file[index]);
    }
    model = modelFromdata;

    this.formDataService.postNewTravel(model).subscribe(
      (data: any) => {
        this.ticket_advance = 0;
        const dayone = new Date(this.today).getTime();
        const dayTwo = new Date(data.data[0].travel_request.date_end).getTime();
        const validate = (dayTwo - dayone) / (1000 * 60 * 60 * 24);
        this.ticket_advance = data.data[0].travel_request.ticket;
        if (validate > -1) {
          if (data.success) {
            document.getElementById('closeTravels').click();
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_one_ts'),
                message: this.t('message_alert_two_ts') + this.ticket_advance + ' ?',
                confirmation: true,
                typeConfirmation: 'continueTravelAdvances',
              },
            ];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelsService.setResultSaved({
              success: true,
              third: this.eployee_selected == null ? false : true,
            });
            this.eployee_selected = null;
          }
        } else {
          if (data.success) {
            const tirthyDays = (dayone - dayTwo) / (1000 * 60 * 60 * 24);
            if (tirthyDays < 30 && tirthyDays > -30) {
              document.getElementById('closeTravels').click();
              const alertWarning: Alerts[] = [
                {
                  type: 'success',
                  title: this.t('type_alert_one_ts'),
                  message: this.t('message_alert_tree_ts') + this.ticket_advance + ' ?',
                  confirmation: true,
                  typeConfirmation: 'continueTravelAlowances',
                },
              ];
              this.alert.setAlert(alertWarning[0]);
              this.showSubmit = true;
              this.travelsService.setResultSaved({
                success: true,
                third: this.eployee_selected == null ? false : true,
              });
              this.eployee_selected = null;
            } else {
              document.getElementById('closeTravels').click();
              const alertWarning: Alerts[] = [
                {
                  type: 'warning',
                  title: this.t('type_alert_two_ts'),
                  message: this.t('message_alert_nineteen_ts') + this.ticket_advance + ' ?',
                  confirmation: true,
                  typeConfirmation: 'continueTravelRequests',
                },
              ];
              this.alert.setAlert(alertWarning[0]);
              this.showSubmit = true;
              this.travelsService.setResultSaved({
                success: true,
                third: this.eployee_selected == null ? false : true,
              });
              this.eployee_selected = null;
            }
          }
        }
      },
      (error: any) => {
        document.getElementById('closeTravels').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_tree_ts'),
            message: error.json().errors.toString() + ' - ' + this.t('message_alert_four_ts'),
            confirmation: true,
            typeConfirmation: 'continueTravelRequests',
          },
        ];
        this.showSubmit = true;
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }

  addDestination(modelPartial) {
    modelPartial.id_travel = this.count + 1;
    const dateIn = modelPartial.date_begin.split('-');
    const dateBeginIn = dateIn[2] + '/' + dateIn[1] + '/' + dateIn[0];
    const dateOut = modelPartial.date_end.split('-');
    const dateEndOut = dateOut[2] + '/' + dateOut[1] + '/' + dateOut[0];
    const dateInHotel = modelPartial.date_hotel_in.split('-');
    const dateOutHotel = modelPartial.date_hotel_out.split('-');
    this.editTrip.push(modelPartial);
    this.activate_submit = true;
    this.travelProof[0].data[0].data.push({
      field_0: modelPartial.id_travel,
      field_1:
        modelPartial.id_transport.toString() !== ''
          ? this.transport_types.filter(data => data.id.toString() === modelPartial.id_transport.toString())[0].name
          : '',
      field_2: modelPartial.id_city.toUpperCase(),
      field_3: this.terminalLocations.filter(data => data.id.toString() === modelPartial.id_terminal.toString())[0].name,
      field_4: dateBeginIn + ' ' + modelPartial.hour_begin,
      field_5: modelPartial.id_cityto.toUpperCase(),
      field_6: this.terminalLocationsto.filter(data => data.id.toString() === modelPartial.id_terminalto.toString())[0].name,
      field_7: dateEndOut + ' ' + modelPartial.hour_end,
      // field_8: hotell,
      // field_9: modelPartial.date_hotel_in !== '' ? dateBeginHotel : '',
      // field_10: modelPartial.date_hotel_out !== '' ? dateEndOutHotel : '',
      field_11: modelPartial.travel_mileage,
      field_12: {
        type_method: 'UPDATE',
        type_element: 'button',
        icon: 'fa-pencil',
        id: modelPartial.id_travel,
        title: 'Editar',
        action_method: 'editNewTravel',
        disable: false,
      },
      field_13: {
        type_method: 'DELETE',
        type_element: 'button',
        icon: 'fa-trash',
        id: modelPartial.id_travel,
        title: 'Eliminar',
        action_method: 'deleteNewTravels',
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
      hotels: this.arrayHotel,
      destination_location_id: modelPartial.id_stateto,
      destination_location_text: modelPartial.id_cityto,
      destination_terminal_id: modelPartial.id_terminalto,
      origin_datetime: modelPartial.date_begin + ' ' + modelPartial.hour_begin,
      destination_datetime: modelPartial.date_end + ' ' + modelPartial.hour_end,
    });

    this.count += 1;

    this.objectReport.emit(this.travelProof[0]);
    this.arrayHotel = [];
    this.closeTrip();
    this.activate_submit = true;
  }

  addDestinationEdit(modelEditPartial) {
    this.travelProof[0].data[0].data.splice(
      this.travelProof[0].data[0].data.findIndex(filter => filter.field_0 === modelEditPartial.id_travel),
      1,
    );
    this.traverlsDestination.splice(
      this.traverlsDestination.findIndex(filter => filter.travel_id === modelEditPartial.id_travel),
      1,
    );
    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 1000);

    this.addDestination(modelEditPartial);
  }
  colapseNew() {
    this.activate_submit = false;
    this.showMilenage = false;
    if (!this.bnew) {
      this.bnew = true;
    } else {
      this.bnew = false;
    }
    document.getElementById('funtionTravel').click();
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
    document.getElementById('funtionTravel').click();
    this.clearFormPartial();
  }
  mileageTravel(param) {
    if (this.transport_types.filter(data => data.id.toString() === param.id_transport.toString())[0].cttype == 'T') {
      this.showMilenage = true;
      this.formTravelManagement.controls['travel_mileage'].setValue('1');
    } else {
      this.showMilenage = false;
      this.formTravelManagement.controls['travel_mileage'].setValue('');
    }
  }
  searchState(form: any, acction: any) {
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
    this.searchHotel(form, 'edit');
  }
  searchTerminal(form: any, acction: any) {
    this.terminalLocations = [];
    this.travelManagementService.gettransportTerminals(form.id_country).subscribe((data: any) => {
      this.terminalLocations = this.sortByAphabet(data.data);
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
      this.terminalLocationsto = this.sortByAphabet(data.data);
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
    this.hotelsService.getshowHotels(form.id_countryto).subscribe((data: any) => {
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
  searchCostsCenterAndGrahp(form: any) {
    if (
      this.center_costs_travels.filter(data => data.id.toString() === form.id_element_imputation.toString())[0].code === 'KOSTL'
    ) {
      this.kostl = true;
      this.nplnr = false;
      this.aufnr = false;

      this.formTravelManagement.controls['id_grahp'].setValue('');
      this.formTravelManagement.controls['id_operations'].setValue('');
      this.formTravelManagement.controls['id_order'].setValue('');

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
    }
    if (
      this.center_costs_travels.filter(data => data.id.toString() === form.id_element_imputation.toString())[0].code === 'NPLNR'
    ) {
      this.kostl = false;
      this.nplnr = true;
      this.aufnr = false;

      this.formTravelManagement.controls['id_travel_costs'].setValue('');
      this.formTravelManagement.controls['id_order'].setValue('');

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
    if (
      this.center_costs_travels.filter(data => data.id.toString() === form.id_element_imputation.toString())[0].code === 'AUFNR'
    ) {
      this.kostl = false;
      this.nplnr = false;
      this.aufnr = true;

      this.formTravelManagement.controls['id_grahp'].setValue('');
      this.formTravelManagement.controls['id_operations'].setValue('');
      this.formTravelManagement.controls['id_travel_costs'].setValue('');

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
      this.operations = this.sortByAphabet(data.data);
      if (this.operations.length > 0) {
        if (acction === 'new') {
          this.formTravelManagement.controls['id_operations'].setValue('-1');
        }
      } else {
        this.formTravelManagement.controls['id_operations'].setValue('');
      }
    });
  }
  changeTypeTravel() {
    // if (param.type_travel === '3' || param.type_travel === '16') {
    //   this.formTravelManagement.controls['id_travel_legal'].setValue(this.legal_travels.filter(data => data.code === "P")[0].id.toString());
    //   this.changeTravelLegal('P');
    // }
    // else {
    //   this.formTravelManagement.controls['id_travel_legal'].setValue(this.legal_travels.filter(data => data.code === "M")[0].id.toString());
    //   this.changeTravelLegal('');
    // }
    // if (param.type_travel === '1' || param.type_travel === '3') {
    //   this.formTravelManagement.controls['id_state'].setValue(this.stateLocations.filter(data => data.code === 'NAL')[0].id.toString());
    //   this.formTravelManagement.controls['id_stateto'].setValue(this.stateLocationsto.filter(data => data.code === 'NAL')[0].id.toString());
    // } else {
    //   this.formTravelManagement.controls['id_state'].setValue(this.stateLocations.filter(data => data.code === 'INTER')[0].id.toString());
    //   this.formTravelManagement.controls['id_stateto'].setValue(this.stateLocationsto.filter(data => data.code === 'INTER')[0].id.toString());
    // }
  }

  changeTravelLegal(travelLegal: any) {
    if (travelLegal === 'P') {
      this.formTravelManagement.controls['id_element_imputation'].setValue(
        this.center_costs_travels.filter(data => data.code === 'NPLNR')[0].id.toString(),
      );
      this.kostl = false;
      this.nplnr = true;
      this.aufnr = false;
      this.travelManagementService
        .getTravelsGrahp(this.center_costs_travels.filter(data => data.code === 'NPLNR')[0].id.toString())
        .subscribe((data: any) => {
          this.grahp = this.sortByAphabet(data.data);
        });
    } else {
      this.formTravelManagement.controls['id_element_imputation'].setValue(
        this.center_costs_travels.filter(data => data.code === 'KOSTL')[0].id.toString(),
      );
      this.kostl = true;
      this.nplnr = false;
      this.aufnr = false;
      // this.travelManagementService.getTravelsCosts(this.center_costs_travels.filter(data => data.code === 'KOSTL')[0].id.toString()).
      //   subscribe((data: any) => {
      //     this.costs_travels = this.sortByAphabet(data.data);
      //   })
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
    this.grahp = [];
    this.travelProof = [];
    this.traverlsDestination = [];
    this.order_travels = [];
    this.travelProof.push({
      success: true,
      data: [
        {
          title: this.t('tittle_table_trayect'),
          title_table: this.t('subtittle_table_trayect'),
          labels: {
            field_1: {
              value: this.t('field_one'),
              type: 'string',
              sortable: false,
            },
            field_2: {
              value: this.t('field_two'),
              type: 'string',
              sortable: false,
            },

            field_3: {
              value: this.t('field_tree'),
              type: 'string',
              sortable: false,
            },
            field_4: {
              value: this.t('field_four'),
              type: 'string',
              sortable: false,
            },
            field_5: {
              value: this.t('field_five'),
              type: 'string',
              sortable: false,
            },
            field_6: {
              value: this.t('field_six'),
              type: 'string',
              sortable: false,
            },
            field_7: {
              value: this.t('field_seven'),
              type: 'string',
              sortable: false,
            },
            // field_8: {
            //   value: "Hotel",
            //   type: "string",
            //   sortable: false,
            // },
            // field_9: {
            //   value: "Ingreso al hotel",
            //   type: "string",
            //   sortable: false,
            // },
            // field_10: {
            //   value: "Salida del hotel",
            //   type: "string",
            //   sortable: false,
            // },
            field_11: {
              value: this.t('field_eleven'),
              type: 'string',
              sortable: false,
            },
            field_12: {
              value: this.t('field_twelve'),
              type: 'string',
              sortable: false,
            },
            field_13: {
              value: this.t('field_thriteen'),
              type: 'string',
              sortable: false,
            },
          },
          data: [],
        },
      ],
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
      name_travel_graph: '',
      name_travel_costs: '',
      id_travel_costs: '',
      id_grahp: '',
      id_operations: '',
      id_travel_legal: '',
      id_travel_specific: '3',
      id_travel_activities: '7',
      id_transport: '',
      id_city: '',
      id_country: '28',
      id_state: '',
      id_terminal: '',
      date_begin: '',
      hour_begin: '00:00',
      hour_end: '00:01',
      date_end: '',
      id_terminalto: '',
      id_cityto: '',
      id_stateto: '',
      id_countryto: '28',
      id_hotels: '',
      date_hotel_in: '',
      date_hotel_out: '',
      travel_mileage: '1',
      name_travel_order: '',
      id_order: '',
    });
    this.searchState(this.formTravelManagement.value, 'edit');
    this.searchStateto(this.formTravelManagement.value, 'edit');
  }
  dateComplete(days) {
    if (days.date_requests_begin !== '' && days.date_requests_end !== '') {
      if (this.travelProof[0].data[0].data.length === 0) {
        this.formTravelManagement.controls['date_begin'].setValue(days.date_requests_begin);
      }

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
          '0',
        )
        .subscribe(
          () => {
            // if ((dateEndCalculate - dateBeginCalculate) < 0 && data) {

            //   this.formTravelManagement.controls['date_requests_begin'].setValue('');
            //   this.formTravelManagement.controls['date_requests_end'].setValue('');

            //   document.getElementById("btn_travel_new").click();
            //   const alertDataWrong: Alerts[] = [{
            //     type: 'danger',
            //     title: 'Error',
            //     message: 'La fecha de inicio general de solicitud del viaje no puede ser mayor a la de finalizacion de la solicitud ¿Desea continuar con la solicitud?',
            //     confirmation: true,
            //     typeConfirmation: 'continueDestinationRequestsValidateDates'

            //   }];
            //   this.alert.setAlert(alertDataWrong[0]);
            // } else {
            //   if ((days.date_begin !== '') || (days.date_end !== '')) {
            //     if ((days.date_begin !== '')) {
            //       if ((days.date_requests_begin > days.date_begin)) {
            //         document.getElementById("btn_travel_new").click();
            //         const alertDataWrong: Alerts[] = [{
            //           type: 'danger',
            //           title: 'Error',
            //           message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje ¿Desea continuar con la solicitud?',
            //           confirmation: true,
            //           typeConfirmation: 'continueDestinationRequests1'

            //         }];
            //         this.alert.setAlert(alertDataWrong[0]);
            //       } else {
            //         if (this.travelProof[0].data[0].data.length > 0) {
            //           document.getElementById("btn_travel_new").click();

            //           this.dateBeginValidate(days);
            //           this.dateEndValidate(days);
            //           setTimeout(() => {
            //             if (this.array_wrong.length > 0) {
            //               document.getElementById("btn_travel_new").click();
            //               const alertDataWrong: Alerts[] = [{
            //                 type: 'danger',
            //                 title: 'Error',
            //                 message: 'La fecha de los trayectos' + ' ' + this.array_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje ¿Desea continuar con la solicitud?',
            //                 confirmation: true,
            //                 typeConfirmation: 'continueDestinationRequests1'

            //               }];
            //               this.alert.setAlert(alertDataWrong[0]);
            //             }
            //           }, 500);
            //         } else {
            //           this.activate = true;
            //           setTimeout(() => {
            //             this.objectReport.emit(this.travelProof[0]);
            //           }, 100);
            //           setTimeout(() => {
            //             document.getElementsByClassName('cke_top cke_reset_all')[0].remove()
            //           }, 2000);
            //         }
            //       }
            //     } else {
            //       if ((days.date_end !== '')) {
            //         if ((days.date_requests_end < days.date_end)) {
            //           document.getElementById("btn_travel_new").click();
            //           const alertDataWrong: Alerts[] = [{
            //             type: 'danger',
            //             title: 'Error',
            //             message: 'Las fechas del trayecto estan fuera de las establecidas en la solicitud del viaje ¿Desea continuar con la solicitud?',
            //             confirmation: true,
            //             typeConfirmation: 'continueDestinationRequests1'

            //           }];
            //           this.alert.setAlert(alertDataWrong[0]);
            //         } else {
            //           if (this.travelProof[0].data[0].data.length > 0) {
            //             document.getElementById("btn_travel_new").click();

            //             this.dateBeginValidate(days);
            //             this.dateEndValidate(days);
            //             setTimeout(() => {
            //               if (this.array_wrong.length > 0) {

            //                 document.getElementById("btn_travel_new").click();
            //                 const alertDataWrong: Alerts[] = [{
            //                   type: 'danger',
            //                   title: 'Error',
            //                   message: 'La fecha de los trayectos' + ' ' + this.array_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje ¿Desea continuar con la solicitud?',
            //                   confirmation: true,
            //                   typeConfirmation: 'continueDestinationRequests1'

            //                 }];
            //                 this.alert.setAlert(alertDataWrong[0]);
            //               }
            //             }, 500);
            //           } else {
            //             this.activate = true;
            //             setTimeout(() => {
            //               this.objectReport.emit(this.travelProof[0]);
            //             }, 100);
            //             setTimeout(() => {
            //               document.getElementsByClassName('cke_top cke_reset_all')[0].remove()
            //             }, 200);
            //           }
            //         }
            //       }
            //     }
            //   } else {
            //     if (this.travelProof[0].data[0].data.length > 0) {
            //       this.validateDateHeader = [];
            //       this.array_wrong = [];

            //       this.dateBeginValidate(days);
            //       this.dateEndValidate(days);
            //       setTimeout(() => {
            //         if (this.array_wrong.length > 0) {
            //           document.getElementById("btn_travel_new").click();
            //           const alertDataWrong: Alerts[] = [{
            //             type: 'danger',
            //             title: 'Error',
            //             message: 'La fecha de los trayectos' + ' ' + this.array_wrong.join(",") + ' ' + 'se encuentra fuera del rango de la fecha del viaje ¿Desea continuar con la solicitud?',
            //             confirmation: true,
            //             typeConfirmation: 'continueDestinationRequests1'

            //           }];
            //           this.alert.setAlert(alertDataWrong[0]);
            //         }
            //       }, 500);
            //     } else {
            //       this.activate = true;
            //       setTimeout(() => {
            //         this.objectReport.emit(this.travelProof[0]);
            //       }, 100);
            //       setTimeout(() => {
            //         document.getElementsByClassName('cke_top cke_reset_all')[0].remove()
            //       }, 1000);
            //     }
            //   }
            // }
            this.activate = true;
            setTimeout(() => {
              this.objectReport.emit(this.travelProof[0]);
            }, 100);
            setTimeout(() => {
              document.getElementsByClassName('cke_top cke_reset_all')[0].remove();
            }, 2000);
          },
          error => {
            this.activate = false;
            this.formTravelManagement.controls['date_requests_begin'].setValue('');
            this.formTravelManagement.controls['date_requests_end'].setValue('');
            document.getElementById('btn_travel_new').click();
            const alertDataWrong: Alerts[] = [
              {
                type: 'danger',
                title: 'Error',
                message: error.json().errors.toString() + this.t('message_alert_five_ts'),
                confirmation: true,
                typeConfirmation: 'continueDestinationRequests1',
              },
            ];
            this.alert.setAlert(alertDataWrong[0]);
          },
        );
    } else {
      this.activate = false;
      setTimeout(() => {
        this.objectReport.emit(this.travelProof[0]);
      }, 100);
    }
  }
  dateValidateTrayect(dateTrayect) {
    const dateBeginRequestCalculate = dateTrayect.date_requests_begin
      .toString()
      .replace('-', '')
      .replace('-', '');
    const dateEndRequestCalculate = dateTrayect.date_requests_end
      .toString()
      .replace('-', '')
      .replace('-', '');

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
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_six_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationRequests2',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      } else {
        if (dateTrayect.date_begin !== '') {
          const date = dateTrayect.date_begin
            .toString()
            .replace('-', '')
            .replace('-', '');
          if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
            this.formTravelManagement.controls['date_begin'].setValue('');
            document.getElementById('btn_travel_new').click();
            const alertDataWrong: Alerts[] = [
              {
                type: 'danger',
                title: 'Error',
                message: this.t('message_alert_seven_ts'),
                confirmation: true,
                typeConfirmation: 'continueDestinationRequests2',
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

            document.getElementById('btn_travel_new').click();
            const alertDataWrong: Alerts[] = [
              {
                type: 'danger',
                title: 'Error',
                message: this.t('message_alert_eight_ts'),
                confirmation: true,
                typeConfirmation: 'continueDestinationRequests2',
              },
            ];
            this.alert.setAlert(alertDataWrong[0]);
          }
        }
      }
    } else {
      if (dateTrayect.date_begin !== '') {
        const date = dateTrayect.date_begin
          .toString()
          .replace('-', '')
          .replace('-', '');
        if (date < dateBeginRequestCalculate || date > dateEndRequestCalculate) {
          this.formTravelManagement.controls['date_begin'].setValue('');
          document.getElementById('btn_travel_new').click();
          const alertDataWrong: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_nine_ts'),
              confirmation: true,
              typeConfirmation: 'continueDestinationRequests2',
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
          document.getElementById('btn_travel_new').click();
          const alertDataWrong: Alerts[] = [
            {
              type: 'danger',
              title: 'Error',
              message: this.t('message_alert_sten_ts'),
              confirmation: true,
              typeConfirmation: 'continueDestinationRequests2',
            },
          ];
          this.alert.setAlert(alertDataWrong[0]);
        }
      }
    }
  }
  hourvalidations(hourTrayect) {
    if (hourTrayect.date_begin === hourTrayect.date_end) {
      const hourBeginTrayect = hourTrayect.hour_begin.toString().replace(':', '');
      const hourEndTrayect = hourTrayect.hour_end.toString().replace(':', '');

      if (hourEndTrayect - hourBeginTrayect <= 0) {
        this.formTravelManagement.controls['hour_begin'].setValue('');
        this.formTravelManagement.controls['hour_end'].setValue('');
        document.getElementById('btn_travel_new').click();
        const alertDataWrong: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: this.t('message_alert_eleven_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationRequests3',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
    }
  }
  dateValidateHotel(daysHotel) {
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
            message: this.t('message_alert_twelve_ts'),
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
            message: this.t('message_alert_thirteen_ts'),
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
              message: this.t('message_alert_fourteen_ts'),
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
            message: this.t('message_alert_fiveteen_ts'),
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
            message: this.t('message_alert_seventeen_ts'),
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
            message: this.t('message_alert_eighteen_ts'),
            confirmation: true,
            typeConfirmation: 'continueDestinationHotel',
          },
        ];
        this.alert.setAlert(alertDataWrong[0]);
      }
    }
  }

  clearFormPartial() {
    // this.stateLocations = [];
    // this.stateLocationsto = [];
    // this.cityLocations = [];
    // this.cityLocationsto = [];
    // this.terminalLocations = [];
    // this.terminalLocationsto = [];
    // this.hotels = [];

    this.formTravelManagement.controls['id_transport'].setValue('');
    this.formTravelManagement.controls['id_city'].setValue('');
    this.formTravelManagement.controls['id_country'].setValue('28');
    this.formTravelManagement.controls['id_state'].setValue('249');
    this.formTravelManagement.controls['id_terminal'].setValue('');
    this.formTravelManagement.controls['date_begin'].setValue('');
    this.formTravelManagement.controls['hour_begin'].setValue('00:00');
    this.formTravelManagement.controls['hour_end'].setValue('');
    this.formTravelManagement.controls['date_end'].setValue('');
    this.formTravelManagement.controls['id_terminalto'].setValue('');
    this.formTravelManagement.controls['id_cityto'].setValue('');
    this.formTravelManagement.controls['id_stateto'].setValue('249');
    this.formTravelManagement.controls['id_countryto'].setValue('28');
    // this.formTravelManagement.controls['id_hotels'].setValue('');
    // this.formTravelManagement.controls['date_hotel_in'].setValue('');
    // this.formTravelManagement.controls['date_hotel_out'].setValue('');
    this.formTravelManagement.controls['travel_mileage'].setValue('1');
    this.arrayHotel = [];

    this.searchState(this.formTravelManagement.value, 'edit');
    this.searchStateto(this.formTravelManagement.value, 'edit');
  }
  // dateBeginValidate(days) {

  //   this.validateDateHeader = [];
  //   this.travelProof[0].data[0].data.forEach(element => {

  //     if (days.date_requests_begin > element.field_4.split(' ')[0]) {
  //       this.validateDateHeader.push({
  //         id_travel_wrong: element.field_0
  //       });
  //     }
  //   });

  //   for (let index = 0; index < this.validateDateHeader.length; index++) {

  //     const element = this.validateDateHeader[index].id_travel_wrong.toString();
  //     this.array_wrong.push(element);
  //   }
  // }
  // dateEndValidate(days) {

  //   this.validateDateHeader = [];

  //   this.travelProof[0].data[0].data.forEach(element => {

  //     if (days.date_requests_end < element.field_7.split(' ')[0]) {
  //       this.validateDateHeader.push({
  //         id_travel_wrong: element.field_0
  //       });
  //     }
  //   });

  //   for (let index = 0; index < this.validateDateHeader.length; index++) {

  //     const element = this.validateDateHeader[index].id_travel_wrong.toString();
  //     this.array_wrong.push(element);
  //   }
  // }
}
