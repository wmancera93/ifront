import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { TravelService } from '../../../services/travel-management/travels/travel.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {


  public my_travels_list: any[] = [];
  public token: boolean;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();


  constructor(public router: Router, private tokenService: Angular2TokenService,
    public travelsService: TravelsService, public travelService: TravelService) {

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
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        });

    // this.My_travels_list.push({
    //   data: [{
    //     action_employee_travel_index_view: {
    //       0: {
    //         title: "Ver",
    //         is_active: true
    //       },
    //       1: {
    //         title: "Editar",
    //         is_active: true
    //       },
    //       2: {
    //         title: "Borrar",
    //         is_active: true
    //       }
    //     },
    //     next_approver_to_json: {
    //       approver_employee: {
    //         posicion: "DIRECTOR DE SERVICIOS ADMINISTRATIVOS",
    //         short_name: "Wilmer Mancera",
    //       },
    //       level: 1,
    //       platform: "I",
    //     },
    //     created_date: "11/07/2018",
    //     is_finished: false,
    //     observation_request: "Prueba",
    //     status: "Pendiente",
    //     ticket: 239,
    //     type_requests_id: 65,
    //     travels_text: "Capacitaciones SAP",
    //   }]
    // });
    



  }


  ngOnInit() {

    this.travelService.getTravelRequests().subscribe((data: any) => {
      console.log(data)
      this.my_travels_list = data.data[0].my_travel_requests_list;
      console.log(this.my_travels_list)
    })
  }

  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }
  newFormTravel() {
    this.travelsService.setNewTravels(true)
  }
  viewTravels(id_travel: number) {

    this.travelsService.setViewTravels(id_travel);
  }
  editTravels(id_travel: number) {

    this.travelsService.setEditTravels(id_travel);
  }
}
