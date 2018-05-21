import { Component, OnInit, Input } from '@angular/core';
import { ProgressPrimary } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-progress-primary',
  templateUrl: './progress-primary.component.html',
  styleUrls: ['./progress-primary.component.css']
})
export class ProgressPrimaryComponent implements OnInit {
  @Input('progressPrimary') progressPrimary: any;
  public objectWidget: ProgressPrimary[] = [];

  constructor() { }

  ngOnInit() {
    this.progressPrimary.subscribe((data: ProgressPrimary[]) => {
      this.objectWidget = data;
    })
  }
}
