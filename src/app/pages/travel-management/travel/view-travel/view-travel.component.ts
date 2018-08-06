import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../../services/shared/travels/travels.service';

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
  public annexeds: any[] = [];
  public nombre: string = "";
  public todonombres: any[] = [];
  public icon: string = '';



  public showPdf: boolean = false;
  public showSizeTable: boolean = false;

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService, ) {

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })

    this.travelsService.getViewTravels().subscribe((data) => {
      this.ticket = data;
      document.getElementById("btn_travel_view").click();
      this.travelManagementService.getTravelRequestsByid(this.ticket).subscribe((result: any) => {
        console.log(result)
        this.observations = result.data[0].travel_request.observation;
        this.objectPrint = result.data[0].travel_managements;
        this.annexeds = result.data[0].travel_request_annexeds;
        this.annexeds.forEach(element => {
          this.nombre = element.name;
          this.todonombres.push({file: element.file, nameDoc: this.nombre});
        });
        this.objectReport.emit({ success: true, data: [this.objectPrint] });
      });
    });
  }

  ngOnInit() {
  }

}
