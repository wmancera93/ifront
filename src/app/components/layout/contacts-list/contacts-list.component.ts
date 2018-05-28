import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../../models/general/user';
import { EmployeeService } from '../../../services/common/employee/employee.service';
import { EmployeeInfoService } from '../../../services/shared/common/employee/employee-info.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';



@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit {
  @Output() name: EventEmitter<string> = new EventEmitter();


  public contacts: Employee[] = [];
  public searchListContacts: Employee[] = [];
  public nameEmployee: string = '';
  public numberLengthLetter: number = 0;
  public numberPage: number = 1;
  public numberPageScroll: number = 2;
  public chats: any = [];
  public valuename: string = '';
  public searchByLetter: string = '';
  private scrollState: any;
  public scrollbarAction: any;
  public error: string;
  public validateError: boolean;
  public searchIconActive: boolean;
  public hideCollapse: string = '';
  public showContactsList: boolean = true;
  public infoEmployee: Employee;


  constructor(public employeeService: EmployeeService,
    public router: Router,
    public employeeSharedService: EmployeeInfoService,
    public stylesExplorerService: StylesExplorerService
  ) {
  }
  ngOnInit() {
    this.numberPage = 1;
    this.employeeService.getAllEmployees(this.numberPage.toString())
      .subscribe((result: any) => {
        if (result.success === true) {
          this.contacts = result.data;
          this.searchListContacts = this.contacts;
        }
      });

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 600);
  }
  enterNameEmployee() {
    this.searchIconActive = true;
    this.nameEmployee = this.searchByLetter;

    if (this.nameEmployee.length == 0) {
      this.searchIconActive = false;
    }
    if (this.numberLengthLetter !== this.nameEmployee.length) {
      this.numberPage = 1;
    }
    this.numberLengthLetter = this.nameEmployee.length;


  }
  searchByName() {
    let numberContacts: number = 0;
    let filterContacts: number = 0;
    this.contacts = [];

    if (this.nameEmployee == '') {
      this.employeeService.getAllEmployees(this.numberPage.toString())
        .subscribe((result: any) => {
          if (result.success === true) {
            this.contacts = result.data;
          }
        });
    }
    else {
      this.employeeService.getEmployeeByNameByPage(this.nameEmployee, (1).toString())
        .subscribe((result: any) => {

          this.contacts = result.data;
        });
    }


  }
  searchByNameIntro(key: any) {
    if (key == 13) {
      this.searchByName();
    }

  }
  detectScrollAction() {

    this.scrollbarAction = document.getElementById('scrollbarAction');

    if (this.scrollbarAction.scrollHeight - this.scrollbarAction.scrollTop === this.scrollbarAction.clientHeight) {

      this.scrollState = true;
    }
    else {
      this.scrollState = false;
    }
    if (this.scrollState == undefined) {

    } else
      if (this.scrollState == true) {
        if (this.nameEmployee !== '') {
          let numberContacts: number = 0;
          this.contacts = this.contacts.filter(
            (prod: any) => prod.name_complete.toLowerCase().indexOf(this.nameEmployee) >= 0);

          //  if (this.contacts.length === 0 || this.contacts.length < 10) {
          this.employeeService.getEmployeeByNameByPage(this.nameEmployee, (this.numberPage).toString())
            .subscribe((result: any) => {
              if (result.success === true) {
                numberContacts += result.data.length;
                for (let i = 0; i < result.data.length; i++) {
                  this.searchListContacts.push(result.data[i]);
                  this.contacts = this.searchListContacts;
                  this.contacts = this.contacts.filter(
                    (prod: any) => prod.name_complete.toLowerCase().indexOf(this.nameEmployee) >= 0);
                }
              }
              this.numberPage++;
            },
              (error) => {

                this.error = error.error.errors[0];
                this.validateError = error.error.success;

              }
            );

          // }


        } else {
          let numberContacts: number = 0;
          this.employeeService.getAllEmployees(this.numberPageScroll.toString())
            .subscribe((result: any) => {
              if (result.success === true) {
                numberContacts += result.data.length;
                for (let i = 0; i < result.data.length; i++) {
                  this.searchListContacts.push(result.data[i]);
                  this.contacts = this.searchListContacts;
                }
                this.scrollState = false;
              }
            });
          this.numberPageScroll++;
        }

      }

  }

  clickPartnersIconHide() {
    document.getElementById('togglePartnersHide').click();
  }

  openInfoEmployee(idEmployee: string) {
    this.name.emit('contactList');
    this.employeeService.getEmployeeById(idEmployee).subscribe(
      (data: any) => {
        if (data.success === true) {
          this.infoEmployee = data.data;
          this.infoEmployee.modal = 'contactList';
          setTimeout(() => {
            this.employeeSharedService.setInfoEmployee(this.infoEmployee);
          }, 500);
        }
      }
    );
  }
}
