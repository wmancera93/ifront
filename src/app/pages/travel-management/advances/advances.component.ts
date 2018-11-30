import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { AdvanceSharedService } from '../../../services/shared/advance-shared/advance-shared.service';
import { AdvancesService } from '../../../services/travel-management/advances/advances.service';
import { Advances } from '../../../models/common/travels_management/advances/advances';
import { User } from '../../../models/general/user';
import { FiltersGeneralsService } from '../../../services/travel-management/filters-generals/filters-generals.service';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.css']
})
export class AdvancesComponent implements OnInit {
  token
  public advancesItems: Advances;
  public userAuthenticated: User = null;
  public checkThird: boolean = true;

  constructor(public router: Router,
    public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService,
    public filtersGeneralsService: FiltersGeneralsService) {

    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));

    this.getadvancesList();
    this.advanceSharedService.getRefreshAdvanceList().subscribe((validate: any) => {
      if (validate === true) {
        this.getadvancesList();
      }
    });

    this.advancesService.getAdvancePayments().subscribe((advances: any) => {
      this.advancesItems = advances.data;

      let url = window.location.href;
      url.split('/')[url.split('/').length - 1];
      if (url.split('/')[url.split('/').length - 1] !== 'advances') {
        this.advanceSharedService.setNewAdvance(url.split('/')[url.split('/').length - 1]);
      }
    })


  }

  ngOnInit() {
  }

  //begin filters

  public codIHR: string = '';
  public codSAP: string = '';
  public datesBegin: string = '';
  public datesEnd: string = '';
  public status: string = '';
  public statusLiquid: string = '';
  public codEmployee: string = '';
  public page: string = '';
  public is_collapse: boolean;

  filter(filter) {
    if (this.checkThird) {
      this.page = 'sol_anti_in';
      switch (filter) {
        case 'codIHR':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';

          if (this.codIHR !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberIHR(this.page, this.codIHR).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'codSAP':
          this.codIHR = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.codSAP !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberSAP(this.page, this.codSAP).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'dates':
          this.codSAP = '';
          this.codIHR = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.datesBegin !== '' && this.datesEnd !== '') {
            this.filtersGeneralsService.getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'status':
          this.codIHR = '';
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.status !== '') {
            this.filtersGeneralsService.getSearchTravelByStatus(this.page, this.status).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'statusLiquid':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.codIHR = '';
          this.codEmployee = '';
          if (this.statusLiquid !== '') {
            this.filtersGeneralsService.getSearchTravelByStatusLiquid(this.page, this.statusLiquid).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'codEmployee':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codIHR = '';
          if (this.codEmployee !== '') {
            this.filtersGeneralsService.getSearchTravelByEmployee(this.page, this.codEmployee).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;

        default:
          break;
      }
    } else {
      this.page = 'sol_anti_third';
      switch (filter) {
        case 'codIHR':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';

          if (this.codIHR !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberIHR(this.page, this.codIHR).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'codSAP':
          this.codIHR = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.codSAP !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberSAP(this.page, this.codSAP).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'dates':
          this.codSAP = '';
          this.codIHR = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.datesBegin !== '' && this.datesEnd !== '') {
            this.filtersGeneralsService.getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'status':
          this.codIHR = '';
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.status !== '') {
            this.filtersGeneralsService.getSearchTravelByStatus(this.page, this.status).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'statusLiquid':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.codIHR = '';
          this.codEmployee = '';
          if (this.statusLiquid !== '') {
            this.filtersGeneralsService.getSearchTravelByStatusLiquid(this.page, this.statusLiquid).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;
        case 'codEmployee':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codIHR = '';
          if (this.codEmployee !== '') {
            this.filtersGeneralsService.getSearchTravelByEmployee(this.page, this.codEmployee).subscribe(
              (data: any) => {
                // this.advancesItems = data.data;
                // validar
              });
          } else {
            this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
              this.advancesItems = data.data;
            });
          }
          break;

        default:
          break;
      }
    }
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  //end filters

  checkAdvance(advance) {
    switch (advance) {
      case 'advance_request':
        this.advancesService.getAdvancePayments().subscribe((advances: any) => {
          this.advancesItems = advances.data;
          this.checkThird = true;
        });
        break;
      case 'my_advance_request':
        this.advancesService.getMyAdvancePayments().subscribe((data: any) => {
          this.advancesItems = data.data;
          this.checkThird = false;
        });
        break;

      default:
        break;
    }
  }

  getadvancesList() {
    this.advancesService.getAdvancePayments().subscribe((advances: any) => {
      this.advancesItems = advances.data;
    })
  }
  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

  newAdvanceTravel() {
    this.advanceSharedService.setNewAdvance(true);
  }

  showAdvance(id: number) {
    this.advanceSharedService.setViewAdvance(id);

  }
}
