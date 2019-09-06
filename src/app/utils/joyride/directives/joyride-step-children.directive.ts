import { Directive, Input, ViewContainerRef, HostListener } from '@angular/core';
import { JoyrideStepService, CurrentStep } from '../services/joyride-step.service';
import { JoyrideService } from '../services/joyride.service';
import { Router, NavigationEnd } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ROUTE_SEPARATOR } from '../constants';
import { JoyrideOptionsService } from '../services/joyride-options.service';

export const NO_POSITION = 'NO_POSITION';

@Directive({
  selector: 'joyrideStepChildren, [joyrideStepChildren]',
})
export class JoyrideStepChildren {
  subscriptions: ISubscription[] = [];
  clicked = false;
  currentStep: CurrentStep;

  @Input('joyrideStepChildren')
  name: string;

  @Input()
  active: boolean = true;

  @Input('routerLink')
  routerLink: string;

  @HostListener('click')
  test() {
    this.clicked = true;
    this.currentStep = this.joyrideStepService.getCurrentStep();
    this.joyrideService.closeTour();
  }

  constructor(
    public viewContainerRef: ViewContainerRef,
    private joyrideStepService: JoyrideStepService,
    private optionsService: JoyrideOptionsService,
    private joyrideService: JoyrideService,
    router: Router,
  ) {
    router.events.forEach(e => {
      if (e instanceof NavigationEnd && e.url === this.routerLink && this.clicked) {
        this.clicked = false;
        this.joyrideService.closeTour();
        if (this.optionsService.isSubTour) {
          this.optionsService.subTourIndex++;
        } else {
          this.optionsService.isSubTour = true;
        }
        const { name, route } = this.currentStep;
        const step = `${name}${ROUTE_SEPARATOR}${route}`;
        this.optionsService.subTour[this.optionsService.subTourIndex] = {
          optionsInject: ({ steps, startWith }) => {
            return { steps: [step, ...steps], startWith: startWith || steps[0] };
          },
          step,
        };
        setTimeout(() => {
          debugger;
          this.optionsService.callBackChildren && this.optionsService.callBackChildren();
        }, 2000);
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
