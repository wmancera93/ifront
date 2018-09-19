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

@Component({
  selector: 'app-edit-spend',
  templateUrl: './edit-spend.component.html',
  styleUrls: ['./edit-spend.component.css']
})
export class EditSpendComponent implements OnInit {
  public showSubmit: boolean = true;
  public editSpendDetail: any[] = [];
  public editSpendTable: any[] = [];
  public activeEdit: boolean = false;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Gastos';
  public idEditSpend: number;
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

  showPdf
  showSizeTable

  newEditSpend

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public fb: FormBuilder,
    public http: Http, public fileUploadService: FileUploadService) {

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
      bussines_name: ""
    });


    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteDetailSpend') {
        document.getElementById("btn_spend_edit").click();
      }

      if (data === 'deleteDocumentSavedSpend') {
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

    });



    this.spendSharedService.getEditSpend().subscribe((idEdit: any) => {

      this.spendsService.getViewDetailSpends(idEdit, this.edit).subscribe((editSpend: any) => {
        debugger
        this.editSpendDetail = editSpend.data[0].travel_allowance_request.info_travel.ticket;
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

      if (action.action_method == "updateTravelAllowance") {

        this.idEditSpend = action.id;
        this.spendsService.getDetailSpendEdit(this.idEditSpend).subscribe((data: any) => {

          this.formatDate = data.data.date_time.split("T")[0];
          this.formSpendEditTravel = new FormGroup({});
          this.formSpendEditTravel = fb.group({
            travel_request_id: "",
            travel_allowance_type_id: data.data.travel_allowance_type_id,
            currency_id: data.data.currency_id,
            value: data.data.value,
            date: this.formatDate,
            observation: data.data.observation,
            bill_number: data.data.bill_number,
            control_number: data.data.control_number,
            nit: data.data.nit,
            bussines_name: data.data.bussines_name
          });
        })
        this.activeEdit = true;
      }
      if (action.action_method == "destroyTravelAllowance") {
        this.idEditSpend = action.id;
        this.spendsService.deleteDetailSpend(this.idEditSpend).subscribe((deleteSpend: any) => {
          document.getElementById("btn_spend_edit").click();
          const alertSuccess: Alerts[] = [{
            type: 'success',
            title: 'Confirmación',
            message: deleteSpend.message,
            confirmation: true,
            typeConfirmation: 'deleteDetailSpend'
          }];

          this.alert.setAlert(alertSuccess[0]);
        })
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
    objectSpend.id_spend = this.idSpend + 1;

    this.editSpendTable[0].data[0].push({

      field_0: 'temp_' + this.idSpend + 1,
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
        type_method: "UPDATE",
        type_element: "button",
        icon: "fa-pencil",
        id: this.idSpend + 1,
        title: "Editar",
        action_method: "editSaveSpend",
        disable: false
      },
      field_12: {
        type_method: "DELETE",
        type_element: "button",
        icon: "fa-trash",
        id: this.idSpend + 1,
        title: "Eliminar",
        action_method: "deleteSpend",
        disable: false
      }

    });

    this.objectAllowancesEdit.push({
      id: null,
      id_temp:objectSpend.id_spend,
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

    
    setTimeout(() => {
      this.objectReport.emit(this.editSpendTable[0]);
    }, 500);

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
    // this.refreshPartialSpend();
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


}
