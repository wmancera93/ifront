import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, ResponseContentType } from '@angular/http';

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
 



  public showPdf: boolean = false;
  public showSizeTable: boolean = false;

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService,
    public sanitizer: DomSanitizer, public http: Http) {


    this.travelsService.getViewTravels().subscribe((data) => {
      this.ticket = data;
      document.getElementById("btn_travel_view").click();
      document.getElementById('bodyGeneral').removeAttribute('style');
      this.travelManagementService.getTravelRequestsByid(this.ticket).subscribe((result: any) => {
        this.observations = result.data[0].travel_request.observation;
        this.typeTravel = result.data[0].travel_request.travel_type_name;
        this.objectPrint = result.data[0].travel_managements;
        this.annexeds = result.data[0].travel_request_annexeds;
        
        this.objectReport.emit({ success: true, data: [this.objectPrint] });
      });
    });
  }

  ngOnInit() {
  }
  viewCotization(param) {
    window.open(param.file.url)
  }
  downloadCotization(param: any) {
  
    this.http.get(param.file.url, {
      responseType: ResponseContentType.Blob
    }) .map(res => {
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
