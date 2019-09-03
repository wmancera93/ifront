import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { JoyrideStepService, JoyrideService } from '../../utils/joyride';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideOptions } from '../../utils/joyride/models/joyride-options.class';
import { JoyrideStepInfo } from '../../utils/joyride/models/joyride-step-info.class';
import { ISubscription } from 'rxjs/Subscription';

@Injectable()
export class JoyrideAppService implements OnDestroy {
  public onStartTour: EventEmitter<void> = new EventEmitter();
  public onChangeStep: EventEmitter<JoyrideStepInfo> = new EventEmitter();
  public joyrideSuscriptions: ISubscription[] = [];
  public tourDone?: ISubscription;
  public canUseKeysJoride: boolean = true;
  private isFirstTime: boolean = true;

  constructor(
    public joyrideStepService: JoyrideStepService,
    public joyrideService: JoyrideService,
    public translate: TranslateService,
  ) {}

  reloadStep() {
    if (this.joyrideService.isTourInProgress()) {
      const joyrideStepService = this.joyrideStepService as any;
      const timeout = joyrideStepService.optionsService.getWaitingTime();
      if (timeout > 100) joyrideStepService.remove();
      setTimeout(() => {
        joyrideStepService.removeCurrentStep();
        joyrideStepService.scrollIfElementBeyondOtherElements();
        joyrideStepService.backDropService.draw(joyrideStepService.currentStep);
        joyrideStepService.drawStep(joyrideStepService.currentStep);
        joyrideStepService.scrollIfStepAndTargetAreNotVisible();
      }, timeout);
    }
  }

  startTour(options: JoyrideOptions) {
    const observable = new EventEmitter<JoyrideStepInfo>();
    const start = () =>
      this.joyrideSuscriptions.push(
        this.joyrideService.startTour(options).subscribe((...a) => {
          this.canUseKeysJoride = true;
          this.onChangeStep.emit(...a);
          observable.emit(...a);
        }),
      );
    if (this.isFirstTime) {
      this.isFirstTime = false;
      this.joyrideSuscriptions.push(
        this.translate.onLangChange.subscribe(() => {
          start();
        }),
      );
      (this.translate as any).changeLang(this.translate.currentLang);
    } else {
      start();
    }
    return observable;
  }

  ngOnDestroy() {
    this.joyrideSuscriptions.forEach(suscription => suscription.unsubscribe());
  }
}
