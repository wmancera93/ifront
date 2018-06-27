import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input('calendar') calendar: any
  public objectWidget: Calendar;

  constructor() {

  }

  ngOnInit() {
    this.calendar.subscribe((data: Calendar) => {
      this.objectWidget = data;
    })
  }

  showModalCalendar()
  {     
      document.getElementById('btn-calendar').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    
  }
}
