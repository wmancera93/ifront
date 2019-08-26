import { Component, OnInit, EventEmitter } from '@angular/core';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { AdvancesService } from '../../../../services/travel-management/advances/advances.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view-advance',
  templateUrl: './view-advance.component.html',
  styleUrls: ['./view-advance.component.css'],
})
export class ViewAdvanceComponent implements OnInit {
  public infoAdvance: any = null;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showPdf = false;
  public showSizeTable = false;
  public idDelete: string;

  public alertWarning: any[] = [];

  public countAfter = 0;

  public ticketSendPDF: any;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.advances.view_advance.${key}`;
  }

  constructor(
    public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService,
    public alert: AlertsService,
    public translate: TranslateService,
  ) {
    this.advanceSharedService.getViewAdvance().subscribe((id: any) => {
      if (this.countAfter === 0) {
        this.advancesService.getAdvanceByID(id).subscribe((advance: any) => {
          if (
            document.getElementById('modal_viewAdvance').className !==
            'modal show'
          ) {
            document.getElementById('btn-viewAdvance').click();
            document.getElementById('bodyGeneral').removeAttribute('style');
            this.infoAdvance = advance.data;
            this.ticketSendPDF = this.infoAdvance.travel_request_id;
            const infoTableAdvances = [];
            infoTableAdvances.push({
              success: true,
              data: [this.infoAdvance.table_advances_payment],
            });

            setTimeout(() => {
              this.objectReport.emit(infoTableAdvances[0]);
            }, 200);
          }
        });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
