import { Component, OnInit, Input } from '@angular/core';
import { EmployeeInfoService } from '../../../../services/shared/common/employee/employee-info.service';
import { Employee } from '../../../../models/general/user';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  @Input('nameModal') nameModal: any;

  public target: string = '';
  public button: string = '';
  public id: string = '';

  public employeeInfo: Employee = null;
  public flagShowModal: boolean = false;
  public isBoss: boolean = false;
  public validateRol: boolean;
  public dateAddCompany: string;
  public datebirth: string;

  constructor(public employeeSharedService: EmployeeInfoService,
    public stylesExplorerService: StylesExplorerService) {

    this.employeeSharedService.getInfoEmployee().subscribe((data: any) => {
      this.employeeInfo = null;
      this.employeeInfo = data;

      let dateIn = data.fecha_ingreso.split('-');
      this.dateAddCompany = dateIn[2] + '/' + dateIn[1] + '/' + dateIn[0];

      let dateBorn = data.fecha_nac.split('-');
      this.datebirth = dateBorn[2] + '/' + dateBorn[1] + '/' + dateBorn[0];
     
      if (this.employeeInfo !== null) {
        this.flagShowModal = true;
      } else {
        this.flagShowModal = false;
      }
      if (document.getElementById("modal-" + this.employeeInfo.modal).className !== 'modal show') {
        document.getElementById('btn-' + this.employeeInfo.modal).click();
        document.getElementById("bodyGeneral").removeAttribute('style');
        setTimeout(() => {
          this.stylesExplorerService.addStylesCommon();
        }, 500);
      }
    })
  }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.target = '#modal-' + data;
      this.button = 'btn-' + data;
      this.id = "modal-" + data;
    })
  }
  validateRolInfoEmployee() {
    if (this.isBoss == true) {
      this.validateRol == true;
    }
    else {
      this.validateRol == false;
    }
  }

}
