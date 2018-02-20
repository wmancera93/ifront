import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/general/user';
import { EmployeeService } from '../../../services/common/employee/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  public contacts: Employee[] = [];
  public searchListContacts: Employee[] = [];
  public nameEmployee: string = '';
  public numberPage: number = 1;

  constructor(public employeeDate: EmployeeService) {
  }
  ngOnInit() {
    this.numberPage = 1;
    this.employeeDate.getAllEmployees(this.numberPage.toString())
      .subscribe((result: any) => {
        this.contacts = result.data;
        this.searchListContacts = this.contacts;
      });
  }
  searchByName() {
    let numberContacts: number = 0;
    let filterContacts: number = 0;
    this.contacts = this.searchListContacts;
    this.contacts = this.contacts.filter(
      (prod: any) => prod.name.toLowerCase().indexOf(this.nameEmployee) >= 0);

    if (this.contacts.length === 0) {
      this.employeeDate.getEmployeeByNameByPage(this.nameEmployee, (this.numberPage).toString())
        .subscribe((result: any) => {
          alert('peticion')
          this.contacts = result.data;
          numberContacts += this.contacts.length;
          for (let i = 0; i < this.contacts.length; i++) {
            this.searchListContacts.push(this.contacts[i]);
          }          
        });
    }

  }
  searchByNameIntro(key: any) {
    if (key == 13) {
      this.searchByName();
    }

  }



}
