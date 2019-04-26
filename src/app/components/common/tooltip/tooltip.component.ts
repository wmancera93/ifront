import { Component, OnInit, Input } from '@angular/core';
import { debug } from 'util';
import { TooltipSharedService } from '../../../services/shared/common/tooltip/tooltip-shared.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})
export class TooltipComponent implements OnInit {
  @Input('tooltipMsg') tooltipMsg: any;
  public tooltipShow = false;
  public openTooltip = false;
  public showTooltip = false;
  public styles = {};
  public infoTooltip = '';
  public positionData: any = [];

  constructor(public tooltipSharedService: TooltipSharedService) {}

  ngOnInit() {
    this.tooltipSharedService
      .getDataTooltip()
      .subscribe((data: any) => {
        this.positionData = data.position;
        this.openTooltip = data.show;
        const { positionY, positionX } = this.positionData;
        if (this.openTooltip) {
          this.infoTooltip = data.text.tooltipText;
          this.styles = {
            top: positionY + 'px',
            left: positionX + 'px',
          };
          if (screen.width > 1100) {
            if (this.positionData.positionY < 0.9 * screen.height) {
              //let calculatey = this.positionData.positionY - 350;
              //document.getElementById('tooltip_data').style.top = calculatey + 'px';
            }
            /* if (this.positionData.positionX < (0.8 * screen.width)) {
            let calculatex = this.positionData.positionX - 250;
            tooltip.left = calculatex + 'px';
          }
          else {
            let calculatex = this.positionData.positionX - (0.45 * screen.width)
            tooltip.left = calculatex + 'px';
          } */
          }
        } else {
          this.infoTooltip = '';
          this.styles = {
            top: '',
            left: '',
          };
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
      });
  }
}
