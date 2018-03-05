import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventsEmployess } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-events-employees',
  templateUrl: './events-employees.component.html',
  styleUrls: ['./events-employees.component.css']
})
export class EventsEmployeesComponent implements OnInit {
  @Input('eventsEmployee') eventsEmployee: any
  public objectWidget: EventsEmployess[];
  public cauruselIdGeneral: string = '';
  public cauruselId: string = '';
  public nohaveTeam:boolean;


  constructor() {

  }

  ngOnInit() {
    this.eventsEmployee.subscribe((data: EventsEmployess[]) => {
      this.objectWidget = data;  
      if(data.length === 0)
      {
        this.nohaveTeam = true;
      }
      else{
      this.nohaveTeam = false; 
      this.cauruselIdGeneral = this.objectWidget[0].name_event;   
      this.cauruselId = '#' + this.objectWidget[0].name_event;
    }
    })
  
  }
}
