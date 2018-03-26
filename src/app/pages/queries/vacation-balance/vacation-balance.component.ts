import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-vacation-balance',
  templateUrl: './vacation-balance.component.html',
  styleUrls: ['./vacation-balance.component.css']
})
export class VacationBalanceComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Saldo de vacaciones';

  constructor(public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.queriesService.getVacationBalance()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }
}
