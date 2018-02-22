import { Component, OnInit, Input } from '@angular/core';
import { EventsEmployess } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-events-employees',
  templateUrl: './events-employees.component.html',
  styleUrls: ['./events-employees.component.css']
})
export class EventsEmployeesComponent implements OnInit {
  @Input() eventsEmployee: any
  public objectWidget: EventsEmployess[];
  public cauruselIdGeneral: string = '';
  public cauruselId: string = '';

  constructor() {

  }

  ngOnInit() {
    this.objectWidget = this.eventsEmployee;
    this.cauruselIdGeneral = this.objectWidget[0].nameEvent;
    this.cauruselId = '#' + this.objectWidget[0].nameEvent;
  }
}
