import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  public myPublications: PublicArticle[] = [];
  public totalNews: number = 0;

  constructor(public myPublicationsService: MyPublicationsService) { }

  ngOnInit() {

    this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.myPublications = data.data;   

    })
  }
  goToForm() {
    document.getElementById('btn-newArt').click();
    document.getElementById("bodyGeneral").removeAttribute('style');
  }

  publishArticle(infoPub: PublicArticle) {
    let parameter = { id: infoPub.id }
    this.myPublicationsService.sendPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    })

  }
  hideArticle(infoPub: PublicArticle) {
    let parameter = { id: infoPub.id }
    this.myPublicationsService.sendPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    })
  }

}
