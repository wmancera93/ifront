import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-payments-deductions',
  templateUrl: './payments-deductions.component.html',
  styleUrls: ['./payments-deductions.component.css']
})
export class PaymentsDeductionsComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Pagos y deducciones';

  constructor(public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.queriesService.getPaymentsDeductions()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }
}
