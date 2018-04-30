import { Component, OnInit, Input } from '@angular/core';
import { EmployeeInfoService } from '../../../../services/shared/common/employee/employee-info.service';
import { Employee } from '../../../../models/general/user';
@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  @Input() nameModal: string;

  public target: string = '';
  public button: string = '';
  public id: string = '';

  public employeeInfo: Employee;
  public flagShowModal: boolean = false;
  public isBoss: boolean = false;
  public validateRol: boolean;

  constructor(public employeeSharedService: EmployeeInfoService) {
    this.employeeSharedService.getInfoEmployee().subscribe((data: any) => {
      this.employeeInfo = data;
      this.flagShowModal = true;      
      console.log(this.nameModal)
      document.getElementById('btn-' + this.employeeInfo.modal).click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    })
  }

  ngOnInit() {
    this.target = '#modal-' + this.nameModal;
    this.button = 'btn-' + this.nameModal;
    this.id = "modal-" + this.nameModal;
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
