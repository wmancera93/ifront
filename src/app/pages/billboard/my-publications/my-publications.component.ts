import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goToForm(){
    document.getElementById('btn-newArt').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
  }

}
