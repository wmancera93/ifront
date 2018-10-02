import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { AproversRequestsService } from '../../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';
import { TravelApproverService } from '../../../../services/shared/travel-approver/travel-approver.service';

@Component({
  selector: 'app-managed-travel',
  templateUrl: './managed-travel.component.html',
  styleUrls: ['./managed-travel.component.css']
})
export class ManagedTravelComponent implements OnInit {

  public managedRequestsTravel: any[] = [];
  public travelsRequestsManagedType: string = 'travels';
  public typesRequestManaged: any[] = [];

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelApproverServiceShared:TravelApproverService) {

    this.typesRequestManaged.push(
      {
        id: 1,
        name: "Solicitudes gestionadas de viajes"
      },
      {
        id: 2,
        name: "Solicitudes gestionadas de anticipos"
      },
      {
        id: 3,
        name: "Solicitudes gestionadas de gastos"
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

  returnBackTravel() {
    this.router.navigate(['ihr/travel_management']);
  }

  modalAproversTravelManaged(request: any) {
    this.travelApproverServiceShared.setviewDetailRequests(request)
  }

  selectTypeRequestsManaged(param) {
    debugger
    switch (param.id.toString()) {

      case '1':
      this.approverTravelsService.getApprovalsTravelsManaged().subscribe((data: any) => {
        if (data) {
          this.travelsRequestsManagedType = 'travels';
          this.managedRequestsTravel = data.data[0].requests;
        }
      })
        break;
      case '2':


        this.travelsRequestsManagedType = 'advance';

        break;
      case '3':

        this.travelsRequestsManagedType = 'spend';

        break;
      default:

        break;
    }
  }
}
