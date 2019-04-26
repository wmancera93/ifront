import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, ResponseContentType } from '@angular/http';
import {
  SpendsCreate,
  ObjectSpends,
} from '../../../../models/common/travels_management/spends/spends';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { Router } from '@angular/router';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-spend',
  templateUrl: './edit-spend.component.html',
  styleUrls: ['./edit-spend.component.css'],
})
export class EditSpendComponent implements OnInit {
  public showSubmit = true;
  public editSpendDetail: any;
  public editSpendTable: any;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public idEditSpend: string;
  public spedsData: any[] = [];
  public listTravelsFromSpend: any[] = [];
  public listSpendType: any[] = [];
  public listMoneyType: any[] = [];
  public formSpendEditTravel: any;
  public annexes: any[] = [];
  public formatDate: any;
  public idSpend = 0;
  public objectSpends: SpendsCreate;
  public objectAllowancesEdit: ObjectSpends[] = [];
  public edit = true;
  public icon: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public file: any[] = [];
  public objectImg: any[] = [];
  public iconUpload: any[] = [];
  public filequotation = 'fileQuotationSpendEdit';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public buttonNewSpend = true;
  public labelNewSpend = false;
  public show_submit_editSpend = true;
  public edit_Spend = false;
  public alertWarning: any[] = [];
  public idFile: number;
  public id_Spend_Save: string;
  public objectSpendProvitional: any[] = [];
  public idSpendRequests: string;
  public ticketTravel: string;
  public nameSpend: string;
  public listTypeDocument: any[] = [];
  public stateRequestsSpend: string;
  public idEmployee = '0';
  public type_spend: string;

  showSizeTable;
  showPdf;

  parseT(key) {
    return `pages.travel_management.spend.edit_spend.${key}`;
  }

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  constructor(
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public fb: FormBuilder,
    public http: Http,
    public fileUploadService: FileUploadService,
    public formDataService: FormDataService,
    public router: Router,
    public travelManagementService: TravelService,
    public translate: TranslateService,
  ) {
    this.formSpendEditTravel = new FormGroup({});
    this.formSpendEditTravel = fb.group({
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
      document: '',
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (
        data === 'errorSaveSpendEdit' ||
        data === 'closeAlertdeleteSavedSpend' ||
        data === 'closeAlerterrorSaveSpendEdit' ||
        data === 'closeAlertdeleteDocumentSavedSpend' ||
        data === 'closeAlertdeleteDetailSpendEdit' ||
        data === 'errorApproverSpend'
      ) {
        document.getElementById('btn_spend_edit').click();
      }

      if (data === 'deleteDocumentSavedSpend') {
        this.buttonNewSpend = true;
        this.labelNewSpend = false;
        this.show_submit_editSpend = true;
        this.showSubmit = true;
        document.getElementById('btn_spend_edit').click();

        this.spendsService
          .deleteFileSpendData(this.idFile.toString())
          .subscribe(() => {
            this.annexes.splice(
              this.annexes.findIndex(filter => filter.id === this.idFile),
              1,
            );
          });
        document.getElementById('btn_spend_edit').click();
      }

      if (data === 'deleteDetailSpendEdit') {
        this.spendsService.deleteDetailSpend(this.idEditSpend).subscribe(
          () => {
            this.editSpendTable.data.splice(
              this.editSpendTable.data.findIndex(
                filter => filter.field_0 === this.idEditSpend,
              ),
              1,
            );
            this.objectAllowancesEdit.splice(
              this.objectAllowancesEdit.findIndex(
                filter => filter.id === this.idEditSpend,
              ),
              1,
            );
            this.objectReport.emit({
              success: true,
              data: [this.editSpendTable],
            });

            document.getElementById('btn_spend_edit').click();
          },
          (error: any) => {
            const alertSuccess: Alerts[] = [
              {
                type: 'danger',
                title: this.t('type_alert_ts'),
                message: error.json().errors.toString(),
                confirmation: false,
              },
            ];
            this.alert.setAlert(alertSuccess[0]);
          },
        );
      }
      if (data === 'deleteDetailSpendEditCreated') {
        this.editSpendTable.data.splice(
          this.editSpendTable.data.findIndex(
            filter => filter.field_0 === this.idEditSpend,
          ),
          1,
        );
        this.objectAllowancesEdit.splice(
          this.objectAllowancesEdit.findIndex(
            filter => filter.id === this.idEditSpend,
          ),
          1,
        );
        this.objectReport.emit({
          success: true,
          data: [this.editSpendTable],
        });

        document.getElementById('btn_spend_edit').click();
      }
    });

    this.spendSharedService.getEditSpend().subscribe((idEdit: any) => {
        
      // this.spendsService.getSpendListTravel(this.idEmployee).subscribe((travel: any) => {
      //   this.listTravelsFromSpend = travel.data;
      // });
      this.idSpendRequests = idEdit;
      this.spendsService
        .getViewDetailSpends(idEdit, this.edit)
        .subscribe((editSpend: any) => {
          this.editSpendDetail = [];
          this.editSpendTable = [];
          this.annexes = [];
          this.editSpendDetail =
            editSpend.data[0].travel_allowance_request.info_travel;
          this.stateRequestsSpend =
            editSpend.data[0].travel_allowance_request.status_request;
          this.ticketTravel = this.editSpendDetail.ticket;
          this.nameSpend =
            this.editSpendDetail.ticket +
            ' ' +
            this.editSpendDetail.name_travel;
          this.editSpendTable = editSpend.data[0].travel_allowances;
          this.annexes = editSpend.data[0].travel_request_annexeds;
          this.buttonNewSpend = true;
          this.labelNewSpend = false;
          this.show_submit_editSpend = true;
          this.showSubmit = true;

          setTimeout(() => {
            this.objectReport.emit({ data: [this.editSpendTable] });
          }, 500);

          if (
            document.getElementById('spend_edit').className !== 'modal show'
          ) {
            document.getElementById('btn_spend_edit').click();
            document.getElementById('bodyGeneral').removeAttribute('style');
          }
        });
      setTimeout(() => {
        this.travelManagementService
          .getTravelsAllDetail(this.ticketTravel)
          .subscribe((detail: any) => {
            this.type_spend = detail.data[0].travel_request.travel_type_code;
            this.spendsService
              .getSpendsTypes(this.type_spend)
              .subscribe((select: any) => {
                this.listSpendType = this.sortByAphabet(select.data);
              });
          });
      }, 400);
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

    this.accionDataTableService
      .getActionDataTable()
      .subscribe((action: any) => {
        if (action.action_method == 'updateTravelAllowance') {
          if (!this.edit_Spend) {
            if (this.buttonNewSpend) {
              document.getElementById('EditfuntionSpend').click();
              setTimeout(() => {
                document.getElementById('spend_edit').scrollTo(0, 1200);
              }, 200);

              this.edit_Spend = true;
              this.buttonNewSpend = false;
            } else {
              this.buttonNewSpend = false;
              this.edit_Spend = true;
            }
          }

          this.labelNewSpend = false;
          this.show_submit_editSpend = false;
          this.showSubmit = false;

          if (this.edit_Spend === true) {
            this.idEditSpend = action.id;
            this.spendsService
              .getDetailSpendEdit(this.idEditSpend)
              .subscribe((data: any) => {
                this.formatDate = data.data.date_time.split('T')[0];
                this.formSpendEditTravel = new FormGroup({});
                this.formSpendEditTravel = fb.group({
                  id_spend: this.idEditSpend,
                  travel_request_id: '',
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
                  populated: data.data.population,
                  formA: data.data.have_format,
                  document: data.data.type_of_expense_document_id,
                });
              });
          }
        }

        if (action.action_method == 'editSavedSpend') {
          if (!this.edit_Spend) {
            if (!this.buttonNewSpend) {
              document.getElementById('EditfuntionSpend').click();
              setTimeout(() => {
                document.getElementById('spend_edit').scrollTo(0, 1200);
              }, 200);

              this.edit_Spend = true;
            } else {
              this.buttonNewSpend = false;
              this.edit_Spend = true;
            }
          }

          this.labelNewSpend = false;
          this.show_submit_editSpend = false;
          this.showSubmit = false;
          if (this.edit_Spend === true) {
            const spendEditNew: any = this.objectSpendProvitional.filter(
              result => result.id === action.id,
            );

            this.formSpendEditTravel = new FormGroup({});
            this.formSpendEditTravel = fb.group({
              id_spend: spendEditNew[0].id,
              travel_request_id: spendEditNew[0].travel_request_id,
              travel_allowance_type_id:
                spendEditNew[0].travel_allowance_type_id,
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
              formA: spendEditNew[0].formA == false ? 'false' : 'true',
              document: spendEditNew[0].document,
            });
          }
        }

        if (action.action_method == 'destroyTravelAllowance') {
          this.idEditSpend = action.id;
          document.getElementById('btn_spend_edit').click();
          const alertSuccess: Alerts[] = [
            {
              type: 'warning',
              title: this.t('type_alert_ts'),
              message: this.t('message_alert_ts'),
              confirmation: true,
              typeConfirmation: 'deleteDetailSpendEdit',
            },
          ];
          this.alert.setAlert(alertSuccess[0]);
        }

        if (action.action_method == 'deleteSavedSpend') {
          this.idEditSpend = action.id;
          document.getElementById('btn_spend_edit').click();
          const alertSuccess: Alerts[] = [
            {
              type: 'warning',
              title: this.t('type_alert_ts'),
              message: this.t('message_alert_ts') + '#' + this.idEditSpend,
              confirmation: true,
              typeConfirmation: 'deleteDetailSpendEditCreated',
            },
          ];

          this.alert.setAlert(alertSuccess[0]);
        }
        if (action.action_method == 'ModalDistCost') {
          const editDistCost = true;
          const id_byspend = action.id;
          document.getElementById('closeModalEditSpend').click();
          setTimeout(() => {
            this.spendSharedService.setViewDistCostSpend({
              accion: editDistCost,
              id: id_byspend,
            });
          }, 1000);
        }
      });
  }

  public disabledCode = false;

  maskCode(param) {
    this.disabledCode = true;
    let word = '';
    let wordView = '';
    const filtro =
      'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890-';

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
    if (word.match(/^\w{2}-\w{2}-\w{2}-\w{2}-\w{2}$/) !== null) {
      wordView = word + '-';
    }
    this.formSpendEditTravel.controls['control_number'].setValue(wordView);

    if (this.formSpendEditTravel.value.control_number === wordView) {
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
      this.listTypeDocument = document.data;
    });
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
  aditionSpend(objectSpend) {
    objectSpend.id = 'temp_' + this.idSpend + 1;
    this.objectSpendProvitional.push(objectSpend);
    const date = objectSpend.date.split('-');
    const dateSpend = date[2] + '/' + date[1] + '/' + date[0];
    this.editSpendTable.data.push({
      field_1: this.listSpendType.filter(
        data =>
          data.id.toString() ===
          objectSpend.travel_allowance_type_id.toString(),
      )[0].code,
      field_2: this.listSpendType.filter(
        data =>
          data.id.toString() ===
          objectSpend.travel_allowance_type_id.toString(),
      )[0].name,
      field_3: objectSpend.value,
      field_4: this.listMoneyType.filter(
        data => data.id.toString() === objectSpend.currency_id.toString(),
      )[0].name,
      field_5: objectSpend.date !== '' ? dateSpend : '',
      field_6: objectSpend.observation.toUpperCase(),
      field_7: objectSpend.bill_number,
      field_8: objectSpend.control_number.toUpperCase(),
      field_9: objectSpend.nit,
      field_10: objectSpend.bussines_name.toUpperCase(),
      field_11: objectSpend.cod_provider,
      field_12: objectSpend.authorization_number,
      field_13: objectSpend.populated.toUpperCase(),
      field_14: this.listTypeDocument.filter(
        data => data.id.toString() === objectSpend.document.toString(),
      )[0].name,
      field_15: objectSpend.formA === true ? 'Si' : 'No',
      field_16: '',
      field_17: {
        type_method: 'UPDATE',
        type_element: 'button',
        icon: 'fa-pencil',
        id: objectSpend.id,
        title: 'Editar',
        action_method: 'editSavedSpend',
        disable: false,
      },
      field_18: {
        type_method: 'DELETE',
        type_element: 'button',
        icon: 'fa-trash',
        id: objectSpend.id,
        title: 'Eliminar',
        action_method: 'deleteSavedSpend',
        disable: false,
      },
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
      population: objectSpend.populated,
      have_format: objectSpend.formA == false ? 'false' : 'true',
      type_of_expense_document: objectSpend.document,
    });

    this.idSpend += 1;
    setTimeout(() => {
      this.objectReport.emit({
        success: true,
        data: [this.editSpendTable],
      });
    }, 500);
    this.closeEditSpend();
  }

  aditionSpendEdit(objectEditSpend) {
    this.editSpendTable.data.forEach(element => {
      const date = objectEditSpend.date.split('-');
      const dateSpend = date[2] + '/' + date[1] + '/' + date[0];
      if (element.field_0 === objectEditSpend.id_spend) {
        element.field_1 = this.listSpendType.filter(
          data =>
            data.id.toString() ===
            objectEditSpend.travel_allowance_type_id.toString(),
        )[0].code;
        element.field_2 = this.listSpendType.filter(
          data =>
            data.id.toString() ===
            objectEditSpend.travel_allowance_type_id.toString(),
        )[0].name;
        element.field_3 = objectEditSpend.value;
        element.field_4 = this.listMoneyType.filter(
          data => data.id.toString() === objectEditSpend.currency_id.toString(),
        )[0].name;
        element.field_5 = objectEditSpend.date !== '' ? dateSpend : '';
        element.field_6 = objectEditSpend.observation.toUpperCase();
        element.field_7 = objectEditSpend.bill_number;
        element.field_8 = objectEditSpend.control_number.toUpperCase();
        element.field_9 = objectEditSpend.nit;
        element.field_10 = objectEditSpend.bussines_name.toUpperCase();
        element.field_11 = objectEditSpend.cod_provider;
        element.field_12 = objectEditSpend.authorization_number;
        element.field_13 = objectEditSpend.populated.toUpperCase();
        element.field_14 = this.listTypeDocument.filter(
          data => data.id.toString() === objectEditSpend.document.toString(),
        )[0].name;
        element.field_15 = objectEditSpend.formA === true ? 'Si' : 'No';
        element.field_16 = '';
        element.field_17 = {
          type_method: 'UPDATE',
          type_element: 'button',
          icon: 'fa-pencil',
          id: objectEditSpend.id_spend,
          title: 'Editar',
          action_method: 'updateTravelAllowance',
          disable: false,
        };
        element.field_18 = {
          type_method: 'DELETE',
          type_element: 'button',
          icon: 'fa-trash',
          id: objectEditSpend.id_spend,
          title: 'Eliminar',
          action_method: 'destroyTravelAllowance',
          disable: false,
        };
      }
    });

    if (
      this.objectAllowancesEdit.filter(
        filter => filter.id === objectEditSpend.id_spend,
      ).length > 0
    ) {
      this.objectAllowancesEdit.splice(
        this.objectAllowancesEdit.findIndex(
          filter => filter.id === objectEditSpend.id_spend,
        ),
        1,
      );
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
      population: objectEditSpend.populated,
      have_format: objectEditSpend.formA == false ? 'false' : 'true',
      type_of_expense_document: objectEditSpend.document,
    });

    setTimeout(() => {
      this.objectReport.emit({
        success: true,
        data: [this.editSpendTable],
      });
    }, 500);
    this.closeEditSpend();
  }

  newEditSpend(param) {
    this.showSubmit = false;

    const spendsFormDataEdit = new FormData();
    spendsFormDataEdit.append('travel_request_id', this.ticketTravel);
    spendsFormDataEdit.append(
      'allowances',
      JSON.stringify(this.objectAllowancesEdit),
    );
    spendsFormDataEdit.append('files_length', this.objectImg.length.toString());
    for (let index = 0; index < this.objectImg.length; index++) {
      spendsFormDataEdit.append(
        'files_' + (index + 1).toString(),
        this.file[index],
      );
    }

    param = spendsFormDataEdit;

    this.formDataService
      .putEditSpendFormData(this.idSpendRequests, param)
      .subscribe(
        (data: any) => {
          this.objectAllowancesEdit = [];
          document.getElementById('closeModalEditSpend').click();

          const alertSuccess: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_ts'),
              message: data.message,
              confirmation: false,
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertSuccess[0]);
          this.spendSharedService.setRefreshSpend({
            success: true,
            third: false,
          });
        },
        (error: any) => {
          this.objectAllowancesEdit = [];
          document.getElementById('btn_spend_edit').click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_one_ts'),
              message: error.json().errors.toString(),
              confirmation: true,
              typeConfirmation: 'errorSaveSpendEdit',
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);
        },
      );
  }

  viewDocumentSaved(paramView) {
    window.open(paramView.file.url);
  }
  downloadDocumentSaved(param) {
    this.http
      .get(param.file.url, {
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

    document.getElementById('EditfuntionSpend').click();
    this.refreshPartialSpend();
  }

  deleteUploadSavedEdit(param: any) {
    this.idFile = param.id;
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_ts'),
        message: this.t('message_alert_one_ts') + this.idFile.toString() + '?',
        confirmation: true,
        typeConfirmation: 'deleteDocumentSavedSpend',
      },
    ];
    this.alert.setAlert(this.alertWarning[0]);
  }

  deleteUploadEditSpend(param: any) {
    this.objectImg.splice(
      this.objectImg.findIndex(filter => filter.file.name === param.file.name),
      1,
    );
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
    this.formSpendEditTravel.controls['formA'].setValue('');
    this.formSpendEditTravel.controls['document'].setValue('');
  }

  sendRequestsSpend() {
    this.spendsService.putSendRequestsSpend(this.idSpendRequests).subscribe(
      (data: any) => {
        if (data) {
          document.getElementById('closeModalEditSpend').click();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_tree_ts'),
              message: this.t('message_alert_two_ts'),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
        }
        this.spendSharedService.setRefreshSpend({
          success: true,
          third: false,
        });
      },
      (error: any) => {
        document.getElementById('closeModalEditSpend').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_four_ts'),
            message: error.json().errors.toString(),
            confirmation: true,
            typeConfirmation: 'errorApproverSpend',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }
  returnTravelsRequest() {
    document.getElementById('closeModalEditSpend').click();
    this.router.navigate([
      '/ihr/travels',
      this.idSpendRequests,
      this.ticketTravel,
    ]);
  }
  onlyNumberSpend(param, name) {
      
    let out = '';
    const filtro = '0123456789.,';
    switch (name) {
      case 'nit':
        for (let i = 0; i < param.nit.length; i++) {
          if (filtro.indexOf(param.nit.charAt(i)) != -1) {
            out += param.nit.charAt(i);
          }
        }
        this.formSpendEditTravel.controls['nit'].setValue(out);
        break;
      case 'bill':
        for (let i = 0; i < param.bill_number.length; i++) {
          if (filtro.indexOf(param.bill_number.charAt(i)) != -1) {
            out += param.bill_number.charAt(i);
          }
        }
        this.formSpendEditTravel.controls['bill_number'].setValue(out);
        break;
      case 'authorization':
        for (let i = 0; i < param.authorization_number.length; i++) {
          if (filtro.indexOf(param.authorization_number.charAt(i)) != -1) {
            out += param.authorization_number.charAt(i);
          }
        }
        this.formSpendEditTravel.controls['authorization_number'].setValue(out);
        break;
      case 'import':
        for (let i = 0; i < param.value.length; i++) {
          if (filtro.indexOf(param.value.charAt(i)) != -1) {
            out += param.value.charAt(i);
          }
        }
        this.formSpendEditTravel.controls['value'].setValue(out);
        break;
    }
  }
}
