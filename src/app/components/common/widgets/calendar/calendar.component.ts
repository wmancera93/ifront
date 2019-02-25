import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from '../../../../models/common/widgets/widgets';
import { Enterprise } from '../../../../models/general/enterprise';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input('calendar') calendar: any
  public objectWidget: Calendar;
  public dataEnterprise: Enterprise = null;
  public translate: Translate = null;
  constructor(public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();
  }

  ngOnInit() {
    this.calendar.subscribe((data: Calendar) => {
      this.objectWidget = data;
    })
  }

  showModalCalendar() {
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));

    if (this.dataEnterprise.show_employee_calendar !== null) {
      if (this.dataEnterprise.show_employee_calendar === true) {
        document.getElementById('btn-calendar').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }

    }

  }
}
