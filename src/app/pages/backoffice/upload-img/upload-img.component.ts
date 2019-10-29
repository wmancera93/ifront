import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { TooltipSharedService } from '../../../services/shared/common/tooltip/tooltip-shared.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css'],
})
export class UploadImgComponent implements OnInit {
  public objectImg: any[] = [];
  public fileName: string = '';
  public extensions = ' .png, .jpeg, .jpg';
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public deleteDocumenFile: string;
  public newObject: any = null;
  public idLog: string;
  public flagShowTooltip = false;
  public objectInfos: any[] = [];
  private subscription: ISubscription;

  constructor(
    public fileUploadService: FileUploadService,
    public alert: AlertsService,
    public formDataService: FormDataService,
    public tooltipSharedService: TooltipSharedService,
  ) {
    this.subscription = this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteNewDocumentSaved') {
        const objectPrint = this.objectInfos.filter(element => element.fileName === this.newObject.fileName)[0];
        objectPrint.active = false;
        objectPrint.nameFile = '';
        objectPrint.iconFile = '';
        this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name.fileName === this.deleteDocumenFile), 1);
      }
    });
    this.idLog = JSON.parse(localStorage.getItem('user')).employee_id;
  }

  ngOnInit() {
    this.getObjectOrigin();
    this.fileUploadService.getObjetFile().subscribe(data => {
      this.iconUpload = data.name.split('.');
      this.iconDocument = this.iconUpload[this.iconUpload.length - 1];
      this.is_upload = true;
      this.objectImg.push({
        name: this.newObject,
        file: data,
        extension: this.iconDocument,
      });
      this.fileUploadService.getCleanUpload();
      this.activateAtt();
    });
  }
  getObjectOrigin() {
    this.objectInfos = [
      {
        title: 'Imagen fondo de logueo',
        small: 'Resolución minima 1600px x 1067 px',
        info: 'Es la Imagen de fondo de la pantalla inicial de login, donde se ingresa usuario y contraseña',
        fileName: 'fileBackLog',
        active: false,
        nameFile: '',
        iconFile: '',
      },
      {
        title: 'Logo interno header',
        small: 'Resolución minima 220px x 156px',
        info: 'Es el logo de la empresa que se visualiza en el encabezado del dashboard',
        fileName: 'fileLogHeader',
        active: false,
        nameFile: '',
        iconFile: '',
      },
      {
        title: ' Logo de inicio',
        small: 'Resolución minima 220px x 160px',
        info: 'Es el logo de la empresa que estara en el logueo de usuario',
        fileName: 'fileLogLogueo',
        active: false,
        nameFile: '',
        iconFile: '',
      },
      {
        title: 'Imagen fondo de fotografia',
        small: 'Resolución minima 460px x 305px',
        info: 'Es la imagen de fondo detrás de la foto de usuario sobre el menu',
        fileName: 'fileBackfoto',
        active: false,
        nameFile: '',
        iconFile: '',
      },
    ];
  }
  iconClass(extension: string) {
    const file = 'fa-file';
    switch (extension) {
      case 'pdf':
        return `${file}-pdf-o`;
      case 'docx':
        return `${file}-word-o`;
      case 'jpeg':
      case 'png':
      case 'jpg':
        return `${file}-image-o`;
      default:
        return file;
    }
  }
  deleteUpload(param: any) {
    this.deleteDocumenFile = param.fileName;

    this.alert.setAlert({
      type: 'warning',
      title: 'Advertencia',
      message: 'Esta seguro de eliminar este archivo',
      confirmation: true,
      typeConfirmation: 'deleteNewDocumentSaved',
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  activateAtt() {
    const objectPrint = this.objectInfos.filter(element => element.fileName === this.newObject.fileName)[0];
    objectPrint.active = true;
    objectPrint.nameFile = this.objectImg.filter(element => element.name.fileName === this.newObject.fileName)[0].file.name;
    objectPrint.iconFile = this.objectImg.filter(element => element.name.fileName === this.newObject.fileName)[0].extension;
  }
  getName(param) {
    this.newObject = param;
  }
  sendObject() {
    const modelFromdata = new FormData();
    modelFromdata.append(
      'background_login',
      this.objectImg.filter(element => element.name.fileName === 'fileBackLog')[0] == undefined
        ? ''
        : this.objectImg.filter(element => element.name.fileName === 'fileBackLog')[0].file,
    );
    modelFromdata.append(
      'logo_inside',
      this.objectImg.filter(element => element.name.fileName === 'fileLogHeader')[0] == undefined
        ? ''
        : this.objectImg.filter(element => element.name.fileName === 'fileLogHeader')[0].file,
    );
    modelFromdata.append(
      'logo_dashboard',
      this.objectImg.filter(element => element.name.fileName === 'fileLogLogueo')[0] == undefined
        ? ''
        : this.objectImg.filter(element => element.name.fileName === 'fileLogLogueo')[0].file,
    );
    modelFromdata.append(
      'background_lockscreen',
      this.objectImg.filter(element => element.name.fileName === 'fileBackfoto')[0] == undefined
        ? ''
        : this.objectImg.filter(element => element.name.fileName === 'fileBackfoto')[0].file,
    );

    this.formDataService.putImgCompany(this.idLog, modelFromdata).subscribe(
      (data: any) => {
        if (data.success) {
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: 'Transacción Exitosa',
              message: data.message,
              confirmation: false,
              typeConfirmation: '',
            },
          ];
          this.alert.setAlert(alertWarning[0]);
          this.objectImg = [];
          this.getObjectOrigin();
        }
      },
      (error: any) => {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: error.json().errors.toString(),
            confirmation: false,
            typeConfirmation: '',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.objectImg = [];
        this.getObjectOrigin();
      },
    );
  }
  showTooltip(event: any, body: string) {
    this.flagShowTooltip = true;
    this.tooltipSharedService.setDataTooltip({
      text: {
        tooltipText: body,
      },
      show: this.flagShowTooltip,
      position: {
        positionX: event.pageX - event.pageX * 0.8,
        positionY: event.pageY - event.pageX * 0.4,
      },
    });
  }

  closeTooltip() {
    this.flagShowTooltip = false;
    setTimeout(() => {
      if (!this.flagShowTooltip) {
        this.tooltipSharedService.setDataTooltip({
          text: '',
          show: this.flagShowTooltip,
          position: '',
        });
      }
    }, 1000);
  }
}
