import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { EditArticleService } from '../../../services/shared/common/edit-article/edit-article.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {
  @Output() myPublicationModal: EventEmitter<string> = new EventEmitter();

  public myPublications: PublicArticle[] = [];
  public totalNews: number = 0;
  private alertWarning: Alerts[];
  public idDelete: number = 0;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public myPublicationsService: MyPublicationsService,
    public alert: AlertsService,
    public billboardSharedService: BillboardService,
    public editEditSharedService: EditArticleService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService) {

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

    this.billboardSharedService.getUpdateNew().subscribe((data: any) => {
      if (data == true) {
        this.getDataPublications();
      }
    });

    this.billboardSharedService.getRefreshEditNew().subscribe((response: any) => {
      if (response == true) {
        this.getDataPublications();
      }
    });

    this.alert.getActionConfirm().subscribe((data: any) => {

      if (data == "deleteArticle") {
        // document.getElementById("loginId").style.display = 'block'
        // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
        this.myPublicationsService.deleteArticles(this.idDelete)
          .subscribe((data: any) => {
            if (data.success == true) {
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
            // setTimeout(() => {
            //   document.getElementById("loginId").style.display = 'none'
            //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            // }, 2000)
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

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  getDataPublications() {
    this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.myPublications = data.data;

    })
  }

  goToForm() {
    document.getElementById('btn-newArt').click();
    document.getElementById('bodyGeneral').removeAttribute('style');
  }

  publishArticle(infoPub: PublicArticle) {

    const parameter = infoPub.id;
    this.myPublicationsService.putPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    });

  }
  hideArticle(infoPub: PublicArticle) {
    const parameter = infoPub.id;
    this.myPublicationsService.putPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    });
  }

  viewDetailArticle(infoPub: any) {
    this.myPublicationModal.emit('myPublicationModal');
    setTimeout(() => {
      this.billboardSharedService.setShowCommentNew({ objectPublication: infoPub, modal: 'myPublicationModal' });
    }, 500);
  }

  editNew(infoPub: PublicArticle) {
    this.editEditSharedService.setEditNew(infoPub);
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
