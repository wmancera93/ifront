import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-transportation-logistics',
  templateUrl: './transportation-logistics.component.html',
  styleUrls: ['./transportation-logistics.component.css']
})
export class TransportationLogisticsComponent implements OnInit {
  public modalForm: Subject<any> = new Subject<any>();
  constructor() {}

  ngOnInit() {}

  newSpendTravel() {
    this.modalForm.next({ open: true });
  }
}
