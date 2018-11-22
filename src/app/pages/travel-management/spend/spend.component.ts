import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { SpendSharedService } from '../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../services/travel-management/spends/spends.service';
import { Spends } from '../../../models/common/travels_management/spends/spends';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  token
  public spedsData: Spends[] = [];
  public idSpenRequestsIndex: string;
  public userAuthenticated: User = null;
  public third: string = '';
  public checkThird: boolean = true;

  constructor(public router: Router,
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public alert: AlertsService) {

    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));

    this.spendSharedService.getRefreshSpend().subscribe((data: any) => {
      if (data.success) {
        this.third = data.third == false ? 'spends_request' : 'my_spends_request';
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
        this.spendsService.deleteSpendData(this.idSpenRequestsIndex).subscribe((status: any) => {
          const alertSuccess: Alerts[] = [{
            type: 'success',
            title: 'Confirmación',
            message: status.message,
            confirmation: false
          }];
          this.alert.setAlert(alertSuccess[0]);
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
          this.spendSharedService.setDeleteSpend('deleteSpendRequest');
        })
      }

    })

    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      let url = window.location.href;
      url.split('/')[url.split('/').length - 1];
      if (url.split('/')[url.split('/').length - 1] !== 'spend' && url.split('/')[url.split('/').length - 1] !== 'travel') {
        this.spendSharedService.setNewSpend(url.split('/')[url.split('/').length - 1]);
      }
      if(url.split('/')[url.split('/').length - 1] === 'travel'){
        this.spendSharedService.setEditSpend(url.split('/')[url.split('/').length - 2]);
      }
    });

  }

  ngOnInit() {
    this.chargeDataSpends();
  }

  sortByNumber(dataBySort: any) {
    dataBySort.sort(function (a, b) {
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
    this.router.navigate(['ihr/travel_management']);
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
  deleteSpend(deleteSpend) {
    this.idSpenRequestsIndex = deleteSpend.id;
    let alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar la solicitud de gastos #' + deleteSpend.id.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteSpendRequest'
    }];
    this.alert.setAlert(alertWarning[0]);
  }
}
