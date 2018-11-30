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
  public request_id: string;
  public request_type: string;
  public typesRequestFirts: any[] = [];
  public global_ticket: string;


  constructor(public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelApproverServiceShared: TravelApproverService) {


    this.travelApproverServiceShared.getrefreshIndexRequest().subscribe(data => {
      if (data) {
        this.getRequestsPendings();
      }
    });
    this.travelApproverServiceShared.getrefreshIndexAllowance().subscribe(data => {
      if (data) {
        this.getRequestsPendingsAllowances();
      }
    });
    this.travelApproverServiceShared.getrefreshIndexAdvance().subscribe(data => {
      if (data) {
        this.getRequestsPendingsAdvance();
      }
    });
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

    this.getRequestsPendings();
  }

  getRequestsPendings() {
    this.approverTravelsService.getApprovalsTravelsPending().subscribe((data: any) => {
      if (data) {
        this.travelsRequestsType = 'travels';
        this.pendingsRequestTravels = this.sortByNumber(data.data[0].requests);
      }
    })
  };
  sortByNumber(dataBySort: any) {
    dataBySort.sort(function (a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }
  getRequestsPendingsAllowances() {
    this.approverTravelsService.getApprovalsSpendPending().subscribe((data: any) => {
      if (data) {
        this.travelsRequestsType = 'spend';
        this.pendingsRequestTravels = this.sortByNumber(data.data[0].requests);
      }
    })
  };
  getRequestsPendingsAdvance() {
    this.approverTravelsService.getApprovalsAdvancePending().subscribe((data: any) => {
      if (data) {
        this.travelsRequestsType = 'advance';
        this.pendingsRequestTravels = this.sortByNumber(data.data[0].requests);
      }
    })
  };

  returnBackTravelPending() {
    this.router.navigate(['ihr/travel_management']);
  }
  modalAproversTravelPending(request: any, type: string) {

    this.travelApproverServiceShared.setviewDetailRequests({ request, edit: true, type: type })
  }
  selectTypeReques(param) {

    switch (param.id.toString()) {
      case '1':
        this.approverTravelsService.getApprovalsTravelsPending().subscribe((data: any) => {
          if (data) {         
            this.travelsRequestsType = 'travels';
            this.pendingsRequestTravels = this.sortByNumber(data.data[0].requests);
          }
        })

        break;
      case '2':
        this.approverTravelsService.getApprovalsAdvancePending().subscribe((data: any) => {
          if (data) {
            this.travelsRequestsType = 'advance';
            this.pendingsRequestTravels = this.sortByNumber(data.data[0].requests);
          }
        })

        break;
      case '3':
        this.approverTravelsService.getApprovalsSpendPending().subscribe((data: any) => {
          if (data) {
            this.travelsRequestsType = 'spend';
            this.pendingsRequestTravels = this.sortByNumber(data.data[0].requests);
          }
        })
        break;
      default:

        break;
    }
  }
}
