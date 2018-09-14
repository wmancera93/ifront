import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, ResponseContentType } from '@angular/http';
import { SpendsCreate, ObjectSpends } from '../../../../models/common/travels_management/spends/spends';

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
  public formEditSpendDetail: any;
  public annexes: any[] = [];
  public formatDate: any;
  public infoTableSpends: any[] = [];
  public idSpend: number = 0;
  public objectSpends: SpendsCreate;
  public objectAllowances: ObjectSpends[] = [];

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public fb: FormBuilder,
    public http: Http) {

    this.formEditSpendDetail = new FormGroup({});
    this.formEditSpendDetail = fb.group({
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
    });

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

    this.spendSharedService.getEditSpend().subscribe((idEdit: any) => {
      this.spendsService.getViewDetailSpends(idEdit).subscribe((editSpend: any) => {
        this.editSpendDetail = editSpend.data[0].travel_allowance_request.info_travel;
        this.editSpendTable = editSpend.data[0].travel_allowances;
        this.annexes = editSpend.data[0].travel_request_annexeds;

        setTimeout(() => {
          this.objectReport.emit({ data: [this.editSpendTable] });
        }, 500);

        if (document.getElementById('spend_edit').className !== 'modal show') {
          document.getElementById('btn_spend_edit').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
      })
    })

    this.accionDataTableService.getActionDataTable().subscribe((action: any) => {

      if (action.action_method == "updateTravelAllowance") {

        this.idEditSpend = action.id;
        this.spendsService.getDetailSpendEdit(this.idEditSpend).subscribe((data: any) => {
          console.log(data)
          this.formatDate = data.data.date_time.split("T")[0];
          this.formEditSpendDetail = new FormGroup({});
          this.formEditSpendDetail = fb.group({
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
  }

  viewAnnex(paramView) {

    window.open(paramView.file.url)

  }

  downloadAnnex(param: any) {

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
        file: ""
      }]
    }

    setTimeout(() => {
      this.objectReport.emit(this.infoTableSpends[0]);
    }, 500);

  }

}
