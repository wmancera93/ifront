import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, ResponseContentType } from '@angular/http';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.css']
})
export class ViewTravelComponent implements OnInit {

  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Gestión de viajes'
  public objectReport: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public ticket: string = "";
  public objectPrint: any[] = [];
  public observations: any[] = [];
  public typeTravel: any[] = [];
  public annexeds: any[] = [];
  public edit: boolean = false;
  public view_travels: any[] = [];
  public maintenance_travel: string = 'Sin manutención'
  public maintenance: boolean = false;





  public showPdf: boolean = false;
  public showSizeTable: boolean = false;

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService,public alert: AlertsService,
    public sanitizer: DomSanitizer, public http: Http) {


    this.travelsService.getViewTravels().subscribe((data) => {
      this.ticket = data;
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

        if (this.maintenance) {
          this.maintenance_travel = 'Con manutención'
        }
        setTimeout(() => {
          this.objectReport.emit({ success: true, data: [this.objectPrint] });
        }, 100);

      });
    });
  }

  ngOnInit() {
  }

  sedRequestsTravel(){

    this.travelManagementService.putSendRequestsTravels(this.ticket).subscribe((data : any) => {
      if(data){
        const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud de viajes enviada a primer aprobador', confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
      }
      this.travelsService.setResultSaved(true);
    },
    (error: any) => {
      document.getElementById("closeTravels").click();
      const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con su solicitud de viaje?', confirmation: false }];
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
