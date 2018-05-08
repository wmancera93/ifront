import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page-http',
  templateUrl: './error-page-http.component.html',
  styleUrls: ['./error-page-http.component.css']
})
export class ErrorPageHttpComponent implements OnInit {
  @Input() objectPage: any;

  public statusCode: string = ''
  public messageError: string = ''
  constructor(public router: Router) { }

  ngOnInit() {
    this.objectPage.subscribe((data) => {
      this.statusCode = data.title;
      this.messageError = data.message;
    })
  }

  RedirectInit() {
    this.router.navigate(['/ihr/login']);
  }

}
