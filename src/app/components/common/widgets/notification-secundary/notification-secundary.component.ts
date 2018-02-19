import { Component, OnInit, Input } from '@angular/core';
import { NotificationPrimary } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-notification-secundary',
  templateUrl: './notification-secundary.component.html',
  styleUrls: ['./notification-secundary.component.css']
})
export class NotificationSecundaryComponent implements OnInit {
  @Input() notificationSecundary: any;
  public objectWidget: NotificationPrimary;
  
  constructor() { }

  ngOnInit() {
    this.objectWidget = this.notificationSecundary;
  }

}
