import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';

@Component({
  selector: 'app-pending-travel',
  templateUrl: './pending-travel.component.html',
  styleUrls: ['./pending-travel.component.css']
})
export class PendingTravelComponent implements OnInit {
  public pendingsRequestTravels: any[] = [];
  constructor(public alert: AlertsService, 
    public router: Router,public aproversRequestsService: AproversRequestsService) { 
  
      this.pendingsRequestTravels.push({

        action_approvals_requests_index_view: [{
          tittle: "Ver",
          is_active: true
        }],
        antiquity: "7 d",
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
       level_answer:1,
       level_answer_description:"Nivel de aprobacion",
       observation_requests:"Solicitud de viaje a España",
       start_time_format:null,
       status:"Pendiente",
       ticket:119,
       type_requests_to_json:
       {
         id_activity:"DAMS",
         description:"Solicititud de Viajes",
         prerequisites:null
       }
      });
  console.log(this.pendingsRequestTravels)

    }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
  }
  returnBackTravelPending(){
    this.router.navigate(['ihr/travel_management']);
  }
  modalAproversTravelPending(request: any){
    
      this.aproversRequestsService.setAprovalsRequests({ id: request.ticket, edit: true });
    
  }
}
