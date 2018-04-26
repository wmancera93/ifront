import { Component, OnInit } from '@angular/core';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { FormGroup } from '@angular/forms';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';


@Component({
  selector: 'app-comment-article',
  templateUrl: './comment-article.component.html',
  styleUrls: ['./comment-article.component.css']
})
export class CommentArticleComponent implements OnInit {

public infoArticle: PublicArticle;
public viewModal :boolean = false;
public showSubmit: boolean = true;
public idArticle : number;
public numberComments: number = 1;
public comment : string;


  constructor(public billboardSharedService: BillboardService,
  public myPublicationService:MyPublicationsService) {
    this.billboardSharedService.getUpdateNew().subscribe((data:any)=>{
      console.log(data)
      this.infoArticle = data;
      this.idArticle = data.id;
      //this.numberComments = data.total_comments;
      this.viewModal = true;
    })
   }

  ngOnInit() {
  }

  sendComment(){
    this.showSubmit = false;
    this.myPublicationService.postComment(this.idArticle,this.comment).subscribe(
      (data:any)=>{
      this.viewModal = true;
      console.log(data)
    },
  (error:any)=>{
    console.log(error)
    this.viewModal = true;
  }
  )
    
  }


}
