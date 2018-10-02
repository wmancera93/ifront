import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { AproversRequestsService } from '../../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';
import { TravelApproverService } from '../../../../services/shared/travel-approver/travel-approver.service';

@Component({
  selector: 'app-pending-travel',
  templateUrl: './pending-travel.component.html',
  styleUrls: ['./pending-travel.component.css']
})
export class PendingTravelComponent implements OnInit {

  public pendingsRequestTravels: any[] = [];
  public travelsRequestsType: string = 'travels';
  public typesRequest: any[] = [];


  constructor(public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelApproverServiceShared:TravelApproverService) {


    this.typesRequest.push(
      {
        id: 1,
        name: "Solicitudes pendientes de viajes"
      },
      {
        id: 2,
        name: "Solicitudes pendientes de anticipos"
      },
      {
        id: 3,
        name: "Solicitudes pendientes de gastos"
      }
    )
  }


  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });



  }
  returnBackTravelPending() {
    this.router.navigate(['ihr/travel_management']);
  }
  modalAproversTravelPending(request: any) {
    this.travelApproverServiceShared.setviewDetailRequests(request)
  }
  selectTypeReques(param) {
    debugger
    switch (param.id.toString()) {

      case '1':
        this.approverTravelsService.getApprovalsTravelsPending().subscribe((data: any) => {
          if (data) {

            this.travelsRequestsType = 'travels';
            this.pendingsRequestTravels = data.data[0].requests;
            
          }
        })

        break;
      case '2':


        this.travelsRequestsType = 'advance';

        break;
      case '3':

        this.travelsRequestsType = 'spend';

        break;
      default:

        break;
    }
  }
}
