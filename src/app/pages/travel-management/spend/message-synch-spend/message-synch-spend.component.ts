import { Component, OnInit, EventEmitter } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';

@Component({
  selector: 'app-message-synch-spend',
  templateUrl: './message-synch-spend.component.html',
  styleUrls: ['./message-synch-spend.component.css']
})
export class MessageSynchSpendComponent implements OnInit {

  public message_data_spend: any[] = [];
  public generalObjectSpend: any[] = [];
  public ticket_spend: string;
  public objectPrintMessageSpend: EventEmitter<any> = new EventEmitter();
  public nameReportMessageSpend: string = 'Mensajes de sincronización solicitud de gastos';

  constructor( public spendSharedService: SpendSharedService,
    public spendsService: SpendsService) {

      this.spendSharedService.getMessageSynchSpend().subscribe((data: any) => {
        this.ticket_spend = data;
        if (document.getElementById('message_synch_spend').className !== 'modal show') {
          document.getElementById('btn_detail_message_synch_spend').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
        this.spendsService.getMessageSynchSpend(data).subscribe((result: any) => {
          this.generalObjectSpend=result.data[0].travel_allowance_request;
          this.message_data_spend = result.data[0].synch_server;
  
          if (result.data[0].synch_server.data.lenght > 0) {
            setTimeout(() => {
  
              this.objectPrintMessageSpend.emit({ success: true, data: [this.message_data_spend] });
              console.log(this.message_data_spend)
            }, 100);
          } else {
            setTimeout(() => {
              this.objectPrintMessageSpend.emit({ success: true, data: [] });
            }, 100);
          }
        })
      })
     }

  ngOnInit() {
  }

}
