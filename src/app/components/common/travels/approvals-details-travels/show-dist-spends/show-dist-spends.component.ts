import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../../services/travel-management/spends/spends.service';
import { Translate } from '../../../../../models/common/translate/translate';
import { TranslateService } from '../../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-show-dist-spends',
  templateUrl: './show-dist-spends.component.html',
  styleUrls: ['./show-dist-spends.component.css']
})
export class ShowDistSpendsComponent implements OnInit {

  public accionDist: boolean;
  public id_spend_approval: string;
  public detailDistCostApproval: any[] = [];
  public printSpendApproval: any[] = [];
  public translate: Translate = null;
  constructor(public spendSharedService: SpendSharedService, public spendsService: SpendsService,
    public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    this.spendSharedService.getViewDistCostSpend().subscribe((data: any) => {
      this.accionDist = data.accion;

      if (document.getElementById('dist_spend_approval').className !== 'modal show') {
        document.getElementById('btn_detail_distSpend_approval').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      this.id_spend_approval = data.id;
      this.spendsService.getDetailDistCost(this.id_spend_approval).subscribe((result: any) => {
        this.detailDistCostApproval = result.data[0].cost_distribution;
        this.printSpendApproval = result.data[0].travel_allowance;
      });
    });
  }

  ngOnInit() {
  }
  returnApproval() {
    if (this.accionDist === false) {
      if (document.getElementById('approvals_requests_travels').className !== 'modal show') {
        document.getElementById('closeDistSpendApproval').click();
        setTimeout(() => {
          document.getElementById('btn_approvals_requests_travels').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.printSpendApproval = [];
        this.detailDistCostApproval = [];

      }
    }
  }

}
