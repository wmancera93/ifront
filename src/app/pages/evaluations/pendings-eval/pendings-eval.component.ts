import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pendings-eval',
  templateUrl: './pendings-eval.component.html',
  styleUrls: ['./pendings-eval.component.css']
})
export class PendingsEvalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
  }

}
