import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { AdvanceSharedService } from '../../../services/shared/advance-shared/advance-shared.service';
import { AdvancesService } from '../../../services/travel-management/advances/advances.service';
import { Advances } from '../../../models/common/travels_management/advances/advances';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.css']
})
export class AdvancesComponent implements OnInit {
  token
  public advancesItems: Advances;

  constructor(public router: Router,
    public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService) {
    this.getadvancesList();
    this.advanceSharedService.getRefreshAdvanceList().subscribe((validate: any) => {
      if (validate === true) {
        this.getadvancesList();
      }
    });

    this.advancesService.getAdvancePayments().subscribe((advances: any) => {
      this.advancesItems = advances.data;

      let url = window.location.href;
      url.split('/')[url.split('/').length - 1];
      if (url.split('/')[url.split('/').length - 1] !== 'advances') {
        this.advanceSharedService.setNewAdvance(url.split('/')[url.split('/').length - 1]);
      }
    })


  }

  ngOnInit() {
  }

  getadvancesList() {
    this.advancesService.getAdvancePayments().subscribe((advances: any) => {
      this.advancesItems = advances.data;
    })
  }
  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

  newAdvanceTravel() {
    this.advanceSharedService.setNewAdvance(true);
  }

  showAdvance(id: number) {
    this.advanceSharedService.setViewAdvance(id);

  }
}
