import { Component, OnInit } from '@angular/core';
import { EditArticleService } from '../../../../services/shared/common/edit-article/edit-article.service';
import { MyPublicationsService } from '../../../../services/billboard/my-publications/my-publications.service';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent implements OnInit {

  public idEdit: any;
  public infoMyPublication: any;
  public showSubmit: boolean = true;
  public title: string;
  public summary: string;
  public body: any;
  public tags: string[];
  public image: string;
  public showLabelImage: string;
  public showLabelTheme: string[];
  public nameImage: string;
  public sendObjectEdit: any;
  public extensions: string = '.gif, .png, .jpeg, .jpg ';
  public fileImageEdit: string = 'fileImageEdit';

  ngForm: FormGroup;
  fileToUpload: File = null;

  constructor(public EditSharedService: EditArticleService,
    private fb: FormBuilder,
    public editMyPublicationService: MyPublicationsService,
    public fileUploadService: FileUploadService,
    public alert: AlertsService) {

    this.fileUploadService.getObjetFile().subscribe((data: any) => {
      this.image = data;
    })

    this.getEditArticle();

    this.ngForm = this.fb.group({
      'title': [this.title],
      'summary': [this.summary],
      'body': [this.body],
      'tags': [this.tags],
      'image': [this.image]
    });

  }

  ngOnInit() {

  }

  getEditArticle() {
    this.EditSharedService.getEditNew().subscribe((data: any) => {
      this.infoMyPublication = data;
      this.idEdit = this.infoMyPublication.id;
      this.title = this.infoMyPublication.title;
      this.summary = this.infoMyPublication.summary;
      this.body = this.infoMyPublication.body;
      this.tags = this.infoMyPublication.themes;

      this.showLabelTheme = this.infoMyPublication.themes;
      this.showLabelImage = this.infoMyPublication.image.url;
      this.showLabelImage = this.showLabelImage.substring(0, this.showLabelImage.indexOf('?'));
      this.nameImage = this.showLabelImage.split('/')[this.showLabelImage.split('/').length - 1];

      this.showEditArticle();
    })
  }

  showEditArticle() {
    this.editMyPublicationService.getArticles(this.idEdit).subscribe((res: any) => {

    })
    document.getElementById('btn_editNew').click();
    document.getElementById("bodyGeneral").removeAttribute('style');

  }

  onSubmitSaveChanges() {
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;

    this.sendObjectEdit = {
      id: this.idEdit,
      title: this.title, summary: this.summary, body: this.body, themes: this.tags,
      image: this.image
    };
    
    this.editMyPublicationService.putEditArticles(this.idEdit, this.sendObjectEdit).subscribe(
      (data: any) => {
        this.showSubmit = true;
        setTimeout(() => {
          document.getElementById("loginId").style.display = 'none'
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        }, 1000);
        (<HTMLInputElement>document.getElementsByClassName('buttonCloseForm')[0]).click();
        const alertConfirmation: Alerts[] = [{ type: 'success', title: 'Estado de la noticia', message: 'Noticia editada' }];
        this.alert.setAlert(alertConfirmation[0]);
      },
      (error: any) => {
        
        this.showSubmit = true;
        setTimeout(() => {
          document.getElementById("loginId").style.display = 'none'
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        }, 1000);  
        (<HTMLInputElement>document.getElementsByClassName('buttonCloseForm')[0]).click();    
        const alertWarning: Alerts[] = [{ type: 'danger', title: 'Estado de la noticia', message: error.error.errors.toString(), confirmation: false }];
        this.alert.setAlert(alertWarning[0]);
      }
    );
  
  }



}
