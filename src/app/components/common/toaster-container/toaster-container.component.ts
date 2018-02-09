import { Component, OnInit } from '@angular/core';
// import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.css']
})
export class ToasterContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    //this.toasterService.pop('success', 'Args Title', 'Args Body');
  }

}
