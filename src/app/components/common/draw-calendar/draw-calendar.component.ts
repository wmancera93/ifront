import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CalendarData } from '../../../models/common/calendar/calendar';
import { CalendarDetailService } from '../../../services/shared/common/calendar-detail/calendar-detail.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-draw-calendar',
  templateUrl: './draw-calendar.component.html',
  styleUrls: ['./draw-calendar.component.css']
})
export class DrawCalendarComponent implements OnInit {
  public objectDateCurrent: any[] = [];
  public objectPerMonthData: any[] = [];
  public newObjectDate: any[] = [];
  public data: any[] = [];
  public month: any;
  public nameMonth: any;
  public nameWeek: any;
  public objectDateNextMonth: CalendarData[] = [];
  public objectDateLast: CalendarData[] = [];
  public objectDateToday: CalendarData[] = [];
  public objectDataPosition: any[] = [];
  public numberDay: any;
  public changeMonth = 0;

  public saturday: string;
  public sunday: string;
  public monday: string;
  public tuesday: string;
  public wednesday: string;
  public thursday: string;
  public friday: string;
  public rest: string;
  public responsive = false;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.draw_calendar.${key}`;
  }

  constructor(
    public calendarService: CalendarService,
    public calendarDetailService: CalendarDetailService,
    public translate: TranslateService
  ) {
    this.saturday = 'saturday';
    this.sunday = 'sunday';
    this.monday = 'monday';
    this.tuesday = 'tuesday';
    this.wednesday = 'wednesday';
    this.thursday = 'thursday';
    this.friday = 'friday';
    this.rest = 'rest';
  }

  ngOnInit() {
    this.calendarService.getDataCalendar().subscribe((data: any) => {
      this.objectDateCurrent = data.data;
      let count = 0;
      if (screen.width <= 1000) {
        if (screen.width <= 500) {
          this.responsive = true;
        }
        this.saturday = 'saturday_abr';
        this.sunday = 'sunday_abr';
        this.monday = 'monday_abr';
        this.tuesday = 'tuesday_abr';
        this.wednesday = 'wednesday_abr';
        this.thursday = 'thursday_abr';
        this.friday = 'friday_abr';
      }
      this.objectDateCurrent.forEach(element => {
        if (element.date !== null) {
          if (this.changeMonth !== element.date.split('-')[1]) {
            this.changeMonth = element.date.split('-')[1];
            count++;
            switch (count) {
              case 1:
                this.objectDateLast.push(element);
                break;
              case 2:
                this.objectDateToday.push(element);
                break;
              case 3:
                this.objectDateNextMonth.push(element);
                break;

              default:
                break;
            }
          } else if (count === 1) {
            this.objectDateLast.push(element);
          } else if (count === 2) {
            this.objectDateToday.push(element);
          } else if (count === 3) {
            this.objectDateNextMonth.push(element);
          }
        }
      });
      this.objectPerMonthData = this.objectDateToday;

      this.showDataCalendar();
    });
  }

  pushLastObjectDate() {
    this.objectPerMonthData.forEach(element => {
      this.newObjectDate.push({
        date: element.date,
        id: element.id,
        is_now: element.is_now,
        weekday: element.weekday,
        work_schedule_plan: element.work_schedule_plan
      });
    });
  }

  renderDate({ weekday, description }) {
    return {
      date: '',
      id: '',
      is_now: '',
      weekday: this.t(weekday),
      work_schedule_plan: [
        {
          calendar_text: ' ',
          holiday_calendar: '',
          hour_begin: '',
          hour_finish: '',
          schedule_plan_for_periods: '',
          theorist_hours: '',
          type_schedule_plan_description: this.t(description),
          work_schedule_plan_text: ''
        }
      ]
    };
  }

  renderDates(dates) {
    return dates.map(({ weekday, description = 'rest' }) =>
      this.renderDate({ weekday, description })
    );
  }

  showDataCalendar() {
    this.newObjectDate = [];
    switch (this.objectPerMonthData[0].weekday) {
      case this.t('sunday_ser'):
        this.newObjectDate = this.objectPerMonthData;
        break;
      case this.t('monday_ser'):
        this.newObjectDate.push(
          this.renderDate({
            weekday: 'sunday_ser',
            description: 'saturday_ser'
          })
        );
        this.pushLastObjectDate();
        break;
      case this.t('tuesday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'sunday_ser',
              description: 'saturday_ser'
            },
            {
              weekday: 'monday_ser',
              description: 'rest'
            }
          ])
        );
        this.pushLastObjectDate();
        break;
      case this.t('wednesday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'sunday_ser',
              description: 'rest'
            },
            {
              weekday: 'monday_ser',
              description: 'rest'
            },
            {
              weekday: 'tuesday_ser',
              description: 'rest'
            }
          ])
        );
        this.pushLastObjectDate();
        break;
      case this.t('thursday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'sunday_ser',
              description: 'rest'
            },
            {
              weekday: 'monday_ser',
              description: 'rest'
            },
            {
              weekday: 'tuesday_ser',
              description: 'rest'
            },
            {
              weekday: 'wednesday_ser',
              description: 'rest'
            }
          ])
        );
        this.pushLastObjectDate();
        break;

      case this.t('friday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'sunday_ser',
              description: 'rest'
            },
            {
              weekday: 'monday_ser',
              description: 'rest'
            },
            {
              weekday: 'tuesday_ser',
              description: 'rest'
            },
            {
              weekday: 'wednesday_ser',
              description: 'rest'
            },
            {
              weekday: 'thursday_ser',
              description: 'rest'
            }
          ])
        );
        this.pushLastObjectDate();
        break;
      case this.t('saturday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'sunday_ser',
              description: 'rest'
            },
            {
              weekday: 'monday_ser',
              description: 'rest'
            },
            {
              weekday: 'monday_ser',
              description: 'rest'
            },
            {
              weekday: 'wednesday_ser',
              description: 'rest'
            },
            {
              weekday: 'thursday_ser',
              description: 'rest'
            },
            {
              weekday: 'friday_ser',
              description: 'rest'
            }
          ])
        );
        this.pushLastObjectDate();
        break;
    }

    switch (
      this.objectPerMonthData[this.objectPerMonthData.length - 1].weekday
    ) {
      case this.t('saturday_ser'):
        break;
      case this.t('sunday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'monday_ser',
              description: 'rest'
            },
            {
              weekday: 'tuesday_ser',
              description: 'rest'
            },
            {
              weekday: 'wednesday_ser',
              description: 'rest'
            },
            {
              weekday: 'thursday_ser',
              description: 'rest'
            },
            {
              weekday: 'friday_ser',
              description: 'rest'
            },
            {
              weekday: 'saturday_ser',
              description: 'rest'
            }
          ])
        );
        break;
      case this.t('monday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'tuesday_ser',
              description: 'rest'
            },
            {
              weekday: 'wednesday_ser',
              description: 'rest'
            },
            {
              weekday: 'thursday_ser',
              description: 'rest'
            },
            {
              weekday: 'friday_ser',
              description: 'rest'
            },
            {
              weekday: 'saturday_ser',
              description: 'rest'
            }
          ])
        );
        break;
      case this.t('tuesday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'wednesday_ser',
              description: 'rest'
            },
            {
              weekday: 'thursday_ser',
              description: 'rest'
            },
            {
              weekday: 'friday_ser',
              description: 'rest'
            },
            {
              weekday: 'saturday_ser',
              description: 'rest'
            }
          ])
        );
        break;
      case this.t('wednesday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'thursday_ser',
              description: 'rest'
            },
            {
              weekday: 'friday_ser',
              description: 'rest'
            },
            {
              weekday: 'saturday_ser',
              description: 'rest'
            }
          ])
        );
        break;
      case this.t('thursday_ser'):
        this.newObjectDate.push(
          this.renderDates([
            {
              weekday: 'friday_ser',
              description: 'rest'
            },
            {
              weekday: 'saturday_ser',
              description: 'rest'
            }
          ])
        );
        break;
      case this.t('friday_ser'):
        this.newObjectDate.push(
          this.renderDate({
            weekday: 'saturday_ser',
            description: 'rest'
          })
        );
        break;
    }

    this.month = this.objectPerMonthData[0].date.split('-');
    // this.objectPerMonthData.forEach(today => {
    //   this.month = today.date.split("-");
    // });

    switch (this.month[1]) {
      case '01':
        this.nameMonth = this.t('january');
        return;
      case '02':
        this.nameMonth = this.t('february');
        return;
      case '03':
        this.nameMonth = this.t('march');
        return;
      case '04':
        this.nameMonth = this.t('april');
        return;
      case '05':
        this.nameMonth = this.t('may');
        return;
      case '06':
        this.nameMonth = this.t('june');
        return;
      case '07':
        this.nameMonth = this.t('july');
        return;
      case '08':
        this.nameMonth = this.t('august');
        return;
      case '09':
        this.nameMonth = this.t('september');
        return;
      case '10':
        this.nameMonth = this.t('october');
        return;
      case '11':
        this.nameMonth = this.t('november');
        return;
      case '12':
        this.nameMonth = this.t('december');
        return;
    }
  }

  nextMonth() {
    this.objectDataPosition = [
      this.objectDateLast,
      this.objectDateToday,
      this.objectDateNextMonth
    ];

    if (
      this.objectDataPosition[this.objectDataPosition.length - 3] ===
      this.objectPerMonthData
    ) {
      this.objectPerMonthData = this.objectDataPosition[1];

      this.showDataCalendar();
    } else if (
      this.objectDataPosition[this.objectDataPosition.length - 2] ===
      this.objectPerMonthData
    ) {
      this.objectPerMonthData = this.objectDataPosition[2];

      this.showDataCalendar();
    }
  }

  lastMonth() {
    this.objectDataPosition = [
      this.objectDateLast,
      this.objectDateToday,
      this.objectDateNextMonth
    ];

    if (
      this.objectDataPosition[this.objectDataPosition.length - 2] ===
      this.objectPerMonthData
    ) {
      this.objectPerMonthData = this.objectDataPosition[0];

      this.showDataCalendar();
    } else if (
      this.objectDataPosition[this.objectDataPosition.length - 1] ===
      this.objectPerMonthData
    ) {
      this.objectPerMonthData = this.objectDataPosition[1];

      this.showDataCalendar();
    }
  }

  actualMonth() {
    this.objectDataPosition = [
      this.objectDateLast,
      this.objectDateToday,
      this.objectDateNextMonth
    ];
    this.objectPerMonthData = this.objectDataPosition[1];
    this.showDataCalendar();
  }

  openModal(event: any, day: any) {
    const object_calendar = {
      effect: 'open',
      date_info: '',
      pointx: event.clientX,
      pointy: event.clientY,
      event_info: {
        descript: day.type_schedule_plan_description,
        calendar_text: day.calendar_text,
        hour_begin: day.hour_begin,
        hour_end: day.hour_finish,
        description_calendar: day.theorist_hours,
        description_work: day.work_schedule_plan_text
      }
    };

    this.calendarDetailService.setDetailCalendar(object_calendar);
  }

  closeModal() {
    this.calendarDetailService.setDetailCalendar({ effect: 'close' });
  }

  desingPosition() {}
}
