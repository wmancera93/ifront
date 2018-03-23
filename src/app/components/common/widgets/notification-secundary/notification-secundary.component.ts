import { Component, OnInit, Input } from '@angular/core';
import { NotificationPrimary, NotificationSecundary } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-notification-secundary',
  templateUrl: './notification-secundary.component.html',
  styleUrls: ['./notification-secundary.component.css']
})
export class NotificationSecundaryComponent implements OnInit {
  @Input('notificationSecundary') notificationSecundary: any;
  public objectWidget: NotificationSecundary;
  
  constructor() { }

  ngOnInit() {
    this.notificationSecundary.subscribe((data:NotificationSecundary) => {
      this.objectWidget = data;
    })
  }

}
