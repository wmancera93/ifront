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

  public userAuthenticated: User = null;
  public searchByLetter: string;
  public nameEmployee: string = '';
  public searchEmployee: any[] = [];
  public showListAutoC: boolean = false;
  public eployee_selected: any = null;
  public ticket_allowance_request: string;

  constructor(public spendSharedService: SpendSharedService,
    public fileUploadService: FileUploadService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public fb: FormBuilder,
    public alert: AlertsService,
    public formDataService: FormDataService, public employeeService: EmployeeService) {

    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));

    this.infoTableSpends = [{
      success: true,
      data: [{ data: [] }]
    }];

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'ConfirmTravelSpendID' || data === 'ValidationNewSpend' || data === 'closeAlertConfirmTravelSpendID' || data === 'closeAlertValidationNewSpend' || data === 'closeAlertdeleteSpendNew') {
        debugger
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
      this.spendsService.getSpendListTravel().subscribe((travel: any) => {
        this.listTravelsFromSpend = travel.data;

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
        });

        if (this.formSpendTravel.value.travel_request_id !== '') {
          this.continue = data !== true ? true : false;
          this.validateTravel(this.formSpendTravel.value);
        }

      });

      if (document.getElementById('spend_new').className !== 'modal show') {
        document.getElementById('btn_spend_new').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }



    });

    this.spendSharedService.getDeleteSpend().subscribe((data) => {
      if (data === 'deleteSpend') {
        this.spendsService.getSpendListTravel().subscribe((travel: any) => {
          this.listTravelsFromSpend = travel.data;
        });
      }
    })

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      debugger
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
          });
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

    this.infoTableSpends[0].data[0].data.push({
      field_0: this.idSpend + 1,
      field_1: this.listTravelsFromSpend.filter((data) => data.id.toString() === objectSpend.travel_request_id.toString())[0].name_travel,
      field_2: this.listSpendType.filter((data) => data.id.toString() === objectSpend.travel_allowance_type_id.toString())[0].name,
      field_3: objectSpend.value,
      field_4: this.listMoneyType.filter((data) => data.id.toString() === objectSpend.currency_id.toString())[0].name,
      field_5: objectSpend.date,
      field_6: objectSpend.observation,
      field_7: objectSpend.bill_number,
      field_8: objectSpend.control_number,
      field_9: objectSpend.nit,
      field_10: objectSpend.bussines_name,
      field_11: objectSpend.cod_provider,
      field_12: objectSpend.authorization_number,
      field_13: objectSpend.populated,
      field_14: {
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: this.idSpend + 1,
        title: "Editar",
        action_method: "editNewSpend",
        disable: false
      },
      field_15: {
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
      population: objectSpend.populated
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
    debugger
    if (date_param == 'date_body') {
      this.formSpendTravel.controls['date'].setValue('');
    }
  }

  newSpend(param) {
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
        this.ticket_allowance_request = data.data.travel_allowance_request_a.id
        document.getElementById("closeSpends").click();
        this.spendsService.getSpendListTravel().subscribe((travel: any) => {
          this.listTravelsFromSpend = travel.data;
        });

        const alertSuccess: Alerts[] = [{
          type: 'success',
          title: 'Alerta',
          message: data.message + ' # ' + this.ticket_allowance_request,
          confirmation: false
        }];
        this.showSubmit = true;
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
            value: "Editar",
            type: "string",
            sortable: false,
          },
          field_15: {
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
  }
}
