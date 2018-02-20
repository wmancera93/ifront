import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/general/user';
import { EmployeeService } from '../../../services/common/employee/employee.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  public contacts: Employee[] = [];


  constructor(public employeeDate: EmployeeService) {
  }

  ngOnInit() {
    this.employeeDate.getAllEmployees('1')
      .subscribe((result: any) => {
        this.contacts = result.data;
        console.log(this.contacts);
      });
  }



}
