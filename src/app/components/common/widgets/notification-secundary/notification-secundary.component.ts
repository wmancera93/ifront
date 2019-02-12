import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationPrimary, NotificationSecundary } from '../../../../models/common/widgets/widgets';
import { ManagerialDataService } from '../../../../services/shared/common/managerial-data/managerial-data.service';
import { DashboardManagerialService } from '../../../../services/dashboard/managerial/dashboard-managerial.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-notification-secundary',
  templateUrl: './notification-secundary.component.html',
  styleUrls: ['./notification-secundary.component.css']
})
export class NotificationSecundaryComponent implements OnInit {
  @Input('notificationSecundary') notificationSecundary: any;

  public objectWidget: NotificationSecundary;
  public dataMangerial: any;
  public dataTitle: string;
  public sendDataMangerial: any;
  public translate: Translate = null;

  constructor(public managerialDataShared: ManagerialDataService,
    public dasboardManagerialService: DashboardManagerialService, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();
  }

  ngOnInit() {
    this.notificationSecundary.subscribe((data: NotificationSecundary) => {
      this.objectWidget = data;
      this.dataTitle = this.objectWidget.title;
    });
  }

}
