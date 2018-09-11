import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';

@Component({
  selector: 'app-view-spend',
  templateUrl: './view-spend.component.html',
  styleUrls: ['./view-spend.component.css']
})
export class ViewSpendComponent implements OnInit {

  public showSpendDetail: any[] = [];
  public showTravelDetail: any[] = [];
  public showTableSpendsDetail: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Gastos';

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService) {
    this.spendSharedService.getViewSpend().subscribe((idSpend: any) => {
      this.spendsService.getViewDetailSpends(idSpend).subscribe((data: any) => {
        this.showSpendDetail = data.data[0];
        this.showTravelDetail = data.data[0].travel_allowance_request.info_travel;
        this.showTableSpendsDetail = data.data[0].travel_allowances;
        

        setTimeout(() => {
          this.objectReport.emit({data:[data.data[0].travel_allowances]});
        }, 500);

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
