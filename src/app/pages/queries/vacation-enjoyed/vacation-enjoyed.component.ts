import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-vacation-enjoyed',
  templateUrl: './vacation-enjoyed.component.html',
  styleUrls: ['./vacation-enjoyed.component.css']
})
export class VacationEnjoyedComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Vacaciones disfrutadas';

  constructor(public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.queriesService.getVacationEnjoyed()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }
}
