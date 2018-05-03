import { Component, OnInit, Input } from '@angular/core';
import { EventsEmployeeService } from '../../../services/shared/common/events-employee/events-employee.service';
import { EventsEmployess } from '../../../models/common/widgets/widgets';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit {

  @Input('nameModal') nameModal: any;  

  public targetModal: string = '';
  public btnModal: string = '';
  public nameThisModal: string = '';
  public objectInfoEvents : any;
  public titleEvent : string;
  public eventIcon : string;

  constructor(public infoEventEmployee : EventsEmployeeService) { 
    this.infoEventEmployee.getInfoEventEmployee().subscribe((data:any)=>{
      this.objectInfoEvents = data.objectInfo; 
         console.log(this.objectInfoEvents)
      this.titleEvent = this.objectInfoEvents[0].event;
      this.eventIcon = this.objectInfoEvents[0].icon;
      this.getShowInfo(data.modal);
    })

  }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.targetModal = '#' + data;
      this.btnModal = 'btn-' + data;
      this.nameThisModal = data;
    })

  }

  getShowInfo(modal?:any)
      {
      if (document.getElementById(modal).className !== 'modal show') {
        document.getElementById('btn-' + modal).click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }
  
  }

}
