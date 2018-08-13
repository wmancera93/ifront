import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.css']
})
export class AdvancesComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  
  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

}
