import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { Http, ResponseContentType } from '@angular/http';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

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
  public nameReport: string = 'Gastos';
  public edit: boolean = false;
  public anexes: any[] = [];
  public id_spend: string;

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public http: Http, public alert: AlertsService) {

    this.spendSharedService.getViewSpend().subscribe((idSpend: any) => {
      this.spendsService.getViewDetailSpends(idSpend, this.edit).subscribe((data: any) => {

        this.id_spend = idSpend;
        this.showSpendDetail = data.data[0];
        this.anexes = data.data[0].travel_request_annexeds;
        this.showTravelDetail = data.data[0].travel_allowance_request.info_travel;
        this.showTableSpendsDetail = data.data[0].travel_allowances;


        setTimeout(() => {
          this.objectReport.emit({ data: [data.data[0].travel_allowances] });
        }, 500);

        if (document.getElementById('modal_viewSpends').className !== 'modal show') {
          document.getElementById('btn-viewSpends').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
      });

    })
  }

  ngOnInit() {
  }

  sedRequestsSpend() {

    this.spendsService.putSendRequestsSpend(this.id_spend).subscribe((data: any) => {
      if (data) {

        const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud de gastos enviada a primer aprobador', confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
      }
      this.spendSharedService.setRefreshSpend(true);
    },
      (error: any) => {
        document.getElementById("closeTravels").click();
        const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con su solicitud de viaje?', confirmation: false }];
        this.alert.setAlert(alertWarning[0]);

      });
  }



  viewAnnex(paramView) {
    debugger
    window.open(paramView.file.url)

  }

  downloadAnnex(param: any) {
    debugger
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

}
