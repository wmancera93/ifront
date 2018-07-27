import { Component, OnInit, Input } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input('tooltipMsg') tooltipMsg: any;
  @Input('showTooltip') showTooltip: any;
  @Input('position') position: any;
  public openTooltip: boolean = false;
  public infoTooltip: string = "";
  public positionData: any = [];

  constructor() { }

  ngOnInit() {
    this.showTooltip.subscribe((show: any) => {
      this.openTooltip = show;
    })
    this.position.subscribe((pos: any) => {
      this.positionData = pos;
      // if ((screen.width < 500) && (screen.width < screen.height)) {
      //   let calculatey = (screen.height * (-0.12));
      //   document.getElementById('tooltip_data').style.marginTop = calculatey + 'px';
      //   let calculatex = 0;
      //   document.getElementById('tooltip_data').style.marginLeft = calculatex + 'px';
      // }
      // if ((screen.width > 500) && (screen.width < 1100)) {
      //   console.log(screen.width)
      // }
      // if (screen.width > 1100) {
      //   if (this.positionData.positionY < (0.5 * screen.height)) {
      //     console.log(this.positionData.positionY, screen.height)
      //     let calculatey = this.positionData.positionY - 50;
      //     document.getElementById('tooltip_data').style.marginTop = calculatey + 'px';
      //   }
      //   if (this.positionData.positionX < (0.5 * screen.width)) {
      //     console.log(this.positionData.positionX)
      //     document.getElementById('tooltip_data').style.marginLeft = (this.positionData.positionX).toString() + 'px';
      //   }
      // }
      // if ((screen.height < 500) && (screen.width > screen.height)) {
      //   console.log(screen.width)
      // }
    })
    this.tooltipMsg.subscribe((data: any) => {
      this.infoTooltip = data;
    })



  }

}
