import { Component, OnInit } from '@angular/core';
import { LizethService } from '../../services/shared/lizeth/lizeth.service';
import { Angular2TokenService } from 'angular2-token';
import { TypesRequests } from '../../models/common/requests-rh/requests-rh';
@Component({
  selector: 'app-lizeth',
  templateUrl: './lizeth.component.html',
  styleUrls: ['./lizeth.component.css']
})
export class LizethComponent implements OnInit {

  requesttypes: TypesRequests[];

  constructor(public lizethService: LizethService) {

    this.lizethService.getEmployeeRequets().subscribe((data: any) => {
      this.requesttypes = data.data[0].request_types;
      console.log(this.requesttypes)
    })
  }

  ngOnInit() {
  }

}
