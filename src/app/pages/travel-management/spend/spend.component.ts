import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { SpendSharedService } from '../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../services/travel-management/spends/spends.service';
import { Spends } from '../../../models/common/travels_management/spends/spends';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  token
  public spedsData: Spends[] = [];

  constructor(public router: Router,
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public alert: AlertsService) {

    this.chargeDataSpends();
  }

  ngOnInit() {
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
    this.spendsService.deleteSpendData(deleteSpend.id).subscribe((status: any) => {
      const alertSuccess: Alerts[] = [{
        type: 'success',
        title: 'Confirmación',
        message: status.message,
        confirmation: false
      }];
      this.alert.setAlert(alertSuccess[0]);
      this.chargeDataSpends();
    })
  }
}
