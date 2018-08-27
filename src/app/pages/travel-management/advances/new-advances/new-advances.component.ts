import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdvancesService } from '../../../../services/travel-management/advances/advances.service';

@Component({
  selector: 'app-new-advances',
  templateUrl: './new-advances.component.html',
  styleUrls: ['./new-advances.component.css']
})
export class NewAdvancesComponent implements OnInit {
  public showSubmit: boolean = true
  public formAdvanceTravel: any;
  public listTravelsFromAdvance: any;
  public listMoneyTypes: any;

  constructor(public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService,
    public fb: FormBuilder) {

    this.formAdvanceTravel = new FormGroup({});
    this.formAdvanceTravel = fb.group({
      travel_request_id: "",
      currency_id: "",
      value: "",
      date: "",
      observation: ""
    });

    this.advanceSharedService.getNewAdvance().subscribe((data: any) => {
      if (document.getElementById('advance_new').className !== 'modal show') {
        document.getElementById('btn_advances_new').click();
      }
    });

    this.advancesService.getAdvanceListTravel().subscribe((list: any) => {
      this.listTravelsFromAdvance = list.data;
    });

    this.advancesService.getAdvanceMoneyList().subscribe((money: any) => {
      this.listMoneyTypes = money.data;
    })

  }


  ngOnInit() {
  }


  newAdvance(param) {
    console.log(param)
  }

  aditionAdvance(dataAgree)
  {
    console.log(dataAgree)
  }
  
  clearFormAdvance()
  {
    this.formAdvanceTravel = this.fb.group({
      travel_request_id: "",
      currency_id: "",
      value: "",
      date: "",
      observation: ""
    });
  }

}
