import { Directive, Input, ViewContainerRef } from '@angular/core';

export const NO_POSITION = 'NO_POSITION';

@Directive({
  selector: 'joyrideStepChildren, [joyrideStepChildren]',
})
export class JoyrideStepChildren {
  @Input('joyrideStepChildren')
  name: string;

  @Input()
  active: boolean = true;

  constructor(public viewContainerRef: ViewContainerRef) {}
}
