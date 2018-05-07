import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/general/user';
import { UserSharedService } from '../../../services/shared/common/user/user-shared.service';
import { Enterprise } from '../../../models/general/enterprise';
import { MainService } from '../../../services/main/main.service';
import { truncate } from 'fs';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {
  public dataUser: User = null;
  public dataEnterprise: Enterprise = null;
  public showMenu: boolean = true;
  public liActive: string = 'liIndex';
  public aActive: string = 'aIndex';
  public showCollapse: string = '';
  public heightContenGeneral: number = 0;


  public showOrganizationChart: boolean;
  public showAutoServicesLabor: boolean;
  public showAutoServicesVacations: boolean;
  public showAutoServicesPayroll: boolean;
  public showAutoServicesIncome: boolean;
  public showAutoServices: boolean = true;
  public showIncomeWithholdings: boolean;
  public showPaymentsDeductions: boolean;
  public showSeverances: boolean;
  public showEmbargoes: boolean;
  public showLoans: boolean;
  public showVacations: boolean;
  public showVacationsC: boolean;
  public showLicenses: boolean;
  public showVacationBalance: boolean;
  public showInhabilities: boolean;
  public showExtraHours: boolean;
  public showAniversary: boolean;
  public showRHReports: boolean;
  public showBillboard: boolean;
  public showMyPublications: boolean;
  public showRequest: boolean;
  public showApprovals: boolean;
  public showBanners: boolean;
  public showDocuments: boolean;
  public showMyData: boolean;
  public showHelp: boolean;

  constructor(private userSharedService: UserSharedService,
    public companieService: MainService) {
    this.userSharedService.getUser().subscribe((data) => {
      this.dataUser = data;
    });
  }

  ngOnInit() {
    this.getDataLocalStorage();
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    document.documentElement.style.setProperty(`--img-header-menu`, `url(` + this.dataEnterprise.background_header_menu.url + `)`);
    document.documentElement.style.setProperty(`--width-nav-menu`, `220px`);
    document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 220px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `219px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `218px`);
    document.documentElement.style.setProperty(`--visible-menu`, `block`);
    document.documentElement.style.setProperty(`--left-show-menu-hover`, `-20px`);
    document.documentElement.style.setProperty(`--left-show-menu`, `-20px`);
    this.validateMenu();
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
    }
  }

  clickHideMenu() {
    document.documentElement.style.setProperty(`--visible-menu`, `none`);
    document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 0`);
    document.documentElement.style.setProperty(`--width-nav-menu`, `0px`);
    document.documentElement.style.setProperty(`--left-hide-menu`, `-12px`);
    document.documentElement.style.setProperty(`--left-hide-menu-hover`, `-12px`);
    setTimeout(() => {
      document.documentElement.style.setProperty(`--left-show-menu`, `-1px`);
      document.documentElement.style.setProperty(`--left-show-menu-hover`, `0px`);
    }, 400);
  }

  clickShowMenu() {
    document.documentElement.style.setProperty(`--left-show-menu-hover`, `-20px`);
    document.documentElement.style.setProperty(`--left-show-menu`, `-20px`);
    document.documentElement.style.setProperty(`--width-page-wrapper`, `0 0 0 220px`);;
    document.documentElement.style.setProperty(`--width-nav-menu`, `220px`);
    setTimeout(() => {
      document.documentElement.style.setProperty(`--visible-menu`, `block`);
      document.documentElement.style.setProperty(`--left-hide-menu`, `219px`);
      document.documentElement.style.setProperty(`--left-hide-menu-hover`, `218px`);
    }, 400);
  }

  clickOptionMenu(li: string, a: string, toggle: string) {
    document.getElementById(this.liActive).classList.remove('active');
    document.getElementById(li).className = 'active';
    this.liActive = li;

    if (this.showCollapse !== toggle) {
      if (document.getElementById(this.showCollapse) !== null) {
        document.getElementById(this.showCollapse).classList.remove('show');
      }
      this.showCollapse = toggle
    }
    if (a.split('-')[0].toString() !== 'toggle') {
      if (document.getElementById(this.aActive) !== null) {
        document.getElementById(this.aActive).classList.remove('active');
      }
      document.getElementById(a).className = 'nav-link bg-menu active';
      this.aActive = a;
      if (window.getComputedStyle(document.getElementById("btnMobile"), null).getPropertyValue('display') === 'block') {
        document.getElementById('btnHideMenu').click()

      }
    }
  }

  validateMenu() {
    // ORGANIZATE CHART
    if (this.dataEnterprise.show_organizate_chart == true && this.dataUser.employee.see_organ == "true") {
      this.showOrganizationChart = true;
    }
    else {
      this.showOrganizationChart = false;
    }
    // LABORAL CERTIFICATION AUTOSERVICES
    if (this.dataEnterprise.show_certificates_labor == true) {
      this.showAutoServicesLabor = true;
    }
    else {
      this.showAutoServicesLabor = false;
    }
    //VACATIONS CERTIFICATE
    if (this.dataEnterprise.show_certificates_vacations == true) {
      this.showAutoServicesVacations = true;
    }
    else {
      this.showAutoServicesVacations = false;
    }
    //PAYROLL CERTIFICATE 
    if (this.dataEnterprise.show_certificates_payroll == true) {
      this.showAutoServicesPayroll = true;
    }
    else {
      this.showAutoServicesPayroll = false;
    }
    //CERTIFICATE INCOME
    if (this.dataEnterprise.show_certificates_income == true) {
      this.showAutoServicesIncome = true;
    }
    else {
      this.showAutoServicesIncome = false;
    }

    if (this.showAutoServicesIncome == false && this.showAutoServicesPayroll == false && !this.showAutoServicesVacations == false && this.showAutoServicesLabor == false) {
      this.showAutoServices = false;
    }
    else {
      this.showAutoServices = true;
    }
    //  QUERIES
    if (this.dataEnterprise.show_income_and_withholdings == true) {
      this.showIncomeWithholdings = true;
    }
    else {
      this.showIncomeWithholdings = false;
    }

    if (this.dataEnterprise.show_payments_and_deductions == true) {
      this.showPaymentsDeductions = true;
    }
    else {
      this.showPaymentsDeductions = false;
    }

    if (this.dataEnterprise.show_severances == true) {
      this.showSeverances = true;
    }
    else {
      this.showSeverances = false;
    }

    if (this.dataEnterprise.show_embargoes == true) {
      this.showEmbargoes = true;
    }
    else {
      this.showEmbargoes = false;
    }
    if (this.dataEnterprise.show_loans == true) {
      this.showLoans = true;
    }
    else {
      this.showLoans = false;
    }

    if (this.dataEnterprise.show_vacations == true) {
      this.showVacations = true;
    }
    else {
      this.showVacations = false;
    }

    if (this.dataEnterprise.show_vacations_c == true) {
      this.showVacationsC = true;
    }
    else {
      this.showVacationsC = false;
    }

    if (this.dataEnterprise.show_vacation_balance == true) {
      this.showVacationBalance = true;
    }
    else {
      this.showVacationBalance = false;
    }

    if (this.dataEnterprise.show_licenses == true) {
      this.showLicenses = true;
    }
    else {
      this.showLicenses = false;
    }

    if (this.dataEnterprise.show_inhabilities == true) {
      this.showInhabilities = true;
    }
    else {
      this.showInhabilities = false;
    }

    if (this.dataEnterprise.show_hoex == true) {
      this.showExtraHours = true;
    }
    else {
      this.showExtraHours = false;
    }

    if (this.dataUser.employee.is_admin == "true") {
      this.showAniversary = true;
    }
    else {
      this.showAniversary = false;
    }

    // RH QUERIES 
    if (this.dataEnterprise.show_reports_rh == true) {
      if (this.dataUser.employee.is_admin == "true" || this.dataUser.employee.see_rpgen == "true") {
        this.showRHReports = true;
      }
    }

    else {
      this.showRHReports = false;
    }

    //BILLBOARD
    if (this.dataEnterprise.show_articles == true) {
      this.showBillboard = true;
    }
    else {
      this.showBillboard = false;
    }

    if (this.dataUser.employee.new_cont == "true") {
      this.showMyPublications = true;
    }
    else {
      this.showMyPublications = false;
    }

    //REQUEST
    if (this.dataEnterprise.make_request == true) {
      this.showRequest = true;
    }
    else {
      this.showRequest = false;
    }

    //APROVERS
    if (this.dataEnterprise.make_approvals == true && this.dataUser.employee.is_approver == true) {
      this.showApprovals = true;
    }
    else {
      this.showApprovals = false;
    }

    //BANNERS
    if (this.dataEnterprise.show_banners == true && this.dataUser.employee.is_admin == "true") {
      this.showBanners = true;
    }
    else {
      this.showBanners = false;
    }

    //CORPORATE DOCUMENTS
    if (this.dataEnterprise.show_document_management == true) {
      this.showDocuments = true;
    }
    else {
      this.showDocuments = false;
    }

    //HELP
    if (this.dataEnterprise.show_help == true) {
      this.showHelp = true;
    }
    else {
      this.showHelp = false;
    }

    // MY DATA 
    if (this.dataEnterprise.show_my_data == true) {
      this.showMyData = true;
    }
    else {
      this.showMyData = false;
    }

  }
}
