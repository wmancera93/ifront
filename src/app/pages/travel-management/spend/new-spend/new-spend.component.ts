import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';

@Component({
  selector: 'app-new-spend',
  templateUrl: './new-spend.component.html',
  styleUrls: ['./new-spend.component.css']
})
export class NewSpendComponent implements OnInit {

  constructor(public travelsService: TravelsService) {

    this.travelsService.getNewSpend().subscribe((data :any)=>{
      document.getElementById('btn_spend_new').click();
    });

   }
  ngOnInit() {
  }

  newSpend(param){

  }
}
