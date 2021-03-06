import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css']
})
export class CalendarModalComponent implements OnInit {
  public dataEnterprise: Enterprise = null;
  public activeCalendar = false;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.calendar_modal.${key}`;
  }

  constructor() {}

  ngOnInit() {}
}
