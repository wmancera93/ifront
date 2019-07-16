import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demographic-chart',
  templateUrl: './demographic-chart.component.html',
  styleUrls: ['./demographic-chart.component.css'],
})
export class DemographicChartComponent implements OnInit {
  public maxValueChildren = { name: '', value: 0 };

  constructor(public router: Router) {}

  ngOnInit() {}
  returnDahsboardGerencial() {
    this.router.navigate(['ihr/index']);
  }
  setMaxValueChildren(value) {
    this.maxValueChildren = value;
  }
}
