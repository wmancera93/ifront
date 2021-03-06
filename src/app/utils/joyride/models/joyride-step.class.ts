import { ViewContainerRef, TemplateRef, EventEmitter, QueryList } from '@angular/core';
import { JoyrideStepComponent } from '../components/step/joyride-step.component';
import { ReplaySubject } from 'rxjs';
import { JoyrideStepChildren } from '../directives/joyride-step-children.directive';

export class JoyrideStep {
  constructor() {
    this.title = new ReplaySubject<string>();
    this.text = new ReplaySubject<string>();
    this.loading = new ReplaySubject<boolean>();
  }
  name: string;
  route: string;
  position: string;
  loading: ReplaySubject<boolean>;
  title: ReplaySubject<string>;
  text: ReplaySubject<string>;
  stepContent: TemplateRef<any>;
  stepContentParams: Object;
  nextClicked: EventEmitter<any>;
  prevCliked: EventEmitter<any>;
  tourDone: EventEmitter<any>;
  transformCssStyle: string;
  isElementOrAncestorFixed: boolean;
  targetViewContainer: ViewContainerRef;
  stepInstance: JoyrideStepComponent;
  childrens: QueryList<JoyrideStepChildren>;
  waitingTime?: number;
}
