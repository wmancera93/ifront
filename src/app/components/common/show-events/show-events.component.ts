import { Component, OnInit, Input } from '@angular/core';
import { EventsEmployeeService } from '../../../services/shared/common/events-employee/events-employee.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css'],
})
export class ShowEventsComponent implements OnInit {
  @Input('nameModal') nameModal: any;

  public targetModal = '';
  public btnModal = '';
  public nameThisModal = '';
  public objectInfoEvents: any;
  public titleEvent: string;
  public eventIcon: string;
  public flagTypeOfEvent: boolean;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.show_events.${key}`;
  }

  constructor(
    public infoEventEmployee: EventsEmployeeService,
    public translate: TranslateService,
  ) {
    this.infoEventEmployee
      .getInfoEventEmployee()
      .subscribe((data: any) => {
        this.objectInfoEvents = data.objectInfo;
        this.titleEvent = this.objectInfoEvents[0].event;
        this.eventIcon = this.objectInfoEvents[0].icon;
        if (this.titleEvent === this.t('birthday')) {
          this.flagTypeOfEvent = true;
        } else {
          this.flagTypeOfEvent = false;
        }
        this.getShowInfo(data.modal);
      });
  }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.targetModal = '#' + data;
      this.btnModal = 'btn-' + data;
      this.nameThisModal = data;
    });
  }

  getShowInfo(modal?: any) {
    if (document.getElementById(modal).className !== 'modal show') {
      document.getElementById('btn-' + modal).click();
      document.getElementById('bodyGeneral').removeAttribute('style');
    }
  }
}
