import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from '../../../../models/common/widgets/widgets';
import { Enterprise } from '../../../../models/general/enterprise';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input('calendar') calendar: any;
  public objectWidget: Calendar;
  public dataEnterprise: Enterprise = null;
  constructor() {}

  ngOnInit() {
    this.calendar.subscribe((data: Calendar) => {
      this.objectWidget = data;
    });
  }

  showModalCalendar() {
    this.dataEnterprise = JSON.parse(
      localStorage.getItem('enterprise'),
    );

    if (this.dataEnterprise.show_employee_calendar !== null) {
      if (this.dataEnterprise.show_employee_calendar === true) {
        document.getElementById('btn-calendar').click();
        document
          .getElementById('bodyGeneral')
          .removeAttribute('style');
      }
    }
  }
}
