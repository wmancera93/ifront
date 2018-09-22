import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, ResponseContentType } from '@angular/http';
import { SpendsCreate, ObjectSpends } from '../../../../models/common/travels_management/spends/spends';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-spend',
  templateUrl: './edit-spend.component.html',
  styleUrls: ['./edit-spend.component.css']
})
export class EditSpendComponent implements OnInit {
  public showSubmit: boolean = true;
  public editSpendDetail: any;
  public editSpendTable: any;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Gastos';
  public idEditSpend: string;
  public spedsData: any[] = [];
  public listTravelsFromSpend: any[] = [];
  public listSpendType: any[] = [];
  public listMoneyType: any[] = [];
  public formSpendEditTravel: any;
  public annexes: any[] = [];
  public formatDate: any;
  public idSpend: number = 0;
  public objectSpends: SpendsCreate;
  public objectAllowancesEdit: ObjectSpends[] = [];
  public edit: boolean = true;
  public icon: any[] = [];
  public iconDocument: string = '';
  public is_upload: boolean = false;
  public file: any[] = [];
  public objectImg: any[] = [];
  public iconUpload: any[] = [];
  public filequotation = 'fileQuotationSpendEdit';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls'
  public buttonNewSpend: boolean = true;
  public labelNewSpend: boolean = false;
  public show_submit_editSpend: boolean = true;
  public edit_Spend: boolean = false;
  public alertWarning: any[] = [];
  public idFile: number;
  public id_Spend_Save: string;
  public objectSpendProvitional: any[] = [];
  public idSpendRequests: string;
  public ticketTravel: string;
  public nameSpend: string;

  showSizeTable
  showPdf

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public fb: FormBuilder,
    public http: Http, public fileUploadService: FileUploadService,
    public formDataService: FormDataService) {

    this.formSpendEditTravel = new FormGroup({});
    this.formSpendEditTravel = fb.group({
      travel_request_id: "",
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
      populated: ""
    });


    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'errorSaveSpendEdit' || data === 'closeAlertdeleteSavedSpend' || data === 'closeAlerterrorSaveSpendEdit'
        || data === 'closeAlertdeleteDocumentSavedSpend' || data === 'closeAlertdeleteDetailSpendEdit') {
        document.getElementById("btn_spend_edit").click();
      }

      if (data === 'deleteDocumentSavedSpend') {
        debugger
        this.buttonNewSpend = true;
        this.labelNewSpend = false;
        this.show_submit_editSpend = true;
        this.showSubmit = true;
        document.getElementById("btn_spend_edit").click();

        this.spendsService.deleteFileSpendData(this.idFile.toString()).subscribe((deleteSpend: any) => {
          this.annexes.splice(this.annexes.findIndex(filter => filter.id === this.idFile), 1);
        })
        document.getElementById("btn_spend_edit").click();
      }

      if (data === 'deleteDetailSpendEdit') {
        debugger
        this.spendsService.deleteDetailSpend(this.idEditSpend).subscribe((deleteSpend: any) => {
          this.editSpendTable.data.splice(this.editSpendTable.data.findIndex(filter => filter.field_0 === this.idEditSpend), 1);
          this.objectAllowancesEdit.splice(this.objectAllowancesEdit.findIndex(filter => filter.id === this.idEditSpend), 1);
          this.objectReport.emit({ success: true, data: [this.editSpendTable] });

          document.getElementById("btn_spend_edit").click();
        })
      }
      if (data === 'deleteDetailSpendEditCreated') {
        debugger
        this.editSpendTable.data.splice(this.editSpendTable.data.findIndex(filter => filter.field_0 === this.idEditSpend), 1);
        this.objectAllowancesEdit.splice(this.objectAllowancesEdit.findIndex(filter => filter.id === this.idEditSpend), 1);
        this.objectReport.emit({ success: true, data: [this.editSpendTable] });

        document.getElementById("btn_spend_edit").click();
      }

    });



    this.spendSharedService.getEditSpend().subscribe((idEdit: any) => {
      debugger
      this.idSpendRequests = idEdit;
      this.spendsService.getViewDetailSpends(idEdit, this.edit).subscribe((editSpend: any) => {
        debugger
        this.editSpendDetail = editSpend.data[0].travel_allowance_request.info_travel;
        this.ticketTravel = this.editSpendDetail.ticket;
        this.nameSpend = this.editSpendDetail.name_travel
        this.editSpendTable = editSpend.data[0].travel_allowances;
        this.annexes = editSpend.data[0].travel_request_annexeds;
        this.buttonNewSpend = true;
        this.labelNewSpend = false;
        this.show_submit_editSpend = true;
        this.showSubmit = true;

        setTimeout(() => {
          this.objectReport.emit({ data: [this.editSpendTable] });
        }, 500);

        if (document.getElementById('spend_edit').className !== 'modal show') {
          document.getElementById('btn_spend_edit').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
      })
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


    this.accionDataTableService.getActionDataTable().subscribe((action: any) => {

      debugger
      if (action.action_method == "updateTravelAllowance") {
        this.buttonNewSpend = false;
        this.labelNewSpend = false;
        this.show_submit_editSpend = false;
        this.showSubmit = false;
        this.edit_Spend = true;

        document.getElementById('EditfuntionSpend').click();
        setTimeout(() => {
          document.getElementById('spend_edit').scrollTo(0, 1200);
        }, 200);

        if ((this.edit_Spend === true)) {
          this.idEditSpend = action.id;
          this.spendsService.getDetailSpendEdit(this.idEditSpend).subscribe((data: any) => {
            this.formatDate = data.data.date_time.split("T")[0];
            this.formSpendEditTravel = new FormGroup({});
            this.formSpendEditTravel = fb.group({
              id_spend: this.idEditSpend,
              travel_request_id: "",
              travel_allowance_type_id: data.data.travel_allowance_type_id,
              currency_id: data.data.currency_id,
              value: data.data.value,
              date: this.formatDate,
              observation: data.data.observation,
              bill_number: data.data.bill_number,
              control_number: data.data.control_number,
              nit: data.data.nit,
              bussines_name: data.data.bussines_name,
              cod_provider: data.data.provider_code,
              authorization_number: data.data.doc_num_origin,
              populated: data.data.population
            });
          })
        }
      }

      if (action.action_method == "editSavedSpend") {

        this.buttonNewSpend = false;
        this.labelNewSpend = false;
        this.show_submit_editSpend = false;
        this.showSubmit = false;
        this.edit_Spend = true;

        document.getElementById('EditfuntionSpend').click();
        setTimeout(() => {
          document.getElementById('spend_edit').scrollTo(0, 1200);
        }, 200);

        if ((this.edit_Spend === true)) {

          let spendEditNew: any = this.objectSpendProvitional.filter((result) => result.id === action.id);

          this.formSpendEditTravel = new FormGroup({});
          this.formSpendEditTravel = fb.group({
            id_spend: spendEditNew[0].id,
            travel_request_id: spendEditNew[0].travel_request_id,
            travel_allowance_type_id: spendEditNew[0].travel_allowance_type_id,
            currency_id: spendEditNew[0].currency_id,
            value: spendEditNew[0].value,
            date: spendEditNew[0].date,
            observation: spendEditNew[0].observation,
            bill_number: spendEditNew[0].bill_number,
            control_number: spendEditNew[0].control_number,
            nit: spendEditNew[0].nit,
            bussines_name: spendEditNew[0].bussines_name,
            cod_provider: spendEditNew[0].cod_provider,
            authorization_number: spendEditNew[0].authorization_number,
            populated: spendEditNew[0].populated,
          });
        }
      }

      if (action.action_method == "destroyTravelAllowance") {
        this.idEditSpend = action.id;
        document.getElementById("btn_spend_edit").click();
        const alertSuccess: Alerts[] = [{
          type: 'warning',
          title: 'Confirmación',
          message: 'Desea eliminar el gasto',
          confirmation: true,
          typeConfirmation: 'deleteDetailSpendEdit'
        }];

        this.alert.setAlert(alertSuccess[0]);
      }

      if (action.action_method == "deleteSavedSpend") {
        this.idEditSpend = action.id;
        document.getElementById("btn_spend_edit").click();
        const alertSuccess: Alerts[] = [{
          type: 'warning',
          title: 'Confirmación',
          message: 'Desea eliminar el gasto #' + this.idEditSpend,
          confirmation: true,
          typeConfirmation: 'deleteDetailSpendEditCreated'
        }];

        this.alert.setAlert(alertSuccess[0]);
      }


    });


  }


  ngOnInit() {

    this.spendsService.getSpendListTravel().subscribe((travel: any) => {
      this.listTravelsFromSpend = travel.data;
    });
    this.spendsService.getSpendsTypes().subscribe((select: any) => {
      this.listSpendType = select.data;
    });
    this.spendsService.getSpendMoneyList().subscribe((money: any) => {
      this.listMoneyType = money.data;
    });

    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      this.spedsData = list.data;
    });
  }

  aditionSpend(objectSpend) {
    debugger
    objectSpend.id = 'temp_' + this.idSpend + 1;
    this.objectSpendProvitional.push(objectSpend);
    this.editSpendTable.data.push({
      field_0: objectSpend.id,
      field_1: this.listSpendType.filter((data) => data.id.toString() === objectSpend.travel_allowance_type_id.toString())[0].name,
      field_2: objectSpend.value,
      field_3: this.listMoneyType.filter((data) => data.id.toString() === objectSpend.currency_id.toString())[0].name,
      field_4: objectSpend.date,
      field_5: objectSpend.observation,
      field_6: objectSpend.bill_number,
      field_7: objectSpend.control_number,
      field_8: objectSpend.nit,
      field_9: objectSpend.bussines_name,
      field_10: objectSpend.cod_provider,
      field_11: objectSpend.authorization_number,
      field_12: objectSpend.populated,
      field_13: {
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: objectSpend.id,
        title: "Editar",
        action_method: "editSavedSpend",
        disable: false
      },
      field_14: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: objectSpend.id,
        title: "Eliminar",
        action_method: "deleteSavedSpend",
        disable: false
      }

    });

    this.objectAllowancesEdit.push({
      id: null,
      id_temp: objectSpend.id,
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

    this.idSpend += 1
    setTimeout(() => {
      this.objectReport.emit(this.editSpendTable[0]);
    }, 500);
    this.closeEditSpend();
  }

  aditionSpendEdit(objectEditSpend) {
    debugger
    this.editSpendTable.data.forEach(element => {
      if (element.field_0 === objectEditSpend.id_spend) {
        element.field_1 = this.listSpendType.filter((data) => data.id.toString() === objectEditSpend.travel_allowance_type_id.toString())[0].name;
        element.field_2 = objectEditSpend.value;
        element.field_3 = this.listMoneyType.filter((data) => data.id.toString() === objectEditSpend.currency_id.toString())[0].name;
        element.field_4 = objectEditSpend.date;
        element.field_5 = objectEditSpend.observation;
        element.field_6 = objectEditSpend.bill_number;
        element.field_7 = objectEditSpend.control_number;
        element.field_8 = objectEditSpend.nit;
        element.field_9 = objectEditSpend.bussines_name;
        element.field_10 = objectEditSpend.cod_provider;
        element.field_11 = objectEditSpend.authorization_number;
        element.field_12 = objectEditSpend.populated;
        element.field_13 = {
          type_method: "UPDATE",
          type_element: "button",
          icon: "fa-pencil",
          id: objectEditSpend.id_spend,
          title: "Editar",
          action_method: "updateTravelAllowance",
          disable: false
        };
        element.field_14 = {
          type_method: "DELETE",
          type_element: "button",
          icon: "fa-trash",
          id: objectEditSpend.id_spend,
          title: "Eliminar",
          action_method: "destroyTravelAllowance",
          disable: false
        }
      }
    });

    if (this.objectAllowancesEdit.filter(filter => filter.id === objectEditSpend.id_spend).length > 0) {
      this.objectAllowancesEdit.splice(this.objectAllowancesEdit.findIndex(filter => filter.id === objectEditSpend.id_spend), 1);
    }

    this.objectAllowancesEdit.push({
      id: objectEditSpend.id_spend,
      travel_allowance_type_id: objectEditSpend.travel_allowance_type_id,
      currency_id: objectEditSpend.currency_id,
      value: objectEditSpend.value,
      date: objectEditSpend.date,
      observation: objectEditSpend.observation,
      bill_number: objectEditSpend.bill_number,
      control_number: objectEditSpend.control_number,
      nit: objectEditSpend.nit,
      bussines_name: objectEditSpend.bussines_name,
      doc_num_origin: objectEditSpend.authorization_number,
      provider_code: objectEditSpend.cod_provider,
      population: objectEditSpend.populated

    });

    setTimeout(() => {
      this.objectReport.emit(this.editSpendTable[0]);
    }, 500);
    this.closeEditSpend();

  }

  newEditSpend(param) {
    this.showSubmit = false;

    const spendsFormDataEdit = new FormData();
    spendsFormDataEdit.append('travel_request_id', this.ticketTravel);
    spendsFormDataEdit.append('allowances', JSON.stringify(this.objectAllowancesEdit));
    spendsFormDataEdit.append('files_length', this.objectImg.length.toString())
    for (let index = 0; index < this.objectImg.length; index++) {
      spendsFormDataEdit.append('files_' + (index + 1).toString(), this.file[index]);
    };


    param = spendsFormDataEdit;

    this.formDataService.putEditSpendFormData(this.idSpendRequests, param).subscribe(
      (data: any) => {

        debugger
        document.getElementById("closeModalEditSpend").click();

        const alertSuccess: Alerts[] = [{
          type: 'success',
          title: 'Alerta',
          message: data.message,
          confirmation: false
        }];
        this.showSubmit = true;
        this.alert.setAlert(alertSuccess[0]);
        this.spendSharedService.setRefreshSpend(true);
      },
      (error: any) => {
        document.getElementById("btn_spend_edit").click();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: error.json().errors.toString(),
          confirmation: true,
          typeConfirmation: 'errorSaveSpendEdit'
        }];
        this.showSubmit = true;
        this.alert.setAlert(alertWarning[0]);
      })
  }


  viewDocumentSaved(paramView) {
    window.open(paramView.file.url)
  }
  downloadDocumentSaved(param) {
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

  colapseEdit() {
    this.buttonNewSpend = false;
    this.labelNewSpend = true;
    this.show_submit_editSpend = false;
    this.showSubmit = false;
    this.edit_Spend = false;

    document.getElementById('EditfuntionSpend').click();
    setTimeout(() => {
      document.getElementById('spend_edit').scrollTo(0, 1200);
    }, 200);

  }
  closeEditSpend() {
    this.buttonNewSpend = true;
    this.labelNewSpend = false;
    this.show_submit_editSpend = true;
    this.showSubmit = true;
    this.edit_Spend = false;

    document.getElementById("EditfuntionSpend").click();
    this.refreshPartialSpend();
  }

  deleteUploadSavedEdit(param: any) {
    this.idFile = param.id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el archivo #' + this.idFile.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteDocumentSavedSpend'
    }];
    this.alert.setAlert(this.alertWarning[0]);

  }

  deleteUploadEditSpend(param: any) {
    this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === param.file.name), 1);
  }

  refreshPartialSpend() {

    this.formSpendEditTravel.controls['travel_allowance_type_id'].setValue('');
    this.formSpendEditTravel.controls['currency_id'].setValue('');
    this.formSpendEditTravel.controls['value'].setValue('');
    this.formSpendEditTravel.controls['date'].setValue('');
    this.formSpendEditTravel.controls['observation'].setValue('');
    this.formSpendEditTravel.controls['bill_number'].setValue('');
    this.formSpendEditTravel.controls['control_number'].setValue('');
    this.formSpendEditTravel.controls['nit'].setValue('');
    this.formSpendEditTravel.controls['bussines_name'].setValue('');
    this.formSpendEditTravel.controls['cod_provider'].setValue('');
    this.formSpendEditTravel.controls['authorization_number'].setValue('');
    this.formSpendEditTravel.controls['populated'].setValue('');


  }
}
