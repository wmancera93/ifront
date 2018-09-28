import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { AproversRequestsService } from '../../../../services/shared/common/aprovers-requestes/aprovers-requests.service';

@Component({
  selector: 'app-managed-travel',
  templateUrl: './managed-travel.component.html',
  styleUrls: ['./managed-travel.component.css']
})
export class ManagedTravelComponent implements OnInit {
  public managedRequestsTravel: any[] = [];

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router, private tokenService: Angular2TokenService,
    ) {


    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })

  }
  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });



  }

  returnBackTravel(){
    this.router.navigate(['ihr/travel_management']);
  }

  modalAproversTravelManaged(request: any) {
    
  }
}
