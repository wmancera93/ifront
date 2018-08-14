import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.css']
})
export class AdvancesComponent implements OnInit {

  constructor(public router: Router, public travelsService:TravelsService) { }

  ngOnInit() {
  }

  
  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

  newAdvanceTravel() {
    this.travelsService.setNewAdvance(true);
  }
}
