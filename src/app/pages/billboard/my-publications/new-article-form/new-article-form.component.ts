import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup } from '@angular/forms';
import { MyPublicationsService } from '../../../../services/billboard/my-publications/my-publications.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { BillboardService } from '../../../../services/shared/common/billboard/billboard.service';
import { EditArticleService } from '../../../../services/shared/common/edit-article/edit-article.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-article-form',
  templateUrl: './new-article-form.component.html',
  styleUrls: ['./new-article-form.component.css'],
})
export class NewArticleFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public title: string;
  public resume: string;
  public themes: string[];
  public notice: string;
  public image: string;
  public uploadListNews: boolean;
  public extensions = '.gif, .png, .jpeg, .jpg ';
  public fileImageNew = 'fileImageNew';
  public showSubmit = true;
  formNewArticle: FormGroup;
  fileToUpload: File = null;

  public tags = [];
  public summary = '';
  public title_form = '';
  public text_form = '';

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.billboard.my_publication.new_article_form.${key}`;
  }

  constructor(
    public createArticleService: MyPublicationsService,
    public alert: AlertsService,
    public fileUploadService: FileUploadService,
    public billboardSharedService: BillboardService,
    public editEditSharedService: EditArticleService,
    public formDataService: FormDataService,
    public translate: TranslateService,
  ) {
    this.fileUploadService.getObjetFile().subscribe((data: any) => {
      this.image = data;
    });
    this.formNewArticle = new FormGroup({});
  }

  cleanFormData() {
    this.tags = [];
    this.summary = '';
    this.title_form = '';
    this.text_form = '';
  }
  ngOnInit() {
    //document.getElementsByClassName('ng2-tag-input__text-input')[0].setAttribute('style', 'height:20px !important; ');
  }
  onSubmitNewArticle(value: any): void {
    if (value.title == '' || value.summary == '' || value.body == '') {
      (<HTMLInputElement>(
        document.getElementsByClassName('buttonCloseNewForm')[0]
      )).click();
      const alertWarning: Alerts[] = [
        {
          type: 'danger',
          title: this.t('msg_denied_request_ts'),
          message: this.t('msg_empty_fields_ts'),
          confirmation: false,
        },
      ];
      this.showSubmit = true;
      this.alert.setAlert(alertWarning[0]);
    } else {
      this.showSubmit = false;
      const selectedItems = value.tags.map(({ display }) => display);
      const newArticleForm = new FormData();
      newArticleForm.append('title', value.title);
      newArticleForm.append('summary', value.summary);
      newArticleForm.append('body', value.body);
      newArticleForm.append('tags', selectedItems);
      newArticleForm.append('image', this.image);
      this.formDataService.postNoticeFormData(newArticleForm).subscribe(
        (data: any) => {
          if (data.success == true) {
            this.cleanFormData();
            this.fileUploadService.setCleanUpload(true);
            (<HTMLInputElement>(
              document.getElementsByClassName('buttonCloseNewForm')[0]
            )).click();
            const alertConfirmation: Alerts[] = [
              {
                type: 'success',
                title: this.t('text_status_news_ts'),
                message: this.t('msg_saved_news_ts'),
              },
            ];
            this.alert.setAlert(alertConfirmation[0]);
            this.showSubmit = true;
            this.uploadListNews = true;
            this.billboardSharedService.setUpdateNew(this.uploadListNews);
          }
        },
        (error: any) => {
          (<HTMLInputElement>(
            document.getElementsByClassName('buttonCloseRequest')[0]
          )).click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('msg_denied_request_ts'),
              message: error.json().errors.toString(),
              confirmation: false,
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);
        },
      );
    }
  }
}
