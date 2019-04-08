import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { Http, ResponseContentType } from '@angular/http';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-view-spend',
  templateUrl: './view-spend.component.html',
  styleUrls: ['./view-spend.component.css']
})
export class ViewSpendComponent implements OnInit {

  public showSpendDetail: any[] = [];
  public showTravelDetail: any[] = [];
  public showTableSpendsDetail: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  public objectPrintAdvancesView: EventEmitter<any> = new EventEmitter();
  public objectPrintTravelView: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public edit = false;
  public anexes: any[] = [];
  public id_spend: string;
  public allRequestsInSpend: any[] = [];
  public table_advances_spend: any[];
  public table_travels_spend: any[];
  public ticket: string;
  public nameReportAdvance: string;
  public nameReportTravels: string;
  public translate: Translate = null;
  public ticketSendPDF: any;

  public is_sender_approval = false;

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public http: Http, public alert: AlertsService, public travelManagementService: TravelService,
    private accionDataTableServiceView: DataDableSharedService,
    public travelsService: TravelsService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    this.nameReport = this.translate.app.frontEnd.pages.travel_management.spend.view_spend.tittle_ts;
    this.nameReportAdvance = this.translate.app.frontEnd.pages.travel_management.spend.view_spend.tittle_advances_ts;
    this.nameReportTravels = this.translate.app.frontEnd.pages.travel_management.spend.view_spend.tittle_trayect_ts;
    this.accionDataTableServiceView.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === 'ModalDistCostShow') {
        document.getElementById('closeModalViewSpend').click();
        const viewDistCost = false;
        const id_by_spend = data.id;
        setTimeout(() => {
          this.spendSharedService.setViewDistCostSpend({ accion: viewDistCost, id: id_by_spend });
        }, 100);
      }

      if ((data.action_method === 'showHotels')) {

        this.travelsService.setHotelsByJourney({
          acction: true,
          id_journey: data.id.toString(),
          id_travel: this.ticket,
        });
      }
    });

    this.spendSharedService.getViewSpend().subscribe((idSpend: any) => {

      this.spendsService.getViewDetailSpends(idSpend, this.edit).subscribe((data: any) => {
        this.id_spend = idSpend;
        this.ticket = data.data[0].travel_allowance_request.travel_request_id;
        this.ticketSendPDF = this.ticket;
        this.showSpendDetail = data.data[0];
        this.anexes = data.data[0].travel_request_annexeds;
        this.showTravelDetail = data.data[0].travel_allowance_request.info_travel;
        this.showTableSpendsDetail = data.data[0].travel_allowances;
        this.is_sender_approval = data.data[0].is_sender_approval;

        setTimeout(() => {
          this.objectReport.emit({ data: [data.data[0].travel_allowances] });
        }, 500);

        if (document.getElementById('modal_viewSpends').className !== 'modal show') {
          document.getElementById('btn-viewSpends').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      });
      setTimeout(() => {
        this.travelManagementService.getTravelsAllDetail(this.ticket).subscribe((detail: any) => {
          this.allRequestsInSpend = detail.data;
          this.table_advances_spend = [];
          this.table_travels_spend = [];
          if (detail.data[0].travel_advance_requests.data.length > 0) {

            detail.data[0].travel_advance_requests.data.forEach(element => {
              element.travel_advance_payments.forEach(dataObject => {
                this.table_advances_spend.push(dataObject);
              });
            });

            const object = {
              labels: detail.data[0].travel_advance_requests.labels,
              data: this.table_advances_spend,
            };
            setTimeout(() => {
              this.objectPrintAdvancesView.emit({ success: true, data: [object] });
            }, 500);
          } else {
            setTimeout(() => {
              this.objectPrintAdvancesView.emit({ success: true, data: [] });
            }, 500);
          }

          if (detail.data[0].travel_managements.data.length > 0) {
            setTimeout(() => {
              this.objectPrintTravelView.emit({ success: true, data: [detail.data[0].travel_managements] });
            }, 500);
          } else {
            setTimeout(() => {
              this.objectPrintTravelView.emit({ success: true, data: [] });
            }, 500);
          }
        });
      }, 1000);


    });
  }

  ngOnInit() {
  }

  sedRequestsSpend() {

    this.spendsService.putSendRequestsSpend(this.id_spend).subscribe((data: any) => {
      if (data) {
        document.getElementById('closeModalViewSpend').click();
        const alertWarning: Alerts[] = [{ type: 'success', title: this.translate.app.frontEnd.pages.travel_management.spend.view_spend.type_alert_ts, message: this.translate.app.frontEnd.pages.travel_management.spend.view_spend.message_alert_one_ts, confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
      }
      this.spendSharedService.setRefreshSpend({ success: true, third: false });
    },
      (error: any) => {
        document.getElementById('closeModalViewSpend').click();
        const alertWarning: Alerts[] = [{ type: 'danger', title: this.translate.app.frontEnd.pages.travel_management.spend.view_spend.type_alert_two_ts, message: error.json().errors.toString() + ' - ' + this.translate.app.frontEnd.pages.travel_management.spend.view_spend.message_alert_two_ts, confirmation: false }];
        this.alert.setAlert(alertWarning[0]);

      });
  }
  viewAnnex(paramView) {
    window.open(paramView.file.url);
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
  exportExcel() {
    this.spendsService.getExportSpendExcel(this.ticket).subscribe((data: any) => {
      window.open(data.url);
    });
  }

}
