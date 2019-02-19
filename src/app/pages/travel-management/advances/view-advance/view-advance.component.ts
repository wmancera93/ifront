import { Component, OnInit, EventEmitter } from '@angular/core';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { AdvancesService } from '../../../../services/travel-management/advances/advances.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-view-advance',
  templateUrl: './view-advance.component.html',
  styleUrls: ['./view-advance.component.css']
})
export class ViewAdvanceComponent implements OnInit {
  public infoAdvance: any = null;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Anticipos';
  public showPdf: boolean = false;
  public showSizeTable: boolean = false;

  public idDelete: string;

  public alertWarning: any[] = [];

  public countAfter: number = 0;

  public ticketSendPDF: any;

  constructor(public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService) {

    this.advanceSharedService.getViewAdvance().subscribe((id: any) => {
      if (this.countAfter === 0) {
        this.advancesService.getAdvanceByID(id).subscribe((advance: any) => {
          if (document.getElementById('modal_viewAdvance').className !== 'modal show') {
            document.getElementById('btn-viewAdvance').click();
            document.getElementById("bodyGeneral").removeAttribute('style');
            this.infoAdvance = advance.data;
            this.ticketSendPDF = this.infoAdvance.travel_request_id;
            let infoTableAdvances = [];
            infoTableAdvances.push({
              success: true,
              data: [this.infoAdvance.table_advances_payment]
            });

            setTimeout(() => {
              this.objectReport.emit(infoTableAdvances[0]);
            }, 200);
          }

        })
      }
    })

  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.countAfter += 1;
  }
}
