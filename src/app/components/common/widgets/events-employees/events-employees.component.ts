import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventsEmployess } from '../../../../models/common/widgets/widgets';
import { EventsEmployeeService } from '../../../../services/shared/common/events-employee/events-employee.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-events-employees',
  templateUrl: './events-employees.component.html',
  styleUrls: ['./events-employees.component.css']
})
export class EventsEmployeesComponent implements OnInit {
  @Input('eventsEmployee') eventsEmployee: any;
  @Output() modalInfoEvent: EventEmitter<string> = new EventEmitter();
  public objectWidget: EventsEmployess[];
  public cauruselIdGeneral: string = '';
  public cauruselId: string = '';
  public nohaveTeam: boolean;


  constructor(public infoEventEmployee: EventsEmployeeService,
    public stylesExplorerService: StylesExplorerService) {

  }

  ngOnInit() {
    this.eventsEmployee.subscribe((data: EventsEmployess[]) => {
      this.objectWidget = data;
      if (data.length === 0) {
        this.nohaveTeam = true;
      }
      else {
        this.nohaveTeam = false;
        this.cauruselIdGeneral = this.objectWidget[0].name_event;
        this.cauruselId = '#' + this.objectWidget[0].name_event;
      };
      setTimeout(() => {
        if (this.stylesExplorerService.validateBrowser()) {
          if (document.getElementById("birthdays") !== null) {
            (<HTMLInputElement>document.getElementById("birthdays").childNodes[3]).style.width = '330px';
          }
          if (document.getElementById("anniversaries") !== null) {
            (<HTMLInputElement>document.getElementById("anniversaries").childNodes[3]).style.width = '330px';
          }
          if (document.getElementById("new_employees") !== null) {
            (<HTMLInputElement>document.getElementById("new_employees").childNodes[3]).style.width = '330px';
          }
          if (document.getElementById("my_team") !== null) {
            (<HTMLInputElement>document.getElementById("my_team").childNodes[3]).style.width = '500px';
          }
        }
      }, 3000);

    })


  }

  showEventList() {
    this.modalInfoEvent.emit('modalInfoEvent');
    setTimeout(() => {
      this.infoEventEmployee.setInfoEventEmployee({ objectInfo: this.objectWidget, modal: 'modalInfoEvent' });
    }, 500);


  }
}
