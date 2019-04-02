import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-stepper-components",
  templateUrl: "./stepper-components.component.html",
  styleUrls: ["./stepper-components.component.css"]
})
export class StepperComponentsComponent implements OnInit {
  @Input() steps = [];

  @Input() stepActive = 0;

  constructor() {}

  ngOnInit() {}
}
