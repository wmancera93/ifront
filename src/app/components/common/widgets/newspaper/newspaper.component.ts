import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Newspaper } from '../../../../models/common/widgets/widgets';
import { BillboardService } from '../../../../services/shared/common/billboard/billboard.service';
import { Router } from '@angular/router';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css']
})
export class NewspaperComponent implements OnInit {
  @Input('newspaper') newspaper: any;

  @Output() newspaperModal: EventEmitter<string> = new EventEmitter();

  public objectWidget: Newspaper[] = [];
  public translate: Translate = null;
  constructor(public billboardSharedService: BillboardService,
    public router: Router, public translateService: TranslateService) {
      
    this.translate = this.translateService.getTranslate();
  }

  ngOnInit() {
    this.newspaper.subscribe((data: Newspaper[]) => {
      this.objectWidget = data
    });
  }

  viewDetailArticle(objectArticle: any) {
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden"); 
    this.newspaperModal.emit('newspaperModal');
    setTimeout(() => {
      this.billboardSharedService.setShowCommentNew({ objectPublication: objectArticle, modal: 'newspaperModal' });
    }, 500);

    // setTimeout(() => {
    //   document.getElementById("loginId").style.display = 'none'
    //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
    // }, 1000)
  }



}
