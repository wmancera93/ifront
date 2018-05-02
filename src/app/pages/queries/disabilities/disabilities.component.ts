import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-disabilities',
  templateUrl: './disabilities.component.html',
  styleUrls: ['./disabilities.component.css']
})
export class DisabilitiesComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Incapacidades';

  constructor(public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.queriesService.getDisabilities()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }

}
