import { Component, OnInit, Input } from '@angular/core';
import { NotificationPrimary } from '../../../../models/common/widgets/widgets';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-notification-primary',
  templateUrl: './notification-primary.component.html',
  styleUrls: ['./notification-primary.component.css']
})


export class NotificationPrimaryComponent implements OnInit {
  @Input('notificationPrimary') notificationPrimary: any;
  public objectWidget: NotificationPrimary;
  public translate: Translate = null;

  constructor(public translateService: TranslateService) {
      this.translate = this.translateService.getTranslate();
  }

  ngOnInit() {
    this.notificationPrimary.subscribe((data: NotificationPrimary) => {
      this.objectWidget = data;
    });
  }

}
