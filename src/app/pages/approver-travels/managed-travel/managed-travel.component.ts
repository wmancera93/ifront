import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managed-travel',
  templateUrl: './managed-travel.component.html',
  styleUrls: ['./managed-travel.component.css']
})
export class ManagedTravelComponent implements OnInit {
  public managedRequestsTravel: any[] = [];

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router, private tokenService: Angular2TokenService,
    public aproversRequestsService: AproversRequestsService) {


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


    this.managedRequestsTravel.push({

      action_approvals_requests_index_view: [{
        tittle: "Ver",
        is_active: true
      }],
      antiquity: "1 d",
      created_date: "23/09/2018",
      type_request_travel:"Viaje",
      employee_applicant_to_json:{
        division_per:"Transporte",
        image:{
          url:""
        },
        personal_code:40000028,
        position:"Administrador general",
        short_name:"Lizet Nuñez",
        subdivision_per:"CHQ-Sucre",
     },
     end_time_format:null,
     level_answer:0,
     level_answer_description:"Nivel de aprobacion",
     observation_requests:"Solicitu de viaje a España",
     start_time_format:null,
     status:"Pendiente",
     ticket:119,
     type_request_to_json:{
       id_activity:"DAMS",
       description:"Solicititud de Viajes",
       prerequisites:null
     }
    });

  }
  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

  }

  returnBackTravel(){
    this.router.navigate(['ihr/travel_management']);
  }

  modalAproversTravelManaged(request: any) {
    debugger
    this.aproversRequestsService.setAprovalsRequests({id:request.ticket, edit: false});
  }
}
