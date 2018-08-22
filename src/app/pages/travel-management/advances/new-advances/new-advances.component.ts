import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';

@Component({
  selector: 'app-new-advances',
  templateUrl: './new-advances.component.html',
  styleUrls: ['./new-advances.component.css']
})
export class NewAdvancesComponent implements OnInit {
  public showSubmit: boolean = true
  formAdvanceTravel
  constructor(public advanceSharedService: AdvanceSharedService) {

    this.advanceSharedService.getNewAdvance().subscribe((data: any) => {
   
      if (document.getElementById('advance_new').className !== 'modal show') {
        document.getElementById('btn_advances_new').click();
      }

    });
  }


  ngOnInit() {
  }


  newAdvance(param){
    
  }

}
