import { Component, OnInit, EventEmitter } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';

@Component({
  selector: 'app-message-synch',
  templateUrl: './message-synch.component.html',
  styleUrls: ['./message-synch.component.css'],
})
export class MessageSynchComponent implements OnInit {
  public message_data: any[] = [];
  public generalObject: any = null;
  public ticket_travel: string;
  public objectPrintMessage: EventEmitter<any> = new EventEmitter();
  public nameReportMessage: string;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.travel.message_synch.${key}`;
  }

  constructor(
    public travelsService: TravelsService,
    public travelManagementService: TravelService,
  ) {
    this.travelsService.getMessageError().subscribe((data: any) => {
      this.ticket_travel = data;
      if (document.getElementById('message_synch').className !== 'modal show') {
        document.getElementById('btn_detail_message_synch').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      this.travelManagementService
        .getMessageErrorSAP(data)
        .subscribe((result: any) => {
          this.generalObject = result.data[0].travel_request;
          this.message_data = result.data[0].synch_server;

          if (result.data[0].synch_server.data['length'] > 0) {
            setTimeout(() => {
              this.objectPrintMessage.emit({
                success: true,
                data: [this.message_data],
              });
            }, 200);
          } else {
            setTimeout(() => {
              this.objectPrintMessage.emit({
                success: true,
                data: [],
              });
            }, 150);
          }
        });
    });
  }

  ngOnInit() {}
}
