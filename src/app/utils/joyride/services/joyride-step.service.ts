import { Injectable, EventEmitter } from '@angular/core';
import { JoyrideStep } from '../models/joyride-step.class';
import { JoyrideBackdropService } from './joyride-backdrop.service';
import { EventListenerService } from './event-listener.service';
import { JoyrideStepsContainerService, StepActionType, Step } from './joyride-steps-container.service';
import { DocumentService } from './document.service';
import { StepDrawerService } from './step-drawer.service';
import { DomRefService } from './dom.service';
import { NO_POSITION } from '../directives/joyride.directive';
import { JoyrideOptionsService, SubTour } from './joyride-options.service';
import { Router } from '@angular/router';
import * as elementResizeDetector from 'element-resize-detector';

import { ReplaySubject, Observable } from 'rxjs';
import { JoyrideStepInfo } from '../models/joyride-step-info.class';
import { JoyrideStepDoesNotExist, JoyrideStepOutOfRange } from '../models/joyride-error.class';
import { LoggerService } from './logger.service';
import { ISubscription } from 'rxjs/Subscription';

const SCROLLBAR_SIZE = 20;

export const DISTANCE_FROM_TARGET = 15;
export const ARROW_SIZE = 10;

export interface IJoyrideStepService {
  startTour(): Observable<JoyrideStepInfo>;
  close(): any;
  prev(): any;
  next(): any;
}
export interface CurrentStep {
  name: string;
  route: string;
  joyrideChildren?: string;
}

@Injectable()
export class JoyrideStepService implements IJoyrideStepService {
  private currentStep: JoyrideStep;
  private currentStepLast: () => Step;
  private winTopPosition: number = 0;
  private winBottomPosition: number = 0;
  public onStepChange = new EventEmitter<Pick<JoyrideStep, 'name' | 'route'> & { actionType: StepActionType }>();
  private erd = elementResizeDetector();
  private elementsListening: HTMLElement[] = [];
  private currentStepLoadingSubscription: ISubscription;
  private currentStepLoading?: JoyrideStep;
  private stepsObserver: ReplaySubject<JoyrideStepInfo> = new ReplaySubject<JoyrideStepInfo>();

  constructor(
    private readonly backDropService: JoyrideBackdropService,
    private readonly eventListener: EventListenerService,
    private readonly stepsContainerService: JoyrideStepsContainerService,
    private readonly documentService: DocumentService,
    private readonly DOMService: DomRefService,
    private readonly stepDrawerService: StepDrawerService,
    private readonly optionsService: JoyrideOptionsService,
    private readonly router: Router,
    private readonly logger: LoggerService,
  ) {
    this.initViewportPositions();
    this.subscribeToScrollEvents();
    this.subscribeToResizeEvents();
  }

  private initViewportPositions() {
    this.winTopPosition = 0;
    this.winBottomPosition = this.DOMService.getNativeWindow().innerHeight - SCROLLBAR_SIZE;
  }

  private subscribeToScrollEvents() {
    this.eventListener.startListeningScrollEvents();
    this.eventListener.scrollEvent.subscribe(scroll => {
      this.winTopPosition = scroll.scrollY;
      this.winBottomPosition = this.winTopPosition + this.DOMService.getNativeWindow().innerHeight - SCROLLBAR_SIZE;
      if (this.currentStep) this.backDropService.redraw(this.currentStep, scroll);
    });
  }

  private subscribeToResizeEvents() {
    this.eventListener.resizeEvent.subscribe(() => {
      if (this.currentStep) this.backDropService.redrawTarget(this.currentStep);
    });
  }

  private drawStep(step: JoyrideStep) {
    step.position = step.position === NO_POSITION ? this.optionsService.getStepDefaultPosition() : step.position;
    this.stepDrawerService.draw(step);
  }

  startTour(): Observable<JoyrideStepInfo> {
    this.stepsObserver = new ReplaySubject<JoyrideStepInfo>();
    this.stepsContainerService.init();

    this.tryShowStep(StepActionType.NEXT);
    this.eventListener.startListeningResizeEvents();
    this.subscribeToStepsUpdates();
    return this.stepsObserver.asObservable();
  }

  close() {
    this.removeCurrentStep();
    if (
      this.optionsService.isSubTour &&
      this.stepsContainerService.getStepsCount() === this.stepsContainerService.getCurrentStepIndex() + 1
    ) {
      const curretnSubTour = this.optionsService.getCurretnSubTour();
      this.prevSubTour(curretnSubTour).then(() => {
        this.tryShowStep(StepActionType.PREV);
      });
    } else {
      this.notifyTourIsFinished();
      this.DOMService.getNativeWindow().scrollTo(0, 0);
      this.eventListener.stopListeningResizeEvents();
      this.backDropService.remove();
      this.stepsContainerService.init();
      this.optionsService.resetSubTours();
    }
  }

  prev() {
    this.removeCurrentStep();
    this.currentStep.prevCliked.emit();
    this.tryShowStep(StepActionType.PREV);
  }

  async next() {
    const nextStep = this.stepsContainerService.get(StepActionType.NEXT, false);
    const { id } = this.stepsContainerService.getStep(StepActionType.NEXT)();
    this.currentStep.nextClicked.emit();
    if (
      !this.currentStepLoading ||
      (this.currentStepLoading &&
        this.stepsContainerService.getStepNumber(this.currentStepLoading.name) > this.stepsContainerService.getStepNumber(id))
    ) {
      await new Promise(resolve => {
        if (nextStep) {
          this.currentStepLoadingSubscription = nextStep.loading.subscribe(a => {
            this.stepsContainerService.currentStepLoading.next(a);
            if (!a) resolve();
            else {
              this.currentStepLoading = nextStep;
            }
          });
        } else {
          resolve();
        }
      });
      this.currentStepLoading = undefined;
      this.removeCurrentStep();
      this.tryShowStep(StepActionType.NEXT);
    }
  }

  private async prevSubTour(subTour: SubTour) {
    this.optionsService.subTourPrev();
    this.stepsContainerService.resetSteps();
    await this.router.navigate([subTour.route]);
    this.stepsContainerService.setCurrentStepIndex(subTour.name);
  }

  private async navigateToStepPage(action: StepActionType) {
    let stepRoute = this.stepsContainerService.getStepRoute(action);

    let stepID: string;
    const step = this.currentStepLast && this.currentStepLast();
    if (step) {
      stepID = step.id || null;
    }
    const curretnSubTour = this.optionsService.getCurretnSubTour();
    if (curretnSubTour && curretnSubTour.id === stepID) {
      await this.prevSubTour(curretnSubTour);
    } else if (stepRoute) {
      await this.router.navigate([stepRoute]);
    }
  }

  private subscribeToStepsUpdates() {
    this.stepsContainerService.stepHasBeenModified.subscribe(updatedStep => {
      if (this.currentStep && this.currentStep.name === updatedStep.name) {
        this.currentStep = updatedStep;
      }
    });
  }

  private async tryShowStep(actionType: StepActionType) {
    this.currentStepLast = this.stepsContainerService.getStep(actionType);
    await this.navigateToStepPage(actionType);
    const timeout = this.optionsService.getWaitingTime();
    if (timeout > 100) this.backDropService.remove();
    setTimeout(async () => {
      try {
        await this.showStep(actionType);
      } catch (error) {
        if (error instanceof JoyrideStepDoesNotExist) {
          this.tryShowStep(actionType);
        } else if (error instanceof JoyrideStepOutOfRange) {
          this.logger.error('Forcing the tour closure: First or Last step not found in the DOM.');
          this.close();
        } else {
          throw new Error(error);
        }
      }
    }, timeout);
  }

  private async showStep(actionType: StepActionType) {
    this.currentStepLoadingSubscription && this.currentStepLoadingSubscription.unsubscribe();
    this.stepsContainerService.currentStepLoading.next(false);
    this.documentService.setDocumentHeight();
    for (const elementListening of this.elementsListening) {
      if (elementListening instanceof HTMLElement) {
        this.erd.removeAllListeners(elementListening);
      }
    }
    this.elementsListening = [];
    this.currentStep = this.stepsContainerService.get(actionType);

    if (this.currentStep == null) throw new JoyrideStepDoesNotExist('');
    const { waitingTime, name, route } = this.currentStep;
    // Scroll the element to get it visible if it's in a scrollable element
    this.scrollIfElementBeyondOtherElements();
    if (waitingTime) {
      this.onStepChange.emit({ name, route, actionType });
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, waitingTime);
      });
    }

    this.backDropService.draw(this.currentStep);
    this.drawStep(this.currentStep);
    this.scrollIfStepAndTargetAreNotVisible();
    this.notifyStepClicked(actionType);

    if (!waitingTime) this.onStepChange.emit({ name, route, actionType });
    const { nativeElement } = this.currentStep.targetViewContainer.element;
    if (nativeElement instanceof HTMLElement) {
      this.elementsListening.push(
        nativeElement.parentElement
          ? nativeElement.parentElement
            ? nativeElement.parentElement.parentElement
              ? nativeElement.parentElement.parentElement.parentElement
              : nativeElement.parentElement.parentElement
            : nativeElement.parentElement
          : nativeElement,
      );
      const children = nativeElement.children[0];
      if (children instanceof HTMLElement) this.elementsListening.push(children);
      this.elementsListening.forEach(element => {
        this.erd.listenTo(element, () => {
          this.scrollIfElementBeyondOtherElements();
          this.scrollIfStepAndTargetAreNotVisible();
          this.eventListener.resize();
        });
      });
    }
  }

  private notifyStepClicked(actionType: StepActionType) {
    let stepInfo: JoyrideStepInfo = {
      number: this.stepsContainerService.getStepNumber(this.currentStep.name),
      name: this.currentStep.name,
      route: this.currentStep.route,
      actionType,
    };
    this.stepsObserver.next(stepInfo);
  }

  private notifyTourIsFinished() {
    if (this.currentStep) this.currentStep.tourDone.emit();
    this.stepsObserver.complete();
  }
  private removeCurrentStep() {
    if (this.currentStep) this.stepDrawerService.remove(this.currentStep);
  }

  private scrollIfStepAndTargetAreNotVisible() {
    this.scrollWhenTargetOrStepAreHiddenBottom();
    this.scrollWhenTargetOrStepAreHiddenTop();
  }

  private scrollWhenTargetOrStepAreHiddenBottom() {
    let totalTargetBottom = this.getMaxTargetAndStepBottomPosition();
    if (totalTargetBottom > this.winBottomPosition) {
      this.DOMService.getNativeWindow().scrollBy(0, totalTargetBottom - this.winBottomPosition);
    }
  }

  private scrollWhenTargetOrStepAreHiddenTop() {
    let totalTargetTop = this.getMaxTargetAndStepTopPosition();
    if (totalTargetTop < this.winTopPosition) {
      this.DOMService.getNativeWindow().scrollBy(0, totalTargetTop - this.winTopPosition);
    }
  }

  private getMaxTargetAndStepBottomPosition(): number {
    let targetAbsoluteTop = this.documentService.getElementAbsoluteTop(this.currentStep.targetViewContainer.element);
    if (this.currentStep.position === 'top') {
      return targetAbsoluteTop + this.currentStep.stepInstance.targetHeight;
    } else if (this.currentStep.position === 'bottom') {
      return (
        targetAbsoluteTop +
        this.currentStep.stepInstance.targetHeight +
        this.currentStep.stepInstance.stepHeight +
        ARROW_SIZE +
        DISTANCE_FROM_TARGET
      );
    } else if (this.currentStep.position === 'right' || this.currentStep.position === 'left') {
      return Math.max(
        targetAbsoluteTop + this.currentStep.stepInstance.targetHeight,
        targetAbsoluteTop + this.currentStep.stepInstance.targetHeight / 2 + this.currentStep.stepInstance.stepHeight / 2,
      );
    }
  }

  private getMaxTargetAndStepTopPosition() {
    let targetAbsoluteTop = this.documentService.getElementAbsoluteTop(this.currentStep.targetViewContainer.element);
    if (this.currentStep.position === 'top') {
      return targetAbsoluteTop - (this.currentStep.stepInstance.stepHeight + ARROW_SIZE + DISTANCE_FROM_TARGET);
    } else if (this.currentStep.position === 'bottom') {
      return targetAbsoluteTop;
    } else if (this.currentStep.position === 'right' || this.currentStep.position === 'left') {
      return Math.min(
        targetAbsoluteTop,
        targetAbsoluteTop + this.currentStep.stepInstance.targetHeight / 2 - this.currentStep.stepInstance.stepHeight / 2,
      );
    }
  }

  private scrollIfElementBeyondOtherElements() {
    if (this.isElementBeyondOthers() === 2) {
      this.documentService.scrollToTheTop(this.currentStep.targetViewContainer.element);
    }
    if (this.isElementBeyondOthers() === 2) {
      this.documentService.scrollToTheBottom(this.currentStep.targetViewContainer.element);
    }
    if (
      this.isElementBeyondOthers() === 1 &&
      this.documentService.isParentScrollable(this.currentStep.targetViewContainer.element)
    ) {
      this.documentService.scrollIntoView(
        this.currentStep.targetViewContainer.element,
        this.currentStep.isElementOrAncestorFixed,
      );
    }
    if (
      this.isElementBeyondOthers() === 1 &&
      this.documentService.isParentScrollable(this.currentStep.targetViewContainer.element)
    ) {
      this.currentStep.targetViewContainer.element.nativeElement.scrollIntoView();
    }
  }

  private isElementBeyondOthers() {
    try {
      return this.documentService.isElementBeyondOthers(
        this.currentStep.targetViewContainer.element,
        this.currentStep.isElementOrAncestorFixed,
        'backdrop',
      );
    } catch (error) {
      return 1;
    }
  }

  public getCurrentStep(): CurrentStep | null {
    const currentStepLast = this.currentStepLast && this.currentStepLast();
    if (!(currentStepLast && currentStepLast.step)) {
      if (!this.currentStep) return null;
      const { name, route } = this.currentStep;
      return { name, route };
    }
    const { name, route } = currentStepLast.step;
    return { name, route };
  }

  ngOnDestroy(): void {
    this.onStepChange.unsubscribe();
  }
}
