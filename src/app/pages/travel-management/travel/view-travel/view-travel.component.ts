import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, ResponseContentType } from '@angular/http';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { User } from '../../../../models/general/user';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css']
})
export class ViewTravelComponent implements OnInit {

  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  public ticketSendPDF: any;
  public nameReport: string = 'Gestión de viajes'
  public objectReport: EventEmitter<any> = new EventEmitter();
  public objectPrintAdvances: EventEmitter<any> = new EventEmitter();
  public objectPrintSpend: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public ticket: string = "";
  public objectPrint: any[] = [];
  public observations: any[] = [];
  public typeTravel: any[] = [];
  public annexeds: any[] = [];
  public edit: boolean = false;
  public view_travels: any[] = [];
  public maintenance_travel: string = 'Sin manutención';
  public maintenance: boolean = false;
  public showPdf: boolean = false;
  public showSizeTable: boolean = false;
  public allRequests: any[];
  public nameReportAdvance: string = 'Anticipos de viaje';
  public nameReportSpend: string = 'Gastos de viaje';
  public table_advances_view: any[] = [];
  public table_spend_view: any[] = [];

  public eployee_selected: any = null;


  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService, public alert: AlertsService,
    public sanitizer: DomSanitizer, public http: Http) {

     


    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueViewTravelRequests') {
        if (document.getElementById('travel_view').className !== 'modal show') {
          document.getElementById("btn_travel_view").click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      }

    })

    this.travelsService.getViewTravels().subscribe((data) => {
      this.ticket = data;
      this.ticketSendPDF = this.ticket;
      if (document.getElementById('travel_view').className !== 'modal show') {
        document.getElementById("btn_travel_view").click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }

      this.travelManagementService.getTravelRequestsByid(this.ticket, this.edit).subscribe((result: any) => {
        this.view_travels = [];
        this.observations = result.data[0].travel_request.observation;
        this.typeTravel = result.data[0].travel_request.travel_type_name;
        this.objectPrint = result.data[0].travel_managements;
        this.annexeds = result.data[0].travel_request_annexeds;
        this.view_travels.push(result.data[0].travel_request);
        this.maintenance = result.data[0].travel_request.is_maintenance;

        if (result.data[0].travel_request.employee_applicant_to_json !== null) {
          this.eployee_selected = {
            id: result.data[0].travel_request.employee_applicant_to_json.personal_code,
            image: result.data[0].travel_request.employee_applicant_to_json.image,
            name_complete: result.data[0].travel_request.employee_applicant_to_json.short_name,
            posicion: result.data[0].travel_request.employee_applicant_to_json.position
          }
        } else {
          this.eployee_selected = null;
        }

        if (this.maintenance) {
          this.maintenance_travel = 'Con manutención'
        }
        setTimeout(() => {
          this.objectReport.emit({ success: true, data: [this.objectPrint] });
        }, 100);

      });
      this.travelManagementService.getTravelsAllDetail(this.ticket).subscribe((detail: any) => {
        this.allRequests = detail;
        this.table_advances_view = [];
        this.table_spend_view = [];
        if (detail.data[0].travel_advance_requests.data.length > 0) {
          setTimeout(() => {
            detail.data[0].travel_advance_requests.data.forEach(element => {
              element.travel_advance_payments.forEach(dataObject => {
                this.table_advances_view.push(dataObject)
              });
            });

            let object = {
              labels: detail.data[0].travel_advance_requests.labels,
              data: this.table_advances_view,
            }
            this.objectPrintAdvances.emit({ success: true, data: [object] });
          }, 300);
        } else {
          this.objectPrintAdvances.emit({ success: true, data: [] });
        }
        if (detail.data[0].travel_allowance_request.data.travel_allowances !== undefined) {
          setTimeout(() => {
            detail.data[0].travel_allowance_request.data.travel_allowances.forEach(element => {
              this.table_spend_view.push(element)
            });
            let object = {
              labels: detail.data[0].travel_allowance_request.labels,
              data: this.table_spend_view,
            }
            this.objectPrintSpend.emit({ success: true, data: [object] });
          }, 300);
        } else {
          this.objectPrintSpend.emit({ success: true, data: [] });
        }

      })
    });
  }

  ngOnInit() {
  }

  sedRequestsTravel() {

    this.travelManagementService.putSendRequestsTravels(this.ticket).subscribe((data: any) => {
      if (data) {
        document.getElementById("closeTravelsNew").click();
        const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud de viajes enviada a primer aprobador', confirmation: false, typeConfirmation: 'continueViewTravelRequests' }];
        this.alert.setAlert(alertWarning[0]);
      }
      
      this.travelsService.setResultSaved({success: true, third: this.eployee_selected == null ? true : false});
    },
      (error: any) => {
        document.getElementById("closeTravelsNew").click();
        const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString(), confirmation: false, typeConfirmation: 'continueViewTravelRequests' }];
        this.alert.setAlert(alertWarning[0]);
      });

  }

  viewCotization(paramView) {

    window.open(paramView.file.url)

  }

  downloadCotization(param: any) {

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
