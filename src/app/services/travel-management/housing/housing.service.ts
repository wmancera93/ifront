import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class HousingService {
  public reportLogistics: any;

  bedrooms = {
    bedroom_1: [
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
    ],
    bedroom_2: [
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
    ],
    bedroom_3: [
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' }],
      },
    ],
  };
  constructor(private tokenService: Angular2TokenService) {
    this.reportLogistics = [
      {
        id: 1,
        name: 'Alojamientos',
        code: 'housing_reports',
      },
      {
        id: 2,
        name: 'Transporte',
        code: 'fleet_reports',
      },
    ];
  }

  getReportLogistics() {
    return this.reportLogistics;
  }

  getbedroomsByHousing(housing_id) {
    return this.bedrooms[`bedroom_${housing_id}`];
  }

  deleteHousingByCompany(housing_id: any) {
    return;
  }
  postNewHousing(object: any) {
    return this.tokenService.post('housing/', object).map((data: any) => data.json());
  }
  getIndexHousing() {
    return this.tokenService.get('housing').map((data: any) => data.json());
  }
  getShowHousingById(id) {
    return this.tokenService.get('housing/' + id).map((data: any) => data.json());
  }
  putEditHousing(id: string, object: any) {
    return this.tokenService.put('housing/', +id, object).map((data: any) => data.json());
  }
}
