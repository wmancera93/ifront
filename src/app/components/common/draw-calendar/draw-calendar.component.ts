import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CalendarData } from '../../../models/common/calendar/calendar';
import { CalendarDetailService } from '../../../services/shared/common/calendar-detail/calendar-detail.service';
import { TranslateService } from '../../../services/common/translate/translate.service';
import { Translate } from '../../../models/common/translate/translate';


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
  public changeMonth: number = 0;

  public saturday: string;
  public sunday: string;
  public monday: string;
  public tuesday: string;
  public wednesday: string;
  public thursday: string;
  public friday: string;
  public translate: Translate = null;
  public rest: string;
  public responsive: boolean = false;


  constructor(public calendarService: CalendarService, public calendarDetailService: CalendarDetailService, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();

    this.saturday = this.translate.app.frontEnd.components.common.draw_calendar.saturday;
    this.sunday = this.translate.app.frontEnd.components.common.draw_calendar.sunday;
    this.monday = this.translate.app.frontEnd.components.common.draw_calendar.monday;
    this.tuesday = this.translate.app.frontEnd.components.common.draw_calendar.tuesday;
    this.wednesday = this.translate.app.frontEnd.components.common.draw_calendar.wednesday;
    this.thursday = this.translate.app.frontEnd.components.common.draw_calendar.thursday;
    this.friday = this.translate.app.frontEnd.components.common.draw_calendar.friday;
    this.rest = this.translate.app.frontEnd.components.common.draw_calendar.rest;
  }
  //ngOnInit() {}
  ngOnInit() {
    this.calendarService.getDataCalendar().subscribe((data: any) => {
      this.objectDateCurrent = data.data;
      let count = 0;
      if (screen.width <= 1000) {
        if (screen.width <= 500) {

          this.responsive = true;
        }

        this.saturday = this.translate.app.frontEnd.components.common.draw_calendar.saturday_abr;
        this.sunday = this.translate.app.frontEnd.components.common.draw_calendar.sunday_abr;
        this.monday = this.translate.app.frontEnd.components.common.draw_calendar.monday_abr;
        this.tuesday = this.translate.app.frontEnd.components.common.draw_calendar.tuesday_abr;
        this.wednesday = this.translate.app.frontEnd.components.common.draw_calendar.wednesday_abr;
        this.thursday = this.translate.app.frontEnd.components.common.draw_calendar.thursday_abr;
        this.friday = this.translate.app.frontEnd.components.common.draw_calendar.friday_abr;
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
          }
          else if (count === 1) {
            this.objectDateLast.push(element);

          }
          else if (count === 2) {
            this.objectDateToday.push(element);
          }
          else if (count === 3) {
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

  showDataCalendar() {
    switch (this.objectPerMonthData[0].weekday) {

      case this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser:
        this.newObjectDate = this.objectPerMonthData;

        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.monday_ser:
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser,
          work_schedule_plan: [
            {
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
              work_schedule_plan_text: ""
            }
          ]
        });
        this.pushLastObjectDate();
        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser:
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser,
          work_schedule_plan: [
            {
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
              work_schedule_plan_text: ""
            }
          ]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
            work_schedule_plan: [
              {
                calendar_text: " ",
                holiday_calendar: "",
                hour_begin: "",
                hour_finish: "",
                schedule_plan_for_periods: "",
                theorist_hours: "",
                type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
                work_schedule_plan_text: ""
              }
            ]
          });
        this.pushLastObjectDate();

        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser:
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser,
          work_schedule_plan: [
            {
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }
          ]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
            work_schedule_plan: [
              {
                calendar_text: " ",
                holiday_calendar: "",
                hour_begin: "",
                hour_finish: "",
                schedule_plan_for_periods: "",
                theorist_hours: "",
                type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
                work_schedule_plan_text: ""
              }
            ]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        this.pushLastObjectDate();

        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser:
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        this.pushLastObjectDate();
        break;

      case this.translate.app.frontEnd.components.common.draw_calendar.friday_ser:
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        this.pushLastObjectDate();
        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser:
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.friday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        this.pushLastObjectDate();
        break;

    }

    switch (this.objectPerMonthData[this.objectPerMonthData.length - 1].weekday) {
      case this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser:
        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.sunday_ser:
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.monday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.friday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.monday_ser:

        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.friday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });

        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.tuesday_ser:
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.friday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });

        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.wednesday_ser:
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.friday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.thursday_ser:
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.friday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        }, {
            date: "",
            id: "",
            is_now: "",
            weekday: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
            work_schedule_plan: [{
              calendar_text: " ",
              holiday_calendar: "",
              hour_begin: "",
              hour_finish: "",
              schedule_plan_for_periods: "",
              theorist_hours: "",
              type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
              work_schedule_plan_text: ""
            }]
          });
        break;
      case this.translate.app.frontEnd.components.common.draw_calendar.friday_ser:
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: this.translate.app.frontEnd.components.common.draw_calendar.saturday_ser,
          work_schedule_plan: [{
            calendar_text: " ",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_plan_description: this.translate.app.frontEnd.components.common.draw_calendar.rest,
            work_schedule_plan_text: ""
          }]
        });
        break;
    }

    this.month = this.objectPerMonthData[0].date.split("-");
    // this.objectPerMonthData.forEach(today => {
    //   this.month = today.date.split("-");      
    // });

    switch (this.month[1]) {
      case "01":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.january
        return;
      case "02":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.february
        return;
      case "03":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.march
        return;
      case "04":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.april
        return;
      case "05":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.may
        return;
      case "06":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.june
        return;
      case "07":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.july
        return;
      case "08":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.august
        return;
      case "09":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.september
        return;
      case "10":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.october
        return;
      case "11":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.november
        return;
      case "12":
        this.nameMonth = this.translate.app.frontEnd.components.common.draw_calendar.december
        return;
    }

  }

  nextMonth() {

    this.objectDataPosition = [this.objectDateLast, this.objectDateToday, this.objectDateNextMonth];

    if (this.objectDataPosition[this.objectDataPosition.length - 3] === this.objectPerMonthData) {
      this.objectPerMonthData = this.objectDataPosition[1];

      this.showDataCalendar();
    }
    else if (this.objectDataPosition[this.objectDataPosition.length - 2] === this.objectPerMonthData) {
      this.objectPerMonthData = this.objectDataPosition[2];

      this.showDataCalendar();
    }
  }

  lastMonth() {
    this.objectDataPosition = [this.objectDateLast, this.objectDateToday, this.objectDateNextMonth];

    if (this.objectDataPosition[this.objectDataPosition.length - 2] === this.objectPerMonthData) {
      this.objectPerMonthData = this.objectDataPosition[0];

      this.showDataCalendar();
    }
    else if (this.objectDataPosition[this.objectDataPosition.length - 1] === this.objectPerMonthData) {
      this.objectPerMonthData = this.objectDataPosition[1];

      this.showDataCalendar();
    }

  }

  actualMonth() {
    this.objectDataPosition = [this.objectDateLast, this.objectDateToday, this.objectDateNextMonth];
    this.objectPerMonthData = this.objectDataPosition[1];
    this.showDataCalendar();

  }

  openModal(event: any, day: any) {

    let object_calendar = {
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
        description_work: day.work_schedule_plan_text,
      }

    }

    this.calendarDetailService.setDetailCalendar(object_calendar);
  }

  closeModal() {
    this.calendarDetailService.setDetailCalendar({ effect: 'close' });
  }

  desingPosition() {

  }
}
