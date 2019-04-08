import { Component, OnInit } from '@angular/core';
import { EditArticleService } from '../../../../services/shared/common/edit-article/edit-article.service';
import { MyPublicationsService } from '../../../../services/billboard/my-publications/my-publications.service';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { BillboardService } from '../../../../services/shared/common/billboard/billboard.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css'],
})
export class EditPublicationComponent implements OnInit {
  public idEdit: number;
  public infoMyPublication: any;
  public showSubmit = true;
  public title: string;
  public summary: string;
  public body: any;
  public tags: string[];
  public image: string;
  public showLabelImage: string;
  public showLabelTheme: string[];
  public nameImage: string;
  public sendObjectEdit: any;
  public extensions = '.gif, .png, .jpeg, .jpg ';
  public fileImageEdit = 'fileImageEdit';
  public labelTags = '';
  public newImage: any;
  public flagRefresh = false;
  items;
  public placeholder_tittle: string;
  public placeholder_message: string;

  ngForm: FormGroup;
  fileToUpload: File = null;
  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.billboard.my_publication.edit_publication.${key}`;
  }

  constructor(
    public EditSharedService: EditArticleService,
    private fb: FormBuilder,
    public editMyPublicationService: MyPublicationsService,
    public fileUploadService: FileUploadService,
    public alert: AlertsService,
    public formDataService: FormDataService,
    public billboardService: BillboardService,
    public translate: TranslateService,
  ) {
    this.placeholder_tittle = this.t('placeholder_tittle');
    this.placeholder_message = this.t('placeholder_view');

    this.fileUploadService.getObjetFile().subscribe((data: any) => {
      this.newImage = data;
    });

    this.EditSharedService.getEditNew().subscribe((data: any) => {
      this.infoMyPublication = data;
      this.tags = this.infoMyPublication.themes;
      this.idEdit = this.infoMyPublication.id;
      this.title = this.infoMyPublication.title;
      this.summary = this.infoMyPublication.summary;
      this.body = this.infoMyPublication.body;
      this.image = this.infoMyPublication.image;

      this.showLabelTheme = this.infoMyPublication.themes;
      this.showLabelImage = this.infoMyPublication.image.url;
      this.showLabelImage =
        this.showLabelImage == null
          ? ''
          : this.showLabelImage.substring(0, this.showLabelImage.indexOf('?'));
      this.nameImage = this.showLabelImage.split('/')[
        this.showLabelImage.split('/').length - 1
      ];

      this.showEditArticle();
    });
  }

  ngOnInit() {}

  showEditArticle() {
    document.getElementById('btn_editNew').click();
    document.getElementById('bodyGeneral').removeAttribute('style');
  }

  deleteTag(theme: any) {
    const index = this.showLabelTheme.indexOf(theme);
    if (index > -1) {
      this.showLabelTheme.splice(index, 1);
    }
  }

  onSubmitSaveChanges(): void {
    this.labelTags = '';
    this.showSubmit = false;
    if (this.tags.length > 0) {
      this.tags.forEach((element: any) => {
        if (element.length !== undefined) {
          this.labelTags += element + ',';
        } else {
          this.labelTags += element.value + ',';
        }
      });
    }

    const editArticleForm = new FormData();
    editArticleForm.append('title', this.title);
    editArticleForm.append('summary', this.summary);
    editArticleForm.append('body', this.body);
    editArticleForm.append('tags', this.labelTags);
    editArticleForm.append('image', this.newImage);

    this.formDataService
      .putEditArticlesFormData(this.idEdit, editArticleForm)
      .subscribe(
        (response: any) => {
          if (response.success == true) {
            this.showSubmit = true;
            (<HTMLInputElement>(
              document.getElementsByClassName('buttonCloseForm')[0]
            )).click();
            const alertConfirmation: Alerts[] = [
              {
                type: 'success',
                title: this.t('title_status_news_ts'),
                message: this.t('msg_edited_news_ts'),
              },
            ];
            this.alert.setAlert(alertConfirmation[0]);
            this.flagRefresh = true;
            this.billboardService.setRefreshEditNew(this.flagRefresh);
          }
        },
        (error: any) => {
          this.showSubmit = true;
          (<HTMLInputElement>(
            document.getElementsByClassName('buttonCloseForm')[0]
          )).click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('title_status_news_ts'),
              message: error.json().errors.toString(),
              confirmation: false,
            },
          ];
          this.alert.setAlert(alertWarning[0]);
        },
      );
  }
}
