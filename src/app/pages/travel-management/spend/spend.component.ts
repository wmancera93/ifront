import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpendSharedService } from '../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../services/travel-management/spends/spends.service';
import { Spends } from '../../../models/common/travels_management/spends/spends';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { User } from '../../../models/general/user';
import { FiltersGeneralsService } from '../../../services/travel-management/filters-generals/filters-generals.service';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css'],
})
export class SpendComponent implements OnInit {
  token;
  public spedsData: Spends[] = [];
  public idSpenRequestsIndex: string;
  public userAuthenticated: User = null;
  public third = '';
  public checkThird = true;
  public codIHR = '';
  public codSAP = '';
  public datesBegin = '';
  public datesEnd = '';
  public status = '';
  public statusLiquid = '';
  public codEmployee = '';
  public page = '';
  public is_collapse: boolean;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.spend.${key}`;
  }

  constructor(
    public router: Router,
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public alert: AlertsService,
    public filtersGeneralsService: FiltersGeneralsService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));

    this.spendSharedService.getRefreshSpend().subscribe((data: any) => {
      if (data.success) {
        this.third =
          data.third == false ? 'spends_request' : 'my_spends_request';
        switch (this.third) {
          case 'spends_request':
            this.chargeDataSpends();
            break;
          case 'my_spends_request':
            this.third = 'my_spends_request';
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.checkThird = false;
              this.spedsData = [];
              this.spedsData = list.data;
            });
            break;

          default:
            break;
        }
      }
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteSpendRequest') {
        this.spendsService
          .deleteSpendData(this.idSpenRequestsIndex)
          .subscribe((status: any) => {
            const alertSuccess: Alerts[] = [
              {
                type: 'success',
                title: 'Confirmación',
                message: status.message,
                confirmation: false,
              },
            ];
            this.alert.setAlert(alertSuccess[0]);
            switch (this.third) {
              case 'spends_request':
                this.chargeDataSpends();
                break;
              case 'my_spends_request':
                this.third = 'my_spends_request';
                this.spendsService
                  .getMySpendsRequest()
                  .subscribe((list: any) => {
                    this.checkThird = false;
                    this.spedsData = [];
                    this.spedsData = list.data;
                  });
                break;

              default:
                break;
            }
            this.spendSharedService.setDeleteSpend('deleteSpendRequest');
          });
      }
    });

    this.spendsService.getSpendsRequest().subscribe(() => {
      const url = window.location.href;
      url.split('/')[url.split('/').length - 1];
      if (
        url.split('/')[url.split('/').length - 1] !== 'spend' &&
        url.split('/')[url.split('/').length - 1] !== 'travel'
      ) {
        this.spendSharedService.setNewSpend(
          url.split('/')[url.split('/').length - 1],
        );
      }
      if (url.split('/')[url.split('/').length - 1] === 'travel') {
        this.spendSharedService.setEditSpend(
          url.split('/')[url.split('/').length - 2],
        );
      }
    });
  }

  ngOnInit() {
    this.chargeDataSpends();
  }

  filter(filter) {
    if (this.checkThird) {
      this.page = 'sol_gas_in';
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getSpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getSpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getSpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getSpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getSpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getSpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
            });
          }
          break;

        default:
          break;
      }
    } else {
      this.page = 'sol_gas_third';
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
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
                this.spedsData = this.sortByNumber(data.data);
              });
          } else {
            this.spendsService.getMySpendsRequest().subscribe((list: any) => {
              this.spedsData = this.sortByNumber(list.data);
            });
          }
          break;

        default:
          break;
      }
    }
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  //end filters

  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }

  checkSpends(spend) {
    switch (spend) {
      case 'spends_request':
        this.chargeDataSpends();
        break;
      case 'my_spends_request':
        this.third = 'my_spends_request';
        this.spendsService.getMySpendsRequest().subscribe((list: any) => {
          this.checkThird = false;
          this.spedsData = [];
          this.spedsData = list.data;
        });
        break;

      default:
        break;
    }
  }

  chargeDataSpends() {
    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      this.checkThird = true;
      this.third = 'spends_request';
      this.spedsData = [];
      this.spedsData = this.sortByNumber(list.data);
    });
  }
  returnBackPage() {
    this.router.navigate(['ihr/travel_management/index']);
  }
  newSpendTravel() {
    this.spendSharedService.setNewSpend(true);
  }
  viewSpend(objectSpend) {
    this.spendSharedService.setViewSpend(objectSpend.id);
  }

  editSpend(objectSpend) {
    this.spendSharedService.setEditSpend(objectSpend.id);
  }
  messages_error_spend(form) {
    this.spendSharedService.setMessageSynchSpend(form.id);
  }
  deleteSpend(deleteSpend) {
    this.idSpenRequestsIndex = deleteSpend.id;
    const alertWarning = [
      {
        type: 'warning',
        title: 'Confirmación',
        message:
          '¿Desea eliminar la solicitud de gastos #' +
          deleteSpend.id.toString() +
          '?',
        confirmation: true,
        typeConfirmation: 'deleteSpendRequest',
      },
    ];
    this.alert.setAlert(alertWarning[0]);
  }
}
