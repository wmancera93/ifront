import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  NotificationSecundary,
} from '../../../../models/common/widgets/widgets';
import { ManagerialDataService } from '../../../../services/shared/common/managerial-data/managerial-data.service';
import { DashboardManagerialService } from '../../../../services/dashboard/managerial/dashboard-managerial.service';

@Component({
  selector: 'app-notification-secundary',
  templateUrl: './notification-secundary.component.html',
  styleUrls: ['./notification-secundary.component.css'],
})
export class NotificationSecundaryComponent implements OnInit {
  @Input('notificationSecundary') notificationSecundary: any;

  public objectWidget: NotificationSecundary;
  public dataMangerial: any;
  public dataTitle: string;
  public sendDataMangerial: any;

  constructor(
    public managerialDataShared: ManagerialDataService,
    public dasboardManagerialService: DashboardManagerialService,
  ) {}

  ngOnInit() {
    this.notificationSecundary.subscribe(
      (data: NotificationSecundary) => {
        this.objectWidget = data;
        this.dataTitle = this.objectWidget.title;
      },
    );
  }
}
