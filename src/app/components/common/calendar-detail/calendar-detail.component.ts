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
        if (detail_calendar.effect === 'open') {
          this.detail_calendar = [];
          this.detail_calendar.push(detail_calendar.event_info);
          this.state_modal = true;   
          
          if (detail_calendar.pointy < (0.6*screen.height)) {
            let calculatey =  detail_calendar.pointy - 190;
            document.getElementById('calendar_detail').style.marginTop = calculatey + 'px';
          }else {
            let calculatey =  detail_calendar.pointy - (190+(0.1*screen.height));
            document.getElementById('calendar_detail').style.marginTop = calculatey + 'px';
          }
          // let calculatey =  detail_calendar.pointy - 200;
          // document.getElementById('calendar_detail').style.marginTop = calculatey + 'px';
          
          if (detail_calendar.pointx < (0.6*screen.width)) {
            document.getElementById('calendar_detail').style.marginLeft = (detail_calendar.pointx).toString() + 'px';
          } else{
            let calculatex=detail_calendar.pointx -(0.45*screen.width) 
            document.getElementById('calendar_detail').style.marginLeft = calculatex + 'px';
          }
          
        } else {
          this.detail_calendar = [];
          this.state_modal = false;
        }

      })
  }

  ngOnInit() {

  }

}
