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

  public managedRequestTravel: any[] = [];
  public travelsRequestsManagedType: string = 'travels';
  public typesRequestManaged: any[] = [];
  public request_managed_id: string;
  public request_managed_type: string;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelApproverServiceShared: TravelApproverService) {

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
    this.getRequestsManaged();

  }

  getRequestsManaged() {
    
    this.approverTravelsService.getApprovalsTravelsManaged().subscribe((data: any) => {
      if (data) {
        this.travelsRequestsManagedType = 'travels';
        this.managedRequestTravel = data.data[0].requests;
      }
    })
  };
  returnBackTravel() {
    this.router.navigate(['ihr/travel_management']);
  }

  modalAproversTravelManaged(request: any, type: string) {
    this.travelApproverServiceShared.setviewDetailRequests({ request, edit: false, type: type })
  }

  selectTypeRequestsManaged(param) {
    
    switch (param.id.toString()) {
      case '1':
        this.approverTravelsService.getApprovalsTravelsManaged().subscribe((data: any) => {
          if (data) {
            this.travelsRequestsManagedType = 'travels';
            this.managedRequestTravel = data.data[0].requests;
          }
        })
        break;
      case '2':
        this.approverTravelsService.getApprovalsAdvanceManaged().subscribe((data: any) => {
          this.travelsRequestsManagedType = 'advance';
          this.managedRequestTravel = data.data[0].requests;
        })
        break;
      case '3':
        this.approverTravelsService.getApprovalsSpendManaged().subscribe((data: any) => {
          if (data) {
            this.travelsRequestsManagedType = 'spend';
            this.managedRequestTravel = data.data[0].requests;
          }
        })
        break;
      default:

        break;
    }
  }
}
