import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { AproversRequestsService } from '../../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';
import { TravelApproverService } from '../../../../services/shared/travel-approver/travel-approver.service';
import { FiltersGeneralsService } from '../../../../services/travel-management/filters-generals/filters-generals.service';

@Component({
  selector: 'app-managed-travel',
  templateUrl: './managed-travel.component.html',
  styleUrls: ['./managed-travel.component.css'],
})
export class ManagedTravelComponent implements OnInit {
  public managedRequestTravel: any[] = [];
  public travelsRequestsManagedType = 'travels';
  public typesRequestManaged: any[] = [];
  public request_managed_id: string;
  public request_managed_type: string;
  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.approver_travels.manged_travel.${key}`;
  }

  constructor(
    public alert: AlertsService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelApproverServiceShared: TravelApproverService,
    public filtersGeneralsService: FiltersGeneralsService,
  ) {
    this.typesRequestManaged.push(
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
    this.getRequestsManaged();
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
    switch (this.travelsRequestsManagedType) {
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
    this.page = 'app_sol_vi_mana';
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
            .getSearchTravelByDate(
              this.page,
              this.datesBegin,
              this.datesEnd,
            )
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
            .getSearchTravelByStatusLiquid(
              this.page,
              this.statusLiquid,
            )
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsTravelsManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
    this.page = 'app_sol_anti_mana';
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvanceManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvanceManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
            .getSearchTravelByDate(
              this.page,
              this.datesBegin,
              this.datesEnd,
            )
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvanceManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvanceManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
            .getSearchTravelByStatusLiquid(
              this.page,
              this.statusLiquid,
            )
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvanceManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsAdvanceManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
    this.page = 'app_sol_gas_mana';
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
            .getSearchTravelByDate(
              this.page,
              this.datesBegin,
              this.datesEnd,
            )
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
            .getSearchTravelByStatusLiquid(
              this.page,
              this.statusLiquid,
            )
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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
              this.managedRequestTravel = this.sortByNumber(
                data.data,
              );
            });
        } else {
          this.approverTravelsService
            .getApprovalsSpendManaged()
            .subscribe((data: any) => {
              this.managedRequestTravel = this.sortByNumber(
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

  getRequestsManaged() {
    this.approverTravelsService
      .getApprovalsTravelsManaged()
      .subscribe((data: any) => {
        if (data) {
          this.travelsRequestsManagedType = 'travels';
          this.managedRequestTravel = this.sortByNumber(
            data.data[0].requests,
          );
        }
      });
  }
  returnBackTravel() {
    this.router.navigate(['ihr/travel_management/index']);
  }
  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }

  modalAproversTravelManaged(request: any, type: string) {
    this.travelApproverServiceShared.setviewDetailRequests({
      request,
      edit: false,
      type: type,
    });
  }

  selectTypeRequestsManaged(param) {
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
          .getApprovalsTravelsManaged()
          .subscribe((data: any) => {
            if (data) {
              this.travelsRequestsManagedType = 'travels';
              this.managedRequestTravel = this.sortByNumber(
                data.data[0].requests,
              );
            }
          });
        break;
      case '2':
        this.approverTravelsService
          .getApprovalsAdvanceManaged()
          .subscribe((data: any) => {
            this.travelsRequestsManagedType = 'advance';
            this.managedRequestTravel = this.sortByNumber(
              data.data[0].requests,
            );
          });
        break;
      case '3':
        this.approverTravelsService
          .getApprovalsSpendManaged()
          .subscribe((data: any) => {
            if (data) {
              this.travelsRequestsManagedType = 'spend';
              this.managedRequestTravel = this.sortByNumber(
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
