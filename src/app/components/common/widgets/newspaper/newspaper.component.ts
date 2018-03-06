import { Component, OnInit, Input } from '@angular/core';
import { Newspaper } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css']
})
export class NewspaperComponent implements OnInit {
  @Input('newspaper') newspaper: any;
  public objectWidget: Newspaper[]=[];

  constructor() { }

  ngOnInit() {
    this.newspaper.subscribe((data: Newspaper[]) => {
      this.objectWidget = data
    })
  }

}
