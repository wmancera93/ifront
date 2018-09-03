import { Component, OnInit } from '@angular/core';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { AdvancesService } from '../../../../services/travel-management/advances/advances.service';

@Component({
  selector: 'app-view-advance',
  templateUrl: './view-advance.component.html',
  styleUrls: ['./view-advance.component.css']
})
export class ViewAdvanceComponent implements OnInit {
  public infoAdvance: any[] = [];
  constructor(public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService) {
    this.advanceSharedService.getViewAdvance().subscribe((id: any) => {
      this.advancesService.getAdvanceByID(id).subscribe((advance: any) => {
        if (document.getElementById('modal_viewAdvance').className !== 'modal show') {
          document.getElementById('btn-viewAdvance').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
        this.infoAdvance = advance.data;
        console.log(this.infoAdvance)
      })

    })

  }

  ngOnInit() {
  }

}
