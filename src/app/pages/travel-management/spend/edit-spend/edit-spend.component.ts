import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-edit-spend',
  templateUrl: './edit-spend.component.html',
  styleUrls: ['./edit-spend.component.css']
})
export class EditSpendComponent implements OnInit {
  public showSubmit: boolean = true;
  public editSpendDetail: any[] = [];
  public editSpendTable: any[] = [];
  public activeEdit: boolean = false;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Gastos';

  constructor(public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    private accionDataTableService: DataDableSharedService) {

    this.spendSharedService.getEditSpend().subscribe((idEdit: any) => {
      this.spendsService.getViewDetailSpends(idEdit).subscribe((editSpend: any) => {
        this.editSpendDetail = editSpend.data[0].travel_allowance_request.info_travel;
        console.log(editSpend.data[0].travel_allowances)

        setTimeout(() => {
          this.objectReport.emit({ data: [editSpend.data[0].travel_allowances] });
        }, 500);

        if (document.getElementById('spend_edit').className !== 'modal show') {
          document.getElementById('btn_spend_edit').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
      })
    })

    this.accionDataTableService.getActionDataTable().subscribe((action: any) => {
      this.activeEdit = true;
    })

  }

  ngOnInit() {
  }

}
