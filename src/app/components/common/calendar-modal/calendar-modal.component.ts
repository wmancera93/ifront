import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css']
})
export class CalendarModalComponent implements OnInit {
  public dataEnterprise: Enterprise = null;
  public activeCalendar: boolean = false;
  public translate: Translate = null;
  constructor(public translateService: TranslateService) { 
    this.translate = this.translateService.getTranslate();

  }

  ngOnInit() {

  }

}
