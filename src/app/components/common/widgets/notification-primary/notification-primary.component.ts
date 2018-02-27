import { Component, OnInit, Input } from '@angular/core';
import { NotificationPrimary } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-notification-primary',
  templateUrl: './notification-primary.component.html',
  styleUrls: ['./notification-primary.component.css']
})
export class NotificationPrimaryComponent implements OnInit {
  @Input('notificationPrimary') notificationPrimary: any;
  public objectWidget: NotificationPrimary;

  constructor() {

  }

  ngOnInit() {
    this.notificationPrimary.subscribe((data: NotificationPrimary) => {
      this.objectWidget = data;
    })
  }

}
