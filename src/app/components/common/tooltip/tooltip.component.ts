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
      this.infoTooltip = data.text;
      this.openTooltip = data.show;

      if (this.openTooltip) {
        if (screen.width > 1100) {
          if (this.positionData.positionY < (0.5 * screen.height)) {
            let calculatey = this.positionData.positionY - 50;
            document.getElementById('tooltip_data').style.marginTop = calculatey + 'px';
          }
          if (this.positionData.positionX < (0.6 * screen.width)) {
            document.getElementById('tooltip_data').style.marginLeft = (this.positionData.positionX).toString() + 'px';
          }
          else {
            let calculatex = this.positionData.positionX - (0.2 * screen.width)
            document.getElementById('tooltip_data').style.marginLeft = calculatex + 'px';
          }
        }
        this.showTooltip = true;
      }
      else {
        this.showTooltip = false;
      }


      // if ((screen.width < 500) && (screen.width < screen.height)) {
      //   let calculatey = (screen.height * (-0.12));
      //   document.getElementById('tooltip_data').style.marginTop = calculatey + 'px';
      //   let calculatex = 0;
      //   document.getElementById('tooltip_data').style.marginLeft = calculatex + 'px';
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
