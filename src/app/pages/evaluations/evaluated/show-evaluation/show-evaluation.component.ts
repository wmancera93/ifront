import { Component, OnInit, OnDestroy } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { Evaluations } from '../../../../models/common/evaluations/evaluations';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-show-evaluation',
  templateUrl: './show-evaluation.component.html',
  styleUrls: ['./show-evaluation.component.css'],
})
export class ShowEvaluationComponent implements OnInit, OnDestroy {
  public showSubmit = true;
  public dataEvaluation: Evaluations = null;
  public receiveData: any = null;
  public countAfter = 0;
  public translate: Translate = null;

  constructor(
    public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService,
    public translateService: TranslateService,
  ) {
    this.translate = this.translateService.getTranslate();
    this.evaluationSharedService
      .getInfoViewEvaluation()
      .subscribe((info: any) => {
        if (this.countAfter === 0) {
          this.receiveData = info;
          this.evaluationService
            .getShowEvaluation(info.id)
            .subscribe((list: any) => {
              this.dataEvaluation = list.data;
            });

          document.getElementById('btn_showEvaluation').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
