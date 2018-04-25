import { Component, OnInit } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { EditArticleService } from '../../../services/shared/common/edit-article/edit-article.service';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  public myPublications: PublicArticle[] = [];
  public totalNews: number = 0;
  private alertWarning: Alerts[];
  public idDelete: number = 0;


  constructor(public myPublicationsService: MyPublicationsService,
    public alert: AlertsService,
    public billboardSharedService: BillboardService,
  public editEditSharedService : EditArticleService) {

    this.billboardSharedService.getUpdateNew().subscribe((data: any) => {
      if (data == true) {
        this.getDataPublications();
      }
    })
    this.alert.getActionConfirm().subscribe((data: any) => {

      if (data == "deleteArticle") {
        this.myPublicationsService.deleteArticles(this.idDelete)
          .subscribe((data: any) => {
            if(data.success == true){
            this.getDataPublications();
            this.alertWarning = [{
              type: 'success',
              title: 'Confirmación',
              message: 'Artículo eliminado exitosamente',
              confirmation: false,
              typeConfirmation: ''
            }];
            this.alert.setAlert(this.alertWarning[0]);
            }
          })
      }
    })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.getDataPublications();
  }

  getDataPublications() {
    this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.myPublications = data.data;
    })
  }

  goToForm() {
    document.getElementById('btn-newArt').click();
    document.getElementById("bodyGeneral").removeAttribute('style');
  }

  publishArticle(infoPub: PublicArticle) {
    let parameter = infoPub.id;
    this.myPublicationsService.putPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    })

  }
  hideArticle(infoPub: PublicArticle) {
    let parameter = infoPub.id;
    this.myPublicationsService.putPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    })
  }

  viewDetailNew(infoPub: PublicArticle) {
    console.log(infoPub)
  }

  editNew(infoPub: PublicArticle){    
    this.editEditSharedService.setEditNew(infoPub);
    document.getElementById('btn-newArt').click();
    document.getElementById("bodyGeneral").removeAttribute('style');
  }

  deleteNew(infoPub: PublicArticle) {

    this.idDelete = infoPub.id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el artículo?',
      confirmation: true,
      typeConfirmation: 'deleteArticle'
    }];
    this.alert.setAlert(this.alertWarning[0]);
  }

}
