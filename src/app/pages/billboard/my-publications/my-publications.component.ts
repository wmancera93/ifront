import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  public myPublications : PublicArticle[] = [];
  public activeIconPublic: boolean ;

  constructor(public myPublicationsService : MyPublicationsService) { }

  ngOnInit() {

    this.myPublicationsService.getMyArticles().subscribe((data:any)=>{
      this.myPublications = data.data;
    })
  }
  goToForm(){
    document.getElementById('btn-newArt').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
  }

  publishArticle(infoPub:PublicArticle){
    console.log(infoPub.id)
    let parameter = {id:infoPub.id}
    this.myPublicationsService.sendPublishNews(parameter).subscribe((data: any) => {   
      console.log(data)
    })
   
  }
  hideArticle(infoPub:PublicArticle){
    console.log(infoPub.id)
    let parameter = {id:infoPub.id}
    this.myPublicationsService.sendPublishNews(parameter).subscribe((data: any) => {   
      console.log(data)
    })
  }

}
