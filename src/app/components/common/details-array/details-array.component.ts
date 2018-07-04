import { Component, OnInit } from '@angular/core';
import { CONNREFUSED } from 'dns';

@Component({
  selector: 'app-details-array',
  templateUrl: './details-array.component.html',
  styleUrls: ['./details-array.component.css']
})
export class DetailsArrayComponent implements OnInit {

  public detail_calendar: any[] = [];
  public descript: string = "";
  public calendar_text: string = "";
  public hour_begin: string = "";
  public hour_end: string = "";
  public description_calendar: string = "";
  public description_work: string = "";

  constructor() {
  }


  ngOnInit() {
    this.detail_calendar.push({
      descript: "hola",
      calendar_text: "holaa",
      hour_begin: "7:00:00",
      hour_end: "17:00:00",
      description_calendar: "HOLA TU",
      description_work: "BOGOTA COLOMBIA",
    })
    console.log(this.detail_calendar[0].descript)

  }

  clickOpenModal(event: any) {
    console.log(event.screenX)
    console.log(event.screenY)
    console.log(screen.width)
    console.log(screen.height)
    document.getElementById("btn_calendar_detail").click();
    document.getElementById("bodyGeneral").removeAttribute('style');
  }

  clickCloseModal() {
    //document.getElementById("closeDetailCalendar").click();
  }

}
