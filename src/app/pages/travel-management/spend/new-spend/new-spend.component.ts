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
  showPdf
  showSizeTable

  constructor(public spendSharedService: SpendSharedService,
    public fileUploadService: FileUploadService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public fb: FormBuilder,
    public alert: AlertsService) {

    this.infoTableSpends = [{
      success: true,
      data: [{ data: [] }]
    }];

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'errorConfirmTravelSpendID' || data === 'errorValidationNewSpend') {
        document.getElementById("btn_spend_new").click();
      }
    })
    this.spendsService.getSpendListTravel().subscribe((travel: any) => {
      this.listTravelsFromSpend = travel.data;
    });
    this.spendsService.getSpendsTypes().subscribe((select: any) => {
      this.listSpendType = select.data[0];
    });
    this.spendsService.getSpendMoneyList().subscribe((money: any) => {
      this.listMoneyType = money.data;
    });

    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      this.spedsData = list.data;
    });

    this.spendSharedService.getNewSpend().subscribe((data: any) => {
      if (document.getElementById('spend_new').className !== 'modal show') {
        document.getElementById('btn_spend_new').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }
      this.refreshTableSpends();
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === "deleteSpend") {
        this.deleteSpend(data);
      }
    })

    this.formSpendTravel = new FormGroup({});
    this.formSpendTravel = fb.group({
      travel_request_id: "",
      travel_allowance_type_id: "",
      currency_id: "",
      value: "",
      date: "",
      observation: "",
      bill_number: "",
      control_number: "",
      nit: "",
      bussines_name: ""
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

  deleteUpload(param) {
    this.imgSpend.splice(this.imgSpend.findIndex(filter => filter.file.name === param.file.name), 1);
  }

  validateTravel(travel: any) {
    this.spedsData.forEach(element => {
      if (travel.travel_request_id.toString() === element.travel_request_id.toString()) {
        document.getElementById("closeSpends").click();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: "Ya existe una solicitud de gastos para el viaje",
          confirmation: true,
          typeConfirmation: 'errorConfirmTravelSpendID'
        }];
        this.alert.setAlert(alertWarning[0]);
      }
    });
  }

  deleteSpend(params) {
    this.infoTableSpends[0].data[0].data.splice(this.infoTableSpends[0].data[0].data.findIndex(filter => filter.field_0 === params.id), 1);

    this.objectReport.emit(this.infoTableSpends[0]);
  }
  aditionSpend(objectSpend) {
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
      field_11: {
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
      travel_allowance_type_id: objectSpend.travel_allowance_type_id,
      currency_id: objectSpend.currency_id,
      value: objectSpend.value,
      date: objectSpend.date,
      observation: objectSpend.observation,
      bill_number: objectSpend.bill_number,
      control_number: objectSpend.control_number,
      nit: objectSpend.nit,
      bussines_name: objectSpend.bussines_name
    });

    this.objectSpends = {
      travel_request_id: objectSpend.travel_request_id,
      allowances: this.objectAllowances,
      anexeds: [{
        file: this.imgSpend
      }]
    }
    console.log(this.objectSpends)

    setTimeout(() => {
      this.objectReport.emit(this.infoTableSpends[0]);
    }, 500);

  }
  cleanSpend() {
    this.formSpendTravel = this.fb.group({
      travel_request_id: "",
      travel_allowance_type_id: "",
      currency_id: "",
      value: "",
      date: "",
      observation: "",
      bill_number: "",
      control_number: "",
      nit: "",
      bussines_name: ""
    });
  }
  ngOnInit() {
  }

  newSpend(param) {
    console.log(this.objectSpends)
    this.spendsService.postSpendData(this.objectSpends).subscribe((data: any) => {
      console.log(data)
      const alertSuccess: Alerts[] = [{
        type: 'success',
        title: 'Confirmación',
        message: data.message,
        confirmation: false
      }];
      this.alert.setAlert(alertSuccess[0]);
    },
      (error: any) => {
        console.log(error)
        document.getElementById("btn_spend_new").click();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: error.json().errors.toString(),
          confirmation: true,
          typeConfirmation: 'errorValidationNewSpend'
        }];
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

  }
}
