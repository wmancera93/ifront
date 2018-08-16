import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { AdvanceSharedService } from '../../../services/shared/advance-shared/advance-shared.service';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.css']
})
export class AdvancesComponent implements OnInit {

  constructor(public router: Router, public advanceSharedService:AdvanceSharedService) { }

  ngOnInit() {
  }

  
  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

  newAdvanceTravel() {
    debugger
    this.advanceSharedService.setNewAdvance(true);
  }
}
