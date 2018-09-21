import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { SpendSharedService } from '../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../services/travel-management/spends/spends.service';
import { Spends } from '../../../models/common/travels_management/spends/spends';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  token
  public spedsData: Spends[] = [];
  public idSpenRequestsIndex: string;

  constructor(public router: Router,
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public alert: AlertsService) {

    this.spendSharedService.getRefreshSpend().subscribe((data: any) => {
      if (data) {
        this.chargeDataSpends();
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
          this.chargeDataSpends();
          this.spendSharedService.setDeleteSpend('deleteSpendRequest');
        })
      }

    })



  }

  ngOnInit() {
    this.chargeDataSpends();
  }

  chargeDataSpends() {
    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      this.spedsData = list.data;
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
