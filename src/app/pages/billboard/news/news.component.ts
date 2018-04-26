import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public titleNew: string;
  public newList: PublicArticle[] = [];
  public uploadNewList: PublicArticle[] = [];
  public searchNotice: string = '';
  public validateNoData: boolean = false;


  constructor(public myPublicationsService: MyPublicationsService,
    public billboardSharedService: BillboardService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.newList = data.data;
    })
  }

  enterTitleNew() {
    this.searchNotice = this.titleNew;
  }

  goToSearchTitleNew() {
    this.uploadNewList = this.newList;
    this.newList = this.newList.filter((pub: any) => pub.title.toLowerCase().indexOf(this.searchNotice) >= 0);
    if (this.newList.length == 0) {
      this.validateNoData = true;
    }
  }
  viewDetailNew(article: any) {
    this.billboardSharedService.setUpdateNew(article);
    document.getElementById('btn_show_article').click();
  }

}
