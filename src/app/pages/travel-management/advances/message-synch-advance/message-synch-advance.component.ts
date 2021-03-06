import { Component, OnInit, EventEmitter } from '@angular/core';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { AdvancesService } from '../../../../services/travel-management/advances/advances.service';

@Component({
  selector: 'app-message-synch-advance',
  templateUrl: './message-synch-advance.component.html',
  styleUrls: ['./message-synch-advance.component.css'],
})
export class MessageSynchAdvanceComponent implements OnInit {
  public message_data_advance: any[] = [];
  public generalObjectAdvance: any = null;
  public ticket_advance: string;
  public objectPrintMessageAdvance: EventEmitter<any> = new EventEmitter();


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.advances.message_synch_advance.${key}`;
  }

  constructor(
    public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService,
  ) {
    this.advanceSharedService
      .getMessageSynchAdvance()
      .subscribe((data: any) => {
        this.ticket_advance = data;
        if (
          document.getElementById('message_synch_advance').className !==
          'modal show'
        ) {
          document.getElementById('btn_detail_message_synch_advance').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
        this.advancesService
          .getMessageSynchAdvance(data)
          .subscribe((result: any) => {
            this.generalObjectAdvance = result.data[0].travel_advance;
            this.message_data_advance = result.data[0].synch_server;

            if (result.data[0].synch_server.data['length'] > 0) {
              setTimeout(() => {
                this.objectPrintMessageAdvance.emit({
                  success: true,
                  data: [this.message_data_advance],
                });
              }, 100);
            } else {
              setTimeout(() => {
                this.objectPrintMessageAdvance.emit({
                  success: true,
                  data: [],
                });
              }, 100);
            }
          });
      });
  }

  ngOnInit() {}
}
