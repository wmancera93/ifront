import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, ResponseContentType } from '@angular/http';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css'],
})
export class ViewTravelComponent implements OnInit {
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  public ticketSendPDF: any;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public objectPrintAdvances: EventEmitter<any> = new EventEmitter();
  public objectPrintSpend: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public ticket = '';
  public objectPrint: any[] = [];
  public observations: any[] = [];
  public typeTravel: any[] = [];
  public annexeds: any[] = [];
  public edit = false;
  public view_travels: any[] = [];
  public maintenance_travel: string;
  public maintenance = false;
  public showPdf = false;
  public showSizeTable = false;
  public allRequests: any[];
  public table_advances_view: any[] = [];
  public table_spend_view: any[] = [];
  public arrayAdvanceRequest: any[] = [];
  public arrayAllowanceRequest: any[] = [];
  public eployee_selected: any = null;
  public dateBeginRequest: string;
  public dateEndRequest: string;
  public comentaryPlus: string;
  public is_sender_approval = false;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.travel.view_travel.${key}`;
  }

  constructor(
    public travelManagementService: TravelService,
    public travelsService: TravelsService,
    public alert: AlertsService,
    public sanitizer: DomSanitizer,
    public http: Http,
    private accionDataTableService: DataDableSharedService,
    public spendSharedService: SpendSharedService,
    public translate: TranslateService,
  ) {
    this.maintenance_travel = 'maintenance_with';

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueViewTravelRequests') {
        if (document.getElementById('travel_view').className !== 'modal show') {
          document.getElementById('btn_travel_view').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      }
    });

    this.travelsService.getViewTravels().subscribe(data => {
      this.ticket = data;
      this.ticketSendPDF = this.ticket;
      if (document.getElementById('travel_view').className !== 'modal show') {
        document.getElementById('btn_travel_view').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }

      this.travelManagementService
        .getTravelRequestsByid(this.ticket, this.edit)
        .subscribe((result: any) => {
          const travelRequest = result.data[0].travel_request;
          this.view_travels = [];
          this.observations = travelRequest.observation;
          this.comentaryPlus = travelRequest.commentary;
          this.typeTravel = travelRequest.travel_type_name;
          this.objectPrint = result.data[0].travel_managements;
          this.annexeds = result.data[0].travel_request_annexeds;
          this.view_travels.push(travelRequest);
          this.maintenance = travelRequest.is_maintenance;
          this.is_sender_approval = result.data[0].is_sender_approval;

          if (travelRequest.employee_applicant_to_json !== null) {
            this.eployee_selected = {
              id: travelRequest.employee_applicant_to_json.personal_code,
              image: travelRequest.employee_applicant_to_json.image,
              name_complete:
                travelRequest.employee_applicant_to_json.short_name,
              posicion: travelRequest.employee_applicant_to_json.position,
            };
          } else {
            this.eployee_selected = null;
          }

          if (this.maintenance == true) {
            this.maintenance_travel = this.t('maintenance_with');
          } else {
            this.maintenance_travel = this.t('maintenance');
          }
          setTimeout(() => {
            this.objectReport.emit({
              success: true,
              data: [this.objectPrint],
            });
          }, 100);

          const split_begin = this.view_travels[0].date_begin.split('-');
          this.dateBeginRequest = this.view_travels[0].date_begin;
          const split_end = this.view_travels[0].date_end.split('-');
          this.dateEndRequest = this.view_travels[0].date_end;

          setTimeout(() => {
            document
              .getElementsByClassName('cke_top cke_reset_all')[0]
              .remove();
          }, 2000);
        });
      this.travelManagementService
        .getTravelsAllDetail(this.ticket)
        .subscribe((detail: any) => {
          this.allRequests = detail;
          this.table_advances_view = [];
          this.table_spend_view = [];
          this.arrayAdvanceRequest = [];
          this.arrayAllowanceRequest = [];

          if (detail.data[0].travel_advance_requests.data.length > 0) {
            detail.data[0].travel_advance_requests.data.forEach(element => {
              this.arrayAdvanceRequest.push(element.id);
            });

            setTimeout(() => {
              detail.data[0].travel_advance_requests.data.forEach(element => {
                element.travel_advance_payments.forEach(dataObject => {
                  this.table_advances_view.push(dataObject);
                });
              });

              const object = {
                labels: detail.data[0].travel_advance_requests.labels,
                data: this.table_advances_view,
              };
              this.objectPrintAdvances.emit({
                success: true,
                data: [object],
              });
            }, 300);
          } else {
            this.objectPrintAdvances.emit({
              success: true,
              data: [],
            });
          }

          if (
            detail.data[0].travel_allowance_request.data !== null &&
            detail.data[0].travel_allowance_request.data.length === undefined
          ) {
            detail.data[0].travel_allowance_request.data.travel_allowances.forEach(
              element => {
                this.table_spend_view.push(element);
              },
            );
            const object = {
              labels: detail.data[0].travel_allowance_request.labels,
              data: this.table_spend_view,
            };
            setTimeout(() => {
              this.objectPrintSpend.emit({
                success: true,
                data: [object],
              });
            }, 300);
          } else {
            this.objectPrintSpend.emit({ success: true, data: [] });
          }
        });
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === 'showHotels') {
        const date_requests_begin = this.view_travels[0].date_begin;
        const date_requests_end = this.view_travels[0].date_end;

        this.travelsService.setHotelsByJourney({
          acction: true,
          id_journey: data.id.toString(),
          id_travel: this.ticket,
          date_travel_begin: date_requests_begin,
          date_travel_end: date_requests_end,
        });
      }
      if (data.action_method === 'ModalDistCostShow') {
        document.getElementById('closeTravelsNew').click();
        const viewDistCost = false;
        const id_by_spend = data.id;
        setTimeout(() => {
          this.spendSharedService.setViewDistCostSpend({
            accion: viewDistCost,
            id: id_by_spend,
          });
        }, 100);
      }
    });
  }

  ngOnInit() {}

  sedRequestsTravel() {
    this.travelManagementService.putSendRequestsTravels(this.ticket).subscribe(
      (data: any) => {
        if (data) {
          document.getElementById('closeTravelsNew').click();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_ts'),
              message: this.t('message_alert_ts'),
              confirmation: false,
              typeConfirmation: 'continueViewTravelRequests',
            },
          ];
          this.alert.setAlert(alertWarning[0]);
        }

        this.travelsService.setResultSaved({
          success: true,
          third: this.eployee_selected == null ? true : false,
        });
      },
      (error: any) => {
        document.getElementById('closeTravelsNew').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_one_ts'),
            message: error.json().errors.toString(),
            confirmation: false,
            typeConfirmation: 'continueViewTravelRequests',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }

  viewCotization(paramView) {
    window.open(paramView.file_anexo.url);
  }

  downloadCotization(param: any) {
    this.http
      .get(param.file_anexo.url, {
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

  cleanObjectShowDetail() {
    this.arrayAdvanceRequest = [];
    this.arrayAllowanceRequest = [];
  }
}
