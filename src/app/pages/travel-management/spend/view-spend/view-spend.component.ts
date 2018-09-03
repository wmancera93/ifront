import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';

@Component({
  selector: 'app-view-spend',
  templateUrl: './view-spend.component.html',
  styleUrls: ['./view-spend.component.css']
})
export class ViewSpendComponent implements OnInit {

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService) {
    this.spendSharedService.getViewSpend().subscribe((idSpend: any) => {
      this.spendsService.getViewDetailSpends(idSpend).subscribe((data: any) => {
        console.log(data);
        if (document.getElementById('modal_viewSpends').className !== 'modal show') {
          document.getElementById('btn-viewSpends').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
      });

    })
  }

  ngOnInit() {
  }

}
