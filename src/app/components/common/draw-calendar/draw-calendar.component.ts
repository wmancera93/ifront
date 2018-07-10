import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CalendarData } from '../../../models/common/calendar/calendar';
import { CalendarDetailService } from '../../../services/shared/common/calendar-detail/calendar-detail.service';


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

  public saturday = 'Sabado';
  public sunday = 'Domingo';
  public monday = 'Lunes';
  public tuesday = 'Martes';
  public wednesday = 'Miercoles';
  public thursday = 'Jueves';
  public friday = 'Viernes';


  constructor(public calendarService: CalendarService, public calendarDetailService: CalendarDetailService) { }

  ngOnInit() {
    this.calendarService.getDataCalendar().subscribe((data: any) => {
      this.objectDateCurrent = data.data;
      console.log(this.objectDateCurrent)
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
        date: element.date,
        id: element.id,
        is_now: element.is_now,
        weekday: element.weekday,
        work_schedule_plan: element.work_schedule_plan
       
      });
    });
  }

  showDataCalendar() {
    debugger
    switch (this.objectPerMonthData[0].weekday) {

      case 'domingo':
        this.newObjectDate = this.objectPerMonthData;
        break;
      case 'lunes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "domingo",
          work_schedule_plan: []
        });
        this.pushLastObjectDate();
        break;
      case 'martes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "domingo",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "lunes",
            work_schedule_plan: []
          });
        this.pushLastObjectDate();

        break;
      case 'miercoles':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "domingo",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "lunes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "martes",
            work_schedule_plan: []
          });
        this.pushLastObjectDate();

        break;
      case 'jueves':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "domingo",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "lunes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "martes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "miercoles",
            work_schedule_plan: []
          });
        this.pushLastObjectDate();
        break;

      case 'viernes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "domingo",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "lunes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "martes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "miercoles",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "jueves",
            work_schedule_plan: []
          });
        this.pushLastObjectDate();
        break;
      case 'sabado':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "domingo",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "lunes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "martes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "miercoles",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "jueves",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "viernes",
            work_schedule_plan: []
          });
        this.pushLastObjectDate();
        break;

    }

    switch (this.objectPerMonthData[this.objectPerMonthData.length - 1].weekday) {
      case 'sabado':
        break;
      case 'domingo':
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "lunes",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "martes",
            work_schedule_plan: []
          },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "miercoles",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "jueves",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "viernes",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "sabado",
            work_schedule_plan: []
          });
        break;
      case 'lunes':

        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "martes",
          work_schedule_plan: []
        },
          {
            date: "",
            id: "",
            is_now: "",
            weekday: "miercoles",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "jueves",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "viernes",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "sabado",
            work_schedule_plan: []
          });

        break;
      case 'martes':
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "miercoles",
          work_schedule_plan: []
        }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "jueves",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "viernes",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "sabado",
            work_schedule_plan: []
          });

        break;
      case 'miercoles':
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "jueves",
          work_schedule_plan: []
        }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "viernes",
            work_schedule_plan: []
          }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "sabado",
            work_schedule_plan: []
          });
        break;
      case 'jueves':
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "viernes",
          work_schedule_plan: []
        }, {
            date: "",
            id: "",
            is_now: "",
            weekday: "sabado",
            work_schedule_plan: []
          });
        break;
      case 'viernes':
        this.newObjectDate.push({
          date: "",
          id: "",
          is_now: "",
          weekday: "sabado",
          work_schedule_plan: []
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
    debugger
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
    let objet_calendar = {
      effect: 'open',
      date_info: '04/07/2018',
      pointx: event.clientX,
      pointy: event.clientY,
      event_info: {
        descript: "hola",
        calendar_text: "holaa",
        hour_begin: "7:00:00",
        hour_end: "17:00:00",
        description_calendar: "HOLA TU",
        description_work: "BOGOTA COLOMBIA",
      }

    }

    this.calendarDetailService.setDetailCalendar(objet_calendar);
  }

  closeModal() {
    this.calendarDetailService.setDetailCalendar({ effect: 'close' });
  }

  desingPosition() {

  }
}
