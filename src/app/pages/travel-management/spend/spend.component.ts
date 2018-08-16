import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { SpendSharedService } from '../../../services/shared/spend-shared/spend-shared.service';

@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  public prueba: string ='3'
  token

  constructor(public router: Router, public spendSharedService:SpendSharedService) { }

  ngOnInit() {
  }

  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }
  newSpendTravel() {
    this.spendSharedService.setNewSpend(true);
  }
  viewSpend(){
  
  }

  editSpend(){

  }
  deleteSpend(){
    
  }
}
