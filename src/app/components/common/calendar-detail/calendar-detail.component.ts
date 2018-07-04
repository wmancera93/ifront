import { Component, OnInit } from '@angular/core';
import { CalendarDetailService } from '../../../services/shared/common/calendar-detail/calendar-detail.service';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {
  public detail_calendar: any[] = [];
  public state_modal: boolean = false;

  constructor(public calendarDetailService: CalendarDetailService) {

    this.calendarDetailService.getDetailCalendar()
      .subscribe((detail_calendar) => {
        if (detail_calendar.efecto === 'open') {
          this.detail_calendar = [];
          this.detail_calendar.push(detail_calendar.evento);
          this.state_modal = true;

          document.getElementById('calendar_detail').style.marginLeft = (detail_calendar.pointx).toString() + 'px';
          document.getElementById('calendar_detail').style.marginTop = (detail_calendar.pointy - 300).toString() + 'px';
          console.log(detail_calendar.pointx.toString() + ' - ' + detail_calendar.pointy.toString())
          console.log(screen.height.toString() + ' - ' + screen.width.toString())
        } else {
          this.detail_calendar = [];
          this.state_modal = false;
        }
      })
  }

  ngOnInit() {

  }

}
