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
    console.log(this.searchNotice)
    if (this.searchNotice == '') {
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

    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.billboardSharedService.setUpdateNew(article);
    // setTimeout(() => {
    //   document.getElementById("loginId").style.display = 'none'
    //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
    // }, 1000)
  }

}
