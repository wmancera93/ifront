import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { EventsEmployess } from '../../../../models/common/widgets/widgets';
import { EventsEmployeeService } from '../../../../services/shared/common/events-employee/events-employee.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-events-employees',
  templateUrl: './events-employees.component.html',
  styleUrls: ['./events-employees.component.css'],
})
export class EventsEmployeesComponent implements OnInit {
  @Input('eventsEmployee') eventsEmployee: any;
  @Output() modalInfoEvent: EventEmitter<string> = new EventEmitter();
  public objectWidget: EventsEmployess[];
  public cauruselIdGeneral = '';
  public cauruselId = '';
  public nohaveTeam: boolean;

  constructor(
    public infoEventEmployee: EventsEmployeeService,
    public stylesExplorerService: StylesExplorerService,
  ) {}

  ngOnInit() {
    this.eventsEmployee.subscribe((data: EventsEmployess[]) => {
      this.objectWidget = data;
      if (data.length === 0) {
        this.nohaveTeam = true;
      } else {
        this.nohaveTeam = false;
        this.cauruselIdGeneral = this.objectWidget[0].name_event;
        this.cauruselId = '#' + this.objectWidget[0].name_event;

        setTimeout(() => {
          if (this.stylesExplorerService.validateBrowser()) {
            switch (this.cauruselIdGeneral) {
              case 'birthdays':
                (<HTMLInputElement>(
                  document.getElementById(this.cauruselIdGeneral)
                    .childNodes[3]
                )).style.width = '330px';
                break;
              case 'anniversaries':
                (<HTMLInputElement>(
                  document.getElementById(this.cauruselIdGeneral)
                    .childNodes[3]
                )).style.width = '330px';
                break;
              case 'new_employees':
                (<HTMLInputElement>(
                  document.getElementById(this.cauruselIdGeneral)
                    .childNodes[3]
                )).style.width = '330px';
                break;
              case 'my_team':
                (<HTMLInputElement>(
                  document.getElementById(this.cauruselIdGeneral)
                    .childNodes[3]
                )).style.width = '500px';
                break;

              default:
                break;
            }
          }
        }, 3000);
      }
    });
  }

  showEventList() {
    this.modalInfoEvent.emit('modalInfoEvent');
    setTimeout(() => {
      this.infoEventEmployee.setInfoEventEmployee({
        objectInfo: this.objectWidget,
        modal: 'modalInfoEvent',
      });
    }, 500);
  }
}
