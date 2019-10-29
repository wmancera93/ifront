import { Injectable } from '@angular/core';
import { JoyrideOptions, CustomTexts, ICustomTexts } from '../models/joyride-options.class';
import { of, Observable } from 'rxjs';
import { CurrentStep } from './joyride-step.service';
import { ROUTE_SEPARATOR } from '../constants';
import cloneDeep from 'lodash/cloneDeep';

export const DEFAULT_THEME_COLOR = '#3b5560';
export const STEP_DEFAULT_POSITION = 'bottom';
export const DEFAULT_TIMEOUT_BETWEEN_STEPS = 1;

export class ObservableCustomTexts implements ICustomTexts {
  prev: Observable<string>;
  next: Observable<string>;
  done: Observable<string>;
  close: Observable<string>;
}
export const DEFAULT_TEXTS: ObservableCustomTexts = {
  prev: of('prev'),
  next: of('next'),
  done: of('done'),
  close: of(null),
};

export interface IJoyrideOptionsService {
  setOptions(options: JoyrideOptions): void;
  getBackdropColor(): string;
  getThemeColor(): string;
  getStepDefaultPosition();
  getStepsOrder(): string[];
  getFirstStep(): string;
  getWaitingTime(): number;
  areLogsEnabled(): boolean;
  isCounterVisible(): boolean;
  isPrevButtonVisible(): boolean;
  getCustomTexts(): ObservableCustomTexts;
}

export interface SubTour {
  optionsInject?: (options?: JoyrideOptions) => Partial<JoyrideOptions>;
  id: string;
  route: string;
  name: string;
  steps: string[];
  optionsService: JoyrideOptionsService;
}

@Injectable()
export class JoyrideOptionsService implements IJoyrideOptionsService {
  private themeColor: string = DEFAULT_THEME_COLOR;
  private stepDefaultPosition: string = STEP_DEFAULT_POSITION;
  private logsEnabled: boolean = true;
  private showCounter: boolean = true;
  private showPrevButton: boolean = true;
  private stepsOrder: string[] = [];
  private firstStep: string;
  private waitingTime: number;
  private customTexts: ObservableCustomTexts;
  public isSubTour = false;
  public joyrideChildren?: string;
  public subTour: SubTour[] = [];
  public get subTourIndex() {
    return this.subTour.length - 1;
  }
  public callBackChildren?: () => void;

  setOptions(options: JoyrideOptions) {
    const optionsReult = this.getCurretnSubTour() ? this.getCurretnSubTour().optionsInject({ ...options }) : {};
    options = { ...options, ...optionsReult };
    this.stepsOrder = options.steps;
    this.stepDefaultPosition = options.stepDefaultPosition ? options.stepDefaultPosition : this.stepDefaultPosition;
    this.logsEnabled = options.logsEnabled || this.logsEnabled;
    this.showCounter = options.showCounter || this.showCounter;
    this.showPrevButton = options.showPrevButton || this.showPrevButton;
    this.themeColor = options.themeColor || this.themeColor;
    this.firstStep = options.startWith;
    this.waitingTime = options.waitingTime || DEFAULT_TIMEOUT_BETWEEN_STEPS;
    typeof options.customTexts !== 'undefined' ? this.setCustomText(options.customTexts) : this.setCustomText(DEFAULT_TEXTS);
  }

  getBackdropColor() {
    return this.hexToRgb(this.themeColor);
  }

  getThemeColor() {
    return this.themeColor;
  }

  getStepDefaultPosition() {
    return this.stepDefaultPosition;
  }

  getStepsOrder() {
    return this.stepsOrder;
  }

  getFirstStep() {
    return this.firstStep;
  }

  getWaitingTime() {
    return this.waitingTime;
  }

  areLogsEnabled() {
    return this.logsEnabled;
  }

  isCounterVisible() {
    return this.showCounter;
  }

  isPrevButtonVisible() {
    return this.showPrevButton;
  }

  getCustomTexts(): ObservableCustomTexts {
    return this.customTexts;
  }

  private setCustomText(texts: CustomTexts) {
    let prev, next, done, close: string | Observable<string>;
    prev = texts.prev ? texts.prev : DEFAULT_TEXTS.prev;
    next = texts.next ? texts.next : DEFAULT_TEXTS.next;
    done = texts.done ? texts.done : DEFAULT_TEXTS.done;
    close = texts.close ? texts.close : DEFAULT_TEXTS.close;
    this.customTexts = <ObservableCustomTexts>{
      prev: this.toObservable(prev),
      next: this.toObservable(next),
      done: this.toObservable(done),
      close: this.toObservable(close),
    };
  }

  private toObservable(value: string | Observable<string>) {
    return value instanceof Observable ? value : of(value);
  }

  private hexToRgb(hex: any): string {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m: any, r: any, g: any, b: any) => {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  }

  resetSubTours() {
    this.isSubTour = false;
    this.subTour = [];
  }

  getCurretnSubTour() {
    return this.subTour[this.subTourIndex];
  }

  subTourPrev() {
    this.isSubTour = true;
    this.joyrideChildren = '';
    const curretnSubTour = this.getCurretnSubTour().optionsService;
    if (curretnSubTour) {
      const {
        stepsOrder,
        stepDefaultPosition,
        logsEnabled,
        showCounter,
        showPrevButton,
        themeColor,
        firstStep,
        waitingTime,
        joyrideChildren,
      } = curretnSubTour;
      this.joyrideChildren = joyrideChildren;
      this.stepsOrder = stepsOrder;
      this.stepDefaultPosition = stepDefaultPosition;
      this.logsEnabled = logsEnabled;
      this.showCounter = showCounter;
      this.showPrevButton = showPrevButton;
      this.themeColor = themeColor;
      this.firstStep = firstStep;
      this.waitingTime = waitingTime;
    }
    this.subTour.splice(this.subTourIndex, 1);
    if (!this.subTourIndex) {
      this.isSubTour = false;
    }
  }

  subTourNext(currentStep: CurrentStep) {
    this.isSubTour = true;
    const { name, route, joyrideChildren } = currentStep;
    this.joyrideChildren = joyrideChildren;
    const step = `${name}${ROUTE_SEPARATOR}${route}`;
    this.subTour.push({
      optionsInject: ({ steps, startWith }) => {
        return { steps: [step, ...steps], startWith: startWith || steps[0] };
      },
      optionsService: cloneDeep(this),
      steps: this.getStepsOrder(),
      id: step,
      route,
      name,
    });
  }
}
