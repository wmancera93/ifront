import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';

@Component({
  selector: 'app-show-dist-spends-travels',
  templateUrl: './show-dist-spends-travels.component.html',
  styleUrls: ['./show-dist-spends-travels.component.css'],
})
export class ShowDistSpendsTravelsComponent implements OnInit {
  public accionDist: boolean;
  public id_spend_travel: string;
  public detailDistCostTravel: any[] = [];
  public printSpendTravel: any[] = [];
  public is_collapse = false;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.travel.new_travel.${key}`;
  }

  constructor(
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
  ) {
    this.spendSharedService.getViewDistCostSpend().subscribe((data: any) => {
      this.accionDist = data.accion;

      if (
        document.getElementById('dist_spend_travel').className !== 'modal show'
      ) {
        document.getElementById('btn_detail_distSpend_travel').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      this.id_spend_travel = data.id;
      this.spendsService
        .getDetailDistCost(this.id_spend_travel)
        .subscribe((result: any) => {
          this.detailDistCostTravel = result.data[0].cost_distribution;
          this.printSpendTravel = result.data[0].travel_allowance;
        });
    });
  }

  ngOnInit() {}
  returnTravel() {
    if (this.accionDist === false) {
      if (document.getElementById('travel_view').className !== 'modal show') {
        document.getElementById('closeDistSpendTravel').click();
        setTimeout(() => {
          document.getElementById('btn_travel_view').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.printSpendTravel = [];
        this.detailDistCostTravel = [];
      }
    }
  }
}
