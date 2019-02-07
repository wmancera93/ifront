import { Component, OnInit, Input } from '@angular/core';
import { ProgressPrimary } from '../../../../models/common/widgets/widgets';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-progress-primary',
  templateUrl: './progress-primary.component.html',
  styleUrls: ['./progress-primary.component.css']
})
export class ProgressPrimaryComponent implements OnInit {
  @Input('progressPrimary') progressPrimary: any;
  public objectWidget: ProgressPrimary[] = [];
  public translate: Translate = null;
  constructor(public translateService: TranslateService) { 
    this.translate = this.translateService.getTranslate();
  }

  ngOnInit() {
    this.progressPrimary.subscribe((data: ProgressPrimary[]) => {
      this.objectWidget = data;
    })
  }
}
