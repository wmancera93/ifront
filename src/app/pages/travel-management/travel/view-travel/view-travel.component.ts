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
  nameReport
  public objectReport: EventEmitter<any> = new EventEmitter();

  public token: boolean;
  public ticket: number;
  public travelProof: any[] = [];
  public viewInfo: any[]=[];

  constructor(public travelManagementService: TravelService,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService) {

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
    });
    this.travelProof.push({
      success: true,
      data: [{
        title: "Viajes solicitados. Laura Beltran silvina",
        title_table: "Viajes solicitados. Laura Beltran silvina",
        labels: {
          field_0: {
            value: "Ticket",
            type: "string",
            sortable: false,
          },
          field_1: {
            value: "Transporte",
            type: "string",
            sortable: false,
          },
          field_2: {
            value: "Motivo de viaje",
            type: "string",
            sortable: false,
          },

          field_3: {
            value: "Ciudad origen",
            type: "string",
            sortable: false,
          },
          field_4: {
            value: "Terminal de origen",
            type: "string",
            sortable: false,
          },
          field_5: {
            value: "Fecha de partida",
            type: "string",
            sortable: false,
          },
          field_6: {
            value: "Ciudad destino",
            type: "string",
            sortable: false,
          },
          field_7: {
            value: "Terminal destino",
            type: "string",
            sortable: false,
          },
          field_8: {
            value: "Fecha de llegada",
            type: "string",
            sortable: false,
          },
          field_9: {
            value: "Hotel",
            type: "string",
            sortable: false,
          },
          
        },
        data: [
          {
            id: 1,
            field_0: 123,
            field_1: "Aereo",
            field_2: "Consultoria SAP",
            field_3: "Bogota",
            field_4: "Aeropuerto Internacional el dorado",
            field_5: "2018-08-11  12:00:00",
            field_6: "Medellin",
            field_7: "Aeropuerto Henrique Olaya Herrera",
            field_8: "2018-08-11  18:00:00",
            field_9: "Alcazar Real",
           
          },
          {
            id: 1,
            field_0: 124,
            field_1: "Terrestre",
            field_2: "Capacitaciones iHR",
            field_3: "Bogota",
            field_4: "Terminal del sur",
            field_5: "2018-08-28  7:30:00",
            field_6: "Villavicencio",
            field_7: "Terminal central",
            field_8: "2018-08-28  10:15:00",
            field_9: "El Delfin Rosado",
            
            }
          ]
      }]

    });

 
    setTimeout(() => {
      this.objectReport.emit(this.travelProof[0]);
    }, 200);

    this.viewInfo=this.travelProof[0].data[0].data[0];

  }

  ngOnInit() {
  }

}
