import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';

@Component({
  selector: 'app-view-spend',
  templateUrl: './view-spend.component.html',
  styleUrls: ['./view-spend.component.css']
})
export class ViewSpendComponent implements OnInit {

  constructor(public spendSharedService: SpendSharedService) {
    this.spendSharedService.getViewSpend().subscribe((idSpend: any) => {
      console.log(idSpend)
    })
  }

  ngOnInit() {
  }

}
