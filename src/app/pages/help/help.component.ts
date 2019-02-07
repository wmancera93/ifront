import { Component, OnInit } from '@angular/core';
import { Help } from '../../models/common/help/help';
import { Translate } from '../../models/common/translate/translate';
import { TranslateService } from '../../services/common/translate/translate.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
 
  public dataHelp : Help[]=[] ;
  public translate: Translate = null;
  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    this.dataHelp = [{title:this.translate.app.frontEnd.pages.help.text_dashboard_ts, image:"", description:this.translate.app.frontEnd.pages.help.text_operation_dashboard_ts}, 
    {title:this.translate.app.frontEnd.pages.help.text_organization_chart_ts, image:"", description:this.translate.app.frontEnd.pages.help.text_functioning_organization_chart_ts},
    {title:this.translate.app.frontEnd.pages.help.text_my_data_ts, image:"", description:this.translate.app.frontEnd.pages.help.text_functioning_my_datat_ts}];
  }

}
