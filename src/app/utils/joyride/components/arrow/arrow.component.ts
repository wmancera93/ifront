import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'joyride-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class JoyrideArrowComponent {
  @Input()
  position: string = 'top';
}
