import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../../services/common/translate/translate.service';
import { Translate } from '../../../models/common/translate/translate';

@Component({
  selector: 'app-error-page-http',
  templateUrl: './error-page-http.component.html',
  styleUrls: ['./error-page-http.component.css']
})
export class ErrorPageHttpComponent implements OnInit {
  @Input() objectPage: any;

  public statusCode: string = '';
  public messageError: string = '';
  public translate: Translate = null;
  constructor(public router: Router, public translateService: TranslateService) {
    setTimeout(() => {
      this.translate = this.translateService.getTranslate();
      console.log(this.translate)
    }, 500);
  }

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
