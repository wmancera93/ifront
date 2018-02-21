import { Component, OnInit, Input } from '@angular/core';
import { Estadistics } from '../../../../models/common/widgets/widgets';

@Component({
  selector: 'app-estadistics',
  templateUrl: './estadistics.component.html',
  styleUrls: ['./estadistics.component.css']
})
export class EstadisticsComponent implements OnInit {
  @Input() estadistics: any
  public objectWidget: Estadistics;

  constructor() {

  }

  ngOnInit() {
    this.objectWidget = this.estadistics;
  }
}