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

@Component({
  selector: 'app-new-spend',
  templateUrl: './new-spend.component.html',
  styleUrls: ['./new-spend.component.css']
})
export class NewSpendComponent implements OnInit {

  public showSubmit: boolean = true;
  public filequotation = 'fileSpend';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public imgSpend: any[] = [];
  public icon: any[] = [];
  public iconDocument: string = '';
  public is_upload: boolean = false;
  public formSpendTravel: any;
  public file: any[] = [];
  public listTravelsFromSpend: any[] = [];
  public listSpendType: any[] = [];
  public listMoneyType: any[] = [];
  public infoTableSpends: any[] = [];
  public listTypeDocument: any[] = [];
  public spedsData: any[] = [];
  public idSpend: number = 0;
  public objectSpends: SpendsCreate;
  public objectAllowances: ObjectSpends[] = [];
  showPdf
  showSizeTable
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Gastos';
  public spendEdit: boolean = false;
  public spendNew: boolean = false;
  public activate_submit_spend: boolean = true;
  public continue: boolean = false;
  public collapse_is: boolean = false;
  public objectProof: any[] = [];
  public spend_delete_local: string;
  public center_costs_travels: any[] = [];
  public grahp: any[] = [];
  public costs_travels: any[] = [];
  public showListAutoCost: boolean = false;
  public showListAutoGraph: boolean = false;
  public operations: any[] = [];
  public accountContable: any[] = [];
  public distributionAccount: any[] = [];

  public userAuthenticated: User = null;
  public searchByLetter: string;
  public nameEmployee: string = '';
  public searchEmployee: any[] = [];
  public showListAutoC: boolean = false;
  public eployee_selected: any = null;
  public ticket_allowance_request: string;
  public edit: boolean = false;
  public objetcThird: any;
  public elementImputation: string = '';
  public typeCenterCost: string = '';
  public typeCenterCost_id: string = '';
  public grahpSpend: string = '';
  public grahpSpend_id: string = '';
  public distribution: string = '';
  public accountContableVariable: string = 'Prueba';
  public operationsSpend: string = '';
  public kostl: boolean = true;
  public nplnr: boolean = false;

  constructor(public spendSharedService: SpendSharedService,
    public fileUploadService: FileUploadService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public fb: FormBuilder,
    public alert: AlertsService,
    public formDataService: FormDataService, public employeeService: EmployeeService, public travelManagementService: TravelService) {

    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));

    this.infoTableSpends = [{
      success: true,
      data: [{ data: [] }]
    }];

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'ConfirmTravelSpendID' || data === 'ValidationNewSpend' || data === 'closeAlertConfirmTravelSpendID' || data === 'closeAlertValidationNewSpend' || data === 'closeAlertdeleteSpendNew') {
        document.getElementById("btn_spend_new").click();
        this.activate_submit_spend = true;
        this.showSubmit = true;
      }
      if (data === 'deleteSpendNew') {
        this.infoTableSpends[0].data[0].data.splice(this.infoTableSpends[0].data[0].data.findIndex(filter => filter.field_0 === this.spend_delete_local), 1);
        this.objectReport.emit(this.infoTableSpends[0]);
        document.getElementById("btn_spend_new").click();
      }

    })


    this.spendSharedService.getNewSpend().subscribe((data: any) => {
      this.eployee_selected = null;
      if (data !== true) {
        this.travelManagementService.getTravelRequestsByid(data, this.edit).subscribe((third: any) => {
          if (third.data[0].travel_request.employee_applicant_to_json.personal_code != JSON.parse(localStorage.getItem('user')).employee.pernr) {
            this.objetcThird = {
              id: third.data[0].travel_request.employee_applicant_to_json.id,
              name_complete: third.data[0].travel_request.employee_applicant_to_json.short_name
            }
            this.returnObjectSearch(this.objetcThird)
          } else {
            this.objetcThird = {}
            this.spendsService.getSpendListTravel(JSON.parse(localStorage.getItem('user')).employee_id.toString()).subscribe((travel: any) => {
              this.listTravelsFromSpend = this.sortByNumber(travel.data);
            });
          }
        })
        this.travelManagementService.getTravelsAllDetail(data).subscribe((detail: any) => {
          if (detail.data[0].travel_request.travel_costs_type_code === 'KOSTL') {
            this.nplnr = false;
            this.kostl = true;
            this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
            this.typeCenterCost = detail.data[0].travel_request.travel_cost_code + '-' + detail.data[0].travel_request.travel_cost_name;
            this.grahpSpend = '';
            this.distribution = '100';
            this.operationsSpend = '';
          } else {
            this.searchOperationsGrahp(detail.data[0].travel_request.travel_graph_code, '');
            this.nplnr = true;
            this.kostl = false;
            this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
            this.typeCenterCost = '';
            this.grahpSpend = detail.data[0].travel_request.travel_graph_code + '-' + detail.data[0].travel_request.travel_graph_name;
            this.distribution = '100';
            this.operationsSpend = detail.data[0].travel_request.travel_operation_id;
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
        travel_allowance_type_id: "",
        currency_id: "",
        value: "",
        date: "",
        observation: "",
        bill_number: "",
        control_number: "",
        nit: "",
        bussines_name: "",
        cod_provider: "",
        authorization_number: "",
        populated: "",
        formA: "",
        document: ""
      });

      if (this.formSpendTravel.value.travel_request_id !== '') {
        this.continue = data !== true ? true : false;
        this.validateTravel(this.formSpendTravel.value);
      }

      if (document.getElementById('spend_new').className !== 'modal show') {
        document.getElementById('btn_spend_new').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }

    });

    this.spendSharedService.getDeleteSpend().subscribe((data) => {
      if (data === 'deleteSpend') {
        this.spendsService.getSpendListTravel(this.eployee_selected).subscribe((travel: any) => {
          this.listTravelsFromSpend = this.sortByNumber(travel.data);
        });
      }
    })

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === "deleteSpend") {
        this.deleteSpend(data);
      }
      if (data.action_method === "editNewSpend") {

        this.spendEdit = true;
        this.spendNew = false;
        this.collapse_is = false;
        this.activate_submit_spend = false;


        if ((this.spendEdit === true)) {

          let objectSpend: any = this.objectProof.filter((result) => result.id_spend.toString() === data.id.toString());

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
        document.getElementById("funtionSpendTravel").click();
        setTimeout(() => {
          document.getElementById('spend_new').scrollTo(0, 1200);
        }, 200);
      }
    })

    this.formSpendTravel = new FormGroup({});
    this.formSpendTravel = fb.group({
      travel_request_id: '',
      travel_allowance_type_id: "",
      currency_id: "",
      value: "",
      date: "",
      observation: "",
      bill_number: "",
      control_number: "",
      nit: "",
      bussines_name: "",
      cod_provider: "",
      authorization_number: "",
      populated: "",
      formA: "",
      document: ""
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


  ngOnInit() {
    this.spendsService.getSpendsTypes().subscribe((select: any) => {
      this.listSpendType = this.sortByAphabet(select.data);
    });
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
      subscribe((data: any) => {
        this.accountContable = data.data;
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
        })
    }

  }

  returnObjectSearch(ObjectSearch: any) {
    this.eployee_selected = ObjectSearch;
    this.searchByLetter = null;
    this.searchEmployee = [];
    this.spendsService.getSpendListTravel(this.eployee_selected.id).subscribe((travel: any) => {
      this.listTravelsFromSpend = this.sortByNumber(travel.data);
    });
  }

  deleteEmployeeThird() {
    this.eployee_selected = null;
  }

  deleteUpload(param) {
    this.imgSpend.splice(this.imgSpend.findIndex(filter => filter.file.name === param.file.name), 1);
  }

  validateTravel(travel: any) {
    debugger
    if (travel.travel_request_id.toString() !== '') {
      this.continue = true;
      this.activate_submit_spend = false;
      this.spendEdit = false;
      this.spendNew = true;


      this.spedsData.forEach(element => {
        if (travel.travel_request_id.toString() === element.travel_request_id.toString()) {
          document.getElementById("closeSpends").click();
          const alertWarning: Alerts[] = [{
            type: 'danger',
            title: 'Advertencia',
            message: "Ya existe una solicitud de gastos para el viaje",
            confirmation: true,
            typeConfirmation: 'ConfirmTravelSpendID'

          }];
          this.alert.setAlert(alertWarning[0]);

        }
      });
      this.travelManagementService.getTravelsAllDetail(travel.travel_request_id.toString()).subscribe((detail: any) => {

        if (detail.data[0].travel_request.travel_costs_type_code === 'KOSTL') {
          this.nplnr = false;
          this.kostl = true;
          this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
          this.typeCenterCost = detail.data[0].travel_request.travel_cost_code + '-' + detail.data[0].travel_request.travel_cost_name;
          this.grahpSpend = '';
          this.distribution = '100';
          this.operationsSpend = '';
        } else {
          this.searchOperationsGrahp(detail.data[0].travel_request.travel_graph_code, '');
          this.nplnr = true;
          this.kostl = false;
          this.elementImputation = detail.data[0].travel_request.travel_costs_type_code;
          this.typeCenterCost = '';
          this.grahpSpend = detail.data[0].travel_request.travel_graph_code + '-' + detail.data[0].travel_request.travel_graph_name;
          this.distribution = '100';
          this.operationsSpend = detail.data[0].travel_request.travel_operation_id;
        }
      });

    } else {
      this.continue = false;
      this.refreshPartialSpend();
    }
    setTimeout(() => {
      document.getElementById('collapseNewSpend').className = "show";
    }, 200);


  }

  deleteSpend(params) {

    document.getElementById("btn_spend_new").click();

    let alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el gasto?',
      confirmation: true,
      typeConfirmation: 'deleteSpendNew'
    }];
    this.alert.setAlert(alertWarning[0]);
    this.spend_delete_local = params.id;
  }

  aditionSpend(objectSpend) {
    objectSpend.id_spend = this.idSpend + 1;
    this.objectProof.push(objectSpend)
    let date = objectSpend.date.split('-');
    let dateSpend = date[2] + '/' + date[1] + '/' + date[0];
    this.infoTableSpends[0].data[0].data.push({
      field_0: this.idSpend + 1,
      field_1: this.listTravelsFromSpend.filter((data) => data.id.toString() === objectSpend.travel_request_id.toString())[0].name_travel,
      field_2: this.listSpendType.filter((data) => data.id.toString() === objectSpend.travel_allowance_type_id.toString())[0].name,
      field_3: objectSpend.value,
      field_4: this.listMoneyType.filter((data) => data.id.toString() === objectSpend.currency_id.toString())[0].name,
      field_5: objectSpend.date !== '' ? dateSpend : '',
      field_6: objectSpend.observation,
      field_7: objectSpend.bill_number,
      field_8: objectSpend.control_number,
      field_9: objectSpend.nit,
      field_10: objectSpend.bussines_name,
      field_11: objectSpend.cod_provider,
      field_12: objectSpend.authorization_number,
      field_13: objectSpend.populated,
      field_14: objectSpend.formA === true ? 'Si' : 'No',
      field_15: this.listTypeDocument.filter((data) => data.id.toString() === objectSpend.document.toString())[0].name,
      field_16: {
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: this.idSpend + 1,
        title: "Editar",
        action_method: "editNewSpend",
        disable: false
      },
      field_17: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: this.idSpend + 1,
        title: "Eliminar",
        action_method: "deleteSpend",
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

    this.idSpend += 1
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

  }
  closeSpend() {
    this.showSubmit = true;
    this.spendNew = false;
    this.spendEdit = false;
    this.collapse_is = true;
    this.activate_submit_spend = true;
    document.getElementById("funtionSpendTravel").click();
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
    debugger
    console.log(this.elementImputation)
    if (this.elementImputation === 'KOSTL') {
      this.kostl = true;
      this.nplnr = false;
    } else {
      this.kostl = false;
      this.nplnr = true;
    }
  }


  enterCostSpend() {

    this.travelManagementService.getFilterTravelCost(this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id, this.typeCenterCost).
      subscribe((data: any) => {
        this.costs_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = true;
      });
  }

  enterGraphSpend() {
    this.travelManagementService.getFilterGraphs(this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id, this.grahpSpend).
      subscribe((data: any) => {
        this.grahp = this.sortByAphabet(data.data);
        this.showListAutoCost = false;
        this.showListAutoGraph = true;
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
    this.searchOperationsGrahp(graph.code, 'edit')
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
      })
  }

  countSaveAccount: number = 0;
  saveAccount() {
    this.distributionAccount.push({
      id: this.countSaveAccount += 1,
      travel_costs_id: this.typeCenterCost_id,
      travel_graphs_id: this.grahpSpend_id,
      travel_costs_types_id: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id,
      travel_operations_id: this.operationsSpend,
      accounting_accounts_id: this.accountContableVariable,
      distribution: this.distribution,
      element_imputation: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].name,
      center_cost: this.typeCenterCost === '' ? 'N/A' : this.typeCenterCost,
      graph_code: this.grahpSpend === '' ? 'N/A' : this.grahpSpend,
      operations: this.operationsSpend === '' ? 'N/A' : this.operations.filter(data => data.id.toString() === this.operationsSpend)[0].name,
      // account_contable: this.accountContableVariable + '- prueb'
      account_contable: this.accountContable.filter(data => data.id === this.accountContableVariable)[0].name,
    })

    this.elementImputation = '';
    this.grahpSpend_id = '';
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
    debugger
    this.showSubmit = false;

    const spendsFormData = new FormData();
    spendsFormData.append('travel_request_id', param.travel_request_id.toString());
    spendsFormData.append('allowances', JSON.stringify(this.objectAllowances));
    spendsFormData.append('files_length', this.imgSpend.length.toString())
    spendsFormData.append('employee_id', this.eployee_selected == null ? '' : this.eployee_selected.id.toString());
    for (let index = 0; index < this.imgSpend.length; index++) {
      spendsFormData.append('files_' + (index + 1).toString(), this.file[index]);
    };

    param = spendsFormData;
    this.formDataService.postSpendsFormData(spendsFormData).subscribe(
      (data: any) => {
        debugger
        this.ticket_allowance_request = data.data.travel_allowance_request_a.id
        document.getElementById("closeSpends").click();
        this.spendsService.getSpendListTravel(this.eployee_selected).subscribe((travel: any) => {
          this.listTravelsFromSpend = travel.data;
        });

        const alertSuccess: Alerts[] = [{
          type: 'success',
          title: 'Alerta',
          message: data.message,
          confirmation: false
        }];
        this.showSubmit = true;
        this.collapse_is = false;
        this.alert.setAlert(alertSuccess[0]);
        this.spendSharedService.setRefreshSpend({ success: true, third: this.eployee_selected == null ? false : true });
      },
      (error: any) => {
        document.getElementById("btn_spend_new").click();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: error.json().errors.toString(),
          confirmation: true,
          typeConfirmation: 'ValidationNewSpend'
        }];
        this.showSubmit = true;
        this.collapse_is = false;
        this.alert.setAlert(alertWarning[0]);
      })
  }

  refreshTableSpends() {
    this.infoTableSpends = [];
    this.infoTableSpends.push({
      success: true,
      data: [{
        title: "Gastos",
        title_table: "Gastos solicitados",
        labels: {
          field_1: {
            value: "Viaje",
            type: "string",
            sortable: false,
          },
          field_2: {
            value: "Tipo de Gasto",
            type: "string",
            sortable: false,
          },

          field_3: {
            value: "Valor",
            type: "string",
            sortable: false,
          },
          field_4: {
            value: "Moneda",
            type: "string",
            sortable: false,
          },
          field_5: {
            value: "Fecha",
            type: "string",
            sortable: false,
          },
          field_6: {
            value: "Descripción",
            type: "string",
            sortable: false,
          },
          field_7: {
            value: "N° Factura",
            type: "string",
            sortable: false,
          },
          field_8: {
            value: "N° Control",
            type: "string",
            sortable: false,
          },
          field_9: {
            value: "NIT",
            type: "string",
            sortable: false,
          },
          field_10: {
            value: "Establecimiento",
            type: "string",
            sortable: false,
          },
          field_11: {
            value: "Código de proveedor ",
            type: "string",
            sortable: false,
          },
          field_12: {
            value: "Numero de autorización",
            type: "string",
            sortable: false,
          },
          field_13: {
            value: "Poblado",
            type: "string",
            sortable: false,
          },
          field_14: {
            value: "Diligencia formato",
            type: "string",
            sortable: false,
          },
          field_15: {
            value: "Tipo de documento",
            type: "string",
            sortable: false,
          },
          field_16: {
            value: "Editar",
            type: "string",
            sortable: false,
          },
          field_17: {
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
  }
}
