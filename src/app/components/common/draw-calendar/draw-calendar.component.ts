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

  public saturday = 'Sábado';
  public sunday = 'Domingo';
  public monday = 'Lunes';
  public tuesday = 'Martes';
  public wednesday = 'Miércoles';
  public thursday = 'Jueves';
  public friday = 'Viernes';

  public responsive: boolean = false;


  constructor(public calendarService: CalendarService, public calendarDetailService: CalendarDetailService) { }
  //ngOnInit() {}
  ngOnInit() {
    this.calendarService.getDataCalendar().subscribe((data: any) => {
      this.objectDateCurrent = data.data;
      let count = 0;
      // if (screen.width <= 1000) {
      //   if (screen.width <= 500)
      //   {

      //     this.responsive = true;
      //   }

      //   this.saturday = 'S';
      //   this.sunday = 'D';
      //   this.monday = 'L';
      //   this.tuesday = 'M';
      //   this.wednesday = 'Mi';
      //   this.thursday = 'J';
      //   this.friday = 'V';
      // }
      // this.objectDateCurrent.forEach(element => {
      //   if (element.date !== null) {
      //     if (this.changeMonth !== element.date.split('-')[1]) {
      //       this.changeMonth = element.date.split('-')[1];
      //       count++;
      //       switch (count) {
      //         case 1:
      //           this.objectDateLast.push(element);
      //           break;
      //         case 2:
      //           this.objectDateToday.push(element);
      //           break;
      //         case 3:
      //           this.objectDateNextMonth.push(element);
      //           break;

      //         default:
      //           break;
      //       }
      //     }
      //     else if (count === 1) {
      //       this.objectDateLast.push(element);

      //     }
      //     else if (count === 2) {
      //       this.objectDateToday.push(element);
      //     }
      //     else if (count === 3) {
      //       this.objectDateNextMonth.push(element);
      //     }
      //   }
      // });
      // this.objectPerMonthData = this.objectDateToday;

      // this.showDataCalendar();
    });


  }

  pushLastObjectDate() {
    // this.objectPerMonthData.forEach(element => {
    //   this.newObjectDate.push({
    //     date: element.date,
    //     id: element.id,
    //     is_now: element.is_now,
    //     weekday: element.weekday,
    //     work_schedule_plan: element.work_schedule_plan

    //   });
    // });
  }

  showDataCalendar() {
    // switch (this.objectPerMonthData[0].weekday) {

    //   case 'DO':
    //     this.newObjectDate = this.objectPerMonthData;

    //     break;
    //   case 'LU':
    //     this.newObjectDate = [];
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "DO",
    //       work_schedule_plan: [
    //         {
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }
    //       ]
    //     });
    //     this.pushLastObjectDate();
    //     break;
    //   case 'MA':
    //     this.newObjectDate = [];
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "DO",
    //       work_schedule_plan: [
    //         {
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }
    //       ]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "LU",
    //         work_schedule_plan: [
    //           {
    //             calendar_text: " ",
    //             holiday_calendar: "",
    //             hour_begin: "",
    //             hour_finish: "",
    //             schedule_plan_for_periods: "",
    //             theorist_hours: "",
    //             type_schedule_plan_description: 'descanso',
    //             work_schedule_plan_text: ""
    //           }
    //         ]
    //       });
    //     this.pushLastObjectDate();

    //     break;
    //   case 'MI':
    //     this.newObjectDate = [];
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "DO",
    //       work_schedule_plan: [
    //         {
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }
    //       ]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "LU",
    //         work_schedule_plan: [
    //           {
    //             calendar_text: " ",
    //             holiday_calendar: "",
    //             hour_begin: "",
    //             hour_finish: "",
    //             schedule_plan_for_periods: "",
    //             theorist_hours: "",
    //             type_schedule_plan_description: 'descanso',
    //             work_schedule_plan_text: ""
    //           }
    //         ]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     this.pushLastObjectDate();

    //     break;
    //   case 'JU':
    //     this.newObjectDate = [];
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "DO",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "LU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     this.pushLastObjectDate();
    //     break;

    //   case 'VI':
    //     this.newObjectDate = [];
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "DO",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "LU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "JU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     this.pushLastObjectDate();
    //     break;
    //   case 'SA':
    //     this.newObjectDate = [];
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "DO",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "LU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "JU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "VI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     this.pushLastObjectDate();
    //     break;

    // }

    // switch (this.objectPerMonthData[this.objectPerMonthData.length - 1].weekday) {
    //   case 'SA':
    //     break;
    //   case 'DO':
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "LU",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "JU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "VI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "SA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     break;
    //   case 'LU':

    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "MA",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     },
    //       {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "MI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "JU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "VI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "SA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });

    //     break;
    //   case 'MA':
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "MI",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "JU",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "VI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "SA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });

    //     break;
    //   case 'MI':
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "JU",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "VI",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "SA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     break;
    //   case 'JU':
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "VI",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     }, {
    //         date: "",
    //         id: "",
    //         is_now: "",
    //         weekday: "SA",
    //         work_schedule_plan: [{
    //           calendar_text: " ",
    //           holiday_calendar: "",
    //           hour_begin: "",
    //           hour_finish: "",
    //           schedule_plan_for_periods: "",
    //           theorist_hours: "",
    //           type_schedule_plan_description: 'descanso',
    //           work_schedule_plan_text: ""
    //         }]
    //       });
    //     break;
    //   case 'VI':
    //     this.newObjectDate.push({
    //       date: "",
    //       id: "",
    //       is_now: "",
    //       weekday: "SA",
    //       work_schedule_plan: [{
    //         calendar_text: " ",
    //         holiday_calendar: "",
    //         hour_begin: "",
    //         hour_finish: "",
    //         schedule_plan_for_periods: "",
    //         theorist_hours: "",
    //         type_schedule_plan_description: 'descanso',
    //         work_schedule_plan_text: ""
    //       }]
    //     });
    //     break;
    // }

    // this.month = this.objectPerMonthData[0].date.split("-");
    // // this.objectPerMonthData.forEach(today => {
    // //   this.month = today.date.split("-");      
    // // });

    // switch (this.month[1]) {
    //   case "01":
    //     this.nameMonth = "Enero"
    //     return;
    //   case "02":
    //     this.nameMonth = "Febrero"
    //     return;
    //   case "03":
    //     this.nameMonth = "Marzo"
    //     return;
    //   case "04":
    //     this.nameMonth = "Abril"
    //     return;
    //   case "05":
    //     this.nameMonth = "Mayo"
    //     return;
    //   case "06":
    //     this.nameMonth = "Junio"
    //     return;
    //   case "07":
    //     this.nameMonth = "Julio"
    //     return;
    //   case "08":
    //     this.nameMonth = "Agosto"
    //     return;
    //   case "09":
    //     this.nameMonth = "Septiembre"
    //     return;
    //   case "10":
    //     this.nameMonth = "Octubre"
    //     return;
    //   case "11":
    //     this.nameMonth = "Noviembre"
    //     return;
    //   case "12":
    //     this.nameMonth = "Diciembre"
    //     return;
    // }

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

    // let object_calendar = {
    //   effect: 'open',
    //   date_info: '',
    //   pointx: event.clientX,
    //   pointy: event.clientY,
    //   event_info: {
    //     descript: day.type_schedule_plan_description,
    //     calendar_text: day.calendar_text,
    //     hour_begin: day.hour_begin,
    //     hour_end: day.hour_finish,
    //     description_calendar: day.theorist_hours,
    //     description_work: day.work_schedule_plan_text,
    //   }

    // }

    // this.calendarDetailService.setDetailCalendar(object_calendar);
  }

  closeModal() {
    this.calendarDetailService.setDetailCalendar({ effect: 'close' });
  }

  desingPosition() {

  }
}
