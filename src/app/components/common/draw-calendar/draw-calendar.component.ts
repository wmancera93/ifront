import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-calendar',
  templateUrl: './draw-calendar.component.html',
  styleUrls: ['./draw-calendar.component.css']
})
export class DrawCalendarComponent implements OnInit {
  public objectDate: any[] = [];
  public newObjectDate: any[] = [];
  public data: any[] = [];
  public month: any;
  public nameMonth: any;
  public nameWeek: any;

  public dayWeek: any[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];

  constructor() { }

  ngOnInit() {
    this.objectDate = [
      {
        title: "Plan de horario de trabajo",
        title_table: "Plan de horario de trabajo",
        data: [
          {
            date: "2018-10-01",
            weekday: "martes"
          },
          {
            date: "2018-10-03",
            weekday: "miercoles"
          },
          {
            date: "2018-10-04",
            weekday: "jueves"
          },
          {
            date: "2018-10-05",
            weekday: "viernes"
          },
          {
            date: "2018-10-06",
            weekday: "sabado"
          },
          {
            date: "2018-10-07",
            weekday: "domingo"
          },
          {
            date: "2018-10-08",
            weekday: "lunes"
          },
          {
            date: "2018-10-09",
            weekday: "martes"
          },
          {
            date: "2018-10-10",
            weekday: "miercoles"
          },
          {
            date: "2018-10-11",
            weekday: "jueves"
          },
          {
            date: "2018-10-12",
            weekday: "viernes"
          },
          {
            date: "2018-10-13",
            weekday: "sabado"
          },
          {
            date: "2018-10-14",
            weekday: "domingo"
          },
          {
            date: "2018-10-15",
            weekday: "lunes"
          },
          {
            date: "2018-10-16",
            weekday: "martes"
          },
          {
            date: "2018-10-17",
            weekday: "miercoles"
          },
          {
            date: "2018-10-18",
            weekday: "jueves"
          },
          {
            date: "2018-10-19",
            weekday: "viernes"
          },
          {
            date: "2018-10-20",
            weekday: "sabado"
          },
          {
            date: "2018-10-21",
            weekday: "domingo"
          },
          {
            date: "2018-10-22",
            weekday: "lunes"
          },
          {
            date: "2018-10-23",
            weekday: "martes"
          },
          {
            date: "2018-10-24",
            weekday: "miercoles"
          },
          {
            date: "2018-10-25",
            weekday: "jueves"
          },
          {
            date: "2018-10-26",
            weekday: "viernes"
          },
          {
            date: "2018-10-27",
            weekday: "sabado"
          },
          {
            date: "2018-10-28",
            weekday: "domingo"
          },
          {
            date: "2018-10-29",
            weekday: "lunes"
          },
          {
            date: "2018-10-30",
            weekday: "martes"
          },
          {
            date: "2018-10-31",
            weekday: "miercoles"
          },
          {
            date: "2018-10-32",
            weekday: "jueves"
          },

          {
            date: "2018-10-30",
            weekday: "viernes"
          },
          {
            date: "2018-10-31",
            weekday: "sabado"
          }
        ]
      }
    ];



    switch (this.objectDate[0].data[0].weekday) {
      case 'domingo':
        this.newObjectDate = this.objectDate[0].data;
        break;
      case 'lunes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          weekday: "domingo"
        });
        this.pushLastObjectDate();
        break;
      case 'martes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          weekday: "domingo"
        },
          {
            date: "",
            weekday: "lunes"
          });
        this.pushLastObjectDate();

        break;
      case 'miercoles':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          weekday: "domingo"
        },
          {
            date: "",
            weekday: "lunes"
          },
          {
            date: "",
            weekday: "martes"
          });
        this.pushLastObjectDate();
        break;
      case 'jueves':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          weekday: "domingo"
        },
          {
            date: "",
            weekday: "lunes"
          },
          {
            date: "",
            weekday: "martes"
          },
          {
            date: "",
            weekday: "miercoles"
          });
        this.pushLastObjectDate();
        break;
      case 'viernes':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          weekday: "domingo"
        },
          {
            date: "",
            weekday: "lunes"
          },
          {
            date: "",
            weekday: "martes"
          },
          {
            date: "",
            weekday: "miercoles"
          },
          {
            date: "",
            weekday: "jueves"
          });
        this.pushLastObjectDate();
        break;
      case 'sabado':
        this.newObjectDate = [];
        this.newObjectDate.push({
          date: "",
          weekday: "domingo"
        },
          {
            date: "",
            weekday: "lunes"
          },
          {
            date: "",
            weekday: "martes"
          },
          {
            date: "",
            weekday: "miercoles"
          },
          {
            date: "",
            weekday: "jueves"
          },
          {
            date: "",
            weekday: "viernes"
          });
        this.pushLastObjectDate();
    }
    switch (this.objectDate[0].data[this.objectDate[0].data.length - 1].weekday) {
      case 'sabado':
        break;
      case 'domingo':
    
        this.newObjectDate.push({
          date: "",
          weekday: "lunes"
        },
          {
            date: "",
            weekday: "martes"
          }, {
            date: "",
            weekday: "miercoles"
          }, {
            date: "",
            weekday: "jueves"
          }, {
            date: "",
            weekday: "viernes"
          }, {
            date: "",
            weekday: "sabado"
          });
        break;
        case 'lunes':

        this.newObjectDate.push({
          date: "",
          weekday: "martes"
        },
          {
            date: "",
            weekday: "miercoles"
          }, {
            date: "",
            weekday: "jueves"
          }, {
            date: "",
            weekday: "viernes"
          }, {
            date: "",
            weekday: "sabado"
          });

        break;
      case 'martes':
      this.newObjectDate.push( {
          date: "",
          weekday: "miercoles"
        }, {
          date: "",
          weekday: "jueves"
        }, {
          date: "",
          weekday: "viernes"
        }, {
          date: "",
          weekday: "sabado"
        });

        break;
      case 'miercoles':
      this.newObjectDate.push({
        date: "",
        weekday: "jueves"
      }, {
        date: "",
        weekday: "viernes"
      }, {
        date: "",
        weekday: "sabado"
      });
        break;
      case 'jueves':
      this.newObjectDate.push({
        date: "",
        weekday: "viernes"
      }, {
        date: "",
        weekday: "sabado"
      });
        break;
      case 'viernes':
      this.newObjectDate.push({
        date: "",
        weekday: "sabado"
      });
        break;
    }
    
    this.objectDate[0].data.forEach(element => {
      this.month = element.date.split("-");

    }); 0
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

  pushLastObjectDate() {
    this.objectDate[0].data.forEach(element => {
      this.newObjectDate.push({
        date: element.date,
        weekday: element.weekday
      });
    });
  }

}
