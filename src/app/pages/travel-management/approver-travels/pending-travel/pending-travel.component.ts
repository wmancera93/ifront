import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { AproversRequestsService } from '../../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';
import { TravelApproverService } from '../../../../services/shared/travel-approver/travel-approver.service';
import { FiltersGeneralsService } from '../../../../services/travel-management/filters-generals/filters-generals.service';

@Component({
  selector: 'app-pending-travel',
  templateUrl: './pending-travel.component.html',
  styleUrls: ['./pending-travel.component.css'],
})
export class PendingTravelComponent implements OnInit {
  public pendingsRequestTravels: any[] = [];
  public travelsRequestsType = 'travels';
  public typesRequest: any[] = [];
  public request_id: string;
  public request_type: string;
  public typesRequestFirts: any[] = [];
  public global_ticket: string;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.approver_travels.pending_travel.${key}`;
  }

  constructor(
    public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelApproverServiceShared: TravelApproverService,
    public filtersGeneralsService: FiltersGeneralsService,
  ) {
    this.travelApproverServiceShared
      .getrefreshIndexRequest()
      .subscribe(data => {
        if (data) {
          this.getRequestsPendings();
        }
      });
    this.travelApproverServiceShared
      .getrefreshIndexAllowance()
      .subscribe(data => {
        if (data) {
          this.getRequestsPendingsAllowances();
        }
      });
    this.travelApproverServiceShared
      .getrefreshIndexAdvance()
      .subscribe(data => {
        if (data) {
          this.getRequestsPendingsAdvance();
        }
      });
    this.typesRequest.push(
      {
        id: 1,
        name: 'filter_one',
      },
      {
        id: 2,
        name: 'filter_two',
      },
      {
        id: 3,
        name: 'filter_three',
      },
    );
  }

  ngOnInit() {

    this.getRequestsPendings();
  }

  //begin filters

  public codIHR = '';
  public codSAP = '';
  public datesBegin = '';
  public datesEnd = '';
  public status = '';
  public statusLiquid = '';
  public codEmployee = '';
  public page = '';
  public is_collapse: boolean;

  filter(filter) {
    switch (this.travelsRequestsType) {
      case 'travels':
        this.travels(filter);
        break;
      case 'spend':
        this.spends(filter);
        break;
      case 'advance':
        this.advances(filter);
        break;

      default:
        break;
    }
  }

  travels(filter) {
    this.page = 'app_sol_vi';
    switch (filter) {
      case 'codIHR':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';

        if (this.codIHR !== '') {
          this.filtersGeneralsService
            .getSearchByTravelNumberIHR(this.page, this.codIHR)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'codSAP':
        this.codIHR = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.codSAP !== '') {
          this.filtersGeneralsService
            .getSearchByTravelNumberSAP(this.page, this.codSAP)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'dates':
        this.codSAP = '';
        this.codIHR = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.datesBegin !== '' && this.datesEnd !== '') {
          this.filtersGeneralsService
            .getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'status':
        this.codIHR = '';
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.status !== '') {
          this.filtersGeneralsService
            .getSearchTravelByStatus(this.page, this.status)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'statusLiquid':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.codIHR = '';
        this.codEmployee = '';
        if (this.statusLiquid !== '') {
          this.filtersGeneralsService
            .getSearchTravelByStatusLiquid(this.page, this.statusLiquid)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'codEmployee':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codIHR = '';
        if (this.codEmployee !== '') {
          this.filtersGeneralsService
            .getSearchTravelByEmployee(this.page, this.codEmployee)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;

      default:
        break;
    }
  }

  advances(filter) {
    this.page = 'app_sol_anti';
    switch (filter) {
      case 'codIHR':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';

        if (this.codIHR !== '') {
          this.filtersGeneralsService
            .getSearchByTravelNumberIHR(this.page, this.codIHR)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvancePending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'codSAP':
        this.codIHR = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.codSAP !== '') {
          this.filtersGeneralsService
            .getSearchByTravelNumberSAP(this.page, this.codSAP)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvancePending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'dates':
        this.codSAP = '';
        this.codIHR = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.datesBegin !== '' && this.datesEnd !== '') {
          this.filtersGeneralsService
            .getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvancePending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'status':
        this.codIHR = '';
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.status !== '') {
          this.filtersGeneralsService
            .getSearchTravelByStatus(this.page, this.status)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvancePending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'statusLiquid':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.codIHR = '';
        this.codEmployee = '';
        if (this.statusLiquid !== '') {
          this.filtersGeneralsService
            .getSearchTravelByStatusLiquid(this.page, this.statusLiquid)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvancePending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'codEmployee':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codIHR = '';
        if (this.codEmployee !== '') {
          this.filtersGeneralsService
            .getSearchTravelByEmployee(this.page, this.codEmployee)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvancePending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;

      default:
        break;
    }
  }

  spends(filter) {
    this.page = 'app_sol_gas';
    switch (filter) {
      case 'codIHR':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';

        if (this.codIHR !== '') {
          this.filtersGeneralsService
            .getSearchByTravelNumberIHR(this.page, this.codIHR)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'codSAP':
        this.codIHR = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.codSAP !== '') {
          this.filtersGeneralsService
            .getSearchByTravelNumberSAP(this.page, this.codSAP)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'dates':
        this.codSAP = '';
        this.codIHR = '';
        this.status = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.datesBegin !== '' && this.datesEnd !== '') {
          this.filtersGeneralsService
            .getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'status':
        this.codIHR = '';
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.statusLiquid = '';
        this.codEmployee = '';
        if (this.status !== '') {
          this.filtersGeneralsService
            .getSearchTravelByStatus(this.page, this.status)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'statusLiquid':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.codIHR = '';
        this.codEmployee = '';
        if (this.statusLiquid !== '') {
          this.filtersGeneralsService
            .getSearchTravelByStatusLiquid(this.page, this.statusLiquid)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;
      case 'codEmployee':
        this.codSAP = '';
        this.datesBegin = '';
        this.datesEnd = '';
        this.status = '';
        this.statusLiquid = '';
        this.codIHR = '';
        if (this.codEmployee !== '') {
          this.filtersGeneralsService
            .getSearchTravelByEmployee(this.page, this.codEmployee)
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(data.data);
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendPending()
            .subscribe((data: any) => {
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            });
        }
        break;

      default:
        break;
    }
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  //end filters

  getRequestsPendings() {
    this.approverTravelsService
      .getApprovalsTravelsPending()
      .subscribe((data: any) => {
        if (data) {
          this.travelsRequestsType = 'travels';
          this.pendingsRequestTravels = this.sortByNumber(
            data.data[0].requests,
          );
        }
      });
  }
  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }
  getRequestsPendingsAllowances() {
    this.approverTravelsService
      .getApprovalsSpendPending()
      .subscribe((data: any) => {
        if (data) {
          this.travelsRequestsType = 'spend';
          this.pendingsRequestTravels = this.sortByNumber(
            data.data[0].requests,
          );
        }
      });
  }
  getRequestsPendingsAdvance() {
    this.approverTravelsService
      .getApprovalsAdvancePending()
      .subscribe((data: any) => {
        if (data) {
          this.travelsRequestsType = 'advance';
          this.pendingsRequestTravels = this.sortByNumber(
            data.data[0].requests,
          );
        }
      });
  }

  returnBackTravelPending() {
    this.router.navigate(['ihr/travel_management']);
  }
  modalAproversTravelPending(request: any, type: string) {
    this.travelApproverServiceShared.setviewDetailRequests({
      request,
      edit: true,
      type: type,
    });
  }
  selectTypeReques(param) {
    this.codIHR = '';
    this.codSAP = '';
    this.datesBegin = '';
    this.datesEnd = '';
    this.status = '';
    this.statusLiquid = '';
    this.codEmployee = '';

    switch (param.id.toString()) {
      case '1':
        this.approverTravelsService
          .getApprovalsTravelsPending()
          .subscribe((data: any) => {
            if (data) {
              this.travelsRequestsType = 'travels';
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            }
          });

        break;
      case '2':
        this.approverTravelsService
          .getApprovalsAdvancePending()
          .subscribe((data: any) => {
            if (data) {
              this.travelsRequestsType = 'advance';
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            }
          });

        break;
      case '3':
        this.approverTravelsService
          .getApprovalsSpendPending()
          .subscribe((data: any) => {
            if (data) {
              this.travelsRequestsType = 'spend';
              this.pendingsRequestTravels = this.sortByNumber(
                data.data[0].requests,
              );
            }
          });
        break;
      default:
        break;
    }
  }
}
