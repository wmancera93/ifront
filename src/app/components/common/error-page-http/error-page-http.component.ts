import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page-http',
  templateUrl: './error-page-http.component.html',
  styleUrls: ['./error-page-http.component.css'],
})
export class ErrorPageHttpComponent implements OnInit {
  @Input() objectPage: any;

  public statusCode = '';
  public messageError = '';
  constructor(public router: Router) {
    setTimeout(() => {}, 500);
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.error_page_http.${key}`;
  }

  ngOnInit() {
    this.objectPage.subscribe(data => {
      this.statusCode = data.title;
      this.messageError = data.message;
    });
  }

  RedirectInit() {
    this.router.navigate(['/ihr/authentication/login']);
  }
}
