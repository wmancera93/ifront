import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

public titleNew: string;
public newList : PublicArticle[] = [];
public uploadNewList : PublicArticle[] = [];
public searchNotice : string = '' ;
public validateNoData : boolean = false;


  constructor(public myPublicationsService: MyPublicationsService) { }

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

  enterTitleNew()
  { 
    this.searchNotice = this.titleNew;
  }

  goToSearchTitleNew()
  { 
    console.log(this.searchNotice)
    this.uploadNewList = this.newList;
    this.newList = this.newList.filter((pub: any)=>pub.title.toLowerCase().indexOf(this.searchNotice)>=0);
   if(this.newList.length == 0)
   {
     this.validateNoData = true;
   }
  }

}
