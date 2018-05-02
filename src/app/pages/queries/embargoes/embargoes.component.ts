import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-embargoes',
  templateUrl: './embargoes.component.html',
  styleUrls: ['./embargoes.component.css']
})
export class EmbargoesComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Embargos';

  constructor(public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.queriesService.getEmbargoes()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }
}
