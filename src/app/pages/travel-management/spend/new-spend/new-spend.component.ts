import { Component, OnInit, EventEmitter } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { SpendsCreate, ObjectSpends } from '../../../../models/common/travels_management/spends/spends';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { User } from '../../../../models/general/user';
import { EmployeeService } from '../../../../services/common/employee/employee.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-new-spend',
  templateUrl: './new-spend.component.html',
  styleUrls: ['./new-spend.component.css']
})
export class NewSpendComponent implements OnInit {

  public showSubmit = true;
  public filequotation = 'fileSpend';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public imgSpend: any[] = [];
  public icon: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public formSpendTravel: any;
  public file: any[] = [];
  public listTravelsFromSpend: any[] = [];
  public listSpendType: any[] = [];
  public listMoneyType: any[] = [];
  public infoTableSpends: any[] = [];
  public listTypeDocument: any[] = [];
  public spedsData: any[] = [];
  public idSpend = 0;
  public objectSpends: SpendsCreate;
  public objectAllowances: ObjectSpends[] = [];
  showPdf;
  showSizeTable;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public spendEdit = false;
  public spendNew = false;
  public activate_submit_spend = true;
  public continue = false;
  public collapse_is = false;
  public objectProof: any[] = [];
  public spend_delete_local: string;
  public center_costs_travels: any[] = [];
  public grahp: any[] = [];
  public costs_travels: any[] = [];
  public showListAutoCost = false;
  public showListAutoGraph = false;
  public showListAutoOrder = false;
  public operations: any[] = [];
  public order_travels: any[] = [];
  public accountContable: any[] = [];
  public distributionAccount: any[] = [];

  public userAuthenticated: User = null;
  public searchByLetter: string;
  public nameEmployee = '';
  public searchEmployee: any[] = [];
  public showListAutoC = false;
  public eployee_selected: any = null;
  public ticket_allowance_request: string;
  public ticket_travel_request: string;
  public edit = false;
  public objetcThird: any;
  public elementImputation = '';
  public typeCenterCost = '';
  public typeCenterCost_id = '';
  public typeCenterOrder = '';
  public typeCenterOrder_id = '';
  public grahpSpend = '';
  public grahpSpend_id = '';
  public distribution = '';
  public accountContableVariable = '';
  public operationsSpend = '';
  public kostl = true;
  public nplnr = false;
  public aufnr = false;
  public translate: Translate = null;
  public typeSpend: string;


  constructor(public spendSharedService: SpendSharedService,
    public fileUploadService: FileUploadService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public fb: FormBuilder,
    public alert: AlertsService,
    public formDataService: FormDataService, public employeeService: EmployeeService,
    public travelManagementService: TravelService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    this.nameReport = this.translate.app.frontEnd.pages.travel_management.spend.new_spend.tittle_ts;
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
    this.infoTableSpends = [{
      success: true,
      data: [{ data: [] }]
    }];

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'ConfirmTravelSpendID' || data === 'ValidationNewSpend' || data === 'closeAlertConfirmTravelSpendID' || data === 'closeAlertValidationNewSpend' || data === 'closeAlertdeleteSpendNew') {
        document.getElementById('btn_spend_new').click();
        this.activate_submit_spend = true;
        this.showSubmit = true;
      }
      if (data === 'deleteSpendNew') {
        this.infoTableSpends[0].data[0].data.splice(this.infoTableSpends[0].data[0].data.findIndex(filter => filter.field_0 === this.spend_delete_local), 1);
        this.objectReport.emit(this.infoTableSpends[0]);
        document.getElementById('btn_spend_new').click();
      }

    });


    this.spendSharedService.getNewSpend().subscribe((data: any) => {
      this.eployee_selected = null;
      if (data !== true) {
        this.ticket_travel_request = data;
        this.travelManagementService.getTravelRequestsByid(data, this.edit).subscribe((third: any) => {
          this.typeSpend = third.data[0].travel_request.travel_type_code;
          this.spendsService.getSpendsTypes(this.typeSpend).subscribe((select: any) => {
            this.listSpendType = this.sortByAphabet(select.data);
          });
          if (third.data[0].travel_request.employee_applicant_to_json.personal_code != JSON.parse(localStorage.getItem('user')).employee.pernr) {
            this.objetcThird = {
              id: third.data[0].travel_request.employee_applicant_to_json.id,
              name_complete: third.data[0].travel_request.employee_applicant_to_json.short_name
            };
            this.returnObjectSearch(this.objetcThird);
          } else {
            this.objetcThird = {};
            this.spendsService.getSpendListTravel(JSON.parse(localStorage.getItem('user')).employee_id.toString()).subscribe((travel: any) => {
              this.listTravelsFromSpend = this.sortByNumber(travel.data);
            });
          }
        });
        this.travelManagementService.getTravelsAllDetail(data).subscribe((detail: any) => {
          if (detail.data[0].travel_request.travel_costs_type_code === 'KOSTL') {
            this.nplnr = false;
            this.kostl = true;
            this.aufnr = false;
            this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
            this.typeCenterCost = detail.data[0].travel_request.travel_cost_code + '-' + detail.data[0].travel_request.travel_cost_name;
            this.grahpSpend = '';
            this.distribution = '100';
            this.operationsSpend = '';
            this.typeCenterOrder = '';
            this.typeCenterCost_id = detail.data[0].travel_request.travel_cost_id;
            this.grahpSpend_id = '';
            this.typeCenterOrder_id = '';
          }
          if (detail.data[0].travel_request.travel_costs_type_code === 'NPLNR') {
            this.searchOperationsGrahp(detail.data[0].travel_request.travel_graph_code, '');
            this.nplnr = true;
            this.kostl = false;
            this.aufnr = false;
            this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
            this.typeCenterCost = '';
            this.typeCenterOrder = '';
            this.grahpSpend = detail.data[0].travel_request.travel_graph_code + '-' + detail.data[0].travel_request.travel_graph_name;
            this.distribution = '100';
            this.operationsSpend = detail.data[0].travel_request.travel_operation_id.toString();
            this.typeCenterCost_id = '';
            this.typeCenterOrder_id = '';
            this.grahpSpend_id = detail.data[0].travel_request.travel_graph_id;
          }
          if (detail.data[0].travel_request.travel_costs_type_code === 'AUFNR') {
            debugger;
            this.nplnr = false;
            this.kostl = false;
            this.aufnr = true;
            this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
            this.typeCenterCost = '';
            this.typeCenterOrder = detail.data[0].travel_request.travel_order_code + '-' + detail.data[0].travel_request.travel_order_name;
            this.grahpSpend = '';
            this.distribution = '100';
            this.operationsSpend = '';
            this.typeCenterCost_id = '';
            this.typeCenterOrder_id = detail.data[0].travel_request.travel_maintenance_order_id;
            this.grahpSpend_id = '';
          }
        });
      } else {
        this.spendsService.getSpendListTravel(JSON.parse(localStorage.getItem('user')).employee_id.toString()).subscribe((travel: any) => {
          this.listTravelsFromSpend = this.sortByNumber(travel.data);
        });
      }



      this.refreshTableSpends();
      this.formSpendTravel = new FormGroup({});
      this.formSpendTravel = fb.group({
        travel_request_id: data !== true ? data : '',
        travel_allowance_type_id: '',
        currency_id: '',
        value: '',
        date: '',
        observation: '',
        bill_number: '',
        control_number: '',
        nit: '',
        bussines_name: '',
        cod_provider: '',
        authorization_number: '',
        populated: '',
        formA: '',
        document: ''
      });

      if (this.formSpendTravel.value.travel_request_id !== '') {
        this.continue = true;
        this.validateTravel(this.formSpendTravel.value);
      } else {
        this.continue = false;
      }

      if (document.getElementById('spend_new').className !== 'modal show') {
        document.getElementById('btn_spend_new').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }

    });

    this.spendSharedService.getDeleteSpend().subscribe((data) => {
      if (data === 'deleteSpend') {
        this.spendsService.getSpendListTravel(this.eployee_selected).subscribe((travel: any) => {
          this.listTravelsFromSpend = this.sortByNumber(travel.data);
        });
      }
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === 'deleteSpend') {
        this.deleteSpend(data);
      }
      if (data.action_method === 'editNewSpend') {

        this.spendEdit = true;
        this.spendNew = false;
        this.collapse_is = false;
        this.activate_submit_spend = false;


        if ((this.spendEdit === true)) {

          const objectSpend: any = this.objectProof.filter((result) => result.id_spend.toString() === data.id.toString());

          this.formSpendTravel = new FormGroup({});
          this.formSpendTravel = fb.group({
            id_spend: objectSpend[0].id_spend,
            travel_request_id: objectSpend[0].travel_request_id,
            travel_allowance_type_id: objectSpend[0].travel_allowance_type_id,
            currency_id: objectSpend[0].currency_id,
            value: objectSpend[0].value,
            date: objectSpend[0].date,
            observation: objectSpend[0].observation,
            bill_number: objectSpend[0].bill_number,
            control_number: objectSpend[0].control_number,
            nit: objectSpend[0].nit,
            bussines_name: objectSpend[0].bussines_name,
            cod_provider: objectSpend[0].cod_provider,
            authorization_number: objectSpend[0].authorization_number,
            populated: objectSpend[0].populated,
            formA: objectSpend[0].formA,
            document: objectSpend[0].document,
          });

          this.distributionAccount = this.objectAllowances.filter(result => result.id_temp.toString() === data.id.toString())[0].cost_dist;
        }
        document.getElementById('funtionSpendTravel').click();
        setTimeout(() => {
          document.getElementById('spend_new').scrollTo(0, 1200);
        }, 200);
      }
    });

    this.formSpendTravel = new FormGroup({});
    this.formSpendTravel = fb.group({
      travel_request_id: '',
      travel_allowance_type_id: '',
      currency_id: '',
      value: '',
      date: '',
      observation: '',
      bill_number: '',
      control_number: '',
      nit: '',
      bussines_name: '',
      cod_provider: '',
      authorization_number: '',
      populated: '',
      formA: '',
      document: ''
    });

    this.fileUploadService.getObjetFile().subscribe((data) => {
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
        setTimeout(() => {
          this.icon = data.name.split('.');
          this.iconDocument = this.icon[this.icon.length - 1];
          this.is_upload = true;
          this.file.push(data);
          this.imgSpend.push({ file: data, extension: this.iconDocument });

        }, 200);
      }, 1000);
    });
  }

  public disabledCode = false;

  maskCode(param) {
    this.disabledCode = true;
    let word = '';
    let wordView = '';
    const filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890-';

    for (let i = 0; i < param.control_number.length; i++) {
      if (filtro.indexOf(param.control_number.charAt(i)) != -1) {
        word += param.control_number.charAt(i);
      }
    }

    wordView = word;

    if (word.match(/^\w{2}$/) !== null) {
      wordView = word + '-';
    }
    if (word.match(/^\w{2}-\w{2}$/) !== null) {
      wordView = word + '-';
    }
    if (word.match(/^\w{2}-\w{2}-\w{2}$/) !== null) {
      wordView = word + '-';
    }
    if (word.match(/^\w{2}-\w{2}-\w{2}-\w{2}$/) !== null) {
      wordView = word + '-';
    }

    this.formSpendTravel.controls['control_number'].setValue(wordView);

    if (this.formSpendTravel.value.control_number === wordView) {
      this.disabledCode = false;
    }
  }

  ngOnInit() {

    this.spendsService.getSpendMoneyList().subscribe((money: any) => {
      this.listMoneyType = money.data;
    });

    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      this.spedsData = list.data;
    });

    this.spendsService.getTypesDocument().subscribe((document: any) => {
      this.listTypeDocument = this.sortByAphabet(document.data);
    });
    this.travelManagementService.getplanningTravelRequests().
      subscribe((data: any) => {
        this.center_costs_travels = this.sortByAphabet(data.data.travel_costs_types);
      });
    this.spendsService.getAccountContable().
      subscribe((account: any) => {
        this.accountContable = this.sortByAphabet(account.data);
      });
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
  sortByNumber(dataBySort: any) {
    dataBySort.sort(function (a, b) {
      return b.id - a.id;
    });
    return dataBySort;
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
        });
    }

  }

  returnObjectSearch(ObjectSearch: any) {
    this.eployee_selected = ObjectSearch;
    this.searchByLetter = null;
    this.searchEmployee = [];
    this.spendsService.getSpendListTravel(this.eployee_selected.id).subscribe((travel: any) => {
      this.listTravelsFromSpend = this.sortByNumber(travel.data);
    });

    this.typeCenterCost = '';
    this.typeCenterCost_id = '';
    this.elementImputation = '';
    this.kostl = false;
    this.nplnr = false;
    this.aufnr = false;
  }

  deleteEmployeeThird() {
    this.eployee_selected = null;
    this.typeCenterCost = '';
    this.typeCenterCost_id = '';
    this.elementImputation = '';
    this.costs_travels = [];
    this.kostl = false;
    this.nplnr = false;
    this.aufnr = false;
  }

  deleteUpload(param) {
    this.imgSpend.splice(this.imgSpend.findIndex(filter => filter.file.name === param.file.name), 1);
  }

  validateTravel(travel: any) {

    if (travel.travel_request_id.toString() !== '') {
      this.continue = true;
      this.activate_submit_spend = false;
      this.spendEdit = false;
      this.spendNew = true;


      this.spedsData.forEach(element => {
        debugger;
        if (travel.travel_request_id.toString() === element.ticket_travel.toString()) {
          document.getElementById('closeSpends').click();
          const alertWarning: Alerts[] = [{
            type: 'danger',
            title: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.type_alert_one_ts,
            message: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.message_alert_tree_ts,
            confirmation: true,
            typeConfirmation: 'ConfirmTravelSpendID'

          }];
          this.alert.setAlert(alertWarning[0]);

        }
      });
      this.ticket_travel_request = travel.travel_request_id;
      this.travelManagementService.getTravelsAllDetail(travel.travel_request_id.toString()).subscribe((detail: any) => {
        this.typeSpend = detail.data[0].travel_request.travel_type_code;
        this.spendsService.getSpendsTypes(this.typeSpend).subscribe((select: any) => {
          this.listSpendType = this.sortByAphabet(select.data);
        });
        if (detail.data[0].travel_request.travel_costs_type_code === 'KOSTL') {
          this.nplnr = false;
          this.kostl = true;
          this.aufnr = false;
          this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
          this.typeCenterCost = detail.data[0].travel_request.travel_cost_code + '-' + detail.data[0].travel_request.travel_cost_name;
          this.grahpSpend = '';
          this.distribution = '100';
          this.operationsSpend = '';
          this.typeCenterOrder = '';
          this.typeCenterCost_id = detail.data[0].travel_request.travel_cost_id;
          this.grahpSpend_id = '';
          this.typeCenterOrder_id = '';
        }
        if (detail.data[0].travel_request.travel_costs_type_code === 'NPLNR') {
          this.searchOperationsGrahp(detail.data[0].travel_request.travel_graph_code, '');
          this.nplnr = true;
          this.kostl = false;
          this.aufnr = false;
          this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
          this.typeCenterCost = '';
          this.typeCenterOrder = '';
          this.grahpSpend = detail.data[0].travel_request.travel_graph_code + '-' + detail.data[0].travel_request.travel_graph_name;
          this.distribution = '100';
          this.operationsSpend = detail.data[0].travel_request.travel_operation_id.toString();
          this.typeCenterCost_id = '';
          this.typeCenterOrder_id = '';
          this.grahpSpend_id = detail.data[0].travel_request.travel_graph_id;
        }
        if (detail.data[0].travel_request.travel_costs_type_code === 'AUFNR') {
          this.nplnr = false;
          this.kostl = false;
          this.aufnr = true;
          this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
          this.typeCenterCost = '';
          this.typeCenterOrder = detail.data[0].travel_request.travel_order_code + '-' + detail.data[0].travel_request.travel_order_name;
          this.grahpSpend = '';
          this.distribution = '100';
          this.operationsSpend = '';
          this.typeCenterCost_id = '';
          this.typeCenterOrder_id = detail.data[0].travel_request.travel_maintenance_order_id;
          this.grahpSpend_id = '';
        }
      });

    } else {
      this.continue = false;
      this.refreshPartialSpend();
    }
    setTimeout(() => {
      document.getElementById('collapseNewSpend').className = 'show';
    }, 200);


  }

  deleteSpend(params) {

    document.getElementById('btn_spend_new').click();

    const alertWarning = [{
      type: 'warning',
      title: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.type_alert_two_ts,
      message: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.message_alert_four_ts,
      confirmation: true,
      typeConfirmation: 'deleteSpendNew'
    }];
    this.alert.setAlert(alertWarning[0]);
    this.spend_delete_local = params.id;
  }

  aditionSpend(objectSpend) {
    objectSpend.id_spend = this.idSpend + 1;
    this.objectProof.push(objectSpend);
    const date = objectSpend.date.split('-');
    const dateSpend = date[2] + '/' + date[1] + '/' + date[0];
    this.infoTableSpends[0].data[0].data.push({
      field_0: this.idSpend + 1,
      field_1: this.listTravelsFromSpend.filter((data) => data.id.toString() === objectSpend.travel_request_id.toString())[0].name_travel,
      field_2: this.listSpendType.filter((data) => data.id.toString() === objectSpend.travel_allowance_type_id.toString())[0].name,
      field_3: objectSpend.value,
      field_4: this.listMoneyType.filter((data) => data.id.toString() === objectSpend.currency_id.toString())[0].name,
      field_5: objectSpend.date !== '' ? dateSpend : '',
      field_6: objectSpend.observation.toUpperCase(),
      field_7: objectSpend.bill_number,
      field_8: objectSpend.control_number,
      field_9: objectSpend.nit,
      field_10: objectSpend.bussines_name.toUpperCase(),
      field_11: objectSpend.cod_provider.toUpperCase(),
      field_12: objectSpend.authorization_number,
      field_13: objectSpend.populated.toUpperCase(),
      field_14: objectSpend.formA === true ? 'Si' : 'No',
      field_15: this.listTypeDocument.filter((data) => data.id.toString() === objectSpend.document.toString())[0].name,
      field_16: {
        type_method: 'UPDATE',
        type_element: 'button',
        icon: 'fa-pencil',
        id: this.idSpend + 1,
        title: 'Editar',
        action_method: 'editNewSpend',
        disable: false
      },
      field_17: {
        type_method: 'DELETE',
        type_element: 'button',
        icon: 'fa-trash',
        id: this.idSpend + 1,
        title: 'Eliminar',
        action_method: 'deleteSpend',
        disable: false
      }

    });

    this.objectAllowances.push({
      id: null,
      id_temp: objectSpend.id_spend,
      travel_allowance_type_id: objectSpend.travel_allowance_type_id,
      currency_id: objectSpend.currency_id,
      value: objectSpend.value,
      date: objectSpend.date,
      observation: objectSpend.observation,
      bill_number: objectSpend.bill_number,
      control_number: objectSpend.control_number,
      nit: objectSpend.nit,
      bussines_name: objectSpend.bussines_name,
      doc_num_origin: objectSpend.authorization_number,
      provider_code: objectSpend.cod_provider,
      population: objectSpend.populated,
      have_format: objectSpend.formA == false ? 'false' : 'true',
      type_of_expense_document: objectSpend.document,
      cost_dist: this.distributionAccount
    });

    setTimeout(() => {
      this.objectReport.emit(this.infoTableSpends[0]);
    }, 500);

    this.idSpend += 1;
    this.refreshPartialSpend();
    this.spendNew = false;
    this.spendEdit = false;
    this.collapse_is = true;
    this.activate_submit_spend = true;

    this.distributionAccount = [];

    document.getElementById('funtionSpendTravel').click();
  }

  aditionSpendEdit(objectSpendEdit) {
    this.infoTableSpends[0].data[0].data.splice(this.infoTableSpends[0].data[0].data.findIndex(filter => filter.field_0 === objectSpendEdit.id_spend), 1);
    this.objectAllowances.splice(this.objectAllowances.findIndex(filter => filter.id_temp === objectSpendEdit.id_spend), 1);
    this.objectReport.emit(this.infoTableSpends[0]);
    this.aditionSpend(objectSpendEdit);
    this.spendNew = false;
    this.spendEdit = false;
  }

  colapse() {
    this.activate_submit_spend = false;
    this.spendEdit = false;
    this.spendNew = true;
    this.collapse_is = false;
    document.getElementById('funtionSpendTravel').click();
    setTimeout(() => {
      document.getElementById('spend_new').scrollTo(0, 1200);
    }, 200);

    this.travelManagementService.getTravelsAllDetail(this.ticket_travel_request).subscribe((detail: any) => {
      if (detail.data[0].travel_request.travel_costs_type_code === 'KOSTL') {
        this.nplnr = false;
        this.kostl = true;
        this.aufnr = false;
        this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
        this.typeCenterCost = detail.data[0].travel_request.travel_cost_code + '-' + detail.data[0].travel_request.travel_cost_name;
        this.grahpSpend = '';
        this.distribution = '100';
        this.operationsSpend = '';
        this.typeCenterOrder = '';
        this.typeCenterCost_id = detail.data[0].travel_request.travel_cost_id;
        this.grahpSpend_id = '';
        this.typeCenterOrder_id = '';
      }
      if (detail.data[0].travel_request.travel_costs_type_code === 'NPLNR') {
        this.searchOperationsGrahp(detail.data[0].travel_request.travel_graph_code, '');
        this.nplnr = true;
        this.kostl = false;
        this.aufnr = false;
        this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
        this.typeCenterCost = '';
        this.typeCenterOrder = '';
        this.grahpSpend = detail.data[0].travel_request.travel_graph_code + '-' + detail.data[0].travel_request.travel_graph_name;
        this.distribution = '100';
        this.operationsSpend = detail.data[0].travel_request.travel_operation_id.toString();
        this.typeCenterCost_id = '';
        this.typeCenterOrder_id = '';
        this.grahpSpend_id = detail.data[0].travel_request.travel_graph_id;
      }
      if (detail.data[0].travel_request.travel_costs_type_code === 'AUFNR') {
        this.nplnr = false;
        this.kostl = false;
        this.aufnr = true;
        this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
        this.typeCenterCost = '';
        this.typeCenterOrder = detail.data[0].travel_request.travel_order_code + '-' + detail.data[0].travel_request.travel_order_name;
        this.grahpSpend = '';
        this.distribution = '100';
        this.operationsSpend = '';
        this.typeCenterCost_id = '';
        this.typeCenterOrder_id = detail.data[0].travel_request.travel_maintenance_order_id;
        this.grahpSpend_id = '';
      }
    });

  }
  closeSpend() {
    this.showSubmit = true;
    this.spendNew = false;
    this.spendEdit = false;
    this.collapse_is = true;
    this.activate_submit_spend = true;
    document.getElementById('funtionSpendTravel').click();
    this.refreshPartialSpend();
  }

  delete(date_param) {
    if (date_param == 'date_body') {
      this.formSpendTravel.controls['date'].setValue('');
    }
    // if (date_param == 'money') {
    //   if (this.formSpendTravel.controls['value'].value > 300) {
    //     this.formSpendTravel.controls['value'].setValue('');
    //   }
    // }

  }

  selectTypeCenterImputations() {
    if (this.elementImputation === 'KOSTL') {
      this.kostl = true;
      this.nplnr = false;
      this.aufnr = false;

      this.formSpendTravel.controls['typeCenterOrder_id'].setValue('');
      this.formSpendTravel.controls['grahpSpend_id'].setValue('');
      this.formSpendTravel.controls['operationsSpend'].setValue('');

      const employee_center_coast = this.eployee_selected === null ? this.userAuthenticated.employee.cost_center : this.eployee_selected.cost_center;

      //let employee_center_coast = this.eployee_selected === null ? 'GACM00000N' : 'SSAD0GR00N';

      if (employee_center_coast !== null) {
        this.travelManagementService.getFilterTravelCost(this.center_costs_travels.filter((data) => data.code === this.elementImputation)[0].id, employee_center_coast).
          subscribe((data: any) => {
            this.returnCostSearchSpend(data.data[0]);
          });
      }

    } else {
      if (this.elementImputation === 'NPLNR') {
        this.kostl = false;
        this.nplnr = true;
        this.aufnr = false;

        this.formSpendTravel.controls['typeCenterCost_id'].setValue('');
        this.formSpendTravel.controls['typeCenterOrder_id'].setValue('');
      } else {
        if (this.elementImputation === 'AUFNR') {
          this.kostl = false;
          this.nplnr = false;
          this.aufnr = true;
          this.formSpendTravel.controls['typeCenterCost_id'].setValue('');
          this.formSpendTravel.controls['grahpSpend_id'].setValue('');
          this.formSpendTravel.controls['operationsSpend'].setValue('');
        }
      }
    }
  }


  enterCostSpend() {

    this.travelManagementService.getFilterTravelCost(this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id, this.typeCenterCost).
      subscribe((data: any) => {
        this.costs_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = true;
        this.showListAutoGraph = false;
        this.showListAutoOrder = false;
      });
  }

  enterGraphSpend() {
    this.travelManagementService.getFilterGraphs(this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id, this.grahpSpend).
      subscribe((data: any) => {
        this.grahp = this.sortByAphabet(data.data);
        this.showListAutoCost = false;
        this.showListAutoGraph = true;
        this.showListAutoOrder = false;
      });
  }

  enterOrderSpend() {
    this.travelManagementService.getFilterTravelOrders(this.typeCenterOrder.toUpperCase()).
      subscribe((data: any) => {
        this.order_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = false;
        this.showListAutoGraph = false;
        this.showListAutoOrder = true;
      });
  }
  returnCostSearchSpend(cost: any) {
    this.typeCenterCost = cost.code + '-' + cost.name;
    this.typeCenterCost_id = cost.id;
    this.costs_travels = [];
  }

  returnGraphSearchSpend(graph: any) {
    this.grahpSpend = graph.code + '-' + graph.name;
    this.grahp = [];
    this.grahpSpend_id = graph.id;
    this.searchOperationsGrahp(graph.code, 'edit');
  }
  returnOrderSearchOrder(order: any) {
    this.typeCenterOrder = order.code + '-' + order.name;
    this.order_travels = [];
    this.typeCenterOrder_id = order.id;
  }

  searchOperationsGrahp(graphCode: any, acction: any) {

    this.travelManagementService.getTravelsOperations(graphCode).
      subscribe((data: any) => {
        this.operations = this.sortByAphabet(data.data);
        if (this.operations.length > 0) {
          if (acction === 'new') {
            this.operationsSpend = '-1';
          }
        } else {
          this.operationsSpend = '';
        }
      });
  }

  countSaveAccount = 0;
  saveAccount() {
    this.distributionAccount.push({
      id: this.countSaveAccount += 1,
      travel_costs_id: this.typeCenterCost_id,
      travel_graphs_id: this.grahpSpend_id,
      travel_maintenance_order_id: this.typeCenterOrder_id,
      travel_costs_types_id: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id,
      travel_operations_id: this.operationsSpend,
      accounting_accounts_id: this.accountContableVariable,
      distribution: this.distribution,
      element_imputation: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].name,
      center_cost: this.typeCenterCost === '' ? 'N/A' : this.typeCenterCost,
      graph_code: this.grahpSpend === '' ? 'N/A' : this.grahpSpend,
      operations: this.operationsSpend === '' ? 'N/A' : this.operations.filter(data => data.id.toString() === this.operationsSpend.toString())[0].name,
      // account_contable: this.accountContableVariable + '- prueb'
      account_contable: this.accountContable.filter(data => data.id.toString() === this.accountContableVariable)[0].name,
      order_name: this.typeCenterOrder === '' ? 'N/A' : this.typeCenterOrder,
    });

    this.elementImputation = '';
    this.grahpSpend_id = '';
    this.typeCenterOrder_id = '';
    this.typeCenterOrder = '';
    this.typeCenterCost = '';
    this.typeCenterCost_id = '';
    this.grahpSpend = '';
    this.distribution = '';
    this.operationsSpend = '';
    this.accountContableVariable = '';
  }

  removeAccount(pinterDistributions) {
    this.distributionAccount.splice(this.distributionAccount.findIndex(filter => filter.id === pinterDistributions.id), 1);
  }

  newSpend(param) {
    debugger;
    this.showSubmit = false;

    const spendsFormData = new FormData();
    spendsFormData.append('travel_request_id', param.travel_request_id.toString());
    spendsFormData.append('allowances', JSON.stringify(this.objectAllowances));
    spendsFormData.append('files_length', this.imgSpend.length.toString());
    spendsFormData.append('employee_id', this.eployee_selected == null ? '' : this.eployee_selected.id.toString());
    for (let index = 0; index < this.imgSpend.length; index++) {
      spendsFormData.append('files_' + (index + 1).toString(), this.file[index]);
    }

    param = spendsFormData;
    this.formDataService.postSpendsFormData(spendsFormData).subscribe(
      (data: any) => {
        this.ticket_allowance_request = data.data.travel_allowance_request_a.id;
        document.getElementById('closeSpends').click();
        this.spendsService.getSpendListTravel(this.eployee_selected).subscribe((travel: any) => {
          this.listTravelsFromSpend = travel.data;
        });
        const alertSuccess: Alerts[] = [{
          type: 'success',
          title: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.type_alert_ts,
          message: data.message,
          confirmation: false
        }];
        this.showSubmit = true;
        this.collapse_is = false;
        this.alert.setAlert(alertSuccess[0]);
        this.spendSharedService.setRefreshSpend({ success: true, third: this.eployee_selected == null ? false : true });
      },
      (error: any) => {
        document.getElementById('closeSpends').click();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.type_alert_one_ts,
          message: error.json().errors.toString() + this.translate.app.frontEnd.pages.travel_management.spend.new_spend.message_alert_five_ts,
          confirmation: true,
          typeConfirmation: 'ValidationNewSpend'
        }];
        this.showSubmit = true;
        this.collapse_is = false;
        this.alert.setAlert(alertWarning[0]);
      });
  }

  refreshTableSpends() {
    this.infoTableSpends = [];
    this.infoTableSpends.push({
      success: true,
      data: [{
        title: 'Gastos',
        title_table: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.tittle_table_ts,
        labels: {
          // field_1: {
          //   value: "Viaje",
          //   type: "string",
          //   sortable: false,
          // },
          field_2: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_cero,
            type: 'string',
            sortable: false,
          },

          field_3: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_one,
            type: 'string',
            sortable: false,
          },
          field_4: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_two,
            type: 'string',
            sortable: false,
          },
          field_5: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_three,
            type: 'string',
            sortable: false,
          },
          field_6: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_four,
            type: 'string',
            sortable: false,
          },
          field_7: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_five,
            type: 'string',
            sortable: false,
          },
          field_8: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_six,
            type: 'string',
            sortable: false,
          },
          field_9: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_seven,
            type: 'string',
            sortable: false,
          },
          field_10: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_eight,
            type: 'string',
            sortable: false,
          },
          // field_11: {
          //   value: "Código de proveedor ",
          //   type: "string",
          //   sortable: false,
          // },
          field_12: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_nine,
            type: 'string',
            sortable: false,
          },
          field_13: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_onecero,
            type: 'string',
            sortable: false,
          },
          field_14: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_oneone,
            type: 'string',
            sortable: false,
          },
          field_15: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_onetwo,
            type: 'string',
            sortable: false,
          },
          field_16: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_onethree,
            type: 'string',
            sortable: false,
          },
          field_17: {
            value: this.translate.app.frontEnd.pages.travel_management.spend.new_spend.field_onefour,
            type: 'string',
            sortable: false,
          }
        },
        data: [
        ]
      }]

    });
    setTimeout(() => {
      this.objectReport.emit(this.infoTableSpends[0]);
    }, 100);
    this.spendNew = true;
    this.collapse_is = false;
    this.activate_submit_spend = false;
    this.imgSpend = [];
    this.refreshPartialSpend();
    this.formSpendTravel.controls['travel_request_id'].setValue('');
  }

  refreshPartialSpend() {
    this.formSpendTravel.controls['travel_allowance_type_id'].setValue('');
    this.formSpendTravel.controls['currency_id'].setValue('');
    this.formSpendTravel.controls['value'].setValue('');
    this.formSpendTravel.controls['date'].setValue('');
    this.formSpendTravel.controls['observation'].setValue('');
    this.formSpendTravel.controls['bill_number'].setValue('');
    this.formSpendTravel.controls['control_number'].setValue('');
    this.formSpendTravel.controls['nit'].setValue('');
    this.formSpendTravel.controls['bussines_name'].setValue('');
    this.formSpendTravel.controls['cod_provider'].setValue('');
    this.formSpendTravel.controls['authorization_number'].setValue('');
    this.formSpendTravel.controls['populated'].setValue('');
    this.formSpendTravel.controls['formA'].setValue('');
    this.formSpendTravel.controls['document'].setValue('');
    this.distributionAccount = [];
    this.elementImputation = '';
    this.typeCenterCost = '';
    this.grahpSpend = '';
    this.distribution = '';
    this.operationsSpend = '';
    this.accountContableVariable = '';
  }

  onluNumberSpend(param, name) {
    debugger;
    let out = '';
    const filtro = '0123456789.,';
    switch (name) {
      case 'nit':
        for (let i = 0; i < param.nit.length; i++) {
          if (filtro.indexOf(param.nit.charAt(i)) != -1) {
            out += param.nit.charAt(i);
          }
        }
        this.formSpendTravel.controls['nit'].setValue(out);
        break;
      case 'bill':
        for (let i = 0; i < param.bill_number.length; i++) {
          if (filtro.indexOf(param.bill_number.charAt(i)) != -1) {
            out += param.bill_number.charAt(i);
          }
        }
        this.formSpendTravel.controls['bill_number'].setValue(out);
        break;
      case 'authorization':
        for (let i = 0; i < param.authorization_number.length; i++) {
          if (filtro.indexOf(param.authorization_number.charAt(i)) != -1) {
            out += param.authorization_number.charAt(i);
          }
        }
        this.formSpendTravel.controls['authorization_number'].setValue(out);
        break;
      case 'import':
        for (let i = 0; i < param.value.length; i++) {
          if (filtro.indexOf(param.value.charAt(i)) != -1) {
            out += param.value.charAt(i);
          }
        }
        this.formSpendTravel.controls['value'].setValue(out);
        break;
    }


  }
}
