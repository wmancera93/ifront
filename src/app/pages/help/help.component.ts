import { Component, OnInit } from '@angular/core';
import { Help } from '../../models/common/help/help';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  public dataHelp: Help[] = [];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.help.${key}`;
  }

  constructor(public translate: TranslateService) {}

  ngOnInit() {
    this.dataHelp = [
      {
        title: 'text_dashboard_ts',
        image: '',
        description: 'text_operation_dashboard_ts'
      },
      {
        title: 'text_organization_chart_ts',
        image: '',
        description: 'text_functioning_organization_chart_ts'
      },
      {
        title: 'text_my_data_ts',
        image: '',
        description: 'text_functioning_my_datat_ts'
      }
    ];
  }
}
