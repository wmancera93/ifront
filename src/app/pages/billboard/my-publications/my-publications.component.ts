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

  constructor(public myPublicationsService : MyPublicationsService) { }

  ngOnInit() {

    this.myPublicationsService.getMyArticles().subscribe((data:any)=>{
      this.myPublications = data.data;
      console.log(this.myPublications)
    })
  }
  goToForm(){
    document.getElementById('btn-newArt').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
  }

}
