import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Output() newModal: EventEmitter<string> = new EventEmitter();

  public titleNew: string;
  public newList: PublicArticle[] = [];
  public uploadNewList: PublicArticle[] = [];
  public searchNotice: string = '';
  public validateNoData: boolean = false;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public myPublicationsService: MyPublicationsService,
    public billboardSharedService: BillboardService,
    private tokenService: Angular2TokenService) {

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.consultAllArticles();

  }

  consultAllArticles() {
    this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.newList = data.data;
    })
  }

  enterTitleNew() {
    this.searchNotice = this.titleNew;
  }

  goToSearchTitleNew() {
    this.uploadNewList = this.newList;
    if (this.searchNotice == '') {
      this.validateNoData = false;
      this.consultAllArticles();
    }
    else {
      this.newList = this.newList.filter((pub: any) => pub.title.toLowerCase().indexOf(this.searchNotice) >= 0);
      if (this.newList.length == 0) {
        this.validateNoData = true;
      }
      this.searchNotice = '';
    }
  }
  viewDetailNew(article: any) {
    this.newModal.emit('newModal');

    setTimeout(() => {
      this.billboardSharedService.setUpdateNew({ objectPublication: article, modal: 'newModal' });
    }, 500);
  }

}
