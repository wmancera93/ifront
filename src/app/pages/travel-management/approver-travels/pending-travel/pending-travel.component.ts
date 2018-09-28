import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { AproversRequestsService } from '../../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';

@Component({
  selector: 'app-pending-travel',
  templateUrl: './pending-travel.component.html',
  styleUrls: ['./pending-travel.component.css']
})
export class PendingTravelComponent implements OnInit {

  public pendingsRequestTravels: any[] = [];
  public travelsRequests:boolean = false;
  public travelsSpend:boolean = false;
  public travelsAllowance:boolean = false;

  constructor(public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService) {

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.approverTravelsService.getApprovalsTravelsPending().subscribe((data: any) => {
      if (data){
        this.travelsRequests = true;
        this.pendingsRequestTravels = data;
      }else{
        this.travelsRequests = false;
      }
    })

  }
  returnBackTravelPending() {
    this.router.navigate(['ihr/travel_management']);
  }
  modalAproversTravelPending(request: any) {



  }
}
