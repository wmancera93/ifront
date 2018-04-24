import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

public newList : PublicArticle[] = [];

  constructor(public myPublicationsService: MyPublicationsService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.newList = data.data;   
      console.log(this.newList)
    })
  }

}
