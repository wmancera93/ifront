import { Component, OnInit, Input } from '@angular/core';
import { debug } from 'util';
import { TooltipSharedService } from '../../../services/shared/common/tooltip/tooltip-shared.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input('tooltipMsg') tooltipMsg: any;
  public tooltipShow: boolean = false;
  public openTooltip: boolean = false;
  public showTooltip: boolean = false;
  public infoTooltip: string = "";
  public positionData: any = [];

  constructor(public tooltipSharedService: TooltipSharedService) { }

  ngOnInit() {

    this.tooltipSharedService.getDataTooltip().subscribe((data: any) => {
      this.positionData = data.position;
      this.infoTooltip = data.text.tooltipText;
      this.openTooltip = data.show;
      const tooltip = document.getElementById('tooltip_data').style
      if (this.openTooltip) {
        if (screen.width > 1100) {
          if (this.positionData.positionY < (0.90 * screen.height)) {
            //let calculatey = this.positionData.positionY - 350;
            //document.getElementById('tooltip_data').style.top = calculatey + 'px';
          }
          tooltip.top = this.positionData.positionY + 'px';
          tooltip.left = this.positionData.positionX + 'px';
          /* if (this.positionData.positionX < (0.8 * screen.width)) {
            let calculatex = this.positionData.positionX - 250;
            tooltip.left = calculatex + 'px';
          }
          else {
            let calculatex = this.positionData.positionX - (0.45 * screen.width)
            tooltip.left = calculatex + 'px';
          } */

        }

      }



      // if ((screen.width < 500) && (screen.width < screen.height)) {
      //   let calculatey = (screen.height * (-0.12));
      //   tooltip.marginTop = calculatey + 'px';
      //   let calculatex = 0;
      //   tooltip.marginLeft = calculatex + 'px';
      // }
      // if ((screen.width > 500) && (screen.width < 1100)) {
      //   console.log(screen.width)
      // }

      // if ((screen.height < 500) && (screen.width > screen.height)) {
      //   console.log(screen.width)
      // }
    })
  }

}
