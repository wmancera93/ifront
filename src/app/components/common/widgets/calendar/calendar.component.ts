import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() calendar: any
  public objectWidget: Calendar;

  constructor() {

  }

  ngOnInit() {
    this.objectWidget = this.calendar;
  }

}
