import { Component, OnInit } from '@angular/core';
import { EmployeeInfoService } from '../../../../services/shared/common/employee/employee-info.service';
import { Employee } from '../../../../models/general/user';
@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  public employeeInfo: Employee[] = [];
  public flagShowModal: boolean = false;

  constructor(public employeeSharedService: EmployeeInfoService) {
    this.employeeSharedService.getInfoEmployee().subscribe((data: any) => {      
      this.employeeInfo = data;
      this.flagShowModal = true;
      document.getElementById('btn-modalOpenInfoEmployee').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    })    
  }

  ngOnInit() {
  }

}
