import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { SpendSharedService } from '../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../services/travel-management/spends/spends.service';
import { Spends } from '../../../models/common/travels_management/spends/spends';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  public prueba: string = '3'
  token
  public spedsData: Spends[] = [];

  constructor(public router: Router,
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService) {

    this.spendsService.getSpendsRequest().subscribe((list: any) => {
      this.spedsData = list.data;
    });
  }

  ngOnInit() {
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

  editSpend() {

  }
  deleteSpend() {

  }
}
