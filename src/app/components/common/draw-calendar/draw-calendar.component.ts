import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CalendarData } from '../../../models/common/calendar/calendar';


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
  public dayWeek: any[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
  public eventPrueba : any[] = [{hour_begin: "03:00",
    hour_finish:"10:00", type_schedule_plan_description: "descripcion evento",
    work_schedule_plan_text:"trabajo"},{hour_begin: "05:00",
    hour_finish:"17:00", type_schedule_plan_description: "descripcion evento 2",
    work_schedule_plan_text:"trabajo 2"},{hour_begin: "05:00",
    hour_finish:"17:00", type_schedule_plan_description: "descripcion evento 2",
    work_schedule_plan_text:"trabajo 3"},{hour_begin: "05:00",
    hour_finish:"17:00", type_schedule_plan_description: "descripcion evento 2",
    work_schedule_plan_text:"trabajo 4"},{hour_begin: "05:00",
    hour_finish:"17:00", type_schedule_plan_description: "descripcion evento 2",
    work_schedule_plan_text:"trabajo 5"}] 

  constructor(public calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.getDataCalendar().subscribe((data: any) => {
      this.objectDateCurrent = data.data;      
      

      let count = 0;
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
        calendar_text: element.calendar_text,
        date: element.date,
        holiday_calendar: element.holiday_calendar,
        hour_begin: element.hour_begin,
        hour_finish: element.hour_finish,
        is_now: element.is_now,
        schedule_plan_for_periods: element.schedule_plan_for_periods,
        theorist_hours: element.theorist_hours,
        type_schedule_code: element.type_schedule_code,
        type_schedule_plan_class: element.type_schedule_plan_class,
        type_schedule_plan_description: element.type_schedule_plan_description,
        weekday: element.weekday,
        work_schedule_plan_text: element.work_schedule_plan_text,
        work_schedule_type_id: element.work_schedule_type_id
      });
    });
  }

  showDataCalendar() {

    switch (this.objectPerMonthData[0].weekday) {
      case 'domingo':
        this.newObjectDate = this.objectDateCurrent[0].data;
        break;
      case 'lunes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "domingo",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        });
        this.pushLastObjectDate();
        break;
      case 'martes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "domingo",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "lunes",
            work_schedule_plan_text:null,
            work_schedule_type_id: ""
          });
        this.pushLastObjectDate();

        break;
      case 'miercoles':
        this.newObjectDate = [];
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "domingo",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "lunes",
            work_schedule_plan_text:null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "martes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });
        this.pushLastObjectDate();

        break;
      case 'jueves':
        this.newObjectDate = [];
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "domingo",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "lunes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "martes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "miercoles",
            work_schedule_plan_text:null,
            work_schedule_type_id: ""
          });
        this.pushLastObjectDate();
        break;

      case 'viernes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "domingo",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "lunes",
            work_schedule_plan_text:  null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "martes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "miercoles",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "jueves",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });
        this.pushLastObjectDate();
        break;
      case 'sabado':
        this.newObjectDate = [];
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "domingo",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "lunes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "martes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "miercoles",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "jueves",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "viernes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });
        this.pushLastObjectDate();
        break;

    }

    switch (this.objectPerMonthData[this.objectPerMonthData.length - 1].weekday) {
      case 'sabado':
        break;
      case 'domingo':
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "lunes",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "martes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "miercoles",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "jueves",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "viernes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "sabado",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });
        break;
      case 'lunes':

        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "martes",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        },
          {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "miercoles",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "jueves",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "viernes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "sabado",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });

        break;
      case 'martes':
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "miercoles",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "jueves",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "viernes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "sabado",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });

        break;
      case 'miercoles':
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "jueves",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "viernes",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "sabado",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });
        break;
      case 'jueves':
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "viernes",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        }, {
            calendar_text: "",
            date: "",
            holiday_calendar: "",
            hour_begin: "",
            hour_finish: "",
            is_now: "",
            schedule_plan_for_periods: "",
            theorist_hours: "",
            type_schedule_code: "",
            type_schedule_plan_class: "",
            type_schedule_plan_description: "",
            weekday: "sabado",
            work_schedule_plan_text: null,
            work_schedule_type_id: ""
          });
        break;
      case 'viernes':
        this.newObjectDate.push({
          calendar_text: "",
          date: "",
          holiday_calendar: "",
          hour_begin: "",
          hour_finish: "",
          is_now: "",
          schedule_plan_for_periods: "",
          theorist_hours: "",
          type_schedule_code: "",
          type_schedule_plan_class: "",
          type_schedule_plan_description: "",
          weekday: "sabado",
          work_schedule_plan_text: null,
          work_schedule_type_id: ""
        });
        break;
    }

    this.objectPerMonthData.forEach(today => {
      this.month = today.date.split("-");
    });
    switch (this.month[1]) {
      case "01":
        this.nameMonth = "Enero"
        return;
      case "02":
        this.nameMonth = "Febrero"
        return;
      case "03":
        this.nameMonth = "Marzo"
        return;
      case "04":
        this.nameMonth = "Abril"
        return;
      case "05":
        this.nameMonth = "Mayo"
        return;
      case "06":
        this.nameMonth = "Junio"
        return;
      case "07":
        this.nameMonth = "Julio"
        return;
      case "08":
        this.nameMonth = "Agosto"
        return;
      case "09":
        this.nameMonth = "Septiembre"
        return;
      case "10":
        this.nameMonth = "Octubre"
        return;
      case "11":
        this.nameMonth = "Noviembre"
        return;
      case "12":
        this.nameMonth = "Diciembre"
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

}
